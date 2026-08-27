'use client';

import { useState } from 'react';
import { ChameleonPreview } from '@/components/chameleon/chameleon-preview';

export default function ChameleonPreviewPage() {
  const [autoRotate, setAutoRotate] = useState(false);
  return (
    <section className="fixed inset-0 z-50 min-h-[620px] overflow-hidden bg-[#d7d8d5]">
      <div className="absolute left-5 top-5 z-10 max-w-sm rounded-2xl border border-black/10 bg-white/75 p-4 text-graphite shadow-xl backdrop-blur-md md:left-8 md:top-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#477463]">Procedural character study</p>
        <h1 className="mt-2 text-2xl font-medium tracking-[-0.04em]">Chameleon runtime rig</h1>
        <p className="mt-2 text-xs leading-5 text-black/55">Drag to orbit. Scroll to zoom. Head, jaw, tail and both eyes are separate named pivots; cursor tracking is intentionally not connected yet.</p>
        <button className="mt-3 rounded-full bg-graphite px-4 py-2 text-xs font-semibold text-white" onClick={() => setAutoRotate((value) => !value)} type="button">
          {autoRotate ? 'Pause turntable' : 'Play turntable'}
        </button>
      </div>
      <div className="size-full"><ChameleonPreview autoRotate={autoRotate} /></div>
    </section>
  );
}
