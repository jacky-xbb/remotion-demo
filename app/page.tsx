"use client";

import { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import { VideoComposition } from "./components/VideoComposition";
import storyboardProject from "../public/storyboard_project.json";
import { getAudioDurations } from "./components/AudioDurations";

const FPS = 1;

export default function Home() {
  const [sceneDurations, setSceneDurations] = useState<number[]>([]);
  const [totalFrames, setTotalFrames] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAudioDurations = async () => {
      const audioFiles = storyboardProject.storyboards.map(
        (scene) => scene.audio
      );
      const durations = await getAudioDurations(audioFiles);
      setSceneDurations(durations);
      const total = durations.reduce((sum, duration) => sum + duration, 0);
      setTotalFrames(total);
      setIsLoading(false);
    };

    fetchAudioDurations();
  }, []);

  if (isLoading || totalFrames === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{storyboardProject.project_info.title}</h1>
        <Player
          component={VideoComposition}
          inputProps={{
            storyboards: storyboardProject.storyboards,
            sceneDurations,
          }}
          durationInFrames={totalFrames}
          compositionWidth={576}
          compositionHeight={1024}
          fps={FPS}
          style={{
            width: "100%",
            maxWidth: "1280px",
          }}
          controls
        />
      </main>
    </div>
  );
}
