type LogoMarkProps = {
  className?: string;
  tone?: "gradient" | "white";
};

export function LogoMark({ className, tone = "gradient" }: LogoMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        display: "inline-block",
        background:
          tone === "white"
            ? "#ffffff"
            : "linear-gradient(140deg, #f3f4f6 0%, #9ca3af 38%, #4b5563 68%, #111827 100%)",
        WebkitMaskImage: "url('/back-to-protocol-logo.png')",
        maskImage: "url('/back-to-protocol-logo.png')",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
