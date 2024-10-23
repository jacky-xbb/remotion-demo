import React from "react";
import { AbsoluteFill, Audio, Img } from "remotion";
import { useZoom } from "../hooks/useZoom";

interface SceneCompositionProps {
  subtitles: string;
  image: string;
  audio: string;
  effectType: "zoom-in" | "zoom-out";
  duration: number;
}

export const SceneComposition: React.FC<SceneCompositionProps> = ({
  subtitles,
  image,
  audio,
  effectType,
  duration,
}) => {
  const { style, keyframesStyle } = useZoom(effectType, duration);

  return (
    <>
      <style>{keyframesStyle}</style>
      <div className="relative w-full h-full overflow-hidden" style={style}>
        <Img
          src={image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <AbsoluteFill
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
          <h2
            style={{ color: "white", fontSize: "24px", marginBottom: "10px" }}
          >
            {subtitles}
          </h2>
        </AbsoluteFill>
        <Audio src={audio} />
      </div>
    </>
  );
};
