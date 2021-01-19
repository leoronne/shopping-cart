import React from 'react';
import { SnackbarProvider } from 'notistack';

import { VouchersProvider, useVouchers } from './useVouchers';
import { ProductsProvider, useProducts } from './useProducts';
import { CartProvider, useCart } from './useCart';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ProductsProvider>
      <VouchersProvider>
        <CartProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {children}
          </SnackbarProvider>
        </CartProvider>
      </VouchersProvider>
    </ProductsProvider>
  );
};

export { useVouchers, useProducts, useCart };
export default AppProvider;
