import { StrapiId, StrapiSingleData } from './strapi';

export type Media = {
  provider: 'local' | string;
  url: string;
};

export type Statement = StrapiId & {
  name: string;
  title: string;
  description: string;
};

export type Link = StrapiId & {
  name: string | SocialLinkName;
  title: string;
  type: LinkType;
  link: string;
  disabled: boolean | null;
};

export type SocialLinkName =
  | 'twitter'
  | 'discord'
  | 'github'
  | 'youtube'
  | 'opensea';

export type LinkType = 'link' | 'social';

export type MetaOpenGraph = StrapiId & {
  title: string;
  description: string;
  image: string;
  image_media: StrapiSingleData<Media>;
};
