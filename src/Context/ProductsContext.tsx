import React, { createContext, useEffect, useState } from 'react';

import api from '../services/api';
import notify from '../services/toast';

interface ProductsProps {
  id?: number;
  name?: string;
  price?: number;
  available?: number;
}

interface CartItemsProps {
  id?: number;
  name?: string;
  price?: number;
  available?: number;
}

interface ContextProps {
  loadingProd?: boolean;
  errorProd?: boolean;
  products?: Array<ProductsProps>;
  setCartItems?: Function;
  cartItems?: Array<CartItemsProps>;
  setProducts?: Function;
  addProducts?: Function;
  removeProducts?: Function;
  totalItemValue?: number;
  shipping?: number;
  totalValue?: number;
  discount?: { type: string; value: number; desc: string };
  setDiscount?: Function;
  voucherApplied?: boolean;
  setVoucherApplied?: Function;
  voucherCode2?: string;
  setVoucherCode2?: Function;
  discountValue?: number;
  setDiscountValue?: Function;
}

const Context = createContext<Partial<ContextProps>>({});

const ProductsProvider: React.FC = ({ children }) => {
  const [loadingProd, setLoadingProd] = useState(false);
  const [errorProd, setErrorProd] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalItemValue, setTotalItemValue] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState({ type: null, value: 0, desc: null });
  const [discountValue, setDiscountValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherCode2, setVoucherCode2] = useState('');

  function updateProductQuant(id: number, prod: ProductsProps, operation: string) {
    if (prod.available > 0 && operation === 'add') prod.available = prod.available - 1;
    else prod.available = prod.available + 1;

    const updatedProd = products.filter((product) => product.id !== id);
    updatedProd.push(prod);
    updatedProd.sort((a, b) => (a.id > b.id ? 1 : -1));
    setProducts(updatedProd);
  }

  function updateCartItems(id: number, prod: ProductsProps, operation: string) {
    let cart = cartItems.find((item) => item.id === id);

    if (!cart && operation === 'add') {
      cart = {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        available: 1,
      };
    } else {
      cart = {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        available: operation === 'add' ? cart.available + 1 : cart.available - 1,
      };
    }

    const updatedCart = cartItems.filter((item) => item.id !== id);
    updatedCart.push(cart);
    updatedCart.sort((a, b) => (a.id > b.id ? 1 : -1));
    setCartItems(updatedCart);
  }

  function addProducts(id: number) {
    const prod = products.find((product) => product.id === id);

    if (prod.available > 0) {
      updateProductQuant(id, prod, 'add');
      updateCartItems(id, prod, 'add');
    }
  }

  function removeProducts(id: number) {
    const prod = products.find((product) => product.id === id);
    const cart = cartItems.find((item) => item.id === id);

    if (cart.available === 0 || (cart.available - 1) === 0) {
      const updatedCart = cartItems.filter((item) => item.id !== id);
      updatedCart.sort((a, b) => (a.id > b.id ? 1 : -1));
      setCartItems(updatedCart ? updatedCart : []);
    } else {
      updateCartItems(id, cart, 'remove');
    }
    updateProductQuant(id, prod, 'remove');
  }


  useEffect(() => {
    let shippingVal = 0;
    let total = 0;
    let kg = 0;
    let discountVal = 0;
    if (cartItems.length > 0) {
      // eslint-disable-next-line
      cartItems.map((item) => {
        total = total + item.price * item.available;
        kg = kg + item.available;
      });
    }
    if (total > 400) shippingVal = 0;
    else if (kg <= 10) shippingVal = 30;
    else {
      let fee = (kg - 10) / 5;
      shippingVal = Math.ceil(fee) * 7;
    }

    if (discount.type === 'shipping' && total > discount.value) {
      discountVal = shippingVal;
    }

    if (discount.type === 'percentual') {
      discountVal = total * (discount.value / 100);
    }

    if (discount.type === 'fixed') {
      discountVal = discount.value;
    }
    setShipping(shippingVal);
    setTotalItemValue(total);
    setDiscountValue(discountVal);
    const totalVal = total + shippingVal - discountVal;
    setTotalValue(totalVal < 0 ? 0 : totalVal);
  }, [cartItems, discount]);

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
    <Context.Provider
      value={{
        products,
        setCartItems,
        cartItems,
        loadingProd,
        setProducts,
        addProducts,
        removeProducts,
        errorProd,
        totalItemValue,
        shipping,
        totalValue,
        discount,
        setDiscount,
        voucherApplied,
        setVoucherApplied,
        voucherCode2,
        setVoucherCode2,
        discountValue,
        setDiscountValue,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ProductsProvider };
