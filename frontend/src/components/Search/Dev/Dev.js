import React, { useState } from 'react';
import { OPENSEA_DIRECT_LINK_PREFIX } from '../../../utils/DeveloperDaoContstants';

function Dev({ nft, developerId }) {
  return (
    <>
      {nft.owner ? (
        <a
          href={`${OPENSEA_DIRECT_LINK_PREFIX}/${developerId}`}
          target="_blank"
          rel="noreferrer"
          title={nft.owner}
        >
          {nft.name}
        </a>
      ) : (
        <h1 className="font-semibold mb-2">{nft.name}</h1>
      )}
    </>
  );
}

export default Dev;
