import { Media } from '../general';
import { StrapiId, StrapiSingleData } from '../strapi';

export type Partner = StrapiId & {
  name: string;
  website: string;
  logo_dark: StrapiSingleData<Media>;
  logo_light: StrapiSingleData<Media>;
};
