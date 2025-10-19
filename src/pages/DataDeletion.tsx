import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DataDeletion = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Facebook Data Deletion</h1>
          <p className="text-white mb-6">Last updated: January 15, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Delete Your Facebook Data</h2>
              <p className="mb-4">
                If you have used Facebook to log in to our application, you can request the deletion of your data through the following methods:
              </p>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Option 1: Through Facebook</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Go to your Facebook Settings</li>
                  <li>Click on "Apps and Websites"</li>
                  <li>Find our app in the list</li>
                  <li>Click "Remove" to delete your data</li>
                </ol>
              </div>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Option 2: Direct Request</h3>
                <p className="mb-2 text-gray-700">Send an email to <a href="mailto:privacy@fursaconnect.com" className="text-[#F76F14] font-medium">privacy@fursaconnect.com</a> with:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Subject: "Facebook Data Deletion Request"</li>
                  <li>Your Facebook ID or email</li>
                  <li>Your full name</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What We Delete</h2>
              <p className="mb-4">When you request data deletion, we will remove:</p>
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Your Facebook profile information</li>
                  <li>Any data collected through Facebook Login</li>
                  <li>Your activity history</li>
                  <li>Any stored preferences</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
              <p className="mb-4">
                We process all data deletion requests within 30 days. You will receive a confirmation email once your data has been deleted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Meta Platform Terms Compliance</h2>
              <p className="mb-4">
                We comply with Meta Platform Terms and Developer Policies regarding data handling:
              </p>
              
              <div className="bg-white border border-gray-200 p-6 rounded-lg mb-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Platform Data Usage</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We do not sell, license, or purchase Platform Data</li>
                  <li>We do not use Platform Data for discrimination or surveillance</li>
                  <li>We only use Platform Data to improve your social media management experience</li>
                  <li>We do not share Platform Data with third parties without your consent</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Compliance Certification</h3>
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
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                For any questions about data deletion, please contact us at:
              </p>
              <p>
                Email: privacy@fursaconnect.com<br />
                Phone: +254 700 123 456
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DataDeletion;
