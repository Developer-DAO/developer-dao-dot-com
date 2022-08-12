import { Link, MetaOpenGraph, Statement } from '../general';
import { StrapiComponent, StrapiId, StrapiMultipleData } from '../strapi';
import { Partner } from '../collection';
import { Footer } from '../footer';

export type HomePage = {
  meta_og?: StrapiComponent<MetaOpenGraph>;
  heading?: string;
  sub_heading?: string;
  news_ticker?: object;
  current_status?: CurrentStatus;
  values?: StrapiComponent<Statement>[];
  mission?: string;
  goals?: StrapiComponent<Statement>[];
  partners?: StrapiMultipleData<Partner>;
  footer?: Footer;
} & StrapiId;

export type CurrentStatus = {
  statement: StrapiComponent<Statement>;
  link: StrapiComponent<Link>;
};
