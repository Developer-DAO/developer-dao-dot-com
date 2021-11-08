import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  AlchemyProvider,
  FallbackProvider,
  InfuraProvider,
} from '@ethersproject/providers';

import {
  DEVELOPER_DAO_CONTRACT,
  DEVELOPER_DAO_CONTRACT_NETWORK_PROVIDER,
} from '../utils/DeveloperDaoConstants';
import { Ddao__factory } from '../../types/ethers-contracts/factories/Ddao__factory';

// TokenIDs start at 1. Tokens 1-7777 (supply of 7777) are open to mint by anyone. 7778-8000 are locked to mint by contract owner
const MAX_SUPPLY = 8000;
const PUBLIC_MAX_SUPPLY = 7777;

export function useDevNFTSupply() {
  const [totalSupply, setTotalSupply] = useState<number>(-1);
  const [lockedSupply, setLockedSupply] = useState<number>(-1);
  const [uniqueTokenHolderCount, setUniqueTokenHolderCount] =
    useState<number>(-1);

  useEffect(() => {
    const fetch = async () => {
      const contract = Ddao__factory.connect(
        DEVELOPER_DAO_CONTRACT,
        new FallbackProvider([
          {
            provider: new InfuraProvider(
              DEVELOPER_DAO_CONTRACT_NETWORK_PROVIDER,
            ),
          },
          {
            provider: new AlchemyProvider(
              DEVELOPER_DAO_CONTRACT_NETWORK_PROVIDER,
            ),
          },
        ]),
      );

      // Get all TransferEvents
      const transferredTokens = await contract.queryFilter(
        contract.filters.Transfer(),
        0,
        'latest',
      );

      // Track the latest owner of each token
      const claimedTokens: Record<string, string> = {};
      transferredTokens.forEach((tx) => {
        const tokenId = tx.args.tokenId.toNumber();
        claimedTokens[tokenId] = tx.args.to;
      });

      // Amount of minted tokens
      const totalSupply = Object.keys(claimedTokens).length;

      // Put the addresses in a set to get the amount of unique addresses
      const uniqueAddresses = new Set<string>(Object.values(claimedTokens));

      // Count how many tokens of the locked supply have been minted
      let countLockedAndMinted = 0;
      for (
        let lockedTokenId = PUBLIC_MAX_SUPPLY + 1;
        lockedTokenId <= MAX_SUPPLY;
        lockedTokenId++
      ) {
        if (
          claimedTokens[lockedTokenId] &&
          claimedTokens[lockedTokenId] !== ethers.constants.AddressZero
        )
          countLockedAndMinted++;
      }

      setLockedSupply(countLockedAndMinted);
      setTotalSupply(totalSupply);
      setUniqueTokenHolderCount(uniqueAddresses.size);
    };

    fetch();
  }, []);

  return {
    isLoading:
      totalSupply === -1 ||
      lockedSupply === -1 ||
      uniqueTokenHolderCount === -1,

    // This is the amount of total minted DEV NFTs, same as calling `totalSupply()` on the contract
    totalSupply,

    // Count of unique token holder addresses
    uniqueTokenHolders: uniqueTokenHolderCount,

    // This is the amount of minted DEV NFTs that only the contract owner can mint (TokenIDs 7778-8000, incl.)
    lockedSupply,

    // This is the amount of publicly minted DEV NFTs, which is open to mint by anyone (TokenIDs 1-7777, incl.)
    publicSupply: totalSupply - lockedSupply,

    // Total number of possible DEV NFT. This is a constant that cannot be changed
    maxSupply: MAX_SUPPLY,

    // Some calculations to make these values easily accessible for display in UI
    remainingTotalSupply: MAX_SUPPLY - totalSupply,
    remainingPublicSupply: PUBLIC_MAX_SUPPLY - (totalSupply - lockedSupply),
    remainingLockedSupply: MAX_SUPPLY - PUBLIC_MAX_SUPPLY - lockedSupply,
  };
}
