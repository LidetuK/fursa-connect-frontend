
import { Check, Sparkles, Shield, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="https://res.cloudinary.com/dklph982o/image/upload/v1760290106/globe_hnei1o.webp" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FB8A32]/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E67A2A]/10 rounded-full blur-3xl animate-bounce-subtle"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#FB8A32]/10 to-[#E67A2A]/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="max-w-xl mx-auto lg:mx-0">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-[#FB8A32]/20 to-[#E67A2A]/20 border border-[#FB8A32]/30 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#FB8A32]" />
                <span className="text-[#FB8A32] font-semibold text-sm">Premium Business Solutions</span>
                <div className="w-2 h-2 bg-[#FB8A32] rounded-full animate-pulse"></div>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#FB8A32] via-[#E67A2A] to-[#D16A1A] bg-clip-text text-transparent">
                  Premium Business
                </span>
                <br />
                <span className="text-white">Solutions</span>{' '}
                <span className="text-gray-300">for</span>
                <br />
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Enterprise Growth
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Unlock exclusive access to top-tier professionals, priority support, 
                and advanced project management tools designed for serious businesses.
              </p>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-orange-500/20 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-white">Priority Support</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-orange-500/20 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-white">Dedicated Account Manager</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-orange-500/20 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-white">Advanced Analytics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
            <div className="relative">
              {/* Stats Cards - Positioned above the image but maintaining their relative positions */}
              <div className="absolute -top-6 -right-6 bg-slate-800/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-orange-500/20 animate-fade-in z-20" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">98%</div>
                    <div className="text-sm text-gray-300">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-slate-800/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-orange-500/20 animate-fade-in z-20" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center text-white shadow-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-400">100+</div>
                    <div className="text-sm text-gray-300">Enterprise Clients</div>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://res.cloudinary.com/dklph982o/image/upload/v1757783965/b238e322-1606-4a33-8f8f-d80fc239a036_vsxbdv.png" 
                  alt="Premium Business Solutions" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
