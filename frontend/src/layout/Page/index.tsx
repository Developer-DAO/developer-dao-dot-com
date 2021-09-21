import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@chakra-ui/react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

function Page({ children }) {
  return (
    <Stack spacing={10}>
      <Nav />
      {children}
      <Footer />
    </Stack>
  );
}

Page.propTypes = {
  children: PropTypes.object,
};

export default Page;
