"use client";

import { useState } from "react";

export function ProductImage({
  src,
  alt,
  fallbackIcon,
  className,
}: {
  src: string;
  alt: string;
  fallbackIcon: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-5xl opacity-70" aria-hidden="true">
        {fallbackIcon}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
  );
}
