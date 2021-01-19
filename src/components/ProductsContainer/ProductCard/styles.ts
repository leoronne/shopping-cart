import styled from 'styled-components';

export const Container = styled.div<{ quant: number }>`
  width: 90%;
  margin-left: 5%;
  height: 300px;
  background: var(--secondary);
  border-radius: var(--border-radius);
  border: 1px transparent solid;
  position: relative;
  transition: 0.9s ease-in-out !important;

  &:hover {
    outline: none !important;
    border: ${(props) => (props.quant && props.quant > 0 ? `1px solid var(--primary) !important` : `1px solid red !important`)};
    transition: 0.9s ease-in-out !important;
    box-shadow: ${(props) => (props.quant && props.quant > 0 ? `0px 0px 1px var(--primary)` : `0px 0px 1px red`)};
  }

  .cart-product-icon {
    background-color: var(--light-gray);
    height: 150px;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    position: relative;
  }

  @media (max-width: 1046px) {
    width: 250px;
    margin-left: 0;
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

export const BuyButton = styled.button<{ disabled: boolean }>`
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
