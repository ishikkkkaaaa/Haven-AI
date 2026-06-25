import React from 'react';

export default function Visualizer({ state }) {
  // Map the LiveKit voice agent states to the custom breathing aura animations
  const getAuraClass = () => {
    switch (state) {
      case 'listening':
        return 'aura-listening';
      case 'thinking':
        return 'aura-thinking';
      case 'speaking':
        return 'aura-speaking';
      case 'connecting':
      case 'initializing':
        return 'aura-connecting';
      default:
        return 'aura-idle border border-indigo-500/20';
    }
  };

  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center animate-float">
      {/* Ambient background glow */}
      <div className={`absolute inset-0 blur-3xl opacity-50 rounded-full transition-all duration-1000 ${getAuraClass()}`} />
      
      {/* Morphing primary shape */}
      <div className={`w-64 h-64 transition-all duration-1000 ease-in-out border border-white/10 ${getAuraClass()}`}>
        {/* Internal glossy ring */}
        <div className="w-full h-full flex items-center justify-center bg-black/10 backdrop-blur-[2px] animate-morph">
          {/* Center organic dot/core */}
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md">
            <div className="relative flex items-center justify-center">
              {state === 'speaking' && (
                <>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 animate-ping"></span>
                  <span className="text-2xl animate-pulse">🎙️</span>
                </>
              )}
              {state === 'listening' && <span className="text-2xl animate-pulse">👂</span>}
              {state === 'thinking' && <span className="text-2xl animate-spin" style={{ animationDuration: '8s' }}>✨</span>}
              {(state === 'disconnected' || !state) && <span className="text-2xl">🌿</span>}
              {(state === 'connecting' || state === 'initializing') && (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
