"use client";
import LazyVideo from "./LazyVideo";

/**
 * Compact, always-visible project thumbnail: a small browser window showing
 * the first screenshot of the site. The rich, enlarged view lives in
 * ProjectPreviewPopup, which appears on hover.
 */
export default function ProjectPreview({
  title,
  status,
  href,
  image,
  video,
}: {
  title: string;
  status: string;
  href: string;
  image?: string;
  video?: string;
}) {
  const host = (() => {
    try {
      return new URL(href).host;
    } catch {
      return "preview";
    }
  })();

  return (
    <div className="mb-4 rounded-xl overflow-hidden border border-white/15 bg-zinc-900 shadow-md shadow-black/40">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 h-6 px-3 bg-zinc-800/90 border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-red-400/80" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
        <span className="w-2 h-2 rounded-full bg-green-400/80" />
        <span className="ml-2 flex-1 truncate rounded bg-black/40 px-2 py-0.5 text-[9px] text-zinc-400">
          {host}
        </span>
      </div>

      {/* Screenshot / silent video */}
      <div className="relative aspect-video bg-zinc-950">
        {video ? (
          <LazyVideo src={video} className="h-full w-full object-cover object-top" />
        ) : image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${title} preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-500/20 to-fuchsia-500/20 text-sm font-medium text-white">
            {title}
          </div>
        )}
        <div className="absolute bottom-2 right-2 rounded px-2 py-0.5 text-[10px] font-medium glass-effect backdrop-blur-medium">
          {status}
        </div>
      </div>
    </div>
  );
}
