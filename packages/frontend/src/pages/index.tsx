import { useCallback, useRef } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import SparkleWhite from "../../public/icons/sparkle-white.svg";
import Scroll from "../../public/icons/scroll.svg";
import Discord from "../../public/icons/discord.svg";
import PartnerIcon from "../../public/icons/partner.svg";

import { client } from "../hooks/useUrql";
import type {
  General,
  HomePage,
  Media,
  Partner,
  StrapiSingleData,
} from "../types";
import { Eye } from "react-feather";
import { Card } from "@/components/Card";

type HomeProps = {
  general: StrapiSingleData<General>;
  homePage: StrapiSingleData<HomePage>;
};

const blogCards = [
  {
    title: "A Gentle Introduction to Decentralized Storage",
    description: `A blog post explaining Decentralized storage, how it works,
  and popular dStorage protocols & platforms like IPFS, Swarm,
  Filecoin, etc.`,
    bannerURL: "https://picsum.photos/600",
    tags: ["Web3", "Defi"],
    date: "Nov 28",
    avatarURLS: [
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ],
    cta: (
      <>
        <Eye size={16} className="stroke-black" />
        Read
      </>
    ),
  },
  {
    title: "A Gentle Introduction to Decentralized Storage",
    description: `A blog post explaining Decentralized storage, how it works,
  and popular dStorage protocols & platforms like IPFS, Swarm,
  Filecoin, etc.`,
    bannerURL: "https://picsum.photos/600",
    tags: ["Web3", "Defi"],
    date: "Nov 28",
    avatarURLS: [
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ],
    cta: (
      <>
        <Eye size={16} className="stroke-black" />
        Read
      </>
    ),
  },
  {
    title: "A Gentle Introduction to Decentralized Storage",
    description: `A blog post explaining Decentralized storage, how it works,
  and popular dStorage protocols & platforms like IPFS, Swarm,
  Filecoin, etc.`,
    bannerURL: "https://picsum.photos/600",
    tags: ["Web3", "Defi"],
    date: "Nov 28",
    avatarURLS: [
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ],
    cta: (
      <>
        <Eye size={16} className="stroke-black" />
        Read
      </>
    ),
  },
  {
    title: "A Gentle Introduction to Decentralized Storage",
    description: `A blog post explaining Decentralized storage, how it works,
  and popular dStorage protocols & platforms like IPFS, Swarm,
  Filecoin, etc.`,
    bannerURL: "https://picsum.photos/600",
    tags: ["Web3", "Defi"],
    date: "Nov 28",
    avatarURLS: [
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ],
    cta: (
      <>
        <Eye size={16} className="stroke-black" />
        Read
      </>
    ),
  },
  {
    title: "A Gentle Introduction to Decentralized Storage",
    description: `A blog post explaining Decentralized storage, how it works,
  and popular dStorage protocols & platforms like IPFS, Swarm,
  Filecoin, etc.`,
    bannerURL: "https://picsum.photos/600",
    tags: ["Web3", "Defi"],
    date: "Nov 28",
    avatarURLS: [
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ],
    cta: (
      <>
        <Eye size={16} className="stroke-black" />
        Read
      </>
    ),
  },
];

