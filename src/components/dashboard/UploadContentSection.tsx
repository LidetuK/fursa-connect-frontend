import React, { useState, useEffect } from 'react';
import { Upload, FileText, Image, File, Trash2, Eye, Download, Hash, Wand2, X, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSocialAccounts } from '@/hooks/social/useSocialAccounts';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MessageCircle
} from 'lucide-react';

interface ConnectedPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  username: string;
  platform: string;
  selected: boolean;
}

const UploadContentSection = () => {
  const { socialAccounts, loadUserSocialAccounts } = useSocialAccounts();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [contentTitle, setContentTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [contentType, setContentType] = useState<'text' | 'image' | 'carousel'>('text');
  const [contentStyle, setContentStyle] = useState<'professional' | 'social' | 'promotional'>('professional');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishingPlatforms, setPublishingPlatforms] = useState<string[]>([]);
  
  // Image upload states
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadedContent, setUploadedContent] = useState([]);

  // Load social accounts on component mount
  useEffect(() => {
    loadUserSocialAccounts();
  }, [loadUserSocialAccounts]);

  // Image handling functions
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validate file types
    const validFiles = files.filter((file: File) => 
      file.type.startsWith('image/') && 
      ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    );
    
    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid file type",
        description: "Please select only image files (JPEG, PNG, GIF, WebP).",
        variant: "destructive"
      });
    }
    
    // Limit number of images based on content type
    const maxImages = contentType === 'carousel' ? 10 : 1;
    const filesToAdd = validFiles.slice(0, maxImages - selectedImages.length);
    
    if (filesToAdd.length === 0) {
      toast({
        title: "Image limit reached",
        description: contentType === 'carousel' 
          ? "You can upload up to 10 images for carousel posts." 
          : "You can upload only 1 image for image posts.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedImages(prev => [...prev, ...filesToAdd]);
    
    // Create preview URLs
    filesToAdd.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setImagePreviewUrls(prev => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const clearImages = () => {
    setSelectedImages([]);
    setImagePreviewUrls([]);
  };

  // Get platform icon and color
  const getPlatformConfig = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return {
          icon: <Twitter className="w-6 h-6 text-white" />,
          color: 'bg-black',
          name: 'Twitter/X'
        };
      case 'linkedin':
        return {
          icon: <Linkedin className="w-6 h-6 text-white" />,
          color: 'bg-blue-600',
          name: 'LinkedIn'
        };
      case 'telegram':
        return {
          icon: <MessageCircle className="w-6 h-6 text-white" />,
          color: 'bg-blue-500',
          name: 'Telegram'
        };
      case 'facebook':
        return {
          icon: <Facebook className="w-6 h-6 text-white" />,
          color: 'bg-blue-500',
          name: 'Facebook'
        };
      case 'instagram':
        return {
          icon: <Instagram className="w-6 h-6 text-white" />,
          color: 'bg-gradient-to-r from-purple-400 to-pink-400',
          name: 'Instagram'
        };
      default:
        return {
          icon: <FileText className="w-6 h-6 text-white" />,
          color: 'bg-gray-500',
          name: platform
        };
    }
  };

  // Convert social accounts to connected platforms
  const connectedPlatforms: ConnectedPlatform[] = socialAccounts
    .filter(account => account.platform !== 'youtube') // Exclude YouTube as requested
    .map(account => {
      const config = getPlatformConfig(account.platform);
      return {
        id: account.platform,
        name: config.name,
        icon: config.icon,
        color: config.color,
        username: account.platform_user_id || account.metadata?.name || `@${account.platform}_user`,
        platform: account.platform,
        selected: selectedPlatforms.includes(account.platform)
      };
    });

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePlatformRemove = (platformId: string) => {
    setSelectedPlatforms(prev => prev.filter(id => id !== platformId));
  };

  // Post to Twitter (Text-only for now)
  const postToTwitter = async (text: string, images?: File[]): Promise<boolean> => {
    try {
      console.log('Posting to Twitter:', { 
        text: text.substring(0, 50) + '...',
        hasImages: images && images.length > 0,
        imageCount: images?.length || 0
      });
      
      // For now, Twitter only supports text posts
      if (images && images.length > 0) {
        console.log('Twitter: Images detected but Twitter image upload is temporarily disabled');
        // Continue with text-only post
      }
      
      const response = await fetch('https://fursaconnet-production.up.railway.app/auth/twitter2/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ text }),
      });
      
      console.log('Twitter response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Twitter error response:', errorData);
        throw new Error(errorData.error || `Twitter API error: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Twitter success response:', result);
      return true;
    } catch (error: any) {
      console.error('Twitter posting error:', error);
      throw error;
    }
  };

  // Post to LinkedIn
  const postToLinkedIn = async (text: string, images?: File[]): Promise<boolean> => {
    try {
      console.log('Posting to LinkedIn:', { 
        text: text.substring(0, 50) + '...',
        hasImages: images && images.length > 0,
        imageCount: images?.length || 0
      });
      
      const formData = new FormData();
      formData.append('text', text);
      
      if (images && images.length > 0) {
        images.forEach((image, index) => {
          formData.append('images', image);
        });
      }
      
      const response = await fetch('https://fursaconnet-production.up.railway.app/auth/linkedin/post', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      
      console.log('LinkedIn response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('LinkedIn error response:', errorData);
        throw new Error(errorData.error || `LinkedIn API error: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('LinkedIn success response:', result);
      return true;
    } catch (error: any) {
      console.error('LinkedIn posting error:', error);
      throw error;
    }
  };

  // Post to Telegram
  const postToTelegram = async (text: string, images?: File[]): Promise<boolean> => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Posting to Telegram:', { 
        userId: user.id, 
        text: text.substring(0, 50) + '...',
        hasImages: images && images.length > 0,
        imageCount: images?.length || 0
      });

      const formData = new FormData();
      formData.append('userId', user.id.toString());
      formData.append('text', text);
      
      if (images && images.length > 0) {
        images.forEach((image, index) => {
          formData.append('images', image);
        });
      }

      const response = await fetch('https://fursaconnet-production.up.railway.app/telegram/send', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Telegram response status:', response.status);
      
      const data = await response.json();
      console.log('Telegram response data:', data);
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || `Telegram API error: ${response.status}`);
      }
      
      return true;
    } catch (error: any) {
      console.error('Telegram posting error:', error);
      throw error;
    }
  };

  // Handle publishing to all selected platforms
  const handlePublish = async () => {
    if (!contentText.trim()) {
      toast({ 
        title: "Empty content", 
        description: "Please enter some content to publish.", 
        variant: "destructive" 
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({ 
        title: "No platforms selected", 
        description: "Please select at least one platform to publish to.", 
        variant: "destructive" 
      });
      return;
    }

    // Validate image requirements
    if (contentType === 'image' && selectedImages.length === 0) {
      toast({ 
        title: "No image selected", 
        description: "Please select an image for your image post.", 
        variant: "destructive" 
      });
      return;
    }

    if (contentType === 'carousel' && selectedImages.length === 0) {
      toast({ 
        title: "No images selected", 
        description: "Please select at least one image for your carousel post.", 
        variant: "destructive" 
      });
      return;
    }

    setIsPublishing(true);
    setPublishingPlatforms([...selectedPlatforms]);

    const results: { platform: string; success: boolean; error?: string }[] = [];

    // Post to each selected platform
    for (const platformId of selectedPlatforms) {
      try {
        setPublishingPlatforms(prev => prev.filter(p => p !== platformId));
        
        let success = false;
        
        switch (platformId) {
          case 'twitter':
            success = await postToTwitter(contentText, selectedImages);
            break;
          case 'linkedin':
            success = await postToLinkedIn(contentText, selectedImages);
            break;
          case 'telegram':
            success = await postToTelegram(contentText, selectedImages);
            break;
          default:
            throw new Error(`Platform ${platformId} is not supported for posting`);
        }

        results.push({ platform: platformId, success });
        
        if (success) {
          // Save post to database
          try {
            await fetch('https://fursaconnet-production.up.railway.app/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                platform: platformId,
                content: contentText,
                status: 'published',
                publishedAt: new Date().toISOString()
              }),
            });
          } catch (error) {
            console.error('Failed to save post to database:', error);
          }

          // Show special message for Twitter if images were included
          if (platformId === 'twitter' && selectedImages.length > 0) {
            toast({ 
              title: "Posted to Twitter (Text Only)", 
              description: `Your text was posted to Twitter. Image upload is temporarily disabled for Twitter.` 
            });
          } else {
            toast({ 
              title: "Posted to " + getPlatformConfig(platformId).name, 
              description: `Your content was successfully published to ${getPlatformConfig(platformId).name}.` 
            });
          }
        }
      } catch (error: any) {
        console.error(`Error posting to ${platformId}:`, error);
        results.push({ 
          platform: platformId, 
          success: false, 
          error: error.message 
        });
        
        toast({ 
          title: `Failed to post to ${getPlatformConfig(platformId).name}`, 
          description: error.message || `Failed to publish to ${getPlatformConfig(platformId).name}.`, 
          variant: "destructive" 
        });
      }
    }

    // Check overall results
    const successfulPosts = results.filter(r => r.success);
    const failedPosts = results.filter(r => !r.success);

    if (successfulPosts.length > 0) {
      if (failedPosts.length === 0) {
        // All successful
        toast({
          title: "Published successfully!",
          description: `Your content was published to ${successfulPosts.length} platform(s).`
        });
        // Clear form
        setContentText('');
        setContentTitle('');
        setSelectedPlatforms([]);
        clearImages();
      } else {
        // Mixed results
        toast({
          title: "Partially published",
          description: `Published to ${successfulPosts.length} platform(s), failed on ${failedPosts.length} platform(s).`
        });
      }
    } else {
      // All failed
      toast({
        title: "Publishing failed",
        description: "Failed to publish to any selected platforms. Please try again.",
        variant: "destructive"
      });
    }

    setIsPublishing(false);
    setPublishingPlatforms([]);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6 text-primary" />;
      case 'document':
        return <FileText className="w-6 h-6 text-primary" />;
      default:
        return <File className="w-6 h-6 text-primary" />;
    }
  };

  const documents = uploadedContent.filter(item => item.type === 'document');
  const images = uploadedContent.filter(item => item.type === 'image');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#f59e3e] rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Upload Content</h1>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="text-gray-700">Cancel</Button>
          <Button variant="outline" className="text-gray-700">
            <Eye className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handlePublish}
            disabled={isPublishing || selectedPlatforms.length === 0 || !contentText.trim()}
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
            <Upload className="w-4 h-4 mr-2" />
            Publish
              </>
            )}
          </Button>
          <Button className="bg-[#F97415] hover:bg-[#E65A0A] text-white">
            <Upload className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Content Type and Style Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Type */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="text-[#f59e3e] text-xl">📝</span>
              <CardTitle className="text-lg font-semibold text-gray-900">Content Type</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div 
              className={`p-3 text-center border rounded-lg cursor-pointer transition-colors ${
                contentType === 'text' 
                  ? 'border-[#f59e3e] bg-orange-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setContentType('text')}
            >
              <p className="font-medium text-gray-900">Text Post</p>
            </div>
            <div 
              className={`p-3 text-center border rounded-lg cursor-pointer transition-colors ${
                contentType === 'image' 
                  ? 'border-[#f59e3e] bg-orange-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setContentType('image')}
            >
              <p className="font-medium text-gray-900">Image Post</p>
            </div>
            <div 
              className={`p-3 text-center border rounded-lg cursor-pointer transition-colors ${
                contentType === 'carousel' 
                  ? 'border-[#f59e3e] bg-orange-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setContentType('carousel')}
            >
              <p className="font-medium text-gray-900">Carousel</p>
            </div>
          </CardContent>
        </Card>

        {/* Select Platforms */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Select Platforms</CardTitle>
            <p className="text-sm text-gray-600">Choose which platforms to publish to</p>
          </CardHeader>
          <CardContent>
            {connectedPlatforms.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No platforms connected</p>
                <p className="text-sm text-gray-500">Connect your social media accounts first</p>
              </div>
            ) : (
            <div className="space-y-3">
                {connectedPlatforms.map((platform) => (
                  <div 
                    key={platform.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                      platform.selected 
                        ? 'border-[#f59e3e] bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${platform.color}`}>
                        {platform.icon}
                  </div>
                  <div>
                        <p className="font-medium text-gray-900">{platform.name}</p>
                        <p className="text-sm text-gray-600">{platform.platform} • Connected</p>
                        <p className="text-xs text-[#f59e3e]">{platform.username}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {publishingPlatforms.includes(platform.id) && (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      )}
                      {platform.selected && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlatformRemove(platform.id);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Content Style */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-[#f59e3e] text-xl">🎨</span>
            <CardTitle className="text-lg font-semibold text-gray-900">Content Style</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              contentStyle === 'professional' 
                ? 'border-2 border-[#f59e3e] bg-orange-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setContentStyle('professional')}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-700">💼</span>
              <span className="font-medium text-gray-900">Professional</span>
            </div>
            <p className="text-sm text-gray-600">Business & Career</p>
          </div>
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              contentStyle === 'social' 
                ? 'border-2 border-[#f59e3e] bg-orange-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setContentStyle('social')}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">🌟</span>
              <span className="font-medium text-gray-900">Social</span>
            </div>
            <p className="text-sm text-gray-600">Personal & Lifestyle</p>
          </div>
          <div 
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              contentStyle === 'promotional' 
                ? 'border-2 border-[#f59e3e] bg-orange-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setContentStyle('promotional')}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-pink-500">💎</span>
              <span className="font-medium text-gray-900">Promotional</span>
            </div>
            <p className="text-sm text-gray-600">Marketing & Sales</p>
          </div>
        </CardContent>
      </Card>

      {/* Write Content */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#f59e3e] text-xl">✍️</span>
              <CardTitle className="text-lg font-semibold text-gray-900">Write Your Content</CardTitle>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
              AI Assist
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title/Headline (Optional)
            </Label>
            <Input
              id="title"
              placeholder="Enter a compelling title..."
              className="mt-1"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
            />
            <Button variant="ghost" size="sm" className="text-gray-500 mt-1">
              <Wand2 className="w-3 h-3 mr-1" />
            </Button>
          </div>
          <div>
            <Label htmlFor="content" className="text-sm font-medium text-gray-700">
              Main Content
            </Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts, insights, or story..."
              className="mt-1 min-h-[120px]"
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="text-gray-600">
                <Wand2 className="w-3 h-3 mr-1" />
                Generate Content
              </Button>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Hash className="w-3 h-3 mr-1" />
                Add Hashtags
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Upload Section - Show only for image or carousel content types */}
      {(contentType === 'image' || contentType === 'carousel') && (
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#f59e3e] text-xl">🖼️</span>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {contentType === 'image' ? 'Upload Image' : 'Upload Images for Carousel'}
                </CardTitle>
              </div>
              {selectedImages.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearImages}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {contentType === 'image' 
                ? 'Upload a single image to accompany your post' 
                : 'Upload up to 10 images for your carousel post'
              }
            </p>
            {/* Debug info */}
            <p className="text-xs text-gray-400 mt-1">
              Debug: contentType = {contentType}, selectedImages = {selectedImages.length}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple={contentType === 'carousel'}
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload {contentType === 'image' ? 'an image' : 'images'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {contentType === 'image' 
                      ? 'JPEG, PNG, GIF, WebP (Max 5MB)' 
                      : 'JPEG, PNG, GIF, WebP (Max 10 images, 5MB each)'
                    }
                  </p>
                </div>
              </label>
            </div>

            {/* Image Previews */}
            {selectedImages.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">
                  Selected Images ({selectedImages.length}/{contentType === 'carousel' ? '10' : '1'})
                </h4>
                <div className={`grid gap-3 ${
                  contentType === 'carousel' 
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={imagePreviewUrls[index]}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <div className="mt-1 text-xs text-gray-500">
                        {image.name.length > 20 
                          ? image.name.substring(0, 20) + '...' 
                          : image.name
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Debug: Show current content type */}
      <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
        Current content type: {contentType} | Selected images: {selectedImages.length}
      </div>

      {/* Preview Section */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Preview</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          {selectedPlatforms.length === 0 ? (
            <>
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600">Select platforms to see how your content will look</p>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">Preview for selected platforms:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedPlatforms.map(platformId => {
                  const platform = connectedPlatforms.find(p => p.id === platformId);
                  if (!platform) return null;
                  
                  return (
                    <div key={platformId} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${platform.color}`}>
                          {platform.icon}
                        </div>
                        <span className="font-medium text-sm">{platform.name}</span>
                      </div>
                      <div className="text-left">
                        {contentTitle && (
                          <h3 className="font-semibold text-sm mb-2">{contentTitle}</h3>
                        )}
                        <p className="text-sm text-gray-600 line-clamp-3">{contentText || 'Your content will appear here...'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card/50">
          <TabsTrigger value="all">All Files ({uploadedContent.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="images">Images ({images.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <File className="w-5 h-5 text-primary" />
                All Content Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedContent.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{file.size}</span>
                          <Badge variant={file.status === 'uploaded' ? 'default' : 'secondary'}>
                            {file.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Document Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{file.size}</span>
                          <Badge variant={file.status === 'uploaded' ? 'default' : 'secondary'}>
                            {file.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                Image Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {images.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Image className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{file.size}</span>
                          <Badge variant={file.status === 'uploaded' ? 'default' : 'secondary'}>
                            {file.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Content Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="futuristic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold text-primary">{uploadedContent.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <File className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="futuristic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold text-primary">{documents.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="futuristic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Images</p>
                <p className="text-2xl font-bold text-primary">{images.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Image className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="futuristic-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold text-primary">12.4 MB</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadContentSection;