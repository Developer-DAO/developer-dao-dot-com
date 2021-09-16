import React, { useState } from 'react';
import { OPENSEA_DIRECT_LINK_PREFIX } from '../../../utils/DeveloperDaoContstants';
import { Button, VStack } from '@chakra-ui/react';
import IconOpenSea from '../../Icons/opensea';

function DevName({ nft, developerId }) {
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
      disabled="true"
      fontSize={{ base: 'xs', sm: 'md' }}
    >
      {nft.name}
    </Button>
  );
}

export default DevName;
