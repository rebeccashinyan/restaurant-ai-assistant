type GalleryMarqueeProps = {
  images: string[];
};

function MarqueeRow({
  images,
  direction = "left",
  offset = false,
}: {
  images: string[];
  direction?: "left" | "right";
  offset?: boolean;
}) {
  const track = [...images, ...images];

  return (
    <div
      className={`overflow-hidden py-3 ${
        offset ? "-ml-[120px] md:-ml-[220px]" : ""
      }`}
    >
      <div
        className={`gallery-marquee-row ${
          direction === "right" ? "animate-gallery-right" : "animate-gallery-left"
        }`}
      >
        {track.map((image, index) => (
          <img
            key={`row-${offset ? "b" : "t"}-${index}`}
            src={image}
            alt={`Sakura Bloom gallery ${(index % images.length) + 1}`}
            width={420}
            height={288}
            loading="lazy"
            className="h-72 w-[420px] shrink-0 rounded-2xl object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default function GallerySection({ images }: GalleryMarqueeProps) {
  // Split rather than mirror — sharing one set between both rows meant every
  // photograph appeared twice on screen.
  const split = Math.ceil(images.length / 2);
  const topRow = images.slice(0, split);
  const bottomRow = images.slice(split);

  return (
    <section className="overflow-hidden py-24">
      <div className="page-shell mb-14">
        <h2 className="font-serif text-4xl md:text-5xl">Our Gallery</h2>
      </div>

      <div className="flex flex-col gap-2">
        <MarqueeRow images={topRow} direction="left" />
        <MarqueeRow images={bottomRow} direction="right" offset />
      </div>
    </section>
  );
}
