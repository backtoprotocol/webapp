import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type SanityImageValue = {
  asset?: { metadata?: { lqip?: string } };
  alt?: string;
};

type SanityImageProps = {
  value?: SanityImageValue;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function SanityImage({ value, width, height, className, priority }: SanityImageProps) {
  if (!value?.asset) return null;

  const lqip = value.asset.metadata?.lqip;

  return (
    <Image
      src={urlFor(value).width(width).height(height).fit("crop").url()}
      alt={value.alt || ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
    />
  );
}
