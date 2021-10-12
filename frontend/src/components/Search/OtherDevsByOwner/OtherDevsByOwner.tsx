import React, { useState } from 'react';
import { NftMetadata } from 'use-nft';
import { useTranslation } from 'react-i18next';
import { Flex, Link, Text } from '@chakra-ui/react';

import { Contract } from 'ethers';
import { useEffect } from 'react';
import { SITE_URL } from '../../../utils/DeveloperDaoConstants';

const cache: { [key: string]: number[] } = {};

function OtherDevsByOwnerContainer({
  nft,
  contract,
}: {
  nft: NftMetadata;
  contract: Contract;
}) {
  const [otherDevs, setOtherDevs] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      onMount(nft?.owner);
    }
  }, [nft, contract]);
  async function onMount(addr?: string) {
    if (addr && contract) {
      setLoading(() => true);
      const _otherDevs: number[] =
        cache[nft.owner] || (await fetchOtherDevsForAddr(nft.owner));
      setOtherDevs(() => _otherDevs);
      setLoading(() => false);
    }
  }
  async function fetchOtherDevsForAddr(ownerAddr: string) {
    const devsArr: number[] = [];
    const tokensOwnedByAddress = parseInt(
      (await contract.functions?.balanceOf(ownerAddr)).toString(),
    );
    for (let i = 0; i < tokensOwnedByAddress; i++) {
      const otherToken = (
        await contract.functions.tokenOfOwnerByIndex(ownerAddr, i)
      ).toString();
      devsArr.push(parseInt(otherToken));
    }
    const sortedDevs = devsArr.sort((a, b) => a - b);
    cache[ownerAddr] = sortedDevs;
    return sortedDevs;
  }
  return (
    <OtherDevsByOwner
      otherDevs={otherDevs}
      loading={loading}
      currentDevName={nft.name}
      data-testid="otherDevs"
    ></OtherDevsByOwner>
  );
}

export function OtherDevsByOwner({
  otherDevs,
  loading,
  currentDevName,
}: {
  otherDevs: number[];
  loading: boolean;
  currentDevName: string;
}) {
  const { t } = useTranslation();

  if (loading) return <Text>{t('loading')}</Text>;
  else if (otherDevs.length === 1)
    return <Text fontSize="xs">{t('noOtherTokens')}</Text>;
  else if (otherDevs.length > 1) {
    return (
      <>
        <Text mt={12} fontWeight="bold">
          {t('otherTokensOwnedByThisAddress')} ({otherDevs.length - 1})
        </Text>
        <Flex align="center" justify="center" wrap="wrap" w="100%">
          {otherDevs.map(
            (dev, i) =>
              currentDevName !== 'Dev #' + dev && (
                <Link
                  as="a"
                  rel="noreferrer"
                  fontSize="sm"
                  key={i}
                  m={1}
                  className="margin-inline-start"
                  href={`${SITE_URL}/?id=${dev}`}
                >
                  #{dev}
                </Link>
              ),
          )}
        </Flex>
      </>
    );
  } else {
    return <></>;
  }
}
export default OtherDevsByOwnerContainer;
