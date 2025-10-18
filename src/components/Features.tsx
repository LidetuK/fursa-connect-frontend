
import { Zap, Shield, Clock, Globe, Code, Smartphone, Brain, Rocket, TrendingUp, Users, Star, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import ModernAuthModal from './ModernAuthModal';

const featuresData = [
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Intelligence",
    description: "Advanced machine learning algorithms optimize your digital strategies and automate complex workflows.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Hyper-Scale Growth",
    description: "Exponential scaling solutions that adapt to your business growth with zero friction deployment.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Predictive Analytics",
    description: "Future-ready insights powered by quantum computing principles for data-driven decisions.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Neural Security",
    description: "Military-grade quantum encryption with self-healing security protocols and threat prediction.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Unified Ecosystem",
    description: "Seamless integration across all platforms with real-time collaboration and cloud synchronization.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Precision Targeting",
    description: "Laser-focused audience targeting using behavioral AI and psychographic pattern recognition.",
    color: "from-orange-500 to-orange-600"
  }
];

const Features = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  return (
    <section id="features" className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Futuristic Background Grid */}
      <div className="absolute inset-0 futuristic-grid opacity-20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-600/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30">
            <Star className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 font-semibold text-sm">Next-Generation Features</span>
          </div>
          
          <h2 className="section-title gradient-text mb-6">
            Why Choose Our Advanced Platform
          </h2>
          <p className="section-subtitle">
            Experience the future of digital business solutions with our cutting-edge technology stack 
            and revolutionary approach to enterprise growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card 
              key={index} 
              className="feature-card border-0 shadow-lg hover:shadow-2xl bg-slate-800/70 backdrop-blur-xl overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 relative">
                {/* Gradient Background Effect */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`}></div>
                
                <div className={`w-14 h-14 mb-6 flex items-center justify-center bg-gradient-to-r ${feature.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-600/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div 
            onClick={openAuthModal}
            className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <Zap className="w-8 h-8" />
            <div className="text-left">
              <div className="font-bold text-lg">Ready to Experience the Future?</div>
              <div className="text-orange-100 text-sm">Join thousands of forward-thinking businesses</div>
            </div>
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <ModernAuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        initialTab="signin"
      />
    </section>
  );
};

export default Features;
