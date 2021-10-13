import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OtherDevsByOwnerContainer, {
  OtherDevsByOwner,
} from '../../../src/components/Search/OtherDevsByOwner/OtherDevsByOwner';
import testCommonLink from '../../utils/testCommons';
import { SITE_URL } from '../../../src/utils/DeveloperDaoConstants';
import { ownedDeveloperNFT } from '../../mocks/DeveloperNFT';

describe('Other Devs By Owner Container gets ', () => {
  it('Renders owned tokens returned by contract', async () => {
    const contract = {
      functions: {
        balanceOf: jest.fn().mockResolvedValue(2),
        tokenOfOwnerByIndex: jest
          .fn()
          .mockResolvedValueOnce(2669)
          .mockResolvedValueOnce(1950),
      },
    };
    const { rerender } = render(
      <OtherDevsByOwnerContainer nft={ownedDeveloperNFT} contract={contract} />,
    );

    const otherDevs = await screen.findAllByRole('link');
    expect(otherDevs).toHaveLength(1);
    expect(contract.functions.tokenOfOwnerByIndex).toHaveBeenCalledTimes(2);

    // rerender and validate that cached values are used
    rerender(
      <OtherDevsByOwnerContainer nft={ownedDeveloperNFT} contract={contract} />,
    );
    await screen.findByRole('link');
    expect(contract.functions.tokenOfOwnerByIndex).toHaveBeenCalledTimes(2);
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
    fireEvent.click(devName);
    testCommonLink(devName, `${SITE_URL}/?id=1950`);
  });
});
