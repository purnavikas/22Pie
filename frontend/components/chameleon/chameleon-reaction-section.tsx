'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';

type Direction = 'CENTER' | 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'UP_LEFT' | 'UP_RIGHT' | 'DOWN_LEFT' | 'DOWN_RIGHT';
type ChameleonAction = 'IDLE' | 'REACT' | 'ATTACK' | 'BLINK' | Direction;

const VIDEO_START_TIME = 1;
const ACTION_VIDEOS: Record<ChameleonAction, string> = {
  IDLE: '/videos/Chameleon_idle_animation_design_1080p_202608270214 copy.mp4',
  REACT: '/videos/Chameleon_reacting_to_fly_1080p_202608271356.mp4',
  ATTACK: '/videos/Chameleon_performs_tongue_attack_1080p_202608271355.mp4',
  BLINK: '/videos/Chameleon_blinking_and_reacting_1080p_202608271355.mp4',
  CENTER: '/videos/Chameleon_reacting_to_fly_1080p_202608271356.mp4',
  LEFT: '/videos/Chameleon_reacting_to_fly_1080p_202608271356.mp4',
  RIGHT: '/videos/Chameleon_looking_to_the_right_202608270136.mp4',
  UP: '/videos/Chameleon_looking_up_animation_1080p_202608270138.mp4',
  DOWN: '/videos/Chameleon_looking_down_animation_1080p_202608270212.mp4',
  UP_LEFT: '/videos/Chameleon_reacting_to_fly_1080p_202608271356.mp4',
  UP_RIGHT: '/videos/Chameleon_looking_up-right_reaction_1080p_202608270209.mp4',
  DOWN_LEFT: '/videos/Chameleon_looking_down_left_1080p_202608270212.mp4',
  DOWN_RIGHT: '/videos/Chameleon_reacting_to_fly_1080p_202608271356.mp4',
};

