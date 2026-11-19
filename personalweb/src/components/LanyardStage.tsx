import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface LanyardStageProps {
  /** Classes for the in-flow spacer that reserves (and positions) the stage area. */
  spacerClassName?: string;
  children: ReactNode;
}

/**
 * Renders its children in a fixed layer on document.body so the lanyard paints
 * above normal page content (escape from framer-motion stacking contexts),
 * yet below the navbar group (mobile menu z-40, navbar z-50).
 * The layer tracks the spacer's rect on scroll/resize, so visually the card
 * still belongs to the section while floating over everything else.
 */
export function LanyardStage({ spacerClassName = '', children }: LanyardStageProps) {
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const layer = layerRef.current;
    if (!spacer || !layer) return undefined;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const rect = spacer.getBoundingClientRect();
      layer.style.top = `${rect.top}px`;
      layer.style.left = `${rect.left}px`;
      layer.style.width = `${rect.width}px`;
      layer.style.height = `${rect.height}px`;
      const offscreen = rect.bottom < 0 || rect.top > window.innerHeight;
      layer.style.visibility = offscreen ? 'hidden' : 'visible';
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    const observer = new ResizeObserver(request);
    observer.observe(spacer);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={spacerRef} className={spacerClassName} aria-hidden="true" />
      {createPortal(
        <div ref={layerRef} className="lanyard-stage-layer">
          {children}
        </div>,
        document.body
      )}
    </>
  );
}

export default LanyardStage;
