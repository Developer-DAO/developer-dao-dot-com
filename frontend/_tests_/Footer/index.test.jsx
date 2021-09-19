import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../src/components/Footer/index';
import testCommonLink from '../utils/testCommons';

describe('Footer', () => {
  it('Renders the github link', () => {
    render(<Footer />);

    const github = screen.getByTitle('Developer DAO GitHub organization');

    testCommonLink(github, 'https://github.com/Developer-DAO');
  });

  it('Renders the icons', () => {
    render(<Footer />);

    const openSea = screen.getByTitle('OpenSea');
    const etherscan = screen.getByTitle('Etherscan');
    const twitter = screen.getByTitle('Twitter');
    const discord = screen.getByTitle('Discord');

    testCommonLink(
      openSea,
      'https://opensea.io/collection/devs-for-revolution',
    );
    testCommonLink(
      etherscan,
      'https://etherscan.io/address/0x25ed58c027921e14d86380ea2646e3a1b5c55a8b',
    );
    testCommonLink(twitter, 'https://twitter.com/developer_dao');
    testCommonLink(discord, 'https://discord.gg/zRnZpzzY');
  });

  it('Renders the Vercel link', () => {
    render(<Footer />);

    const vercel = screen.getByTitle('Vercel');
    testCommonLink(
      vercel,
      'https://vercel.com?utm_source=developerdao&utm_campaign=oss',
    );
  });
});