const Home: NextPage<HomeProps> = ({ homePage }) => {
  const { theme } = useTheme();
  const { partners } = homePage.data?.attributes || {};
  const partnersRef = useRef<HTMLElement>(null);

  const handleScrollToPartners = () =>
    partnersRef.current!.scrollIntoView({ behavior: "smooth" });

  const getLogo = useCallback(
    (partner: Partner) =>
      theme === "dark"
        ? partner.logo_dark.data?.attributes
        : partner.logo_light.data?.attributes,
    [theme]
  );

  const getLogoSrc = useCallback(
    (logo?: Media) =>
      logo
        ? logo.provider === "local"
          ? `${process.env.NEXT_PUBLIC_CMS_URL}${logo.url}`
          : logo.url
        : `/D_D_logo-${theme}.svg`,
    [theme]
  );

  return (
    <>
      <Head>
        <title>Developer DAO</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center">
        <section className="flex h-screen w-full flex-col items-center justify-center bg-center bg-no-repeat p-5 md:bg-[url(/home.svg)] md:p-0">
          <div className="relative p-5">
            <h1 className="mt-0 mb-5 text-center font-heading text-4xl font-bold uppercase lg:text-7xl">
              Buidl web3 <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u> with frens
            </h1>
            <div className="absolute -top-8 -right-8 hidden xl:block">
              <SparkleWhite />
            </div>
            <div className="absolute -top-12 -right-12 hidden xl:block">
              <SparkleWhite style={{ transform: "scale(0.5)" }} />
            </div>
          </div>
          <h2 className="mt-0 mb-6 max-w-3xl text-center text-lg opacity-60 lg:text-2xl">
            Developer DAO is a community of thousands of web3 builders creating
            a better internet. Join us and help create the future!
          </h2>
          <div className="relative mb-5 flex gap-4">
            <a href="https://developerdao.com" target="_blank" rel="noreferrer">
              <button className="h-14 rounded-full bg-white px-8 text-xs text-black hover:bg-slate-100 md:text-base">
                Claim $CODE
              </button>
            </a>
            <a href="https://developerdao.com" target="_blank" rel="noreferrer">
              <button className="flex h-14 items-center gap-3 rounded-full border bg-[#151515]/70 px-5 text-xs md:text-base lg:px-8">
                <Discord />
                <div>
                  <div>Join Discord</div>
                  <div className="text-[8px] opacity-60 md:text-xs">
                    (via Guild.xyz)
                  </div>
                </div>
              </button>
            </a>

            <div className="absolute inset-x-0 -bottom-32 flex justify-center">
              <button onClick={handleScrollToPartners}>
                <Scroll />
              </button>
            </div>
          </div>
        </section>

        <section
          ref={partnersRef}
          className="mt-14 flex w-full flex-col justify-center lg:mt-0"
        >
          <h2 className="mt-0 mb-14 text-center font-heading text-6xl font-bold uppercase text-[#DBDBDB]">
            <span className="relative">
              Partners
              <SparkleWhite className="absolute -top-3 -right-9 inline scale-50" />
            </span>
          </h2>

          <div className="mb-14 flex flex-col items-center justify-center">
            <div className="mb-14 flex flex-wrap justify-center gap-8 md:gap-4">
              {partners?.data ? (
                partners.data.map((partnerEntity) => {
                  return (
                    <Link
                      href={partnerEntity.attributes.website}
                      key={partnerEntity.id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <a className="relative h-14 w-52">
                        <Image
                          src={getLogoSrc(getLogo(partnerEntity.attributes))}
                          alt={partnerEntity.attributes.name || "partner image"}
                          layout="fill"
                          objectFit="contain"
                        />
                      </a>
                    </Link>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            <a
              href="https://airtable.com/shrYLrOrjhOHJUdVl"
              target="_blank"
              rel="noreferrer"
            >
              <button className="flex h-14 items-center gap-3 rounded-full border bg-[#151515]/70 px-8">
                <PartnerIcon />
                <div>Become a Partner</div>
              </button>
            </a>
          </div>
        </section>
      </main>

      <section className="relative isolate mt-14 flex w-full flex-col lg:mt-24 lg:mb-24">
        {/* <div className="absolute right-0 bottom-0 z-10 -mr-8 h-[83%] w-64 overflow-hidden bg-[linear-gradient(270deg,#000000_0%,#00000000_87.03%)]"></div> */}
        <h2 className="mt-0 mb-14 font-heading text-6xl font-bold uppercase text-[#DBDBDB]">
          <span className="relative">
            Blog
            <SparkleWhite className="absolute -top-3 -right-9 inline scale-50" />
          </span>
        </h2>
        <div className="relative z-0 -mr-8 flex min-w-full flex-wrap gap-9 2xl:gap-16">
          {/* CARDS */}
          {blogCards.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await client
    .query(
      `
    query HomePage {
      homePage {
        data {
          attributes {
            meta_og {
              id
              title
              description
              image
              image_media {
                data {
                  id
                  attributes {
                    provider
                    url
                  }
                }
              }
            }
            heading
            sub_heading
            current_status {
              statement {
                id
                name
                title
                description
              }
              link {
                id
                name
                type
                  title
                link
                disabled
              }
            }
            values {
              id
              name
              description
              title
            }
            mission
            goals {
              id
              name
              description
              title
            }
            partners {
              data {
                id
                attributes {
                  name
                  website
                  logo_dark {
                    data {
                      attributes {
                        provider
                        url
                      }
                    }
                  }
                  logo_light {
                    data {
                      attributes {
                        provider
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
      {}
    )
    .toPromise();

  return {
    props: data,
  };
};

export default Home;
