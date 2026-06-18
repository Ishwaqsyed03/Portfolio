"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A muted, looping video that only starts downloading once it scrolls near the
 * viewport (IntersectionObserver) — keeps it off the critical landing path.
 */
export default function LazyVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      muted
      autoPlay
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
