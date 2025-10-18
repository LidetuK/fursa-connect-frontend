import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Play,
  Eye,
  ThumbsUp,
  MessageCircle,
  Calendar,
  RefreshCw,
  ExternalLink,
  Youtube,
  Search,
  ArrowLeft,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  duration?: string;
  url: string;
  channelTitle: string;
}

interface YouTubePost {
  id: string;
  title: string;
  content: string;
  status: 'published' | 'scheduled' | 'draft' | 'failed';
  publishedAt: string;
  platform: 'youtube';
  errorMessage?: string;
}

const YouTubeVideosSection = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [posts, setPosts] = useState<YouTubePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'videos' | 'posts'>('videos');
  const [activeFilter, setActiveFilter] = useState('all');

  const fetchYouTubeData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching YouTube data...');
      const response = await fetch('https://fursaconnet-production.up.railway.app/auth/youtube/channel', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('YouTube API response:', data);
      
      if (data.error) {
        setError(data.error);
      } else {
        setChannel(data.channel);
        setVideos(data.videos || []);
        console.log('Videos set:', data.videos?.length || 0);
      }
    } catch (err: any) {
      console.error('Failed to fetch YouTube data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchYouTubePosts = async () => {
    try {
      const response = await fetch('https://fursaconnet-production.up.railway.app/posts?platform=youtube', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      } else {
        // Fallback to mock data if API fails
        setPosts([
          {
            id: '1',
            title: 'Sample YouTube Post',
            content: 'This is a sample YouTube post content',
            status: 'published',
            publishedAt: '2025-01-22T10:00:00Z',
            platform: 'youtube'
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch YouTube posts:', error);
      // Fallback to mock data
      setPosts([
        {
          id: '1',
          title: 'Sample YouTube Post',
          content: 'This is a sample YouTube post content',
          status: 'published',
          publishedAt: '2025-01-22T10:00:00Z',
          platform: 'youtube'
        }
      ]);
    }
  };

  // Fetch YouTube data on component mount
  useEffect(() => {
    fetchYouTubeData();
    fetchYouTubePosts();
  }, []);

  // Listen for Google OAuth completion event
  useEffect(() => {
    const handleGoogleOAuthComplete = (event: CustomEvent) => {
      console.log('Google OAuth completed, refreshing YouTube videos:', event.detail);
      if (event.detail.status === 'connected') {
        fetchYouTubeData();
        fetchYouTubePosts();
      }
    };

    window.addEventListener('googleOAuthComplete', handleGoogleOAuthComplete as EventListener);

    return () => {
      window.removeEventListener('googleOAuthComplete', handleGoogleOAuthComplete as EventListener);
    };
  }, []);

  const formatNumber = (num: number | string | undefined) => {
    // Handle undefined, null, or invalid values
    if (num === undefined || num === null || num === '') return '0';
    
    // Convert to number if it's a string
    const numberValue = typeof num === 'string' ? parseInt(num, 10) : num;
    
    // Check if it's a valid number
    if (isNaN(numberValue)) return '0';
    
    // Format large numbers
    if (numberValue >= 1000000) {
      return (numberValue / 1000000).toFixed(1) + 'M';
    } else if (numberValue >= 1000) {
      return (numberValue / 1000).toFixed(1) + 'K';
    }
    
    return numberValue.toString();
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
      return 'Invalid Date';
    }
  };

  const formatDuration = (duration: string) => {
    // YouTube duration format: PT4M13S -> 4:13
    try {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (match) {
        const hours = parseInt(match[1] || '0');
        const minutes = parseInt(match[2] || '0');
        const seconds = parseInt(match[3] || '0');
        
        if (hours > 0) {
          return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
      }
      return '0:00';
    } catch {
      return '0:00';
    }
  };

  const getFilteredVideos = () => {
    if (!searchQuery) return videos;
    return videos.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredPosts = () => {
    let filtered = posts;
    
    if (activeFilter !== 'all') {
      filtered = posts.filter(post => post.status === activeFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getFilterCount = (filter: string) => {
    if (filter === 'all') return posts.length;
    return posts.filter(post => post.status === filter).length;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
    return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Published
            </div>
        );
      case 'scheduled':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </div>
        );
      case 'draft':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FileText className="w-3 h-3 mr-1" />
            Draft
      </div>
    );
      case 'failed':
    return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-300 text-gray-700">
            {status}
      </div>
    );
  }
  };

  const handleRefresh = () => {
    fetchYouTubeData();
    fetchYouTubePosts();
  };

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'published', label: 'Published' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'draft', label: 'Drafts' },
    { id: 'failed', label: 'Failed' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.history.back()}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <Youtube className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">YouTube Videos</h1>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            Unsolved Mysteries
          </div>
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

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
        />
      </div>

      {/* Channel Summary */}
      {channel && (
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {channel.snippet?.thumbnails?.default?.url && (
                <img 
                  src={channel.snippet.thumbnails.default.url} 
                  alt="Channel" 
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{channel.snippet?.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{channel.snippet?.description}</p>
                <div className="flex gap-6 mt-3 text-sm text-gray-500">
                  <span>Subscribers: {formatNumber(channel.statistics?.subscriberCount)}</span>
                  <span>Videos: {formatNumber(channel.statistics?.videoCount)}</span>
                  <span>Views: {formatNumber(channel.statistics?.viewCount)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'videos'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Recent Videos ({videos.length})
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'posts'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Posts
        </button>
      </div>

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          {/* Posts Filter Tabs */}
          <div className="flex flex-wrap gap-1">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-red-100 text-red-700 border-b-2 border-red-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter.label} ({getFilterCount(filter.id)})
              </button>
            ))}
          </div>

          {/* Posts List */}
      <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
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
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <Youtube className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{post.title}</p>
                          <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
                        </div>
                      </div>
                      {getStatusBadge(post.status)}
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-900">{post.content}</p>
                      {post.errorMessage && (
                        <p className="text-red-500 text-sm mt-2">Error: {post.errorMessage}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading videos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-500">{error}</p>
            </div>
          ) : getFilteredVideos().length === 0 ? (
            <div className="text-center py-8">
              <Youtube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No videos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredVideos().map((video) => (
              <Card key={video.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Video Thumbnail */}
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                      {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {formatDuration(video.duration)}
                    </div>
                      )}
                  </div>
                  
                  {/* Video Info */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                      
                      {/* Engagement Metrics */}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                          {formatNumber(video.viewCount)}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                          {formatNumber(video.likeCount)}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                          {formatNumber(video.commentCount)}
                        </div>
                    </div>
                    
                      {/* Published Date */}
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(video.publishedAt)}
                    </div>
                    
                      {/* Watch Button */}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open(video.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Watch on YouTube
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default YouTubeVideosSection; 