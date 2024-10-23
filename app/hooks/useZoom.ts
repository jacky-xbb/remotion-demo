import { useVideoConfig } from "remotion";

type TransitionType = "zoom-in" | "zoom-out";

export const useZoom = (transitionType: TransitionType, duration: number) => {
  const { fps } = useVideoConfig();
  const durationInSeconds = duration / fps;

  const getScales = (type: TransitionType) => {
    switch (type) {
      case "zoom-in":
        return { startScale: 1, endScale: 1.3 };
      case "zoom-out":
        return { startScale: 1.3, endScale: 1 };
      default:
        throw new Error(`Unsupported transition type: ${type}`);
    }
  };

  const { startScale, endScale } = getScales(transitionType);

  const fastZoomEasing = [0.2, 0, 0.8, 1];

  const zoomVariants = {
    initial: { scale: startScale },
    animate: {
      scale: endScale,
      transition: {
        duration: durationInSeconds,
        ease: fastZoomEasing,
      },
    },
  };

  return zoomVariants;
};

