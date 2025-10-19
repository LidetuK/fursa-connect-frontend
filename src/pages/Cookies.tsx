import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-gray-600 mb-6">Last updated: May 8, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">FursaConnect uses cookies for several purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be disabled</li>
                <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website</li>
                <li><strong>Functional Cookies:</strong> These enable enhanced functionality and personalization</li>
                <li><strong>Marketing Cookies:</strong> These are used to track visitors across websites for advertising purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Strictly Necessary Cookies</h3>
                <p className="mb-2">These cookies are essential for the website to function and cannot be switched off.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Authentication cookies</li>
                  <li>Security cookies</li>
                  <li>Load balancing cookies</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Performance Cookies</h3>
                <p className="mb-2">These cookies collect information about how you use our website.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Google Analytics cookies</li>
                  <li>Page load time cookies</li>
                  <li>Error tracking cookies</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Functionality Cookies</h3>
                <p className="mb-2">These cookies enable enhanced functionality and personalization.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Language preference cookies</li>
                  <li>Theme preference cookies</li>
                  <li>User interface customization cookies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
              <p className="mb-4">We may use third-party services that set their own cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media Platforms:</strong> For social login and sharing functionality</li>
                <li><strong>Payment Processors:</strong> For secure payment processing</li>
                <li><strong>Marketing Tools:</strong> For advertising and marketing campaigns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Managing Your Cookie Preferences</h2>
              <p className="mb-4">You can control and manage cookies in several ways:</p>
              
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
                <p className="mb-2">Most browsers allow you to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>View and delete cookies</li>
                  <li>Block cookies from specific sites</li>
                  <li>Block third-party cookies</li>
                  <li>Clear all cookies</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Cookie Consent</h3>
                <p className="mb-2">When you first visit our website, you can:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookie Retention</h2>
              <p className="mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period (usually 30 days to 2 years)</li>
                <li><strong>Authentication Cookies:</strong> Typically expire after 30 days of inactivity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <p className="mb-4">
                Email: privacy@fursaconnect.com<br />
                Address: 123 FursaConnect Way, Digital City, DC 12345
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cookies;
