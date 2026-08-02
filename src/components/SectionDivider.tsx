"use client";

export default function SectionDivider({ color = "#6AA9FF" }: { color?: string }) {
  return (
    <div className="relative h-px max-w-7xl mx-auto px-4 sm:px-6">
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color}30 30%, ${color}50 50%, ${color}30 70%, transparent 100%)`,
        }}
      />
    </div>
  );
}
