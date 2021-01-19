import React, { useState, useCallback } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import formatNumber from '../../utils/formatNumber';

import { useCart, useVouchers } from '../../hooks';

import TotalValues from './TotalValues';
import ProductRow from './ProductRow';

import { Container, ShoppingCart, ProductList, DiscountCode } from './styles';

const ShoppingCartContainer: React.FC = () => {
  const { cartItems, shipping, discount, discountValue, totalItemValue, totalValue, voucherApplied, removeDiscounts, addDiscount, setCartItems } = useCart();
  const { vouchers } = useVouchers();

  const { enqueueSnackbar } = useSnackbar();

  const [voucherCode, setVoucherCode] = useState('');
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleRemoveDiscounts = useCallback(() => {
    removeDiscounts();
    setVoucherCode('');
  }, [removeDiscounts]);

  const handleDiscounts = useCallback(
    (code?: string) => {
      try {
        if (voucherApplied) enqueueSnackbar('Sorry, you have already applied a voucher code', { variant: 'warning' });
        else {
          const cupom = vouchers.find((voucher) => voucher.code === (code || voucherCode));

          if (!cupom) {
            setVoucherCode('');
            addDiscount({ type: null, value: 0, desc: '' }, false);
            enqueueSnackbar('Sorry, you entered an invalid voucher', { variant: 'error' });
          } else {
            addDiscount(
              {
                type: cupom?.type,
                value: cupom?.type === 'shipping' ? cupom.minValue : cupom.amount,
                desc: `The Voucher qualifies for a ${cupom?.type} discount`,
              },
              true
            );
            enqueueSnackbar('Voucher Applied!', { variant: 'success' });
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    },
    [voucherCode, voucherApplied, vouchers, addDiscount, enqueueSnackbar]
  );

  const handleSubmitOrder = useCallback(() => {
    setLoadingOrder(true);
    setTimeout(() => {
      enqueueSnackbar('Thank you, we received your order!', { variant: 'success' });
      setCartItems([]);
      handleRemoveDiscounts();
      setLoadingOrder(false);
    }, 1000);
  }, [enqueueSnackbar, setCartItems, handleRemoveDiscounts]);

  return (
    <Container>
      <ShoppingCart>
        <div className="title">
          <p>Cart</p>
        </div>

        <div className="cart-container">
          <ProductList>
            {cartItems.map((item) => {
              return <ProductRow name={item.name} quantity={item.available} id={item.id} key={item.id} total={formatNumber(item.price * item.available)} />;
            })}
          </ProductList>

          <DiscountCode>
            {voucherApplied ? (
              <>
                <input type="text" value={voucherCode} placeholder="Voucher Code" name="voucher" disabled />
                <button type="button" onClick={handleRemoveDiscounts} data-testid="remove-voucher">
                  REMOVE
                </button>
              </>
            ) : (
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  handleDiscounts();
                }}
              >
                <input
                  type="text"
                  value={voucherCode}
                  placeholder="Voucher Code"
                  name="voucher"
                  onChange={(e) => {
                    setVoucherCode(e.target.value);
                  }}
                  data-testid="voucher-input"
                />
                <button type="submit" disabled={!voucherCode} data-testid="submit-voucher">
                  APPLY
                </button>
              </form>
            )}
          </DiscountCode>
        </div>

        <TotalValues
          items={cartItems}
          values={{
            shipping,
            discount,
            discountValue,
            totalItemValue,
            totalValue,
          }}
        />
      </ShoppingCart>
      <button type="button" disabled={!!(cartItems.length === 0 || loadingOrder)} onClick={handleSubmitOrder} className="checkout-button" data-testid="submit-order">
        {loadingOrder ? (
          <>
            <CircularProgress size={15} style={{ color: '#fff' }} />
          </>
        ) : (
          <span>CHECKOUT</span>
        )}
      </button>
    </Container>
  );
};

export default ShoppingCartContainer;
