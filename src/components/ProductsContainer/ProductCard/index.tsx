import React from 'react';
import { Tooltip } from '@material-ui/core';

import { useCart } from '../../../hooks';

import formatNumber from '../../../utils/formatNumber';
import getIcon from '../../../utils/getProductIcon';

import { useStyles } from '../../../styles/MaterialUI';
import { ProductIcon } from '../../../styles/GlobalStyles';

import { Container, ProductsCardInfo, ProductsCardValues, BuyButton } from './styles';

interface Props {
  name: string;
  value: number;
  quantity: number;
  id: number;
}

const ProductCard: React.FC<Props> = ({ quantity, name, value, id }) => {
  const classes = useStyles();

  const { addProducts } = useCart();

  return (
    <Container quant={quantity}>
      <div className="cart-product-icon">
        <ProductIcon icon={getIcon(name)} />
      </div>
      <ProductsCardInfo>
        <div className="text--center">
          <strong>{name}</strong>
        </div>
        <ProductsCardValues>
          <span>{formatNumber(value)}</span>
          <br />
          <span data-testid={`quantity-left-product-${id}`}>{`${quantity} left`}</span>
        </ProductsCardValues>
      </ProductsCardInfo>

      <Tooltip title={quantity > 0 ? 'Add item to cart' : `There is no more of this item on stock`} placement="bottom" arrow classes={{ tooltip: classes.tooltip }}>
        <BuyButton
          type="button"
          onClick={() => {
            if (quantity > 0) addProducts(id);
          }}
          disabled={!(quantity > 0)}
          data-testid={`buy-button-product-${id}`}
        >
          BUY
        </BuyButton>
      </Tooltip>
    </Container>
  );
};

export default ProductCard;
