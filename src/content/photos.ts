/**
 * Every photograph on the site, in one place.
 *
 * All of them are from Unsplash and free for commercial use under the Unsplash
 * License (https://unsplash.com/license). They are illustrative: none of them
 * shows a named hospital, a member of the team or a patient. The copy never
 * claims otherwise, and the disclaimer page says it in so many words.
 * Swap any of them for your own pictures as soon as you have them.
 */

export type Photo = {
  /** Unsplash image id. */
  id: string;
  /** What the picture shows, for screen readers. */
  alt: string;
  /** Photographer, for the credits in the README. */
  by: string;
  /** Optional caption, shown under the photograph in a page header. Only for a picture of something real and named. */
  caption?: string;
  /** Optional: the point to keep in frame when the picture is cropped to another shape, as fractions from its top-left corner. */
  focus?: { x: number; y: number };
};

export const photos = {
  hero: {
    id: "photo-1634647626758-ad751a260e9f",
    alt: "The Shenzhen skyline across Shenzhen Bay at dusk",
    by: "darmau",
  },
  bay: {
    id: "photo-1634647626782-f5fffa9fd9b1",
    alt: "Shenzhen’s towers across the bay at blue hour",
    by: "darmau",
    caption: "Shenzhen Bay at blue hour",
  },
  clinic: {
    id: "photo-1648775507324-b48dd3791fa5",
    alt: "A quiet white reception room with a small tree",
    by: "rawkkim",
  },
  airport: {
    id: "photo-1633619363434-e878a082b634",
    alt: "The honeycomb ceiling of Shenzhen Bao’an airport",
    by: "juniperphoton",
    caption: "Shenzhen Bao’an International Airport",
  },
  corridor: {
    id: "photo-1719934398679-d764c1410770",
    alt: "A curved, light-filled corridor with a row of seats",
    by: "arturoeg_foto",
    // Keeps the seats whole in a tall crop.
    focus: { x: 0.56, y: 0.5 },
  },
  waiting: {
    id: "photo-1759262151080-e05ba1c6294f",
    alt: "Someone reading in a quiet private waiting room",
    by: "___atmos",
    // An upright picture: a wide crop from its middle would show the wall above the reader.
    focus: { x: 0.5, y: 0.66 },
  },
  terminal: {
    id: "photo-1561131668-f63504fc549d",
    alt: "Travellers silhouetted against a low sun in an airport terminal",
    by: "arturtumasjan",
  },
  kapok: {
    id: "photo-1703802064935-ae104c1b6fc0",
    alt: "Two crested mynas among red kapok blossoms on bare branches",
    by: "zeonjat",
    // The tree the placeholder name comes from: if the name changes, this picture and its caption go with it.
    caption: "Kapok in bloom, the city flower of Guangzhou",
  },
  guangzhou: {
    id: "photo-1544594376-0a9a6ae2c997",
    alt: "The Guangzhou skyline and Canton Tower at sunset",
    by: "ideasboom",
  },
} satisfies Record<string, Photo>;

/**
 * Address of one size of a photo. Images are served by Unsplash's image CDN,
 * which resizes on request. To host the files yourself, save them under
 * /public/photos and return a local path from here instead.
 */
export function photoUrl(photo: Photo, width: number, height?: number) {
  const size = height ? `&w=${width}&h=${height}` : `&w=${width}`;
  // Without a height nothing is cut away, so there is nothing to aim.
  const aim = height && photo.focus ? `&crop=focalpoint&fp-x=${photo.focus.x}&fp-y=${photo.focus.y}` : "";
  return `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&q=72${size}${aim}`;
}
