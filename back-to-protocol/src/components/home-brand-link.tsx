"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode, MouseEvent } from "react";

type HomeBrandLinkProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function HomeBrandLink({
  children,
  className,
  "aria-label": ariaLabel,
}: HomeBrandLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      pathname !== "/" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    router.replace("/", { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