function detectDirection(x: number, y: number, bounds: DOMRect): Direction {
  const nx = (x - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
  const ny = (y - (bounds.top + bounds.height / 2)) / (bounds.height / 2);
  if (Math.hypot(nx, ny) < 0.2) return 'CENTER';
  const horizontal = nx < 0 ? 'LEFT' : 'RIGHT';
  const vertical = ny < 0 ? 'UP' : 'DOWN';
  const ratio = Math.abs(nx) / Math.max(0.001, Math.abs(ny));
  if (ratio > 1.45) return horizontal;
  if (ratio < 0.69) return vertical;
  return `${vertical}_${horizontal}` as Direction;
}

function waitForVideoEvent(video: HTMLVideoElement, eventName: 'loadedmetadata' | 'seeked') {
  return new Promise<void>((resolve) => video.addEventListener(eventName, () => resolve(), { once: true }));
}

async function seekToReactionStart(video: HTMLVideoElement) {
  if (video.readyState < HTMLMediaElement.HAVE_METADATA) await waitForVideoEvent(video, 'loadedmetadata');
  const target = Math.min(VIDEO_START_TIME, Math.max(0, video.duration - 0.05));
  if (Math.abs(video.currentTime - target) < 0.02) return;
  const seeked = waitForVideoEvent(video, 'seeked');
  video.currentTime = target;
  await seeked;
}

function useButterflyCursor(
  stageRef: RefObject<HTMLElement | null>,
  videoFrameRef: RefObject<HTMLElement | null>,
  butterflyRef: RefObject<HTMLDivElement | null>,
  onAction: (action: ChameleonAction) => void,
) {
  const target = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const movementStartedAt = useRef(0);
  const lastPointerAt = useRef(0);
  const currentDirection = useRef<Direction>('CENTER');
  const candidate = useRef<{ direction: Direction; since: number }>({ direction: 'CENTER', since: 0 });
  const inactivityTimer = useRef<number | null>(null);
  const ambientStep = useRef(0);

  useEffect(() => {
    let frame = 0;
    const tick = (time: number) => {
      position.current.x += (target.current.x - position.current.x) * 0.14;
      position.current.y += (target.current.y - position.current.y) * 0.14;
      const driftX = Math.sin(time * 0.004) * 3.2 + Math.sin(time * 0.011) * 1.2;
      const driftY = Math.cos(time * 0.005) * 3.8 + Math.sin(time * 0.009) * 1.1;
      const tilt = Math.max(-18, Math.min(18, (target.current.x - position.current.x) * 0.32));
      if (butterflyRef.current) {
        butterflyRef.current.style.transform = `translate3d(${position.current.x + driftX}px, ${position.current.y + driftY}px, 0) rotate(${tilt}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (inactivityTimer.current) window.clearTimeout(inactivityTimer.current);
    };
  }, [butterflyRef]);

  useEffect(() => {
    // Each one-shot ends by returning to the idle loop, creating the autonomous sequence.
    const ambientActions: ChameleonAction[] = ['BLINK', 'ATTACK'];
    const interval = window.setInterval(() => {
      if (lastPointerAt.current && performance.now() - lastPointerAt.current < 1800) return;
      onAction(ambientActions[ambientStep.current % ambientActions.length]);
      ambientStep.current += 1;
    }, 6500);
    return () => window.clearInterval(interval);
  }, [onAction]);

  const scheduleInactivity = useCallback(() => {
    if (inactivityTimer.current) window.clearTimeout(inactivityTimer.current);
    inactivityTimer.current = window.setTimeout(() => {
      movementStartedAt.current = 0;
      currentDirection.current = 'CENTER';
      onAction('IDLE');
    }, 1800);
  }, [onAction]);

  const setPointerTarget = useCallback((event: ReactPointerEvent<HTMLElement>, snap = false) => {
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    target.current = { x: event.clientX - bounds.left - 26, y: event.clientY - bounds.top - 26 };
    if (snap) position.current = { ...target.current };
  }, [stageRef]);

  const handlePointerEnter = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    setPointerTarget(event, true);
    if (butterflyRef.current) butterflyRef.current.style.opacity = '1';
    lastPointerAt.current = performance.now();
    movementStartedAt.current = 0;
    scheduleInactivity();
  }, [butterflyRef, scheduleInactivity, setPointerTarget]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    setPointerTarget(event);
    const now = performance.now();
    lastPointerAt.current = now;
    if (movementStartedAt.current === 0) {
      movementStartedAt.current = now;
      onAction('REACT');
      scheduleInactivity();
      return;
    }
    scheduleInactivity();
    if (now - movementStartedAt.current < 700) return;
    const frame = videoFrameRef.current;
    if (!frame) return;
    const nextDirection = detectDirection(event.clientX, event.clientY, frame.getBoundingClientRect());
    if (nextDirection !== candidate.current.direction) candidate.current = { direction: nextDirection, since: now };
    if (nextDirection !== currentDirection.current && now - candidate.current.since > 120) {
      currentDirection.current = nextDirection;
      onAction(nextDirection);
    }
  }, [onAction, scheduleInactivity, setPointerTarget, videoFrameRef]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    setPointerTarget(event);
    lastPointerAt.current = performance.now();
    onAction('ATTACK');
    scheduleInactivity();
  }, [onAction, scheduleInactivity, setPointerTarget]);

  const handlePointerLeave = useCallback(() => {
    if (butterflyRef.current) butterflyRef.current.style.opacity = '0';
    if (inactivityTimer.current) window.clearTimeout(inactivityTimer.current);
    movementStartedAt.current = 0;
    lastPointerAt.current = 0;
    onAction('IDLE');
  }, [butterflyRef, onAction]);

  return { handlePointerDown, handlePointerEnter, handlePointerLeave, handlePointerMove };
}

function ButterflyCursor({ butterflyRef }: { butterflyRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div aria-hidden="true" className="chameleon-butterfly" ref={butterflyRef}>
      <Image alt="" className="chameleon-butterfly-image" height={64} priority src="/images/butterfly-cursor.png" width={64} />
    </div>
  );
}

function ChameleonVideoPlayer({ controllerRef, frameRef }: {
  controllerRef: RefObject<((action: ChameleonAction) => void) | null>;
  frameRef: RefObject<HTMLDivElement | null>;
}) {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeIndex = useRef(0);
  const displayedAction = useRef<ChameleonAction>('IDLE');
  const queuedAction = useRef<ChameleonAction | null>(null);
  const transitioning = useRef(false);
  const transitionId = useRef(0);

  useEffect(() => {
    const preloaders = Object.values(ACTION_VIDEOS).map((src) => {
      const video = document.createElement('video');
      video.muted = true;
      video.preload = 'auto';
      video.src = src;
      video.load();
      void seekToReactionStart(video);
      return video;
    });
    return () => preloaders.forEach((video) => { video.removeAttribute('src'); video.load(); });
  }, []);

  useEffect(() => {
    const initial = videoARef.current;
    if (!initial) return;
    let cancelled = false;
    const startIdle = async () => {
      await seekToReactionStart(initial);
      if (cancelled) return;
      try { await initial.play(); } catch { /* Muted autoplay may be blocked by browser policy. */ }
    };
    void startIdle();
    return () => { cancelled = true; };
  }, []);

  const showAction = useCallback((action: ChameleonAction) => {
    if (action === displayedAction.current && (action === 'IDLE' || action === 'CENTER')) return;
    if (transitioning.current) {
      if (action === 'ATTACK' || queuedAction.current !== 'ATTACK') queuedAction.current = action;
      return;
    }
    transitioning.current = true;
    const outgoingIndex = activeIndex.current;
    const incomingIndex = outgoingIndex === 0 ? 1 : 0;
    const outgoing = outgoingIndex === 0 ? videoARef.current : videoBRef.current;
    const incoming = incomingIndex === 0 ? videoARef.current : videoBRef.current;
    if (!outgoing || !incoming) {
      transitioning.current = false;
      return;
    }
    const requestId = ++transitionId.current;

    incoming.style.transition = 'none';
    incoming.style.opacity = '0';
    incoming.style.zIndex = '2';
    outgoing.style.transition = 'none';
    outgoing.style.opacity = '1';
    outgoing.style.zIndex = '1';
    incoming.loop = action === 'IDLE';
    incoming.src = ACTION_VIDEOS[action];
    incoming.load();

    const reveal = async () => {
      await seekToReactionStart(incoming);
      if (requestId !== transitionId.current) return;
      try { await incoming.play(); } catch {
        transitioning.current = false;
        return;
      }
      const revealPaintedFrame = () => requestAnimationFrame(() => requestAnimationFrame(() => {
        if (requestId !== transitionId.current) return;
        incoming.style.transition = 'opacity 240ms cubic-bezier(0.22, 1, 0.36, 1)';
        incoming.style.opacity = '1';
        window.setTimeout(() => {
          if (requestId !== transitionId.current) return;
          outgoing.pause();
          outgoing.style.opacity = '0';
          outgoing.style.zIndex = '0';
          incoming.style.zIndex = '1';
          activeIndex.current = incomingIndex;
          displayedAction.current = action;
          transitioning.current = false;
          const queued = queuedAction.current;
          queuedAction.current = null;
          if (queued && queued !== displayedAction.current) queueMicrotask(() => controllerRef.current?.(queued));
        }, 265);
      }));
      if ('requestVideoFrameCallback' in incoming) incoming.requestVideoFrameCallback(revealPaintedFrame);
      else revealPaintedFrame();
    };
    void reveal();
  }, [controllerRef]);

  useEffect(() => {
    controllerRef.current = showAction;
    return () => { controllerRef.current = null; };
  }, [controllerRef, showAction]);

  const handleEnded = useCallback((index: number) => {
    if (index === activeIndex.current && displayedAction.current !== 'IDLE') showAction('IDLE');
  }, [showAction]);

  return (
    <div className="chameleon-video-frame" ref={frameRef}>
      <video className="chameleon-reaction-video is-visible" loop muted onEnded={() => handleEnded(0)} playsInline preload="auto" ref={videoARef} src={ACTION_VIDEOS.IDLE} />
      <video className="chameleon-reaction-video" muted onEnded={() => handleEnded(1)} playsInline preload="auto" ref={videoBRef} />
    </div>
  );
}

export function ChameleonReactionSection() {
  const stageRef = useRef<HTMLElement>(null);
  const videoFrameRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<((action: ChameleonAction) => void) | null>(null);
  const changeAction = useCallback((action: ChameleonAction) => controllerRef.current?.(action), []);
  const handlers = useButterflyCursor(stageRef, videoFrameRef, butterflyRef, changeAction);

  return (
    <section
      aria-label="Interactive chameleon"
      className="chameleon-reaction-section"
      id="chameleon-reaction"
      onPointerDown={handlers.handlePointerDown}
      onPointerEnter={handlers.handlePointerEnter}
      onPointerLeave={handlers.handlePointerLeave}
      onPointerMove={handlers.handlePointerMove}
      ref={stageRef}
    >
      <div className="chameleon-reaction-copy">
        <p>Learning for the AI era</p>
        <h1>Learn deeply.<br />Build boldly.</h1>
        <span>Developer-led learning, practical technology, and human guidance for building skills that matter.</span>
        <div className="mt-7 flex flex-wrap items-center gap-3 pointer-events-auto">
          <Link className="inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet" href="/learning-paths">
            Explore learning <ArrowUpRight size={17} />
          </Link>
          <Link className="inline-flex items-center gap-2 rounded-full border border-graphite/40 bg-white/30 px-5 py-3 text-sm font-semibold text-graphite backdrop-blur-sm transition hover:bg-white" href="/project-enquiry">
            Discuss a project <ArrowRight size={17} />
          </Link>
        </div>
      </div>
      <ChameleonVideoPlayer controllerRef={controllerRef} frameRef={videoFrameRef} />
      <ButterflyCursor butterflyRef={butterflyRef} />
    </section>
  );
}
