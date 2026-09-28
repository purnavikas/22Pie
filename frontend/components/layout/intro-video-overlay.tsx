'use client';

import { useState } from 'react';

export function IntroVideoOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div aria-label="22Pie introduction" className="intro-video-overlay">
      <video
        autoPlay
        className="intro-video-overlay-media"
        muted
        onEnded={() => setIsVisible(false)}
        onError={() => setIsVisible(false)}
        playsInline
        preload="auto"
      >
        <source src="/videos/22pie_final_intro.mp4" type="video/mp4" />
      </video>
      <button aria-label="Skip intro" className="intro-video-overlay-skip" onClick={() => setIsVisible(false)} type="button">
        &gt;
      </button>
    </div>
  );
}
