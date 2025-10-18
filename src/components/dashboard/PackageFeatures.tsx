
import { Check } from 'lucide-react';
import UpgradeSection from './UpgradeSection';

interface PackageFeaturesProps {
  packageType: string;
}

const PackageFeatures = ({ packageType }: PackageFeaturesProps) => {
  // Analytics tracking features and benefits
  const analyticsFeatures = [
    'Custom Tracking Script Generation',
    'Real-time Website Analytics Dashboard',
    'Page View & Visitor Tracking',
    'User Engagement Metrics (Scroll Depth, Time on Page)',
    'Conversion Event Tracking (Button Clicks, Form Submissions)',
    'Traffic Source Analysis',
    'Bounce Rate & Session Duration Analytics',
    'Return Visitor Tracking',
    'Click-through Rate Monitoring',
    'Performance Reports & Insights'
  ];
  
  // Get package name for display
  const packageName = 'Website Analytics Suite';
  
  // Get package description
  const packageDescription = 'Complete website tracking and analytics solution';

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{packageName}</h2>
          <p className="mt-1 text-sm text-gray-600">{packageDescription}</p>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">How to Get Started:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 mb-4">
              <li>Click "Generate Tracking Script" button above</li>
              <li>Enter your website URL and tracking name</li>
              <li>Copy the generated script and paste it into your website's &lt;head&gt; section</li>
              <li>Visit your website to start collecting data</li>
              <li>View real-time analytics in this dashboard</li>
            </ol>
          </div>
          
          <h3 className="text-lg font-medium text-gray-800 mb-3">What You'll Get:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-skilllink-green">
                  <Check className="h-5 w-5" />
                </div>
                <p className="ml-3 text-sm text-gray-700">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageFeatures;
