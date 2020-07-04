import React, { useRef } from 'react';

import formatNumber from '../../utils/formatNumber';

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
  ProductIcon,
  PlusMinusContainer,
  MinusIcon,
  PlusIcon,
  DiscountCode,
  TotalValues,
  RowValues,
} from './styles';

const Homepage: React.FC = () => {
  const productsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  function ProductCard(props: { name: string; value: number; quant: number }) {
    return (
      <ProductsCardcontainer>
        <div className="product-icon"></div>
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

        <BuyButton>BUY</BuyButton>
      </ProductsCardcontainer>
    );
  }

  function ProductRow(props: { name: string; value: number }) {
    return (
      <ProductRowContent>
        <ProductIcon />
        <div className="product-info">
          <div className="product-name">
            <span>{props.name}</span>
          </div>
          <div className="product-qnt-values">
            <span>Quantity: 4</span>
            <span>{formatNumber(props.value)}</span>
          </div>
        </div>
        <PlusMinusContainer>
          <span>
            <PlusIcon />
          </span>
          <span>
            <MinusIcon />
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
            <ProductCard name="Product Name" value={15.7} quant={4} />
            <ProductCard name="Product Name" value={15.7} quant={4} />
            <ProductCard name="Product Name" value={15.7} quant={4} />
            <ProductCard name="Product Name" value={15.7} quant={4} />
            <ProductCard name="Product Name" value={15.7} quant={4} />
            <ProductCard name="Product Name" value={15.7} quant={4} />
          </ProductsListcontainer>
        </ProductsContainer>

        <ShoppingCartContainer>
          <ShoppingCart>
            <div className="title">
              <p>Shopping Cart</p>
            </div>
            <div className="cart-container">
              <ProductList ref={productsRef}>
                <ProductRow name="Product Name" value={123.45} />
                <ProductRow name="Product Name" value={123.45} />
                <ProductRow name="Product Name" value={123.45} />
              </ProductList>

              <DiscountCode>
                <input type="text" value="" placeholder="Discount code" />
                <button type="button" data-tip="Apply Discount code">
                  APPLY
                </button>
              </DiscountCode>
            </div>

            <TotalValues>
              <ValueRow name="Subtotal" value={234} isTotal={false} />
              <ValueRow name="Shipping" value={10} isTotal={false} />
              <ValueRow name="Discount" value={1} isTotal={false} />
              <ValueRow name="Total" value={245} isTotal={true} />
            </TotalValues>
          </ShoppingCart>
        </ShoppingCartContainer>
      </GridContainer>
    </Container>
  );
};

export default Homepage;
