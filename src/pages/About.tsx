import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About FursaConnect</h1>
          <p className="text-gray-600 mb-6">Connecting opportunities through social media</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="mb-4">
                At FursaConnect, we believe that every business deserves the opportunity to thrive in the digital world. Our mission is to democratize social media management by providing powerful, easy-to-use tools that help businesses of all sizes connect with their audiences and grow their online presence.
              </p>
              <p>
                We're committed to making social media management accessible, efficient, and effective for everyone, from small startups to large enterprises.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
              <p className="mb-4">FursaConnect is a comprehensive social media management platform that offers:</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Social Media Management</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Multi-platform posting</li>
                    <li>Content scheduling</li>
                    <li>Social media analytics</li>
                    <li>Engagement tracking</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>AI-powered content suggestions</li>
                    <li>Visual content tools</li>
                    <li>Brand consistency tools</li>
                    <li>Content calendar management</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Analytics & Insights</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Performance metrics</li>
                    <li>Audience insights</li>
                    <li>ROI tracking</li>
                    <li>Competitive analysis</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">Team Collaboration</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Multi-user access</li>
                    <li>Approval workflows</li>
                    <li>Role-based permissions</li>
                    <li>Team communication tools</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4">
                FursaConnect was born from a simple observation: while social media has become essential for business success, managing multiple platforms effectively remains a challenge for most organizations.
              </p>
              <p className="mb-4">
                Our founders, experienced in both technology and marketing, recognized the need for a unified platform that could streamline social media management while maintaining the authenticity and engagement that makes social media marketing effective.
              </p>
              <p>
                Today, FursaConnect serves thousands of businesses worldwide, helping them build stronger connections with their audiences and achieve their marketing goals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Focus</h3>
                  <p>We stay focused on what matters most: helping our clients succeed in their social media efforts.</p>
                </div>

                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p>We continuously innovate to provide cutting-edge tools and features that keep our clients ahead of the curve.</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Partnership</h3>
                  <p>We believe in building lasting partnerships with our clients, supporting them every step of the way.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Why Choose FursaConnect?</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>User-Friendly Interface:</strong> Intuitive design that makes social media management simple and enjoyable</li>
                  <li><strong>Comprehensive Platform Support:</strong> Manage Facebook, Instagram, Twitter, LinkedIn, and more from one dashboard</li>
                  <li><strong>Advanced Analytics:</strong> Deep insights into your social media performance with actionable recommendations</li>
                  <li><strong>Scalable Solutions:</strong> Whether you're a solo entrepreneur or a large enterprise, we have solutions that grow with you</li>
                  <li><strong>24/7 Support:</strong> Our dedicated support team is always here to help you succeed</li>
                  <li><strong>Security & Privacy:</strong> Enterprise-grade security to protect your data and your clients' information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
              <p className="mb-6">
                Ready to transform your social media management? Join thousands of businesses that trust FursaConnect to help them connect with their audiences and grow their online presence.
              </p>
              <div className="text-center">
                <a 
                  href="/signin" 
                  className="inline-block bg-[#F76F14] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#E55A0A] transition-colors"
                >
                  Start Your Free Trial
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                Have questions about FursaConnect? We'd love to hear from you!
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">General Inquiries</h3>
                  <p className="mb-2">Email: info@fursaconnect.com</p>
                  <p className="mb-2">Phone: (555) 123-4567</p>
                  <p>Address: 123 FursaConnect Way, Digital City, DC 12345</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Support</h3>
                  <p className="mb-2">Email: support@fursaconnect.com</p>
                  <p className="mb-2">Help Center: Available 24/7</p>
                  <p>Live Chat: Available during business hours</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
