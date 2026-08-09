import React from 'react';
import { motion } from 'framer-motion';

// Reusable scroll-reveal wrapper — the signature motion device used
// throughout the site. Fades content up into place once, the first time
// it enters the viewport, and respects prefers-reduced-motion via the
// framer-motion default behavior + our global CSS override.
const Reveal = ({ children, delay = 0, y = 16, className = '', as = 'div', ...rest }) => {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
