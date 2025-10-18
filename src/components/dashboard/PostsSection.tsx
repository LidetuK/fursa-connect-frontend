import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Search, 
  MoreVertical, 
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  Twitter,
  Linkedin,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import YouTubeVideosSection from './YouTubeVideosSection';

interface Post {
  id: string;
  content: string;
  platform: 'twitter' | 'linkedin' | 'telegram' | 'facebook' | 'instagram';
  status: 'published' | 'scheduled' | 'draft' | 'failed';
  publishedAt: string;
  author?: string;
  errorMessage?: string;
  metadata?: any;
}

const PostsSection = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://fursaconnet-production.up.railway.app/posts', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      // Fallback to mock data if API fails
      setPosts([
        {
          id: '1',
          content: 'thankyou\nthankyou',
          platform: 'twitter',
          status: 'published',
          publishedAt: 'Jun 15, 2025, 11:06 PM',
          author: 'X (Twitter)'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Listen for Google OAuth completion event
  useEffect(() => {
    const handleGoogleOAuthComplete = (event: CustomEvent) => {
      console.log('Google OAuth completed, refreshing posts:', event.detail);
      if (event.detail.status === 'connected') {
        fetchPosts();
      }
    };

    window.addEventListener('googleOAuthComplete', handleGoogleOAuthComplete as EventListener);

    return () => {
      window.removeEventListener('googleOAuthComplete', handleGoogleOAuthComplete as EventListener);
    };
  }, []);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="w-4 h-4 text-white" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-white" />;
      case 'telegram':
        return <MessageCircle className="w-4 h-4 text-white" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-white" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-white" />;
      default:
        return <FileText className="w-4 h-4 text-white" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'bg-black';
      case 'linkedin':
        return 'bg-blue-600';
      case 'telegram':
        return 'bg-blue-500';
      case 'facebook':
        return 'bg-blue-500';
      case 'instagram':
        return 'bg-gradient-to-r from-purple-400 to-pink-400';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
            <CheckCircle className="w-3 h-3" />
            Published
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-500 text-white rounded-full">
            <FileText className="w-3 h-3" />
            Draft
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'published', label: 'Published' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'draft', label: 'Drafts' },
    { id: 'failed', label: 'Failed' },
    { id: 'youtube', label: 'YouTube Videos' }
  ];

  const getFilteredPosts = () => {
    let filtered = posts;
    
    if (activeFilter !== 'all' && activeFilter !== 'youtube') {
      filtered = posts.filter(post => post.status === activeFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.platform.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getFilterCount = (filter: string) => {
    if (filter === 'youtube') return '';
    if (filter === 'all') return posts.length;
    return posts.filter(post => post.status === filter).length;
  };

  const handleRefresh = () => {
    fetchPosts();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // If YouTube tab is active, show YouTube videos
  if (activeFilter === 'youtube') {
    return <YouTubeVideosSection />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#f59e3e] rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={loading}
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Filter Tabs and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === filter.id
                  ? 'bg-gray-200 text-gray-900 border-b-2 border-[#f59e3e]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {filter.id === 'youtube' ? (
                <>
                  <Youtube className="w-4 h-4 inline mr-1" />
                  {filter.label}
                </>
              ) : (
                `${filter.label} (${getFilterCount(filter.id)})`
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64 border-gray-300 focus:border-[#f59e3e] focus:ring-[#f59e3e]"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f59e3e] mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading posts...</p>
          </div>
        ) : getFilteredPosts().length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No posts found</p>
          </div>
        ) : (
          getFilteredPosts().map((post) => (
            <Card key={post.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getPlatformColor(post.platform)}`}>
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {post.platform === 'twitter' ? 'X (Twitter)' : post.platform}
                      </p>
                      <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(post.status)}
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-900 whitespace-pre-line">{post.content}</p>
                  {post.errorMessage && (
                    <p className="text-red-500 text-sm mt-2">Error: {post.errorMessage}</p>
                  )}
                </div>

                {/* Post Attribution (nested) */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getPlatformColor(post.platform)}`}>
                    {getPlatformIcon(post.platform)}
                  </div>
                  <span className="capitalize">
                    {post.platform === 'twitter' ? 'X (Twitter)' : post.platform}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsSection; 