import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import notify from '../services/toast';

const Context = createContext();

const ProductsProvider = ({ children }) => {
  const [loadingProd, setLoadingProd] = useState(false);
  const [errorProd, setErrorProd] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setErrorProd(false);
        setLoadingProd(true);
        const response = await api.get('products.json');
        setProducts(response.data.products);
      } catch (err) {
        setErrorProd(true);
        notify(err.message, 'error');
      } finally {
        setLoadingProd(false);
      }
    }
    loadProducts();
  }, []);

  return (
    <Context.Provider value={{
      products, loadingProd, setProducts, errorProd,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ProductsProvider };
