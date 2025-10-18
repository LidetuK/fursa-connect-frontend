import { Check } from 'lucide-react';
import { ServiceType } from './types';

interface ServiceCardProps {
  service: ServiceType;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 border border-slate-700">
      <div className="md:flex">
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-500/20 text-orange-400 mb-6">
            {service.icon}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{service.title}</h3>
          <p className="text-gray-300 mb-6">{service.description}</p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check size={18} className="text-orange-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{detail}</span>
              </li>
            ))}
          </ul>
          
          <a
            href="/auth"
            className="btn-primary inline-block mt-8"
          >
            Get Started
          </a>
        </div>
        
        <div className="md:w-1/2 bg-slate-700 flex items-center justify-center relative">
          {service.id === 'web-dev' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754819979/1_hzycvy.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'seo' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754819999/2_s2eppw.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'email-marketing' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754820177/3_e1rzpk.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'analytics' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754820415/4_nej6rc.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'ecommerce' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754819957/5_xnvvty.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'content' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754820130/6_oi5adt.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'photo-video' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754820207/7_hwou4w.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'sm-marketing' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754820114/10_mbgn7f.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
          {service.id === 'consultation' && (
            <video
              src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754819926/11_hv5jcc.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-none"
              style={{ minHeight: '300px', background: '#374151' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
