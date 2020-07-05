import React, { useRef, useContext } from 'react';
import ReactTooltip from 'react-tooltip';

import formatNumber from '../../utils/formatNumber';

import { Context as ProductContext } from '../../Context/ProductsContext';

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
  const { products, cartItems, addProducts, removeProducts, totalItemValue, shipping, totalValue } = useContext(ProductContext);
  const productsRef = useRef() as React.MutableRefObject<HTMLDivElement>;

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
            <MinusIcon onClick={() => removeProducts(props.id)} />
          </span>
        </PlusMinusContainer>
      </ProductRowContent>
    );
  }

  function ValueRow(props: { name: string; value: number; isTotal: Boolean }) {
    return (
      <div className={`cart-row ${props.isTotal ? ' total' : ''}`}>
        <p>{props.name}</p>
        <RowValues>
          <p>{formatNumber(props.value)}</p>
        </RowValues>
      </div>
    );
  }
  return (
    <Container>
      <GridContainer>
        <ProductsContainer>
          <ProductsListcontainer>
            {products.length === 0
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
                <input type="text" value="" placeholder="Discount code" />
                <button type="button" data-tip="Apply Voucher">
                  APPLY
                </button>
              </DiscountCode>
            </div>

            <TotalValues>
              <ValueRow name="Subtotal" value={totalItemValue} isTotal={false} />
              <ValueRow name="Shipping" value={shipping} isTotal={false} />
              <ValueRow name="Discount" value={1} isTotal={false} />
              <ValueRow name="Total" value={totalValue} isTotal={true} />
            </TotalValues>
          </ShoppingCart>
        </ShoppingCartContainer>
        <ReactTooltip place="bottom" type="dark" effect="solid" />
      </GridContainer>
    </Container>
  );
};

export default Homepage;
