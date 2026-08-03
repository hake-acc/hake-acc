import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type PixelIconName =
  | "menu"
  | "close"
  | "arrow-right"
  | "arrow-up"
  | "arrow-up-right"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "external-link"
  | "layers"
  | "heart";

interface PixelIconProps {
  name: PixelIconName;
  className?: string;
  style?: CSSProperties;
}

export default function PixelIcon({ name, className, style }: PixelIconProps) {
  return (
    <span
      className={cn("pixel-icon", `pixel-icon-${name}`, className)}
      style={style}
      aria-hidden="true"
    />
  );
}