"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeInSectionProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

export function FadeInSection({ children, className, delayMs = 0 }: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const baseClass = "transition-all duration-700 ease-out will-change-transform";
  const hiddenClass = "translate-y-7 opacity-0";
  const visibleClass = "translate-y-0 opacity-100";

  return (
    <div
      ref={ref}
      className={`${baseClass} ${isVisible ? visibleClass : hiddenClass} ${className ?? ""}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
