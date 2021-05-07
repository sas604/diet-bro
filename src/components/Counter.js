import { animate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

export default function Counter({ from, to, className }) {
  const ref = useRef();

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 0.5,
      onUpdate(value) {
        ref.current.textContent = value.toFixed();
      },
    });
    return () => controls.stop();
  }, [from, to]);

  return <span className={className} ref={ref}></span>;
}
