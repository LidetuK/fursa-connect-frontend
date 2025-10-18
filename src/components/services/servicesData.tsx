
import { 
  BarChart, 
  Share2, 
  Edit3, 
  MapPin
} from 'lucide-react';
import { ServiceType } from './types';

const services: ServiceType[] = [
  {
    id: 'sm-marketing',
    title: 'Social Media Connection',
    icon: <Share2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3", // Social media marketing image
    description: 'Connect and engage with your audience across all social media platforms to build your brand presence.',
    details: [
      'Social Media Strategy Development',
      'Platform Setup & Optimization',
      'Community Management',
      'Social Media Advertising',
      'Influencer Partnerships',
      'Cross-Platform Integration'
    ]
  },
  {
    id: 'content',
    title: 'Content Creation using AI',
    icon: <Edit3 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3", // Content creation image
    description: 'Leverage AI-powered tools to create compelling, engaging content that drives results and saves time.',
    details: [
      'AI-Generated Blog Posts',
      'Social Media Content Creation',
      'Automated Copywriting',
      'Content Strategy Planning',
      'SEO-Optimized Content',
      'Multi-Format Content Production'
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    icon: <BarChart className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3", // Analytics dashboard image
    description: 'Make data-driven decisions with comprehensive analytics and clear reporting across all your digital channels.',
    details: [
      'Google Analytics Setup & Tracking',
      'Social Media Analytics',
      'Custom Dashboard Creation',
      'Performance Reporting',
      'ROI Measurement',
      'Data Visualization'
    ]
  },
  {
    id: 'google-business',
    title: 'Google Business Profile',
    icon: <MapPin className="w-6 h-6" />,
    image: "https://static.vecteezy.com/system/resources/previews/028/301/324/mp4/two-owners-of-promising-start-up-company-tell-good-news-to-diverse-team-of-investors-workers-colleagues-group-of-multi-ethnic-business-professionals-celebrate-successful-product-release-free-video.mp4", // Business team celebration video
    description: 'Optimize your local presence and attract more customers with professional Google Business Profile management.',
    details: [
      'Profile Setup & Optimization',
      'Local SEO Enhancement',
      'Review Management',
      'Business Information Updates',
      'Photo & Video Management',
      'Local Search Visibility'
    ]
  }
];

export default services;
