
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import HashtagResearch from './HashtagResearch';
import PackageFeatures from './PackageFeatures';
import AnalyticsSection from './AnalyticsSection';
import WebDevelopmentSection from './WebDevelopmentSection';
import SEOSection from './SEOSection';
import SocialMediaSection from './SocialMediaSection';
import EmailMarketingSection from './EmailMarketingSection';
import ContentCreationSection from './ContentCreationSection';
// PhotoVideoSection removed due to secrets - will be recreated later
import ExpertConsultationSection from './ExpertConsultationSection';
import UserProfile from './UserProfile';
import { GoogleBusinessPerformance } from './GoogleBusinessPerformance';
import teamData from '@/components/team/teamData';
import { GoogleAdsConnectButton } from '../google-ads/GoogleAdsConnectButton';
import { YouTubePostSection } from './YouTubePostSection';
import SocialMediaPostSection from './social-media/SocialMediaPostSection';
import UploadVideosSection from './UploadVideosSection';
import UploadContentSection from './UploadContentSection';
import ConnectSocialMediaSection from './ConnectSocialMediaSection';
import MetaAdsSection from './MetaAdsSection';
import PostsSection from './PostsSection';
import GoogleBusinessSection from './GoogleBusinessSection';

interface DashboardContentProps {
  activeSection: string;
  packageType: string;
}

const DashboardContent = ({ activeSection, packageType }: DashboardContentProps) => {
  const { user } = useAuth();

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <UserProfile />;
      case 'hashtags':
        return <HashtagResearch />;
      case 'web-dev':
        return <WebDevelopmentSection packageType={packageType} />;
      case 'seo':
        return <SEOSection packageType={packageType} />;
      case 'social':
        return <SocialMediaSection />;
      case 'email':
        return <EmailMarketingSection packageType={packageType} />;
      case 'content':
        return <ContentCreationSection packageType={packageType} />;
      case 'photo-video':
        return (
          <div className="futuristic-card p-8 text-center">
            <h2 className="text-2xl font-bold gradient-text mb-4">Photo & Video Services</h2>
            <p className="text-muted-foreground">Coming soon - Photo and video generation services</p>
          </div>
        );
      case 'consultation':
        return <ExpertConsultationSection packageType={packageType} />;
      case 'google-business':
        return <GoogleBusinessSection />;
      case 'posts':
        return <PostsSection />;
      case 'upload-videos':
        return <UploadVideosSection />;
      case 'upload-content':
        return <UploadContentSection />;
      case 'connect-social-media':
        return <ConnectSocialMediaSection />;
      case 'google-ads':
        return (
          <div className="futuristic-card p-8 text-center">
            <h2 className="text-2xl font-bold gradient-text mb-4">Google Ads Management</h2>
            <p className="text-muted-foreground">Coming soon - Advanced Google Ads integration</p>
          </div>
        );
      case 'meta-ads':
        return <MetaAdsSection />;
      case 'dashboard':
        return (
          <>
            <AnalyticsSection packageType={packageType} />
            <div className="mt-8">
              <PackageFeatures packageType={packageType} />
            </div>
          </>
        );
      default:
        return (
          <>
            <AnalyticsSection packageType={packageType} />
            <div className="mt-8">
              <PackageFeatures packageType={packageType} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 futuristic-grid">
      <div 
        className="glass-card p-1 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary))/20, hsl(var(--primary))/5)',
          boxShadow: '0 8px 32px hsl(var(--primary))/10'
        }}
      >
        <div className="bg-card/90 backdrop-blur-xl rounded-2xl p-6">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
