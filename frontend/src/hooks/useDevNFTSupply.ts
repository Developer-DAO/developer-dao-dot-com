import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import {
  DEVELOPER_DAO_CONTRACT,
  DEVELOPER_DAO_CONTRACT_ABI,
} from '../utils/DeveloperDaoConstants';
import {
  AlchemyProvider,
  FallbackProvider,
  InfuraProvider,
} from '@ethersproject/providers';

// TokenIDs start at 1. Tokens 1-7777 (supply of 7777) are open to mint by anyone. 7778-8000 are locked to mint by contract owner
const MAX_SUPPLY = 8000;
const PUBLIC_MAX_SUPPLY = 7777;

const contract = new ethers.Contract(
  DEVELOPER_DAO_CONTRACT,
  DEVELOPER_DAO_CONTRACT_ABI,
  new FallbackProvider([
    { provider: new InfuraProvider() },
    { provider: new AlchemyProvider() },
  ]),
);

export default function useDevNFTSupply() {
  const [totalSupply, setTotalSupply] = useState<number>(-1);
  const [lockedSupply, setLockedSupply] = useState<number>(-1);

  useEffect(() => {
    // Fetches the count of minted DEV NFTs
    const fetchTotalSupply = async () => {
      const totalSupply: number = (
        await contract.functions.totalSupply()
      )[0].toNumber();

      setTotalSupply(totalSupply);
    };

    // Counts how many tokens of the locked supply have been minted
    const fetchLockedSupply = async () => {
      const requests = [];

      for (
        let lockedTokenId = PUBLIC_MAX_SUPPLY + 1;
        lockedTokenId <= MAX_SUPPLY;
        lockedTokenId++
      ) {
        requests.push(
          contract.functions.ownerOf(lockedTokenId).then(
            // Return the owner's address
            (addressResponse) => addressResponse[0],
            // Return the zero-address if no owner was found
            () => ethers.constants.AddressZero,
          ),
        );
      }

      const addresses = await Promise.all(requests);

      const countMinted = addresses.reduce(
        (count, address) =>
          address !== ethers.constants.AddressZero ? ++count : count,
        0,
      );

      setLockedSupply(countMinted);
    };

    fetchTotalSupply();
    fetchLockedSupply();
  }, []);

  return {
    loading: totalSupply === -1 || lockedSupply === -1,
    // This is the amount of total minted DEV NFTs, same as calling `totalSupply()` on the contract
    totalSupply,
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
