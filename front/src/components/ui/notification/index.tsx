import * as Mantine from "@mantine/core";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { useNotification } from "@/hooks";
import { NotificationType } from "@/types";

const variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export default function Notification() {
  const { notification, closeNotification } = useNotification();

  useEffect(() => {
    if (notification.open) {
      const timeoutId = setTimeout(() => {
        closeNotification();
        clearTimeout(timeoutId);
      }, 3000);
    }
  }, [notification]);

  const getColor = () => {
    switch (notification.type) {
      case NotificationType.INFO:
        return "blue";
      case NotificationType.SUCCESS:
        return "green";
      case NotificationType.WARNING:
        return "yellow";
      case NotificationType.ERROR:
        return "red";
      default:
        return "blue";
    }
  };

  const handleClose = () => {
    closeNotification();
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={notification.open ? "visible" : "hidden"}
      className="fixed right-0 top-16 z-10 ml-auto w-2/3 max-w-72"
    >
      <Mantine.Notification
        title={notification.title}
        color={getColor()}
        onClose={handleClose}
        style={{ width: "100%" }}
      >
        {notification.message}
      </Mantine.Notification>
    </motion.div>
  );
}
