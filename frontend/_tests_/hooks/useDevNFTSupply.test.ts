import { renderHook } from '@testing-library/react-hooks';

import useDevNFTSupply from '../../src/hooks/useDevNFTSupply';
import { Ddao__factory } from '../../types/ethers-contracts/factories/Ddao__factory';

jest.mock('../../types/ethers-contracts/factories/Ddao__factory');
const mockedDdaoFactory = Ddao__factory as jest.Mocked<typeof Ddao__factory>;

test('should return correct supply values & transition loading state', async () => {
  mockedDdaoFactory.connect.mockImplementationOnce((address, provider) => {
    return {
      totalSupply: async () => ({ toNumber: () => 2345 }),
      ownerOf: async (tokenId: number) => {
        if (tokenId === 8000)
          return '0x91d7a9e7c09477392290fe16c1b243e4a36d279a';

        throw Error();
      },
    } as any;
  });

  const { result, waitForValueToChange } = renderHook(() => useDevNFTSupply());

  expect(result.current.isLoading).toBe(true);
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current.isLoading).toBe(false);

  expect(result.current.maxSupply).toBe(8000);
  expect(result.current.totalSupply).toBe(2345);
  expect(result.current.lockedSupply).toBe(1);
  expect(result.current.publicSupply).toBe(2344);

  expect(result.current.remainingTotalSupply).toBe(8000 - 2345);
  expect(result.current.remainingPublicSupply).toBe(7777 - 2344);
  expect(result.current.remainingLockedSupply).toBe(8000 - 7777 - 1);
});

test('should correctly handle "all minted" state', async () => {
  mockedDdaoFactory.connect.mockImplementationOnce((address, provider) => {
    return {
      totalSupply: async () => ({ toNumber: () => 8000 }),
      ownerOf: async (tokenId: number) =>
        '0x91d7a9e7c09477392290fe16c1b243e4a36d279a',
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

  expect(result.current.remainingTotalSupply).toBe(0);
  expect(result.current.remainingPublicSupply).toBe(0);
  expect(result.current.remainingLockedSupply).toBe(0);
});
