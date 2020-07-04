import React, { useContext } from 'react';
import ReactTooltip from 'react-tooltip';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Loader from '../../components/LoaderSpinner';

import Homepage from '../../pages/Homepage';
import Error from '../../pages/Error';

import { Context } from '../../Context/ProductsContext';

import { Grid } from './styles';

const DefaultLayout: React.FC = () => {
  const { loadingProd, errorProd } = useContext(Context);

  function Content() {
    if (errorProd) {
      return <Error />;
    }

    return <Homepage />;
  }

  return (
    <Grid>
      <Header />
      {loadingProd ? <Loader /> : <Content />}

      <Footer />
      <ReactTooltip place="top" type="dark" effect="solid" />
    </Grid>
  );
};

export default DefaultLayout;
