import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Thin animated progress bar under the navbar — a small functional nod to
// the "analyst who tracks everything" identity of the site.
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-teal origin-left z-[60]"
    />
  );
};

export default ScrollProgress;
