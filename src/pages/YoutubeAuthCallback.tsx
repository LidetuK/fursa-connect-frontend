import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const YoutubeAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        console.log('YouTube callback received:', { code, state, error });

        if (error) {
          setStatus('error');
          setMessage('YouTube authorization was denied or failed');
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received from YouTube');
          return;
        }

        // The backend should have already handled the OAuth flow
        // We just need to redirect to dashboard
        setStatus('success');
        setMessage('YouTube account connected successfully!');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);

      } catch (error) {
        console.error('YouTube callback error:', error);
        setStatus('error');
        setMessage('Failed to connect YouTube account');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Connecting to YouTube</h2>
              <p className="text-gray-600">Please wait while we connect your YouTube account...</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Success!</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Connection Failed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
              >
                Return to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default YoutubeAuthCallback;
