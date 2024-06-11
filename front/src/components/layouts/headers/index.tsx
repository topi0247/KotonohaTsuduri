"use client";
import * as Motion from "framer-motion";
import { useRef, useState } from "react";

import * as UI from "@/components/ui";
import * as Hook from "@/hooks";

export default function Headers() {
  const [isOpen, toggleOpen] = Motion.useCycle(false, true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const { height } = Hook.useDimensions(containerRef);

  const handleToggle = () => {
    if (isOpen) {
      toggleOpen();
    } else {
      setIsVisible(true);
      toggleOpen();
    }
  };

  const handleAnimationComplete = () => {
    if (!isOpen) {
      setIsVisible(false);
    }
  };

  return (
    <div className="w-full">
      <h1>言の葉つづり</h1>
      <Motion.motion.nav
        id="menu"
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className={isOpen ? "fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-40" : ""}
        onAnimationComplete={handleAnimationComplete}
      >
        <UI.NavigationMenu isVisible={isVisible} handleToggle={handleToggle} />
        <UI.NavigationMenuToggle isOpen={isOpen} toggle={handleToggle} />
      </Motion.motion.nav>
    </div>
  );
}
