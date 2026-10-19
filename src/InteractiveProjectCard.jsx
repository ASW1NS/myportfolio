
import { motion, useReducedMotion } from "motion/react";

export default function InteractiveProjectCard({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card interactive-project-card"
      whileHover={
        reduceMotion
          ? {}
          : {
              y: -8,
              scale: 1.015,
              rotateX: 2,
              rotateY: -2,
            }
      }
      whileTap={{ scale: 0.99 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      style={{ transformPerspective: 900 }}
    >
      {children}
    </motion.article>
  );
}
