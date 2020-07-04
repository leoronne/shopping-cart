import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { Grid } from './styles';

const DefaultLayout: React.FC = () => {
  return (
    <Grid>
      <Header />
      <Footer />
    </Grid>
  );
};

export default DefaultLayout;
