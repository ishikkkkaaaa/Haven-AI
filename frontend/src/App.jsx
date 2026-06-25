import React, { useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { PhoneCall, Sparkles, AlertCircle, RefreshCw, Volume2 } from 'lucide-react';
import VoiceAssistant from './components/VoiceAssistant';

export default function App() {
  const [connectionState, setConnectionState] = useState('idle'); // idle | connecting | connected | error
  const [token, setToken] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartSession = async () => {
    setConnectionState('connecting');
    setErrorMessage('');
    
    try {
      // Connect to the backend API
      const response = await fetch('http://localhost:8000/api/token');
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Could not retrieve LiveKit credentials from the server.');
      }
      
      const data = await response.json();
      setToken(data.token);
      setServerUrl(data.serverUrl);
      setConnectionState('connected');
    } catch (err) {
      console.error('Connection error:', err);
      setErrorMessage(err.message || 'Make sure the backend is running at http://localhost:8000 and .env is configured.');
      setConnectionState('error');
    }
  };

  const handleDisconnect = () => {
    setConnectionState('idle');
    setToken('');
    setServerUrl('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 md:p-8">
      {/* Top Header */}
      <header className="w-full flex items-center justify-between max-w-5xl mx-auto py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">
            Haven 🌿
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-white/50">
          <span>v0.1 (MVP)</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-10 z-10">
        {connectionState === 'idle' && (
          <div className="glass-panel w-full max-w-2xl p-8 md:p-12 rounded-[2.5rem] text-center flex flex-col items-center gap-6 relative overflow-hidden">
            {/* Glowing background highlights */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-4 bg-white/5 border border-white/10 rounded-3xl animate-float">
              <span className="text-5xl">🌿</span>
            </div>

            <div className="space-y-3 max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
                A voice companion who
                <span className="block mt-1 bg-gradient-to-r from-teal-300 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  listens like a friend.
                </span>
              </h1>
              <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
                Haven is a voice-first AI companion built for natural, low-latency conversations. 
                No typing, no screen reading—just tap to call and speak naturally.
              </p>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2 text-xs font-medium text-white/70">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Low Latency Realtime
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-indigo-400" /> Fluid Multimodal Audio
              </span>
            </div>

            {/* Connect Button */}
            <div className="w-full max-w-xs mt-6 z-10">
              <button
                onClick={handleStartSession}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600 hover:from-teal-600 hover:via-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-xl shadow-indigo-950/40 hover:scale-[1.03] active:scale-[0.98] border border-white/10 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5" /> Start Conversation
              </button>
              <p className="text-[10px] text-white/30 mt-3 uppercase tracking-wider">
                Microphone permission requested on click
              </p>
            </div>
          </div>
        )}

        {connectionState === 'connecting' && (
          <div className="glass-panel w-full max-w-md p-10 rounded-3xl text-center flex flex-col items-center gap-6 animate-pulse">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <RefreshCw className="w-10 h-10 text-teal-400 animate-spin" />
              <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-ping" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-medium text-white">Calling Haven...</h2>
              <p className="text-xs text-white/40">Requesting credentials and establishing secure room session</p>
            </div>
          </div>
        )}

        {connectionState === 'connected' && token && serverUrl && (
          <LiveKitRoom
            video={false}
            audio={true} // Requests mic permission immediately when mounted
            token={token}
            serverUrl={serverUrl}
            connect={true}
            onDisconnected={handleDisconnect}
            className="w-full flex items-center justify-center"
          >
            {/* Render audio to hear Haven */}
            <RoomAudioRenderer />
            
            {/* Custom Interactive voice component */}
            <VoiceAssistant onDisconnect={handleDisconnect} />
          </LiveKitRoom>
        )}

        {connectionState === 'error' && (
          <div className="glass-panel w-full max-w-md p-8 rounded-3xl text-center flex flex-col items-center gap-6 border border-red-500/20">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full text-red-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Failed to connect</h2>
              <p className="text-sm text-red-400/80 leading-relaxed">
                {errorMessage}
              </p>
            </div>
            <div className="w-full pt-4 border-t border-white/5">
              <p className="text-xs text-white/40 mb-4">
                Please verify that your LiveKit and Google Gemini API credentials are added to the root <code>.env</code> file and the backend FastAPI application is running.
              </p>
              <button
                onClick={handleStartSession}
                className="w-full py-3 px-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-[10px] text-white/20 uppercase tracking-widest mt-10">
        Built with LiveKit & Google Gemini Live
      </footer>
    </div>
  );
}
