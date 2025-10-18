import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Eye, 
  Phone, 
  MapPin, 
  Star, 
  Users, 
  TrendingUp, 
  Calendar,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface GoogleBusinessData {
  accountName: string;
  businessName: string;
  address: string;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  views: {
    total: number;
    search: number;
    maps: number;
    photos: number;
  };
  insights: {
    calls: number;
    directionRequests: number;
    websiteClicks: number;
  };
  posts: Array<{
    id: string;
    title: string;
    content: string;
    publishedAt: string;
    views: number;
    clicks: number;
  }>;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const GoogleBusinessSection = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [businessData, setBusinessData] = useState<GoogleBusinessData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check connection status on component mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  // Listen for Google OAuth completion event
  useEffect(() => {
    const handleGoogleOAuthComplete = (event: CustomEvent) => {
      console.log('Google OAuth completed, refreshing Google Business status:', event.detail);
      if (event.detail.status === 'connected') {
        checkConnectionStatus();
      }
    };

    const handleGoogleBusinessOAuthComplete = (event: CustomEvent) => {
      console.log('Google Business OAuth completed, refreshing status:', event.detail);
      if (event.detail.status === 'connected') {
        // Add a small delay to ensure backend has processed the connection
        setTimeout(() => {
          checkConnectionStatus();
        }, 2000);
      }
    };

    window.addEventListener('googleOAuthComplete', handleGoogleOAuthComplete as EventListener);
    window.addEventListener('googleBusinessOAuthComplete', handleGoogleBusinessOAuthComplete as EventListener);

    return () => {
      window.removeEventListener('googleOAuthComplete', handleGoogleOAuthComplete as EventListener);
      window.removeEventListener('googleBusinessOAuthComplete', handleGoogleBusinessOAuthComplete as EventListener);
    };
  }, []);

  const checkConnectionStatus = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Checking Google Business connection status...');
      
      // Check connection status from backend
      const statusResponse = await fetch('https://fursaconnet-production.up.railway.app/auth/google-business/connection-status', {
        credentials: 'include',
      });
      
      console.log('Connection status response:', statusResponse.status);
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        console.log('Google Business connection status:', statusData);
        
        if (statusData.connected) {
          console.log('Google Business is connected, fetching business data...');
          setIsConnected(true);
          await fetchBusinessData();
        } else {
          console.log('Google Business is not connected');
          setIsConnected(false);
          setBusinessData(null);
        }
      } else {
        const errorText = await statusResponse.text();
        console.error('Failed to check Google Business connection status:', statusResponse.status, errorText);
        setError(`Failed to check connection status: ${statusResponse.status}`);
        setIsConnected(false);
        setBusinessData(null);
      }
    } catch (err) {
      console.error('Error checking connection status:', err);
      setError('Failed to check connection status');
      setIsConnected(false);
      setBusinessData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBusinessData = async () => {
    try {
      const response = await fetch('https://fursaconnet-production.up.railway.app/auth/google-business/profile', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBusinessData(data);
    } catch (err: any) {
      console.error('Failed to fetch business data:', err);
      setError(err.message);
    }
  };

  const handleConnect = async () => {
    try {
      console.log('Initiating Google Business connection...');
      
      // Include user ID in state parameter for proper tracking
      const state = encodeURIComponent(JSON.stringify({ 
        userId: user?.id || user?.sub,
        platform: 'google-business',
        timestamp: Date.now()
      }));
      
      // Redirect to Google OAuth with state parameter
      const oauthUrl = `https://fursaconnet-production.up.railway.app/auth/google?state=${state}`;
      console.log('Redirecting to Google OAuth:', oauthUrl);
      window.location.href = oauthUrl;
    } catch (err) {
      console.error('Error connecting to Google:', err);
      setError('Failed to connect to Google');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Google Business</h1>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f59e3e] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking connection status...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Google Business</h1>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-[#f59e3e] rounded-lg flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Connect Google Business</h2>
          <p className="text-gray-600 mb-6">
            Connect your Google Business Profile to manage your business information and view performance insights
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Manage business information
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              View customer insights and analytics
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Monitor reviews and ratings
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Track search performance
            </div>
          </div>
          
          <Button 
            onClick={handleConnect}
            className="w-full bg-[#F97415] hover:bg-[#E65A0A] text-white font-medium py-3 px-4 rounded-lg mb-3"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Connect Google Business Account
          </Button>
          
          <Button 
            variant="outline"
            onClick={checkConnectionStatus}
            className="w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Check Again
          </Button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Google Business</h1>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button 
            onClick={checkConnectionStatus}
            className="w-full bg-[#f59e3e] hover:bg-[#e8913a] text-white font-medium py-3 px-4 rounded-lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Google Business</h1>
          <p className="text-gray-600">Manage your business profile and view performance insights</p>
        </div>
        <Button 
          variant="outline"
          onClick={fetchBusinessData}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {businessData ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Business Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Business Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{businessData.businessName}</h3>
                  <p className="text-gray-600">{businessData.accountName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{businessData.rating}</span>
                  <span className="text-gray-600">({businessData.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{businessData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{businessData.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Views</span>
                  <span className="font-semibold">{formatNumber(businessData.views.total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Search Views</span>
                  <span className="font-semibold">{formatNumber(businessData.views.search)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Maps Views</span>
                  <span className="font-semibold">{formatNumber(businessData.views.maps)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Photo Views</span>
                  <span className="font-semibold">{formatNumber(businessData.views.photos)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customer Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Phone Calls</span>
                  <span className="font-semibold">{formatNumber(businessData.insights.calls)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Direction Requests</span>
                  <span className="font-semibold">{formatNumber(businessData.insights.directionRequests)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Website Clicks</span>
                  <span className="font-semibold">{formatNumber(businessData.insights.websiteClicks)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessData.posts.slice(0, 3).map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{post.title}</h4>
                      <span className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{formatNumber(post.views)} views</span>
                      <span>{formatNumber(post.clicks)} clicks</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessData.reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{review.author}</p>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-8">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No business data available</p>
        </div>
      )}
    </div>
  );
};

export default GoogleBusinessSection; 