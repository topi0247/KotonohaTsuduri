import { SVGMotionProps, motion } from "framer-motion";
import { JSX } from "react";

const Path = (props: SVGMotionProps<SVGPathElement> & JSX.IntrinsicElements["path"]) => (
  <motion.path fill="transparent" strokeWidth="3" stroke="white" strokeLinecap="round" {...props} />
);

export const NavigationMenuToggle = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <button
    onClick={toggle}
    className="fixed bottom-0 right-0 m-4 flex items-center justify-center rounded-full bg-sky-300 p-2 md:bottom-auto md:top-0"
  >
    <svg width="30" height="30" viewBox="0 0 24 24">
      <Path
        initial={false}
        variants={{
          closed: { d: "M 3 6 L 21 6" },
          open: { d: "M 6 18 L 18 6" },
        }}
        animate={isOpen ? "open" : "closed"}
      />
      <Path
        initial={false}
        variants={{
          closed: { opacity: 1, d: "M 3 12 L 21 12" },
          open: { opacity: 0, d: "" },
        }}
        transition={{ duration: 0.1 }}
        animate={isOpen ? "open" : "closed"}
      />
      <Path
        initial={false}
        variants={{
          closed: { d: "M 3 18 L 21 18" },
          open: { d: "M 6 6 L 18 18" },
        }}
        animate={isOpen ? "open" : "closed"}
      />
    </svg>
  </button>
);
