import React from 'react';
import { ToastContainer } from 'react-toastify';

import DefaultLayout from './layouts/DefaultLayout';
import GlobalStyles from './styles/GlobalStyles';

import { ProductsProvider } from './Context/ProductsContext';

import '~/styles/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <ProductsProvider>
        <GlobalStyles />
        <DefaultLayout />
      </ProductsProvider>
    </>
  );
}

export default App;
