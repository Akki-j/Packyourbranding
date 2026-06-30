import { useEffect, useState, useRef } from "react";

export function useCounterAnimation(target: number): number {
  const [current, setCurrent] = useState(0);
  const frameRef = useRef<number>(0);
  const startedAt = useRef<number>(0);

  useEffect(() => {
    if (!target) return;

    startedAt.current = Date.now();

    function update() {
      const elapsed = Date.now() - startedAt.current;
      const duration = 1500;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.ceil(progress * target);

      setCurrent(value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setCurrent(target);
      }
    }

    frameRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  return current;
}
