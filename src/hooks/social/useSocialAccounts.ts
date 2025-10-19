import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from "@/integrations/supabase/client";

export interface SocialAccount {
  platform: string;
  platform_user_id: string;
  metadata: any;
}

export const useSocialAccounts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);

  // Check Twitter connection specifically
  const checkTwitterConnection = useCallback(async () => {
    if (!user) return false;
    try {
      const res = await fetch('https://fursaconnet-production.up.railway.app/auth/twitter2/test', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        return data.success === true;
      }
      return false;
    } catch (error) {
      console.log('Twitter connection check error:', error);
      return false;
    }
  }, [user]);

  // Load user's connected social accounts from backend
  const loadUserSocialAccounts = useCallback(async () => {
    if (!user) return [];
    setIsLoading(true);
    try {
      let accounts: SocialAccount[] = [];
      try {
        // First check Twitter connection specifically
        const twitterConnected = await checkTwitterConnection();
        if (twitterConnected) {
          accounts.push({
            platform: 'twitter',
            platform_user_id: 'twitter_user',
            metadata: { connected: true }
          });
        }

        // Fetch other social accounts from backend
        const res = await fetch('https://fursaconnet-production.up.railway.app/user/social-accounts', {
          method: 'GET',
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.accounts)) {
            console.log('=== SOCIAL ACCOUNTS LOADED ===');
            console.log('Raw backend response:', data);
            console.log('Backend accounts:', data.accounts);
            // Merge with Twitter status
            const otherAccounts = data.accounts.filter(acc => acc.platform !== 'twitter');
            accounts = [...accounts, ...otherAccounts];
            console.log('Final accounts after merge:', accounts);
            console.log('=== SOCIAL ACCOUNTS LOADED END ===');
          }
        }
        setSocialAccounts(accounts);
      } catch (dbError) {
        console.log('Backend social accounts fetch error:', dbError);
        // If Twitter is connected, still show it
        const twitterConnected = await checkTwitterConnection();
        if (twitterConnected) {
          accounts = [{
            platform: 'twitter',
            platform_user_id: 'twitter_user',
            metadata: { connected: true }
          }];
          setSocialAccounts(accounts);
        }
      }
      setIsLoading(false);
      return accounts;
    } catch (err) {
      console.error('Error loading social accounts:', err);
      toast({
        title: "Error",
        description: "Failed to load connected social accounts",
        variant: "destructive"
      });
      setIsLoading(false);
      return [];
    }
  }, [user, toast, checkTwitterConnection]);

  useEffect(() => {
    if (user) {
      loadUserSocialAccounts();
    }
  }, [user, loadUserSocialAccounts]);

  return {
    socialAccounts: socialAccounts || [],
    isLoading,
    loadUserSocialAccounts
  };
};
