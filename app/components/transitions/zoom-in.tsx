import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, Easing } from "remotion";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";

export type ZoomInProps = {
  exitZoomFactor?: number;
  enterZoomFactor?: number;
};

const ZoomInPresentation: React.FC<
  TransitionPresentationComponentProps<ZoomInProps>
> = ({
  children,
  presentationProgress,
  presentationDirection,
  passedProps,
}) => {
  const { exitZoomFactor = 2, enterZoomFactor = 0.5 } = passedProps;
  const style: React.CSSProperties = useMemo(() => {
    if (presentationDirection === "exiting") {
      const scale = interpolate(
        presentationProgress,
        [0, 0.5],
        [1, exitZoomFactor],
        { extrapolateRight: "clamp", easing: Easing.in(Easing.exp) }
      );
      return {
        transform: `scale(${scale})`,
        opacity: presentationProgress < 0.5 ? 1 : 0,
      };
    } else {
      const scale = interpolate(
        presentationProgress,
        [0.5, 1],
        [enterZoomFactor, 1],
        { extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) }
      );
      return {
        transform: `scale(${scale})`,
        opacity: presentationProgress >= 0.5 ? 1 : 0,
      };
    }
  }, [
    presentationDirection,
    presentationProgress,
    exitZoomFactor,
    enterZoomFactor,
  ]);
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

export const zoomIn = (
  props?: ZoomInProps
): TransitionPresentation<ZoomInProps> => {
  return {
    component: ZoomInPresentation,
    props: props ?? {},
  };
};
