import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

type CardProps = {
  title: string;
  description: string;
  bannerURL: string;
  tags: string[] | undefined;
  date: string | undefined;
  cta: ReactNode;
  avatarURLS: string[] | undefined;
};

export const Card = ({
  title,
  description,
  bannerURL,
  tags,
  date,
  cta,
  avatarURLS,
}: CardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative flex w-full min-w-0 max-w-sm flex-col rounded-3xl border border-t-0 border-[#2a2a2a] bg-[linear-gradient(323.75deg,#2e2e2e66_6.96%,#2a2a2a66_93.77%)] pb-2"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              384px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 104, 191, .18),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative">
        <img
          src={bannerURL}
          alt={`${title} banner`}
          className="aspect-[3/2] w-full rounded-3xl rounded-b-none object-cover"
        />
        {date && (
          <span className="absolute bottom-2 right-2 inline-flex items-center rounded-full border border-[#565656]/30 bg-[#565656]/30 px-2 py-1 text-sm font-medium text-white backdrop-blur">
            {date}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 py-4 px-4">
        {tags && (
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-[#565656]/30 bg-[#565656]/30 px-4 py-1 text-sm font-medium text-white backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-heading text-3xl font-bold leading-7 tracking-wide text-[#DBDBDB]">
          {title}
        </h3>

        <p className="leading-4 text-white/60">{description}</p>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-t-white/10 py-2 px-4">
        {avatarURLS && (
          <div className="flex -space-x-2">
            {avatarURLS.map((src) => (
              <img
                key={src}
                className="inline-block h-10 w-10 rounded-full"
                src={src}
                alt="avatar"
              />
            ))}
          </div>
        )}

        <button className="inline-flex items-center justify-center gap-x-2 rounded-full bg-white px-4 py-3 text-xs font-medium text-black/[85%] hover:bg-slate-100">
          {cta}
        </button>
      </div>
    </div>
  );
};
