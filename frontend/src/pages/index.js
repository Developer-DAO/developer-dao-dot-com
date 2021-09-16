import React, { useCallback, useState } from 'react';
import { getDefaultProvider, Contract } from 'ethers';
import { NftProvider, useNft } from 'use-nft';
import { useRouter } from 'next/router';
import Logo from '../components/Logo';
import PageLayout from '../layout/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function App() {
  const { t } = useTranslation();
  const router = useRouter();
  const id = router.query.id || 1;
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
    <PageLayout>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-4 pt-16 pb-8 items-center justify-center flex-col w-full max-w-md">
          <Logo className="mb-5 w-32 h-32 object-cover object-center rounded-full" />

          <div className="text-center w-full">
            <div className="flex justify-center">
              <div className="relative w-full text-left">
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
          {typeof window !== 'undefined' ? (
            <NftProvider fetcher={['ethers', ethersConfig]}>
              <Nft developerId={developerId} />
            </NftProvider>
          ) : (
            <>{t('loading')}</>
          )}
        </div>
      </section>
    </PageLayout>
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
        className="border-4 w-full mb-8 object-cover object-center rounded"
        alt="hero"
        src={processBase64Img(nft.image)}
      />
      <h1 className="font-semibold mb-2">{nft.name}</h1>
      {nft.owner ? (
        <a
          href={`https://etherscan.io/address/${nft.owner}`}
          target="_blank"
          rel="noreferrer"
          title={nft.owner || t('unclaimed')}
          className="text-xs sm:text-base max-w-full overflow-hidden bg-gray-300 rounded-full h-8 whitespace-nowrap flex items-center justify-center px-3 hover:bg-black hover:text-white transition-colors duration-300 ease-in-out "
        >
          {t('owner')}:&nbsp;
          <span className="max-w-xs">{nft.owner.slice(0, 30)}</span>...
          {nft.owner.slice(-4)}
        </a>
      ) : (
        <span className="max-w-full overflow-hidden bg-gray-300 rounded-full h-8 whitespace-nowrap flex items-center justify-center px-3">
          {t('owner')}:&nbsp;{t('unclaimed')}
        </span>
      )}
    </>
  );
}

const processBase64Img = (imgStr) => {
  const [formatInfo, base64Str] = imgStr.split(',');

  // The smart contract includes items with unescaped "&", which breaks SVG rendering
  const processedStr = atob(base64Str).replace(' & ', ' &amp; ');

  return formatInfo + ',' + btoa(processedStr);
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default App;
