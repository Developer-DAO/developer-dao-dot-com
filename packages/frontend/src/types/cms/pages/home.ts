import { Link, MetaOpenGraph, Statement } from "../general";
import { StrapiComponent, StrapiId, StrapiMultipleData } from "../strapi";
import { Partner } from "../collection";
import { Footer } from "../footer";

export type HomePage = {
  meta_og?: StrapiComponent<MetaOpenGraph>;
  heading?: string;
  sub_heading?: string;
  current_status?: CurrentStatus;
  values?: StrapiComponent<Statement>[];
  mission?: string;
  goals?: StrapiComponent<Statement>[];
  partners?: StrapiMultipleData<Partner>;
} & StrapiId;

export type CurrentStatus = {
  statement: StrapiComponent<Statement>;
  link: StrapiComponent<Link>;
};
