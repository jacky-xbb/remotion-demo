"use client";

import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SceneComposition } from "./SceneComposition";

interface Storyboard {
  subtitles: string;
  image: string;
  audio: string;
  effectType: string;
}

interface VideoCompositionProps {
  storyboards: Storyboard[];
  sceneDurations: number[];
}

export const VideoComposition: React.FC<VideoCompositionProps> = ({
  storyboards,
  sceneDurations,
}) => {
  return (
    <AbsoluteFill>
      <Series>
        {storyboards.map((scene, index) => (
          <Series.Sequence key={index} durationInFrames={sceneDurations[index]}>
            <SceneComposition
              subtitles={scene.subtitles}
              image={scene.image}
              audio={scene.audio}
              effectType={scene.effectType as "zoom-in" | "zoom-out"}
              duration={sceneDurations[index]}
            />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
