import React, { useState } from 'react';
import { NftMetadata } from 'use-nft';
import { OPENSEA_DIRECT_LINK_PREFIX } from '../../../utils/DeveloperDaoConstants';
import { Button, VStack } from '@chakra-ui/react';
import IconOpenSea from '../../Icons/opensea';

type DevNameProps = {
  nft: NftMetadata;
  developerId: string;
};

function DevName({ nft, developerId }: DevNameProps) {
  if (nft.owner) {
    return (
      <Button
        as="a"
        href={`${OPENSEA_DIRECT_LINK_PREFIX}/${developerId}`}
        target="_blank"
        rel="noreferrer"
        title={nft.owner}
        leftIcon={<IconOpenSea width="24" height="24" />}
        iconSpacing="3"
        fontSize={{ base: 'xs', sm: 'md' }}
      >
        {nft.name}
      </Button>
    );
  }

  return (
    <Button
      title={nft.owner}
      disabled={true}
      fontSize={{ base: 'xs', sm: 'md' }}
    >
      {nft.name}
    </Button>
  );
}

export default DevName;
