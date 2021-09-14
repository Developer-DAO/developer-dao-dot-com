import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconOpenSea, IconEtherscan, IconTwitter, IconDiscord } from '../Icons';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-gray-200 py-10">
      <div className="container mx-auto max-w-6xl px-4 flex justify-center items-center flex-col">
        <h5 className="text-sm mb-4 text-gray-600">
          {t('madeBy')}
          <a
            className="underline text-blue-400"
            href="https://github.com/thomasmetta/developer-dao"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </h5>
        <ul className="flex mb-4">
          <li>
            <a
              title="OpenSea"
              className="mx-2 block"
              href="https://opensea.io/collection/devs-for-revolution"
              target="_blank"
              rel="noreferrer"
            >
              <IconOpenSea />
            </a>
          </li>
          <li>
            <a
              title="Etherscan"
              className="mx-2 block"
              href="https://etherscan.io/address/0x25ed58c027921e14d86380ea2646e3a1b5c55a8b"
              target="_blank"
              rel="noreferrer"
            >
              <IconEtherscan />
            </a>
          </li>
          <li>
            <a
              title="Twitter"
              className="mx-2 block"
              href="https://twitter.com/developer_dao"
              target="_blank"
              rel="noreferrer"
            >
              <IconTwitter />
            </a>
          </li>
          <li>
            <a
              title="Discord"
              className="mx-2 block"
              href="https://discord.gg/zRnZpzzY"
              target="_blank"
              rel="noreferrer"
            >
              <IconDiscord />
            </a>
          </li>
        </ul>
        <p className="text-gray-500 mb-2">
          <small>{t('hosting')}</small>
        </p>
        <a
          className="pl-1"
          target="_blank"
          rel="noopener noreferrer"
          href="https://vercel.com?utm_source=developerdao&utm_campaign=oss"
        >
          <img
            alt="Powered by Vercel"
            height="32"
            src="https://raw.githubusercontent.com/nextauthjs/next-auth/canary/www/static/img/powered-by-vercel.svg"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
