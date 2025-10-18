import { useRef, useEffect } from "react";
import { Video, Youtube } from "lucide-react";

const Testimonials = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-slate-800" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Client Testimonials in Action
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Watch our clients share their experiences and see the results of our work firsthand.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/4 -left-16 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-16 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-700">
            <div className="aspect-video w-full">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/dkzw06zke/video/upload/v1754824051/0708_1_bj0umt.mp4"
                height={570}
                width="100%"
                controls
                preload="none"
                className="w-full h-full"
                poster="/video-poster.jpg"
              />
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Video className="text-orange-400" size={20} />
                <h3 className="font-semibold text-white">Client Testimonials</h3>
              </div>
              <p className="text-gray-300">Hear from our satisfied clients about their experience working with us.</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Video className="text-orange-400" size={20} />
                <h3 className="font-semibold text-white">Project Showcases</h3>
              </div>
              <p className="text-gray-300">View our completed projects and see the results we deliver.</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <Video className="text-orange-400" size={20} />
                <h3 className="font-semibold text-white">Success Stories</h3>
              </div>
              <p className="text-gray-300">Learn how our solutions have helped businesses achieve their goals.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
