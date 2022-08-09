import { Link, Media } from './general';
import { StrapiComponent, StrapiId, StrapiSingleData } from './strapi';

export type Footer = StrapiId & {
  logo: StrapiSingleData<Media>;
  useful_links: StrapiComponent<Link[]>;
  discover: StrapiComponent<Link[]>;
  social: StrapiComponent<Link[]>;
};
