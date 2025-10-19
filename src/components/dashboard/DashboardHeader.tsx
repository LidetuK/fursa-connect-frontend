import { User, LogOut, Activity } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  packageType: string;
}

const DashboardHeader = ({ packageType }: DashboardHeaderProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Package type conversion removed since plan display is hidden

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out."
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <header 
      className="glass-card border-b border-border/50 sticky top-0 z-20 backdrop-blur-xl"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--card))/95, hsl(var(--card))/80)',
        boxShadow: '0 4px 32px hsl(var(--primary))/10'
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Status indicators */}
          <div className="flex items-center space-x-4">
            {/* Removed System Online and Enterprise Plan indicators */}
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Removed Search and Notifications */}
            
            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 p-2 rounded-xl bg-card/60 border border-border/30 
                                 hover:bg-primary/10 hover:border-primary/30 focus:outline-none transition-all duration-300 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 
                                text-primary-foreground flex items-center justify-center shadow-lg 
                                group-hover:shadow-primary/30">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">Dashboard</div>
                    <div className="text-xs text-muted-foreground">Active Session</div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="glass-card border-border/50 shadow-2xl backdrop-blur-xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card))/95, hsl(var(--card))/80)'
                }}
              >
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* System status indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/20">
              <Activity className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;