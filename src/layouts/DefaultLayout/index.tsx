import React from 'react';

import { Header, Footer, LoaderSpinner } from '../../components';

import Homepage from '../../pages/Homepage';
import Error from '../../pages/Error';

import { useVouchers, useProducts } from '../../hooks';

import { Grid } from './styles';

const DefaultLayout: React.FC = () => {
  const { loadingProd, errorProd } = useProducts();
  const { loadingVouc, errorVouc } = useVouchers();

  const Content: React.FC = () => {
    if (errorProd || errorVouc) {
      return <Error />;
    }

    return <Homepage />;
  };

  if (loadingProd || loadingVouc) return <LoaderSpinner />;

  return (
    <Grid>
      <Header />

      <Content data-testid="main-content" />

      <Footer />
    </Grid>
  );
};

export default DefaultLayout;
