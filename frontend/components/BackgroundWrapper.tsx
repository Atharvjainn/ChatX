// components/BackgroundWrapper.tsx

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
}: BackgroundWrapperProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#0b0f19] via-[#1b3b8a] to-[#ff4fa7]">
  
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
