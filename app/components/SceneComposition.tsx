import React from "react";
import { AbsoluteFill, Audio, Img } from "remotion";
import { motion } from "framer-motion";
import { useZoom } from "../hooks/useZoom";

interface SceneCompositionProps {
  subtitles: string;
  image: string;
  audio: string;
  transition_type: "zoom-in" | "zoom-out";
  duration: number;
}

export const SceneComposition: React.FC<SceneCompositionProps> = ({
  subtitles,
  image,
  audio,
  transition_type,
  duration,
}) => {
  const zoomVariants = useZoom(transition_type, duration);

  return (
    <motion.div
      className="relative w-full h-full"
      variants={zoomVariants}
      initial="initial"
      animate="animate"
    >
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
        <h2 style={{ color: "white", fontSize: "24px", marginBottom: "10px" }}>
          {subtitles}
        </h2>
      </AbsoluteFill>
      <Audio src={audio} />
    </motion.div>
  );
};
