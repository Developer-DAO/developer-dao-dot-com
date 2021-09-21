import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@chakra-ui/react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

type PageProps = {
  children?: object;
};

function Page({ children }: PageProps) {
  return (
    <Stack spacing={10}>
      <Nav />
      {children}
      <Footer />
    </Stack>
  );
}

export default Page;
