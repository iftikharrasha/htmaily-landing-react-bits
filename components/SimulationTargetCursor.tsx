import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useMemo } from 'react';
import { gsap } from 'gsap';

export interface SimulationTargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
  targetSelector?: string; // Kept for backward compatibility
}

export interface SimulationTargetCursorHandle {
  highlightElement: (selector: string) => void;
  clearHighlight: () => void;
}

const SimulationTargetCursor = forwardRef<SimulationTargetCursorHandle, SimulationTargetCursorProps>(({
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
  targetSelector = '.cursor-target'
}, ref) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const spinTl = useRef<gsap.core.Timeline | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
  const tickerFnRef = useRef<(() => void) | null>(null);
  const activeStrengthRef = useRef({ current: 0 });

  const constants = useMemo(() => ({ borderWidth: 3, cornerSize: 12 }), []);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    highlightElement: (selector: string) => {
      const target = document.querySelector(selector);
      if (target && cursorRef.current && cornersRef.current) {
        highlightTarget(target);
      }
    },
    clearHighlight: () => {
      clearHighlight();
    }
  }));

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: 'power3.out' });
  }, []);

  const clearHighlight = useCallback(() => {
    if (!cursorRef.current || !cornersRef.current) return;
    
    gsap.ticker.remove(tickerFnRef.current!);
    targetCornerPositionsRef.current = null;
    gsap.set(activeStrengthRef.current, { current: 0, overwrite: true });
    
    const corners = Array.from(cornersRef.current);
    gsap.killTweensOf(corners);
    const { cornerSize } = constants;
    const positions = [
      { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: cornerSize * 0.5 },
      { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
    ];
    const tl = gsap.timeline();
    corners.forEach((corner, index) => {
      tl.to(corner, { x: positions[index].x, y: positions[index].y, duration: 0.3, ease: 'power3.out' }, 0);
    });
    
    // Resume spinning
    if (cursorRef.current && spinTl.current) {
      const currentRotation = gsap.getProperty(cursorRef.current, 'rotation') as number;
      spinTl.current.kill();
      spinTl.current = gsap
        .timeline({ repeat: -1 })
        .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });
      gsap.to(cursorRef.current, {
        rotation: currentRotation + 360,
        duration: spinDuration * (1 - (currentRotation % 360) / 360),
        ease: 'none'
      });
    }
  }, [constants, spinDuration]);

  const highlightTarget = useCallback((target: Element) => {
    if (!cursorRef.current || !cornersRef.current) return;

    // Kill any existing ticker
    if (tickerFnRef.current) {
      gsap.ticker.remove(tickerFnRef.current);
    }

    const corners = Array.from(cornersRef.current);
    gsap.killTweensOf(corners);
    spinTl.current?.pause();
    gsap.set(cursorRef.current, { rotation: 0 });

    const rect = target.getBoundingClientRect();
    const { borderWidth, cornerSize } = constants;
    const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
    const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;

    targetCornerPositionsRef.current = [
      { x: rect.left - borderWidth, y: rect.top - borderWidth },
      { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
      { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
      { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
    ];

    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) return;
      
      const strength = activeStrengthRef.current.current;
      if (strength === 0) return;
      
      const cursorX = gsap.getProperty(cursorRef.current, 'x') as number;
      const cursorY = gsap.getProperty(cursorRef.current, 'y') as number;
      const corners = Array.from(cornersRef.current);
      
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x') as number;
        const currentY = gsap.getProperty(corner, 'y') as number;
        const targetX = targetCornerPositionsRef.current![i].x - cursorX;
        const targetY = targetCornerPositionsRef.current![i].y - cursorY;
        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;
        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;
        
        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto'
        });
      });
    };

    tickerFnRef.current = tickerFn;
    gsap.ticker.add(tickerFnRef.current!);
    
    gsap.to(activeStrengthRef.current, { current: 1, duration: hoverDuration, ease: 'power2.out' });

    corners.forEach((corner, i) => {
      gsap.to(corner, {
        x: targetCornerPositionsRef.current![i].x - cursorX,
        y: targetCornerPositionsRef.current![i].y - cursorY,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  }, [constants, hoverDuration, parallaxOn]);

  // Initialize cursor position
  useEffect(() => {
    if (!cursorRef.current) return;

    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    cornersRef.current = cursorRef.current.querySelectorAll<HTMLDivElement>('.target-cursor-corner');

    // Start spinning
    spinTl.current = gsap
      .timeline({ repeat: -1 })
      .to(cursorRef.current, { rotation: '+=360', duration: spinDuration, ease: 'none' });

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      spinTl.current?.kill();
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
      document.body.style.cursor = '';
    };
  }, [hideDefaultCursor, spinDuration]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9999]"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white -translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white translate-x-1/2 translate-y-1/2 border-l-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
      <div
        className="target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white -translate-x-[150%] translate-y-1/2 border-r-0 border-t-0"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
});

SimulationTargetCursor.displayName = 'SimulationTargetCursor';

export default SimulationTargetCursor;