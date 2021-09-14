import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { IconGitHub } from '../Icons';
import Logo from '../Logo';

function Nav() {
  const { t } = useTranslation();

  return (
    <div className="border-b border-gray-200">
      <div className="container mx-auto max-w-6xl h-14 px-4 flex justify-between">
        <Link href="/">
          <a
            title={t('title')}
            className="h-14 flex items-center text-gray-600 hover:text-black transition-colors duration-300 ease-in-out"
          >
            <Logo className="rounded-full h-7 w-7 mr-2" />
            <span className="font-bold text-sm">{t('title')}</span>
          </a>
        </Link>
        <div>
          <a
            href="https://github.com/Developer-DAO/developer-dao"
            target="_blank"
            rel="noreferrer"
            title="https://github.com/Developer-DAO/developer-dao"
            className="flex items-center justify-center h-14 opacity-60 hover:opacity-100 transition-opacity duration-300 ease-in-out"
          >
            <IconGitHub className="h-7 w-7" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
