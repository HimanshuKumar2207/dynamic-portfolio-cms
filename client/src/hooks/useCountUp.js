import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Animates a number counting up from 0 once it scrolls into view.
// Falls back to displaying the raw value statically if it isn't numeric.
export default function useCountUp(rawValue, duration = 1200) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const numeric = parseFloat(rawValue);
  const isNumber = !Number.isNaN(numeric);
  const decimals = isNumber && String(rawValue).includes('.') ? String(rawValue).split('.')[1].length : 0;
  const [display, setDisplay] = useState(isNumber ? '0' : rawValue);

  useEffect(() => {
    if (!inView || !isNumber) return;
    let start = null;
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = numeric * ease(progress);
      setDisplay(current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref, display };
}
