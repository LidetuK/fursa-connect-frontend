
import { ServiceType } from './types';

interface ServiceSelectorProps {
  services: ServiceType[];
  activeService: string;
  setActiveService: (id: string) => void;
}

const ServiceSelector = ({ services, activeService, setActiveService }: ServiceSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => setActiveService(service.id)}
          className={`p-4 flex flex-col items-center justify-center text-center rounded-lg transition-all duration-300 ${
            activeService === service.id
              ? 'bg-orange-500 text-white shadow-lg scale-105'
              : 'bg-slate-800 hover:bg-orange-500/10 border border-slate-700'
          }`}
        >
          <div className={`mb-2 ${
            activeService === service.id ? 'text-white' : 'text-orange-400'
          }`}>
            {service.icon}
          </div>
          <span className="text-xs md:text-sm font-medium line-clamp-2 text-gray-300">{service.title}</span>
        </button>
      ))}
    </div>
  );
};

export default ServiceSelector;
