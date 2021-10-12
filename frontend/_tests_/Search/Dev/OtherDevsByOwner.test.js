import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import OtherDevsByOwnerContainer, {
  OtherDevsByOwner,
} from '../../../src/components/Search/OtherDevsByOwner/OtherDevsByOwner';
import { BigNumber } from 'ethers';
import testCommonLink from '../../utils/testCommons';
import { SITE_URL } from '../../../src/utils/DeveloperDaoConstants';
import { ownedDeveloperNFT } from '../../mocks/DeveloperNFT';

const mockContract = {
  functions: { balanceOf: () => {}, tokenOfOwnerByIndex: () => {} },
};
jest
  .spyOn(mockContract.functions, 'balanceOf')
  .mockResolvedValue(BigNumber.from('2'));
jest
  .spyOn(mockContract.functions, 'tokenOfOwnerByIndex')
  .mockResolvedValueOnce(BigNumber.from(2669));
jest
  .spyOn(mockContract.functions, 'tokenOfOwnerByIndex')
  .mockResolvedValueOnce(BigNumber.from(1950));
describe('Other Devs By Owner Container gets ', () => {
  it('Renders owned tokens returned by contract', async () => {
    render(
      <OtherDevsByOwnerContainer
        nft={ownedDeveloperNFT}
        contract={mockContract}
      />,
    );
    await act(() => Promise.resolve());
    const otherDevs = await screen.findAllByRole('link');
    expect(otherDevs).toHaveLength(1);
  });
});

describe('Address renders other devs', () => {
  it('Renders passed tokens and does not render current dev token', async () => {
    render(
      <OtherDevsByOwner
        currentDevName={'Dev #1694'}
        otherDevs={[1694, 1950]}
      />,
    );
    const devName = await screen.findByText('#1950');
    const items = await screen.findAllByRole('link');
    expect(items).toHaveLength(1);
    expect(devName).toBeInTheDocument();
    fireEvent.click(devName);
    testCommonLink(devName, `${SITE_URL}/?id=1950`);
    expect(devName).toBeEnabled();
  });
});
