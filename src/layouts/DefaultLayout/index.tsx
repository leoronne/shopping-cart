import React, { useContext } from 'react';
import ReactTooltip from 'react-tooltip';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loader from '../../components/LoaderSpinner';

import Homepage from '../../pages/Homepage';
import Error from '../../pages/Error';

import { Context as ProductContext } from '../../Context/ProductsContext';
import { Context as VoucherContext } from '../../Context/VouchersContext';

import { Grid } from './styles';

const DefaultLayout: React.FC = () => {
  const { loadingProd, errorProd } = useContext(ProductContext);
  const { loadingVouc, errorVouc } = useContext(VoucherContext);

  function Content() {
    if (errorProd || errorVouc) {
      return <Error />;
    }

    return <Homepage />;
  }

  return (
    <Grid>
      <Header />
      {loadingProd || loadingVouc ? <Loader /> : <Content data-testid="main-content"/>}

      <Footer />
      <ReactTooltip place="top" type="dark" effect="solid" />
    </Grid>
  );
};

export default DefaultLayout;
