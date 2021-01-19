import React, { createContext, useEffect, useState, useCallback, useContext } from 'react';

import { products as mockProducts } from '../__mocks__';

import api from '../services/api';

interface ProductsContextProps {
  loadingProd?: boolean;
  errorProd?: boolean;
  products?: Array<ProductsProps>;
  updateProductQuant?: (id: number, product: ProductsProps, operation: string) => void;
}

const ProductsContext = createContext<ProductsContextProps>({} as ProductsContextProps);

const ProductsProvider: React.FC<ProductsContextProps> = ({ children }) => {
  const [loadingProd, setLoadingProd] = useState(false);
  const [errorProd, setErrorProd] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    try {
      setErrorProd(false);
      setLoadingProd(true);
      const response = process.env.NODE_ENV === 'test' ? { data: { products: mockProducts } } : await api.get('products.json');
      setProducts(response?.data?.products);
    } catch (err) {
      setErrorProd(true);
    } finally {
      setLoadingProd(false);
    }
  }, []);

  const updateProductQuant = useCallback(
    (id: number, product: ProductsProps, operation: string) => {
      try {
        const chosenProduct = product;
        if (chosenProduct.available > 0 && operation === 'add') chosenProduct.available -= 1;
        else chosenProduct.available += 1;

        const updatedProd = products.filter((prod) => prod.id !== id);
        updatedProd.push(chosenProduct);
        updatedProd.sort((a, b) => (a.id > b.id ? 1 : -1));
        setProducts(updatedProd);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    },
    [products]
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadingProd,
        errorProd,
        updateProductQuant,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = (): ProductsContextProps => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within an ProductsProvider');
  }

  return context;
};

export { ProductsProvider, useProducts };
