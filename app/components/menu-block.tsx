"use client";

import FadeUp, { FADE_UP_STAGGER } from "./fade-up";
import ParallaxImage from "./parallax-image";

const MENU_IMAGE_CLASS = "h-[320px] w-full object-cover md:h-[480px]";

type MenuBlockProps = {
  image: string;
  alt: string;
  imageSide?: "left" | "right";
  delay?: number;
  children: React.ReactNode;
};

export default function MenuBlock({
  image,
  alt,
  imageSide = "left",
  delay = 0,
  children,
}: MenuBlockProps) {
  const imageEl = (
    <div
      className={`relative z-0 w-full shrink-0 md:w-[600px] ${
        imageSide === "right" ? "md:-ml-24" : ""
      }`}
    >
      <ParallaxImage
        src={image}
        alt={alt}
        imageClassName={MENU_IMAGE_CLASS}
        entryDelay={delay + FADE_UP_STAGGER.imageAfterText}
      />
    </div>
  );

  const cardEl = (
    <FadeUp
      variant="text"
      delay={delay}
      className={`relative z-10 min-w-0 flex-1 ${
        imageSide === "left" ? "md:-ml-24" : ""
      }`}
    >
      <div className="rounded-2xl bg-[#E4DBCA] p-10 text-[#1F1814] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(0,0,0,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none md:p-12">
        {children}
      </div>
    </FadeUp>
  );

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center">
      {imageSide === "left" ? (
        <>
          {imageEl}
          {cardEl}
        </>
      ) : (
        <>
          {cardEl}
          {imageEl}
        </>
      )}
    </div>
  );
}
