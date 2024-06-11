"use client";
import * as Motion from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Top } from "@/components/layouts";
import * as UI from "@/components/ui";
import { Routes } from "@/config";

export default function Headers() {
  const [isOpen, toggleOpen] = Motion.useCycle(false, true);
  const [isVisible, setIsVisible] = useState(false);

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
    <>
      <div className="relative w-full">
        <h1 className="border-b border-dashed border-sky-300 bg-white py-2 text-center text-2xl md:py-6">
          <Link href={Routes.home}>言の葉つづり</Link>
        </h1>
        <Motion.motion.nav
          id="menu"
          animate={isOpen ? "open" : "closed"}
          className={isOpen ? "absolute left-0 top-0 z-50 w-full bg-black bg-opacity-40" : ""}
          onAnimationComplete={handleAnimationComplete}
        >
          <UI.NavigationMenu isVisible={isVisible} handleToggle={handleToggle} />
          <UI.NavigationMenuToggle isOpen={isOpen} toggle={handleToggle} />
        </Motion.motion.nav>
      </div>
      <Top />
    </>
  );
}
