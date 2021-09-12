import './App.css';
import React, { useCallback, useState } from 'react';
import { getDefaultProvider, Contract } from 'ethers';
import { useTranslation } from 'react-i18next';
import { NftProvider, useNft } from 'use-nft';
import logo from './images/ddao_logo.jpeg';

function App() {
  const { t } = useTranslation();
  const id = getSearchID();
  const [developerId, setDeveloperId] = useState(id);

  const ethersConfig = {
    ethers: { Contract },
    provider: getDefaultProvider('homestead'),
  };

  const updateDeveloperId = useCallback((e) => {
    if (e <= 8000) {
      setDeveloperId(e);
    }
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            src={logo}
            alt="hero"
            className="mb-5 w-32 h-32 object-cover object-center rounded-full"
          />

          <div className="text-center lg:w-2/3 w-full">
            <div className="flex justify-center">
              <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                <h1 className="mb-6 text-xl text-center">{t('searchId')}</h1>
                <input
                  placeholder="Search developer id"
                  value={developerId}
                  onChange={(e) => updateDeveloperId(e.target.value)}
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  className="w-full mb-6 bg-white bg-opacity-50 rounded focus:ring-2 focus:ring-indigo-200 focus:bg-transparent border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <NftProvider fetcher={['ethers', ethersConfig]}>
            <Nft developerId={developerId} />
          </NftProvider>
        </div>
      </section>
    </>
  );
}

function Nft(developerId) {
  const { t } = useTranslation();
  const { loading, error, nft } = useNft(
    '0x25ed58c027921E14D86380eA2646E3a1B5C55A8b',
    developerId.developerId,
  );

  if (loading) return <>{t('loading')}</>;

  if (!developerId.developerId) return <>{t('enterDeveloperId')}</>;

  if (error || !nft) return <>{t('error')}.</>;

  return (
    <>
      <img
        className="border-4 lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
        alt="hero"
        src={processBase64Img(nft.image)}
      />
      <h1>{nft.name}</h1>
      <h2>
        {t('owner')}: {nft.owner || t('unclaimed')}
      </h2>

      <h5 className="mt-10 text-m">
        {t('madeBy')}
        <a
          className="underline"
          href="https://github.com/thomasmetta/developer-dao"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </h5>
    </>
  );
}

function getSearchID() {
  const search = window.location.search;
  return new URLSearchParams(search).get('id') || 1;
}

const processBase64Img = (imgStr) => {
  const [formatInfo, base64Str] = imgStr.split(',');

  // The smart contract includes items with unescaped "&", which breaks SVG rendering
  const processedStr = atob(base64Str).replace(' & ', ' &amp; ');

  return formatInfo + ',' + btoa(processedStr);
};

export default App;
