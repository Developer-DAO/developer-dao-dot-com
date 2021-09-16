import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

function Page({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.object,
};

export default Page;
