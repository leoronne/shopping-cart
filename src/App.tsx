import React from 'react';
import { ToastContainer } from 'react-toastify';

import DefaultLayout from './layouts/DefaultLayout';
import GlobalStyles from './styles/GlobalStyles';

import { ProductsProvider } from './Context/ProductsContext';
import { VouchersProvider } from './Context/VouchersContext';

import './styles/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <ProductsProvider>
        <VouchersProvider>
          <GlobalStyles />
          <DefaultLayout />
        </VouchersProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
