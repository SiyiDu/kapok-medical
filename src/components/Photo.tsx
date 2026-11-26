import { type Photo as PhotoData, photoUrl } from "@/content/photos";

const WIDTHS = [480, 800, 1200, 1600, 2400];

/** Another crop of the same picture for some screens: `media` picks it, `ratio` (width / height) shapes it. */
export type PhotoCrop = { media: string; ratio: number; sizes?: string };

/**
 * A responsive photograph. Give it `ratio` (width / height) to crop every size
 * to the same shape; leave it out for a background that fills its box.
 * `crops` swaps in other shapes at other screen sizes; the first whose `media` matches is used.
 */
export function Photo({
  photo,
  className,
  sizes = "100vw",
  ratio,
  crops,
  priority = false,
  decorative = false,
}: {
  photo: PhotoData;
  className?: string;
  sizes?: string;
  ratio?: number;
  crops?: PhotoCrop[];
  /** Load eagerly: only for the picture at the top of a page. */
  priority?: boolean;
  /** Hide from screen readers when the picture adds nothing to the text. */
  decorative?: boolean;
}) {
  const url = (w: number, r?: number) => photoUrl(photo, w, r ? Math.round(w / r) : undefined);
  const srcSet = (r?: number) => WIDTHS.map((w) => `${url(w, r)} ${w}w`).join(", ");
  const img = (
    // Plain <img>: the site is a static export, so there is no image optimiser to route through.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url(1200, ratio)}
      srcSet={srcSet(ratio)}
      sizes={sizes}
      alt={decorative ? "" : photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className ? `photo object-cover ${className}` : "photo object-cover"}
    />
  );
  if (!priority && !crops) return img;
  // Inside <picture> React emits no preload hint, so a page's top photograph is not fetched by every page that links to it.
  return (
    <picture className="contents">
      {crops?.map((crop) => (
        <source key={crop.media} media={crop.media} srcSet={srcSet(crop.ratio)} sizes={crop.sizes ?? sizes} />
      ))}
      {img}
    </picture>
  );
}
