import { getAudioDurationInSeconds } from "@remotion/media-utils";

export async function getAudioDurations(audioFiles: string[]) {
  try {
    const durations = await Promise.all(
      audioFiles.map(async (audioFile) => {
        const duration = await getAudioDurationInSeconds(audioFile);
        return Math.round(duration * 1); // Convert seconds to frames, assuming 1 FPS
      })
    );

    return durations;
  } catch (error) {
    console.error("Error fetching audio durations:", error);
    return audioFiles.map(() => 0); // Return an array of zeros if there's an error
  }
}
