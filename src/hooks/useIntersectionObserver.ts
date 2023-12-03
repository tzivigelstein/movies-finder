import { useEffect, useRef, useState } from "react";

export interface IntersectionObserverProps {
  callback?: () => void;
  options?: IntersectionObserverOptions;
}

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export default function useIntersectionObserver({
  callback,
  options,
}: IntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          callback && callback();
        } else {
          setHasIntersected(false);
        }
      });
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options, callback]);

  return { target: targetRef, hasIntersected };
}
