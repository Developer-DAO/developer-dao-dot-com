import type { Link, Media } from "./general";
import type { StrapiComponent, StrapiId, StrapiSingleData } from "./strapi";

export type Footer = StrapiId & {
  logo: StrapiSingleData<Media>;
  useful_links: StrapiComponent<Link[]>;
  discover: StrapiComponent<Link[]>;
  social: StrapiComponent<Link[]>;
};
