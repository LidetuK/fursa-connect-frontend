
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const clients = [
  {
    name: "Awash Group",
    logo: "https://res.cloudinary.com/dkzw06zke/image/upload/v1748200778/005c2338-6679-411a-af23-e02de20353f4_m3aeb1.jpg",
    industry: "Logistics"
  },
  {
    name: "Red Communication",
    logo: "https://res.cloudinary.com/dkzw06zke/image/upload/v1748200778/0c24431c-e0c2-4b4a-affb-9c41424f9cf4_gydy0x.jpg",
    industry: "Marketing"
  },
  {
    name: "Maheder Foods",
    logo: "/mahder.png",
    industry: "Food"
  },
  {
    name: "Dahab Coffee",
    logo: "/dahab coffee.png",
    industry: "Agrobusiness "
  },
  {
    name: "The day Agro industry PLC",
    logo: "/The day Agro industry PLC.jpg",
    industry: "Agrobusiness "
  },
  {
    name: "Signature Addis coffee",
    logo: "/photo_2025-07-09_10-50-14.jpg",
    industry: "Agrobusiness"
  },
  {
    name: "Adenine Agro",
    logo: "/Screenshot 2025-07-09 105107.png",
    industry: "Agrobusiness"
  },
  {
    name: "Facebook",
    logo: "https://res.cloudinary.com/dkzw06zke/image/upload/v1748200769/2a5bbda2-d1b2-445b-9835-51ba35dba812_gsyphx.jpg",
    industry: "Social Media"
  },
  {
    name: "Google",
    logo: "https://res.cloudinary.com/dkzw06zke/image/upload/v1748200749/twitter-667462_640_vyuklu.webp",
    industry: "Technology"
  },
  {
    name: "RED Comm",
    logo: "https://res.cloudinary.com/dkzw06zke/image/upload/v1748200723/fd410d53-8d3d-46ef-bb1e-35dbe1abf200_rxhbzb.jpg",
    industry: "Communications"
  }
];

const Clients = () => {
  return (
    <section className="py-16 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Trusted by Businesses
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            We've helped companies from various industries achieve their digital goals
          </p>
        </div>
        
        {/* Enhanced auto-scrolling carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              containScroll: false,
              slidesToScroll: 1,
              skipSnaps: false,
              duration: 30,
            }}
            className="w-full"
          >
            <CarouselContent className="animate-carousel-smooth ml-0">
              {/* Duplicate clients array for seamless loop */}
              {[...clients, ...clients].map((client, index) => (
                <CarouselItem key={`${client.name}-${index}`} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                  <div className="group flex flex-col items-center justify-center p-6 bg-slate-800 rounded-2xl border-2 border-slate-700 hover:border-orange-500/50 hover:shadow-xl transition-all duration-500 h-full transform hover:scale-105">
                    <div className="w-full h-24 bg-slate-700 rounded-xl p-4 mb-4 flex items-center justify-center shadow-sm border border-slate-600">
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-h-16 max-w-full object-contain transition-all duration-300 group-hover:scale-110" 
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-center text-white mb-1 group-hover:text-orange-400 transition-colors duration-300">
                      {client.name}
                    </h3>
                    <p className="text-xs text-gray-400 group-hover:text-orange-300 transition-colors duration-300">
                      {client.industry}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Clients;
