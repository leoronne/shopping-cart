import styled from 'styled-components';

import { Minus } from 'styled-icons/evaicons-solid';

export const Container = styled.div`
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
  position: relative;

  .discount {
    font-weight: 600;
    color: red;
  }

  .minus-icon {
    height: 100%;
    position: absolute;
    width: 20px;
    left: 0;
    margin-left: -25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
