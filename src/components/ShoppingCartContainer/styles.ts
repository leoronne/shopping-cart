import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  max-width: 100%;

  .checkout-button {
    margin-top: 20px;
    height: 50px;
    width: 350px;
    background-color: var(--primary);
    color: var(--white);
    border-radius: var(--border-radius);
    font-weight: 700;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    &:disabled {
      cursor: not-allowed;
      background-color: var(--quinary);
    }
  }

  @media (max-width: 360px) {
    .checkout-button {
      width: 300px;
    }
  }
`;

export const ShoppingCart = styled.div`
  width: 350px;
  height: 600px;
  background-color: var(--secondary);
  border-radius: 10px;
  position: relative;

  @media (max-width: 360px) {
    width: 300px;
  }

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

export const DiscountCode = styled.div`
  position: absolute;
  width: 100%;
  height: var(--cart-row-size);
  padding: var(--padding-low);
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  form {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  input {
    width: 200px;
    height: 100%;
  }

  @media (max-width: 360px) {
    input {
      width: 150px;
    }
  }

  input:disabled {
    font-weight: 600;
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

  button:disabled {
    cursor: not-allowed;
    background-color: var(--quinary);
  }
`;
