import styled from 'styled-components';

import { Minus, Plus } from 'styled-icons/evaicons-solid';

import { ProductItemProps, BuyButtonProps, CartProps } from '.';

import noicon from '~assets/svg/noicon.svg';

export const Container = styled.div`
  grid-area: MC;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--background);
  padding: 20px;
  line-height: 1.9;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  width: 100%;
  height: 100%;
`;

export const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductsListcontainer = styled.div`
  height: 630px;
  width: 630px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--symbol);
    border-radius: 4px;
    transition: var(--transition-slow);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
    transition: var(--transition-slow);
  }
`;

export const ProductsCardcontainer = styled.div<ProductItemProps>`
  width: 90%;
  margin-left: 5%;
  height: 300px;
  background: var(--secondary);
  border-radius: var(--border-radius);
  border: 1px transparent solid;
  position: relative;
  transition: 0.9s ease-in-out !important;

  :hover {
    outline: none !important;
    border: ${(props) => (props.quant > 0 ? `1px solid var(--primary) !important` : `1px solid red !important`)};
    transition: 0.9s ease-in-out !important;
    box-shadow: ${(props) => (props.quant > 0 ? `0px 0px 1px var(--primary)` : `0px 0px 1px red`)};
  }

  .cart-product-icon {
    background-color: var(--light-gray);
    height: 150px;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    position: relative;
  }
`;

export const ProductsCardInfo = styled.div`
  padding: var(--padding-low);
  position: relative;
  height: calc(100% - 40px - 150px);

  strong {
    color: var(--primary);
    font-weight: 700;
  }
`;

export const ProductsCardValues = styled.div`
  width: calc(100% - (2 * var(--padding-low)));
  position: absolute;
  text-align: center;
  bottom: 0;
  left: 0;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 15px;
`;

export const BuyButton = styled.div<BuyButtonProps>`
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.disabled ? 'var(--quinary)' : 'var(--primary)')};
  color: var(--white);
  font-size: 14px;
  font-weight: 600;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: var(--transition-slow);
  ${(props) =>
    !props.disabled
      ? `
  :hover {
    filter: var(--hover-effect);
    transition: var(--transition-slow);
  }
  `
      : ''}
`;

export const ShoppingCartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShoppingCart = styled.div`
  width: 350px;
  height: 600px;
  background-color: var(--secondary);
  border-radius: 10px;
  position: relative;

  .title {
    font-weight: 700;
    background-color: var(--quinary);
    height: var(--cart-row-size);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray);
  }

  .cart-container {
    width: 100%;
    position: relative;
    height: calc(100% - (5 * var(--cart-row-size)));
  }
`;

export const ProductList = styled.div`
  width: 100%;
  height: calc(100% - var(--cart-row-size));
  overflow-x: hidden;
  overflow-y: scroll;
  padding: var(--padding-low);

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--symbol);
    border-radius: 4px;
    transition: var(--transition-slow);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
    transition: var(--transition-slow);
  }

  > div:not(:first-child) {
    margin-top: 10px;
  }
`;

export const ProductRowContent = styled.div`
  width: 100%;
  height: var(--product-row-height);
  border-radius: var(--border-radius);
  border: 1px solid var(--senary);
  position: relative;

  .product-info {
    position: absolute;
    width: calc(100% - 25px - var(--product-row-height));
    margin-left: var(--product-row-height);
    margin-right: 25px;
    height: 100%;
    padding: 10px;
  }

  .product-info .product-name {
    font-size: 14px;
    font-weight: 600;
    position: relative;
    color: var(--primary);
  }

  .product-qnt-values {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 10px;
    margin-bottom: 5px;
    width: calc(100% - 20px);
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--quaternary);
  }
`;

export const CartProductIcon = styled.div`
  position: absolute;
  height: 100%;
  width: var(--product-row-height);
  left: 0;
  background-color: var(--light-gray);
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
`;

export const ProductIcon = styled.div<CartProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  background-image: ${(props) => (props.icon ? `url(${props.icon})` : `url(${noicon})`)};
  background-size: 30%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--light-gray);
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
`;

export const PlusMinusContainer = styled.div`
  position: absolute;
  width: 25px;
  height: 100%;
  right: 0;
  border-left: 1px solid var(--senary);
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  text-align: center;

  span {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  > span:not(:first-child) {
    border-top: 1px solid var(--senary);
  }
`;

export const MinusIcon = styled(Minus)`
  width: 15px;
  height: 15px;
  color: var(--primary);
  cursor: pointer;
  transition: var(--transition-slow);

  :hover {
    color: var(--color-theme);
    filter: var(--hover-effect);
    transition: var(--transition-slow);
    transform: translateY(-1px);
    transform: translateX(1px);
  }
`;

export const PlusIcon = styled(Plus)`
  width: 15px;
  height: 15px;
  color: var(--primary);
  cursor: pointer;
  transition: var(--transition-slow);

  :hover {
    color: var(--link);
    filter: var(--hover-effect);
    transition: var(--transition-slow);
    transform: translateY(-1px);
    transform: translateX(1px);
  }
`;

export const DiscountCode = styled.div`
  position: absolute;
  width: 100%;
  height: var(--cart-row-size);
  padding: var(--padding-low);
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 200px;
    height: 100%;
  }

  button {
    width: 110px;
    height: 100%;
    border-radius: var(--border-radius);
    background-color: var(--primary);
    color: var(--white);
    font-weight: 600;
    cursor: pointer;
  }
`;

export const TotalValues = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;

  .cart-row {
    padding: var(--padding-low);
    height: var(--cart-row-size);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--senary);
    font-size: 15px;
    color: var(--quaternary);
  }

  .cart-row.total {
    font-weight: 700;
  }
`;

export const RowValues = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
