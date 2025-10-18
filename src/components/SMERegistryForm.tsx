import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Briefcase, Phone, Upload, X, Loader2 } from 'lucide-react';
import { uploadExpertPhotoToSupabase } from '@/lib/uploadExpertPhotoToSupabase';
import { compressImage } from '@/lib/imageCompression';

interface FormData {
  name: string;
  companyName: string;
  phoneNumber: string; // This will store either email or phone
  companyLogo: File | null;
}

export const SMERegistryForm = () => {
  const [form, setForm] = useState<FormData>({
    name: '',
    companyName: '',
    phoneNumber: '',
    companyLogo: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogo = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setIsCompressing(true);
    setUploadProgress(0);
    
    try {
      // Compress the image first
      const compressedFile = await compressImage(file);
      setForm({ ...form, companyLogo: compressedFile });
      setIsCompressing(false);
      setUploadProgress(100);
      
      toast({ 
        title: 'Image Ready', 
        description: `Image compressed and ready for upload (${Math.round(compressedFile.size / 1024)}KB)`, 
      });
    } catch (error: any) {
      setIsCompressing(false);
      setUploadProgress(0);
      toast({ 
        title: 'Image Processing Failed', 
        description: error.message || 'Could not process image. Please try again.', 
        variant: 'destructive' 
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleLogo(e.dataTransfer.files);
  };

  // Validation function for email or phone
  const isValidEmailOrPhone = (value: string): boolean => {
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex (basic international format)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    return emailRegex.test(value) || phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name || !form.companyName || !form.phoneNumber || !form.companyLogo) {
      toast({ title: 'Missing Information', description: 'Please fill all fields and upload a logo.', variant: 'destructive' });
      return;
    }
    
    // Validate email or phone format
    if (!isValidEmailOrPhone(form.phoneNumber)) {
      toast({ title: 'Invalid Contact Information', description: 'Please enter a valid email address or phone number.', variant: 'destructive' });
      return;
    }
    
    setSubmitting(true);
    setUploadProgress(0);
    
    try {
      // Start both operations in parallel for faster processing
      const [logoUrl, backendResponse] = await Promise.all([
        // Upload logo to Supabase
        (async () => {
          setUploadProgress(25);
          const url = await uploadExpertPhotoToSupabase(form.companyLogo!);
          setUploadProgress(75);
          return url;
        })(),
        
        // Send initial data to backend (without logo URL)
        fetch('https://fursaconnet-production.up.railway.app/sme_registry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            company_name: form.companyName,
            phone_number: form.phoneNumber,
            company_logo_url: '', // Will be updated after upload
          }),
        })
      ]);
      
      // Update the logo URL in the backend
      if (backendResponse.ok) {
        const responseData = await backendResponse.json();
        if (responseData.id) {
          // Update the record with the logo URL
          const updateResponse = await fetch(`https://fursaconnet-production.up.railway.app/sme_registry/${responseData.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ company_logo_url: logoUrl }),
          });
          
          if (updateResponse.ok) {
            setUploadProgress(100);
            toast({ title: 'Registration Successful!', description: 'Thank you for registering your SME.' });
            setForm({ name: '', companyName: '', phoneNumber: '', companyLogo: null });
          } else {
            throw new Error('Failed to update logo URL');
          }
        } else {
          throw new Error('No ID returned from registration');
        }
      } else {
        let errorMsg = 'Registration failed. Please try again.';
        try {
          const errorData = await backendResponse.json();
          errorMsg = errorData.message || errorMsg;
        } catch (e) {
          const errorText = await backendResponse.text();
          if (errorText) errorMsg = errorText;
        }
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      toast({ 
        title: 'Registration Failed', 
        description: error?.message || 'There was an error submitting your application. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
    }
  };

  const removeLogo = () => {
    setForm({ ...form, companyLogo: null });
    setUploadProgress(0);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-card/95 backdrop-blur">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-bold text-primary">
          SME Registration Form
        </CardTitle>
        <CardDescription className="text-base">
          Please fill in your company details below
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Your Name *
              </Label>
              <Input
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="h-12 mt-2"
              />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Company Name *
              </Label>
              <Input
                name="companyName"
                placeholder="Enter your company name"
                value={form.companyName}
                onChange={handleChange}
                className="h-12 mt-2"
              />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Email or Phone Number *
              </Label>
              <Input
                name="phoneNumber"
                placeholder="Enter email or phone number"
                value={form.phoneNumber}
                onChange={handleChange}
                className="h-12 mt-2"
              />
            </div>
          </div>

          {/* Company Logo Upload */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Company Logo *
            </Label>
            
            {form.companyLogo ? (
              <div className="relative">
                <div className="flex items-center gap-4 p-4 border-2 border-dashed border-green-200 rounded-lg bg-green-50">
                  <img
                    src={URL.createObjectURL(form.companyLogo)}
                    alt="Company logo preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-green-800">{form.companyLogo.name}</p>
                    <p className="text-sm text-green-600">
                      Size: {Math.round(form.companyLogo.size / 1024)}KB
                    </p>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeLogo}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isCompressing 
                    ? 'border-blue-300 bg-blue-50' 
                    : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isCompressing ? (
                  <div className="space-y-4">
                    <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600" />
                    <div>
                      <p className="text-blue-600 font-medium">Processing Image...</p>
                      <p className="text-sm text-blue-500">Compressing and optimizing your logo</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG, WebP up to 2MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLogo(e.target.files)}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold"
            disabled={submitting || isCompressing}
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {uploadProgress < 50 ? 'Processing...' : 'Uploading...'}
              </>
            ) : (
              'Register SME'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SMERegistryForm;
