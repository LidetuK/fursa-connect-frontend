
import { Bot, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const PlatformWidget = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if footer is visible (when it starts entering the viewport)
        const isVisible = footerRect.top <= windowHeight && footerRect.bottom >= 0;
        setIsFooterVisible(isVisible);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial state
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isFooterVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button 
            variant="default" 
            className="bg-skilllink-green hover:bg-skilllink-dark-green text-white w-full flex items-center gap-2"
            onClick={() => window.open('https://fursa-ai.com/', '_blank')}
          >
            <Bot className="h-4 w-4" />
            Fursa AI
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div>
              <h4 className="text-sm font-semibold">Fursa AI Platform</h4>
              <p className="text-sm text-muted-foreground">
                Discover AI-powered solutions and innovative technology services. 
                Explore cutting-edge AI tools and platforms.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button 
            variant="default" 
            className="bg-skilllink-green hover:bg-skilllink-dark-green text-white w-full flex items-center gap-2"
            onClick={() => window.open('https://www.fursadigitalagency.com/', '_blank')}
          >
            <Building2 className="h-4 w-4" />
            Fursa Digital Agency
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div>
              <h4 className="text-sm font-semibold">Fursa Digital Agency</h4>
              <p className="text-sm text-muted-foreground">
                Professional digital marketing and business solutions. 
                Transform your business with our comprehensive digital services.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default PlatformWidget;
