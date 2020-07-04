import React from 'react';
import ReactTooltip from 'react-tooltip';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Homepage from '../../pages/Homepage';

import { Grid } from './styles';

const DefaultLayout: React.FC = () => {
  return (
    <Grid>
      <Header />
      <Homepage />
      <Footer />
      <ReactTooltip place="top" type="dark" effect="solid" />
    </Grid>
  );
};

export default DefaultLayout;
