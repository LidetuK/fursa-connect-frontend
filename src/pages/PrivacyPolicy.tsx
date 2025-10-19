
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-white mb-6">Last updated: January 15, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to FursaConnect. We are committed to protecting your privacy and providing you with a safe online experience. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="mb-4"><strong>Personal Information:</strong> We may collect personal information that you voluntarily provide to us when you register on our website, express interest in obtaining information about us or our products and services, or otherwise contact us.</p>
              <p className="mb-4">This personal information may include:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>User credentials (username, password)</li>
                <li>Billing information</li>
              </ul>
              <p className="mb-4"><strong>Information Automatically Collected:</strong> We automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity but may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser and device characteristics</li>
                <li>Operating system</li>
                <li>Language preferences</li>
                <li>Referring URLs</li>
                <li>Access times</li>
                <li>Information about how you use our website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you for customer service, updates, and marketing purposes</li>
                <li>Process transactions and send related information</li>
                <li>Find and prevent fraud</li>
                <li>For compliance purposes, including enforcing our legal rights or as may be required by applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Third-Party Integration</h2>
              <p className="mb-4">Our service allows you to connect your accounts from third-party services such as Facebook, Twitter, and other social media platforms. When you connect your account, we may collect information from these platforms in accordance with the authorization procedures determined by these services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4.1. Meta Platform Data Usage</h2>
              <p className="mb-4">When you connect your Facebook or Instagram accounts through our platform, we comply with Meta Platform Terms and Developer Policies:</p>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Platform Data Usage</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We do not sell, license, or purchase Platform Data</li>
                  <li>We do not use Platform Data for discrimination, eligibility determinations, or surveillance</li>
                  <li>We only request Platform Data necessary to improve your experience with our social media management services</li>
                  <li>We do not share Platform Data with third parties without your explicit consent</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Data Retention and Deletion</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Platform Data is retained only as long as necessary to provide our services</li>
                  <li>You can request deletion of your Platform Data at any time</li>
                  <li>We will delete Platform Data within 30 days of your request</li>
                  <li>Platform Data is automatically deleted when you disconnect your social media accounts</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Compliance Statement</h3>
                <p className="text-gray-700 mb-2">We certify that we follow Meta Platform Terms and Developer Policies, including:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Prohibited uses and processing of Platform Data (Section 3.a)</li>
                  <li>Restricted Platform Data requirements (Section 3.b)</li>
                  <li>Sharing Platform Data restrictions (Section 3.c)</li>
                  <li>Retention, deletion and accessibility of Platform Data (Section 3.d)</li>
                  <li>Privacy Policy compliance (Section 4)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="mb-4">We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p className="mb-4">We have implemented appropriate technical and organizational security measures designed to protect your personal information. However, please note that no transmission over the Internet or method of electronic storage is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Your Data Protection Rights</h2>
              <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, which may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to erase your personal information</li>
                <li>The right to restrict processing of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
              <p className="mb-4">We reserve the right to make changes to this Privacy Policy at any time. We will notify you about significant changes by updating the effective date at the top of this policy or by sending a notification to the email address we have on file for you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="mb-4">If you have questions or concerns about this Privacy Policy, please contact us at:</p>
              <p className="mb-4">
                Email: privacy@fursaconnect.com<br />
                Address: Westlands Business Centre, Nairobi, Kenya
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
