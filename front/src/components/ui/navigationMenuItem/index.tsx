import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const NavigationMenuItem = ({
  href,
  word,
  handleToggle,
}: {
  href: string;
  word: string;
  handleToggle: () => void;
}) => {
  const router = useRouter();

  const handleLink = () => {
    handleToggle();
    router.push(href);
  };

  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scaleY: 0.95 }}
      className="border-sky-10 w-full border border-dashed bg-white text-center"
    >
      <button onClick={handleLink} className="block h-full w-full py-2">
        {word}
      </button>
    </motion.li>
  );
};
