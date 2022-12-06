import Image from "next/image";
import NextLink from "next/link";
import { FC, useCallback } from "react";

import { Footer, Link, SocialLinkName } from "../types";
import { useTheme } from "next-themes";
import { Twitter, Youtube, GitHub } from "react-feather";
import OpenSeaIcon from "./OpenSeaIcon";
import Discord from "../../public/icons/discord.svg";

type FooterProps = {
  data: Footer;
};

const Footer: FC<FooterProps> = ({ data: footer }) => {
  const { theme } = useTheme();

  const getSocialIcon = useCallback(
    (name: SocialLinkName) => {
      return {
        twitter: Twitter,
        discord: Discord,
        github: GitHub,
        youtube: Youtube,
        opensea: OpenSeaIcon,
      }[name];
    },
    [theme]
  );

  return (
    <div className="mt-24 mb-12 w-full">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-footer">
        <NextLink href="/">
          <a>
            <div className="flex items-center justify-center">
              <Image
                src={`/D_D_logo-${theme === "dark" ? "dark" : "light"}.svg`}
                alt="D_D logo"
                width={80}
                height={80}
              />
              <span className="ml-5 text-3xl text-black dark:text-white">
                Developer DAO
              </span>
            </div>
          </a>
        </NextLink>

        <div className="flex flex-col items-center lg:items-start">
          <h2 className="my-6 text-2xl">Useful Links</h2>
          {listLinks(footer?.useful_links)}
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="my-6 text-2xl">Discover</h2>
          {listLinks(footer?.discover)}
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="my-6 text-2xl">Social</h2>
          <div className="flex gap-2">
            {footer?.social?.map((link) => {
              const SocialIcon = getSocialIcon(link.name as SocialLinkName);
              return (
                <a
                  key={link.id}
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon
                    size={24}
                    color={theme === "light" ? "black" : "white"}
                  />
                </a>
              );
            })}
          </div>
          <a
            className="relative h-14 w-36"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="https://raw.githubusercontent.com/nextauthjs/next-auth/canary/www/static/img/powered-by-vercel.svg"
              alt="Powered by Vercel"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const listLinks = (links: Link[] = []) =>
  links.map((link) => (
    <a key={link.id} className="mb-2 text-xl" href={link.link}>
      {link.title}
    </a>
  ));
export default Footer;
