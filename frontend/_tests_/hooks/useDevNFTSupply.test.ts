import { BigNumber } from '@ethersproject/bignumber';
import { renderHook } from '@testing-library/react-hooks';
import crypto from 'crypto';

import { useDevNFTSupply } from '../../src/hooks/useDevNFTSupply';
import { Ddao__factory } from '../../types/ethers-contracts/factories/Ddao__factory';

jest.mock('../../types/ethers-contracts/factories/Ddao__factory');

const mockedDdaoFactory = Ddao__factory as jest.Mocked<typeof Ddao__factory>;

test('should return correct supply values & transition loading state', async () => {
  mockedDdaoFactory.connect.mockImplementation((address, provider) => {
    return {
      queryFilter: async () => [
        {
          args: {
            tokenId: BigNumber.from(1),
            to: '0x91d7a9e7c09477392290fe16c1b243e4a36d279a',
          },
        },
        {
          args: {
            tokenId: BigNumber.from(8000),
            to: '0x91d7a9e7c09477392290fe16c1b243e4a36d279a',
          },
        },
      ],
      filters: { Transfer: () => {} },
    } as any;
  });

  const { result, waitForValueToChange } = renderHook(() => useDevNFTSupply());

  expect(result.current.isLoading).toBe(true);
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current.isLoading).toBe(false);

  expect(result.current.maxSupply).toBe(8000);
  expect(result.current.totalSupply).toBe(2);
  expect(result.current.lockedSupply).toBe(1);
  expect(result.current.publicSupply).toBe(1);

  expect(result.current.uniqueTokenHolders).toBe(1);

  expect(result.current.remainingTotalSupply).toBe(8000 - 2);
  expect(result.current.remainingPublicSupply).toBe(7777 - 1);
  expect(result.current.remainingLockedSupply).toBe(8000 - 7777 - 1);
});

test('should correctly handle "all minted" state', async () => {
  mockedDdaoFactory.connect.mockImplementation((address, provider) => {
    return {
      totalSupply: async () => ({ toNumber: () => 1 }),
      queryFilter: async () =>
        [...Array(8000)].map((_, idx) => ({
          args: {
            tokenId: BigNumber.from(idx + 1),
            to: `0x${crypto.randomBytes(32).toString('hex')}`,
          },
        })),
      filters: { Transfer: () => {} },
    } as any;
  });

  const { result, waitForValueToChange } = renderHook(() => useDevNFTSupply());

  expect(result.current.isLoading).toBe(true);
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current.isLoading).toBe(false);

  expect(result.current.maxSupply).toBe(8000);
  expect(result.current.totalSupply).toBe(8000);
  expect(result.current.lockedSupply).toBe(8000 - 7777);
  expect(result.current.publicSupply).toBe(7777);

  expect(result.current.uniqueTokenHolders).toBe(8000);

  expect(result.current.remainingTotalSupply).toBe(0);
  expect(result.current.remainingPublicSupply).toBe(0);
  expect(result.current.remainingLockedSupply).toBe(0);
});
