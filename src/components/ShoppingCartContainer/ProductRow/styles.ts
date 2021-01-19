import styled from 'styled-components';
import { Minus, Plus } from 'styled-icons/evaicons-solid';

export const Container = styled.div`
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
    .product-name {
      font-size: 14px;
      font-weight: 600;
      position: relative;
      color: var(--primary);
    }
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

export const MinusIcon = styled(Minus)<{ disabled: boolean }>`
  width: 15px;
  height: 15px;
  color: ${(props) => (props.disabled ? `red` : `var(--primary)`)};
  cursor: ${(props) => (props.disabled ? `text` : `pointer`)};
  transition: var(--transition-slow);

  :hover {
    color: var(--color-theme);
    filter: var(--hover-effect);
    transition: var(--transition-slow);
    transform: translateY(-1px);
    transform: translateX(1px);
  }
`;
