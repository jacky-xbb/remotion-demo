import { useMemo } from 'react';
import { useVideoConfig } from 'remotion';

type TransitionType = 'zoom-in' | 'zoom-out';

export const useZoom = (transitionType: TransitionType, duration: number) => {
  const { fps } = useVideoConfig();
  const durationInSeconds = duration / fps;

  const zoomKeyframes = useMemo(() => {
    const startScale = transitionType === 'zoom-in' ? 1 : 1.3;
    const endScale = transitionType === 'zoom-in' ? 1.3 : 1;

    return `
      from { transform: scale(${startScale}); }
      to { transform: scale(${endScale}); }
    `;
  }, [transitionType]);

  const animationName = `zoom-${transitionType}`;

  const style = useMemo(() => ({
    animation: `${animationName} ${durationInSeconds}s linear forwards`,
  }), [animationName, durationInSeconds]);

  const keyframesStyle = useMemo(() => `
    @keyframes ${animationName} {
      ${zoomKeyframes}
    }
  `, [animationName, zoomKeyframes]);

  return { style, keyframesStyle };
};