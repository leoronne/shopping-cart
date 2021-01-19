import React from 'react';
import { Tooltip } from '@material-ui/core';

import getIcon from '../../../utils/getProductIcon';

import { useCart } from '../../../hooks';

import { useStyles } from '../../../styles/MaterialUI';
import { ProductIcon } from '../../../styles/GlobalStyles';
import { Container, CartProductIcon, PlusMinusContainer, PlusIcon, MinusIcon } from './styles';

interface Props {
  name: string;
  quantity: number;
  id: number;
  total: string;
}

const ProductRow: React.FC<Props> = ({ name, quantity, id, total }) => {
  const classes = useStyles();

  const { addProducts, removeProducts } = useCart();
  if (!(quantity > 0)) return <></>;

  return (
    <Container data-testid={`cart-item-${id}`}>
      <CartProductIcon>
        <ProductIcon icon={getIcon(name)} />
      </CartProductIcon>
      <div className="product-info">
        <div className="product-name">
          <span>{name}</span>
        </div>
        <div className="product-qnt-values">
          <span data-testid={`cart-item-${id}-quantity`}>{`Quantity: ${quantity}`}</span>
          <span data-testid={`cart-item-${id}-total`}>{total}</span>
        </div>
      </div>
      <PlusMinusContainer>
        <span>
          <Tooltip title="Add more of this item to the cart" placement="left" arrow classes={{ tooltip: classes.tooltip }}>
            <PlusIcon
              onClick={() => {
                if (quantity > 0) addProducts(id);
              }}
              data-testid={`add-cart-item-${id}`}
            />
          </Tooltip>
        </span>
        <span>
          <Tooltip title="Remove this item from the cart" placement="left" arrow classes={{ tooltip: classes.tooltip }}>
            <MinusIcon disabled={false} onClick={() => removeProducts(id)} data-testid={`remove-cart-item-${id}`} />
          </Tooltip>
        </span>
      </PlusMinusContainer>
    </Container>
  );
};

export default ProductRow;
