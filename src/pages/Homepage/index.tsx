import React, { useRef, useContext, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import DotLoaderComp from '../../components/DotLoaderComp';

import notify from '../../services/toast';
import formatNumber from '../../utils/formatNumber';

import { Context as ProductContext } from '../../Context/ProductsContext';
import { Context as VoucherContext } from '../../Context/VouchersContext';

import banana from '~assets/svg/banana.svg';
import apple from '~assets/svg/apple.svg';
import mango from '~assets/svg/mango.svg';
import orange from '~assets/svg/orange.svg';
import noicon from '~assets/svg/noicon.svg';

import {
  Container,
  GridContainer,
  ProductsContainer,
  ProductsListcontainer,
  ProductsCardcontainer,
  ProductsCardInfo,
  ProductsCardValues,
  BuyButton,
  ShoppingCartContainer,
  ShoppingCart,
  ProductList,
  ProductRowContent,
  CartProductIcon,
  ProductIcon,
  PlusMinusContainer,
  MinusIcon,
  PlusIcon,
  DiscountCode,
  TotalValues,
  RowValues,
} from './styles';

export interface ProductItemProps {
  quant?: number;
}

export interface BuyButtonProps {
  disabled?: boolean;
}

export interface CartProps {
  icon?: string;
}

const Homepage: React.FC = () => {
  const {
    products,
    setCartItems,
    cartItems,
    addProducts,
    removeProducts,
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
  } = useContext(ProductContext);
  const { vouchers } = useContext(VoucherContext);
  const [voucherCode, setVoucherCode] = useState('');
  const [loadingOrder, setLoadingOrder] = useState(false);
  const productsRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleSubmit = () => {
    ReactTooltip.hide();
    setLoadingOrder(true);
    setTimeout(() => {
      notify('Thank you! We received your order!', 'success');
      setCartItems([]);
      setLoadingOrder(false);
    }, 1000);
  };

  const removeDiscounts = () => {
    setDiscount({ type: null, value: 0, desc: '' });
    setDiscountValue(0);
    setVoucherApplied(false);
    setVoucherCode('');
  };

  const handleDiscounts = () => {
    ReactTooltip.hide();
    if (voucherCode) {
      if (voucherApplied) notify('Sorry, you have already applied a voucher', 'error');
      const cupom = vouchers.find((voucher) => voucher.code === voucherCode);

      if (!cupom) {
        setVoucherCode('');
        setDiscount({ type: null, value: 0, desc: '' });
        setDiscountValue(0);
        return notify('Sorry, you entered an invalid voucher', 'error');
      }
      setDiscount({
        type: cupom.type,
        value: cupom.type === 'shipping' ? cupom.minValue : cupom.amount,
        desc: `The Voucher qualifies for a ${cupom.type} discount`,
      });

      notify('Voucher Applied!', 'success');
      setVoucherApplied(true);
      setVoucherCode2(voucherCode);
    }
  };

  function returnIcon(name: string) {
    switch (name) {
      case 'Banana':
        return banana;
      case 'Apple':
        return apple;
      case 'Orange':
        return orange;
      case 'Mango':
        return mango;
      default:
        return noicon;
    }
  }

  function ProductCard(props: { name: string; value: number; quant: number; id: number }) {
    return (
      <ProductsCardcontainer quant={props.quant}>
        <div className="cart-product-icon">
          <ProductIcon icon={returnIcon(props.name)} />
        </div>
        <ProductsCardInfo>
          <div className="text--center">
            <strong>{props.name}</strong>
          </div>
          <ProductsCardValues>
            <span>{formatNumber(props.value)}</span>
            <br />
            <span>{`${props.quant} left`}</span>
          </ProductsCardValues>
        </ProductsCardInfo>

        <BuyButton
          onClick={() => {
            if (props.quant > 0) addProducts(props.id);
          }}
          disabled={props.quant > 0 ? false : true}
          data-tip={props.quant > 0 ? 'Add item to cart' : `There is no more of this item on stock`}
        >
          BUY
        </BuyButton>
      </ProductsCardcontainer>
    );
  }

  function ProductRow(props: { name: string; value: number; quant: number; id: number }) {
    return (
      <ProductRowContent>
        <CartProductIcon>
          <ProductIcon icon={returnIcon(props.name)} />
        </CartProductIcon>
        <div className="product-info">
          <div className="product-name">
            <span>{props.name}</span>
          </div>
          <div className="product-qnt-values">
            <span>Quantity: {props.quant}</span>
            <span>{formatNumber(props.value * props.quant)}</span>
          </div>
        </div>
        <PlusMinusContainer>
          <span>
            <PlusIcon
              onClick={() => {
                if (props.quant > 0) addProducts(props.id);
              }}
            />
          </span>
          <span>
            <MinusIcon disabled={false} onClick={() => removeProducts(props.id)} />
          </span>
        </PlusMinusContainer>
      </ProductRowContent>
    );
  }

  function ValueRow(props: { name: string; value: number; isTotal: Boolean }) {
    const isDiscount = props.name === 'Discount' && discountValue > 0;
    return (
      <div className={`cart-row ${props.isTotal ? ' total' : ''}`} data-tip={props.name === 'Discount' ? discount.desc : null}>
        <p>{props.name}</p>
        <RowValues>
          {isDiscount ? (
            <div className="minus-icon">
              <MinusIcon disabled={true} />
            </div>
          ) : (
            ''
          )}
          <p className={isDiscount ? 'discount' : ''}>{formatNumber(props.value)}</p>
        </RowValues>
      </div>
    );
  }
  // <ReactTooltip place="left" type="dark" effect="solid" />
  return (
    <Container>
      <GridContainer>
        <ProductsContainer>
          <ProductsListcontainer>
            {products && products.length === 0
              ? ''
              : products.map((product) => (
                  <ProductCard name={product.name} value={product.price} quant={product.available} id={product.id} key={product.id} />
                ))}
          </ProductsListcontainer>
        </ProductsContainer>

        <ShoppingCartContainer>
          <ShoppingCart>
            <div className="title">
              <p>Shopping Cart</p>
            </div>
            <div className="cart-container">
              <ProductList ref={productsRef}>
                {cartItems.length === 0
                  ? ''
                  : cartItems.map((item) => {
                      if (item.available > 0)
                        return <ProductRow name={item.name} value={item.price} quant={item.available} id={item.id} key={item.id} />;
                      return '';
                    })}
              </ProductList>

              <DiscountCode>
                {voucherApplied ? (
                  <>
                    <input type="text" value={voucherCode2} placeholder="Voucher Code" name="voucher" disabled={true} />
                    <button type="button" data-tip="Remove Voucher" onClick={removeDiscounts}>
                      REMOVE
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={voucherCode}
                      placeholder="Voucher Code"
                      name="voucher"
                      onChange={(e) => {
                        setVoucherCode(e.target.value);
                      }}
                    />
                    <button type="button" data-tip="Apply Voucher" onClick={handleDiscounts} disabled={!voucherCode ? true : false}>
                      APPLY
                    </button>
                  </>
                )}
              </DiscountCode>
            </div>

            <TotalValues>
              <ValueRow name="Subtotal" value={totalItemValue} isTotal={false} />
              <ValueRow name="Shipping" value={cartItems.length === 0 ? 0 : shipping} isTotal={false} />
              <ValueRow name="Discount" value={discountValue} isTotal={false} />
              <ValueRow name="Total" value={cartItems.length === 0 ? 0 : totalValue} isTotal={true} />
            </TotalValues>
          </ShoppingCart>
          <button type="button" disabled={cartItems.length === 0 || loadingOrder ? true : false} className="checkout-button" onClick={handleSubmit} data-tip="Submit Order">
            <DotLoaderComp loading={loadingOrder} size={15} color="#fff" defaultText="CHECKOUT" />
          </button>
        </ShoppingCartContainer>
      </GridContainer>
      <ReactTooltip place="bottom" type="dark" effect="solid" />
    </Container>
  );
};

export default Homepage;
