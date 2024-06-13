"use client";

import * as Motion from "framer-motion";
import { useState } from "react";

const variantsH1 = {
  openTop: {
    y: -1000,
    transition: {
      y: { stiffness: 1000, duration: 1.5, ease: "easeInOut" },
    },
  },
  closedTop: {
    y: 0,
    transition: {
      y: { stiffness: 1000, duration: 1.5, ease: "easeInOut" },
    },
  },
};

const variantsButton = {
  openTop: {
    y: 1000,
    transition: {
      y: { stiffness: 1000, duration: 1.5, ease: "easeInOut" },
    },
  },
  closedTop: {
    y: 0,
    transition: {
      y: { stiffness: 1000, duration: 1.5, ease: "easeInOut" },
    },
  },
};

export default function Top() {
  const [isOpen, toggleOpen] = Motion.useCycle(false, true);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    if (isOpen) {
      toggleOpen();
    } else {
      setIsVisible(true);
      toggleOpen();
    }
  };

  const handleAnimationComplete = () => {
    if (isOpen) {
      setIsVisible(false);
    }
  };

  return (
    <Motion.motion.article
      className={`fixed left-0 top-0 z-50 h-screen w-screen ${isVisible ? "" : "hidden"}`}
    >
      <Motion.motion.h1
        variants={variantsH1}
        initial="closedTop"
        animate={isOpen ? "openTop" : "closedTop"}
        className="flex h-1/2 w-full items-end justify-center border-b border-dashed border-sky-300 bg-white pb-4 text-3xl"
        onAnimationComplete={handleAnimationComplete}
      >
        言の葉つづり
      </Motion.motion.h1>
      <Motion.motion.button
        variants={variantsButton}
        initial="closedTop"
        animate={isOpen ? "openTop" : "closedTop"}
        className="flex h-1/2 w-full items-start justify-center border-t border-dashed border-sky-300 bg-white pt-4"
        onAnimationComplete={handleAnimationComplete}
        onClick={handleToggle}
      >
        手紙を開く
      </Motion.motion.button>
    </Motion.motion.article>
  );
}
