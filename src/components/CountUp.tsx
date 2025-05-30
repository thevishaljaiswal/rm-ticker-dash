
import React, { useState, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration: number;
  className?: string;
  formatter?: (value: number) => string;
}

export const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration, 
  className = '', 
  formatter = (val) => val.toString() 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(end * progress);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span className={className}>
      {formatter(Math.floor(count))}
    </span>
  );
};
