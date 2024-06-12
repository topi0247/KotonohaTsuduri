"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const variants = {
  initial: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    scale: 1,
    rotate: 0,
    opacity: 0,
    y: 0,
  },
  fullScreenWhite: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    scale: 1,
    rotate: 0,
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
  shrinkRotate: {
    scale: 0.5,
    rotate: -45,
    transition: { duration: 0.5 },
  },
  showText: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  moveUp: {
    y: -200,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

export default function PostDirection({
  name,
  isPost,
  onAnimationComplete,
}: {
  name: string;
  isPost: boolean;
  onAnimationComplete: () => void;
}) {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("fullScreenWhite");
      await controls.start("shrinkRotate");
      await new Promise((resolve) => setTimeout(resolve, 500));
      await controls.start("showText");
      await new Promise((resolve) => setTimeout(resolve, 500));
      await controls.start("moveUp");
      onAnimationComplete();
    };

    if (isPost) {
      sequence();
    }
  }, [isPost]);

  return (
    <div className={`fixed left-0 top-0 h-full w-full ${isPost ? "" : "hidden"}`}>
      <motion.div
        variants={variants}
        initial="initial"
        animate={controls}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          maxWidth: "1200px",
          maxHeight: "80%",
          margin: "auto",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(90deg)",
            color: "black",
            fontSize: "3rem",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
          variants={{
            showText: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          {name.length > 0 ? name : "名もなき人"} より
        </motion.div>
      </motion.div>
    </div>
  );
}
