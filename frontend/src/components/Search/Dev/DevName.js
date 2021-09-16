import React, { useState } from 'react';
import { OPENSEA_DIRECT_LINK_PREFIX } from '../../../utils/DeveloperDaoContstants';
import { Button, VStack } from '@chakra-ui/react';
import IconOpenSea from '../../Icons/opensea';

function DevName({ nft, developerId }) {
  return (
    <>
      {nft.owner ? (
        <Button
          as="a"
          href={`${OPENSEA_DIRECT_LINK_PREFIX}/${developerId}`}
          target="_blank"
          rel="noreferrer"
          title={nft.owner}
          leftIcon={<IconOpenSea />}
          size="lg"
          fontSize={{ base: 'xs', sm: 'md' }}
        >
          {nft.name}
        </Button>
      ) : (
        <h1 className="font-semibold mb-2">{nft.name}</h1>
      )}
    </>
  );
}

export default DevName;
