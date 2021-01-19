import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';

import { useProducts } from './index';

interface CartContextProps {
  addProducts?: (id: number) => void;
  removeProducts?: (id: number) => void;
  updateCartItems?: (id: number, prod: ProductsProps, operation: string) => void;
  cartItems?: CartItemsProps[];
  shipping?: number;
  discount?: {
    type: string | null;
    value: number;
    desc: string | null;
  };
  discountValue?: number;
  totalValue?: number;
  totalItemValue?: number;
  voucherApplied?: boolean;
  removeDiscounts?: () => void;
  addDiscount?: (discountInfo: { type: string | null; value: number; desc: string | null }, isApplied: boolean) => void;
  setCartItems?: React.Dispatch<React.SetStateAction<CartItemsProps[]>>;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

const CartProvider: React.FC<CartContextProps> = ({ children }) => {
  const { products, updateProductQuant } = useProducts();

  const [cartItems, setCartItems] = useState<CartItemsProps[]>([]);

  const [totalItemValue, setTotalItemValue] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState({ type: null, value: 0, desc: null });
  const [discountValue, setDiscountValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);

  useEffect(() => {
    let shippingVal = 0;
    let total = 0;
    let kg = 0;
    let discountVal = 0;

    cartItems.forEach((item) => {
      total += item.price * item.available;
      kg += item.available;
    });

    if (total > 400) shippingVal = 0;
    else if (kg <= 10) shippingVal = 30;
    else {
      const fee = (kg - 10) / 5;
      shippingVal = Math.ceil(fee) * 7;
    }

    if (discount?.type === 'shipping' && total > discount?.value) {
      discountVal = shippingVal;
    }

    if (discount?.type === 'percentual') {
      discountVal = total * (discount?.value / 100);
    }

    if (discount?.type === 'fixed') {
      discountVal = discount?.value;
    }

    setShipping(shippingVal);
    setTotalItemValue(total);
    setDiscountValue(discountVal);
    const totalVal = total + shippingVal - discountVal;
    setTotalValue(totalVal < 0 ? 0 : totalVal);
  }, [cartItems, discount]);

  const removeDiscounts = useCallback(() => {
    setDiscount({ type: null, value: 0, desc: '' });
    setDiscountValue(0);
    setVoucherApplied(false);
  }, []);

  const addDiscount = useCallback((discountInfo: { type: string | null; value: number; desc: string | null }, isApplied: boolean) => {
    setDiscount(discountInfo);
    setVoucherApplied(isApplied);
  }, []);

  const updateCartItems = useCallback(
    (id: number, prod: ProductsProps, operation: string) => {
      try {
        let cart = cartItems.find((item) => item.id === id);

        const getQuantity = () => {
          if (!cart && operation === 'add') return 1;
          return operation === 'add' ? cart?.available + 1 : cart?.available - 1;
        };

        cart = {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          available: getQuantity(),
        };

        const updatedCart = cartItems.filter((item) => item.id !== id);
        updatedCart.push(cart);
        updatedCart.sort((a, b) => (a.id > b.id ? 1 : -1));
        setCartItems(updatedCart);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    },
    [cartItems]
  );

  const removeProducts = useCallback(
    (id: number) => {
      const prod = products.find((product) => product.id === id);
      const cart = cartItems.find((item) => item.id === id);

      if (cart.available === 0 || cart.available - 1 === 0) {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        updatedCart.sort((a, b) => (a.id > b.id ? 1 : -1));
        setCartItems(updatedCart || []);
      } else {
        updateCartItems(id, cart, 'remove');
      }
      updateProductQuant(id, prod, 'remove');
    },
    [products, cartItems]
  );

  const addProducts = useCallback(
    (id: number) => {
      const prod = products.find((product) => product.id === id);

      if (prod.available > 0) {
        updateProductQuant(id, prod, 'add');
        updateCartItems(id, prod, 'add');
      }
    },
    [products, updateProductQuant, updateCartItems]
  );

  return (
    <CartContext.Provider
      value={{
        addProducts,
        removeProducts,
        updateCartItems,
        cartItems,
        discount,
        shipping,
        discountValue,
        totalItemValue,
        totalValue,
        voucherApplied,
        removeDiscounts,
        addDiscount,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = (): CartContextProps => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within an CartProvider');
  }

  return context;
};

export { CartProvider, useCart };
