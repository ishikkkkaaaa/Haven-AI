import React, { useState, useEffect } from 'react';
import { useVoiceAssistant, useLocalParticipant, useRoomContext } from '@livekit/components-react';
import { Mic, MicOff, PhoneOff, Radio } from 'lucide-react';
import Visualizer from './Visualizer';

export default function VoiceAssistant({ onDisconnect }) {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const { localParticipant, isMicrophoneEnabled } = useLocalParticipant();
  const room = useRoomContext();
  const [subtitle, setSubtitle] = useState('');

  // Keep track of the transcriptions from the AI
  useEffect(() => {
    if (agentTranscriptions && agentTranscriptions.length > 0) {
      // Get the latest transcription text
      const latest = agentTranscriptions[agentTranscriptions.length - 1];
      if (latest && latest.text) {
        setSubtitle(latest.text);
      }
    }
  }, [agentTranscriptions]);

  // Map state to human-readable strings
  const getStatusText = () => {
    switch (state) {
      case 'listening':
        return 'Listening to you...';
      case 'thinking':
        return 'Haven is thinking...';
      case 'speaking':
        return 'Haven is speaking';
      case 'connecting':
      case 'initializing':
        return 'Connecting LiveKit Agent...';
      default:
        return 'Connected';
    }
  };

  const handleMuteToggle = async () => {
    if (localParticipant) {
      try {
        await localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled);
      } catch (err) {
        console.error('Failed to toggle microphone:', err);
      }
    }
  };

  const handleDisconnect = async () => {
    if (room) {
      await room.disconnect();
    }
    if (onDisconnect) {
      onDisconnect();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[500px] w-full max-w-md mx-auto p-6 glass-panel rounded-3xl relative overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="w-full flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-semibold text-white/80 tracking-wide">
            HAVEN CALL ACTIVE
          </span>
        </div>
        
        {state === 'speaking' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] text-pink-400 font-bold uppercase tracking-wider animate-pulse">
            <Radio className="w-3 h-3" /> Live
          </div>
        )}
      </div>

      {/* Pulsing Visualizer Core */}
      <div className="flex-1 flex items-center justify-center my-4 z-10">
        <Visualizer state={state} />
      </div>

      {/* Status Bar */}
      <div className="text-center mb-6 z-10">
        <h2 className="text-xl font-medium text-white transition-all duration-300">
          {getStatusText()}
        </h2>
        <p className="text-xs text-white/40 mt-1">
          Talk naturally. Haven will listen and respond.
        </p>
      </div>

      {/* Subtitles / Real-time Transcripts */}
      <div className="w-full min-h-[70px] flex items-center justify-center px-4 py-3 mb-6 bg-white/5 border border-white/5 rounded-2xl z-10 transition-all duration-500">
        {subtitle ? (
          <p className="text-sm text-white/90 text-center leading-relaxed font-light italic">
            "{subtitle}"
          </p>
        ) : (
          <p className="text-sm text-white/30 text-center leading-relaxed">
            {state === 'listening' ? 'Haven is listening to your voice...' : 'Waiting for connection...'}
          </p>
        )}
      </div>

      {/* Controls Container */}
      <div className="flex items-center justify-center gap-6 w-full z-10 border-t border-white/5 pt-6">
        {/* Microphone Toggle Button */}
        <button
          onClick={handleMuteToggle}
          className={`p-4 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg border ${
            isMicrophoneEnabled
              ? 'bg-white/5 text-white/80 hover:bg-white/10 border-white/10'
              : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20'
          }`}
          title={isMicrophoneEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
        >
          {isMicrophoneEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
        </button>

        {/* End Conversation Button */}
        <button
          onClick={handleDisconnect}
          className="p-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white transition-all duration-300 flex items-center justify-center shadow-lg shadow-red-950/40 hover:scale-105 active:scale-95 border border-red-400/20"
          title="End Call"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
