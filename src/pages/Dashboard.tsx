
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardContent from '@/components/dashboard/DashboardContent';
import AIAssistant from '@/components/AIAssistant/AIAssistant';
import { dashboardServices } from '@/components/dashboard/DashboardServices';
import { useDashboardState } from '@/hooks/useDashboardState';

const Dashboard = () => {
  const { user, userType } = useAuth();
  const { packageType, activeSection, setActiveSection } = useDashboardState();
  const navigate = useNavigate();

  // Debug authentication status
  console.log('Dashboard rendered - Auth status:', {
    user: user ? 'Logged in' : 'Not logged in',
    userType,
    localStorage: {
      token: localStorage.getItem('token') ? 'Present' : 'Missing',
      user: localStorage.getItem('user') ? 'Present' : 'Missing'
    },
    cookies: document.cookie
  });

  // Check for OAuth success parameters and refresh the page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const youtubeStatus = urlParams.get('youtube');
    const twitterStatus = urlParams.get('twitter');
    const googleStatus = urlParams.get('google');
    const linkedinStatus = urlParams.get('linkedin');
    const token = urlParams.get('token');
    
    // Handle token from OAuth callback
    if (token) {
      console.log('Token received from OAuth callback, storing in localStorage');
      localStorage.setItem('token', token);
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Force a page refresh to update authentication state
      window.location.reload();
      return;
    }
    
    if (youtubeStatus === 'connected' || youtubeStatus === 'error') {
      console.log(`YouTube OAuth ${youtubeStatus}, refreshing page to update status`);
      // Clean up the URL first
      window.history.replaceState({}, document.title, window.location.pathname);
      // Force a page refresh to update all components
      window.location.reload();
    }
    
    if (twitterStatus === 'connected' || twitterStatus === 'error') {
      console.log(`Twitter OAuth ${twitterStatus}, refreshing page to update status`);
      // Clean up the URL first
      window.history.replaceState({}, document.title, window.location.pathname);
      // Force a page refresh to update all components
      window.location.reload();
    }
    
    if (googleStatus === 'connected' || googleStatus === 'error') {
      console.log(`Google OAuth ${googleStatus}, updating connection status without full page refresh`);
      // Clean up the URL first
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Instead of full page refresh, trigger a custom event to update connection status
      const event = new CustomEvent('googleOAuthComplete', { 
        detail: { status: googleStatus } 
      });
      console.log('Dispatching googleOAuthComplete event:', event.detail);
      window.dispatchEvent(event);
      
      // Also trigger a specific event for Google Business
      const googleBusinessEvent = new CustomEvent('googleBusinessOAuthComplete', { 
        detail: { status: googleStatus } 
      });
      console.log('Dispatching googleBusinessOAuthComplete event:', googleBusinessEvent.detail);
      window.dispatchEvent(googleBusinessEvent);
      
      // Show a toast notification
      if (googleStatus === 'connected') {
        // Simple alert for now - you can replace with a proper toast system
        alert('Google Business connected successfully!');
        console.log('Google Business connected successfully!');
      } else {
        alert('Google Business connection failed. Please try again.');
        console.log('Google Business connection failed');
      }
    }
    
    if (linkedinStatus === 'connected' || linkedinStatus === 'error') {
      console.log(`LinkedIn OAuth ${linkedinStatus}, refreshing page to update status`);
      // Clean up the URL first
      window.history.replaceState({}, document.title, window.location.pathname);
      // Force a page refresh to update all components
      window.location.reload();
    }
  }, []);

  // Quick fix: Sync Google access token from backend to database
  useEffect(() => {
    if (user) {
      fetch('https://fursaconnet-production.up.railway.app/auth/google/get-token', {
        method: 'GET',
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => {
          if (data.googleAccessToken) {
            console.log('Google access token available from backend');
          }
        })
        .catch(error => {
          console.error('Failed to fetch Google token:', error);
        });
    }
  }, [user]);
  
  // If not authenticated, redirect to auth page
  if (!user) {
    return <Navigate to="/signin" />;
  }

  // Redirect admin users to admin dashboard
  if (userType === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }

  // Regular users can access this dashboard
  return (
    <div className="flex h-screen bg-background futuristic-grid">
      {/* Sidebar */}
      <DashboardSidebar 
        services={dashboardServices} 
        packageType="enterprise" // Temporarily set to enterprise to give all users access to all features
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader packageType={packageType || "enterprise"} />
        
        <main className="flex-1 overflow-y-auto">
          <DashboardContent 
            activeSection={activeSection}
            packageType="enterprise" // Temporarily set to enterprise to give all users access to all features
          />
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Dashboard;
