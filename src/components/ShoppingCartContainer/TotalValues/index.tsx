import React from 'react';
import { Tooltip } from '@material-ui/core';

import formatNumber from '../../../utils/formatNumber';

import { useStyles } from '../../../styles/MaterialUI';
import { Container, RowValues, MinusIcon } from './styles';

interface ValueRowProps {
  name: string;
  value: string;
  isTotal?: boolean;
  isDiscount?: boolean;
  discountDescription?: string;
}

const ValueRow: React.FC<ValueRowProps> = ({ name, value, isTotal = false, isDiscount = false, discountDescription = '' }) => {
  const classes = useStyles();
  return (
    <div className={`cart-row ${isTotal ? ' total' : ''}`}>
      <p>{name}</p>
      <RowValues>
        {isDiscount && (
          <Tooltip title={name === 'Discount' ? discountDescription : null} placement="left" arrow classes={{ tooltip: classes.tooltip }}>
            <div className="minus-icon">
              <MinusIcon disabled />
            </div>
          </Tooltip>
        )}
        <p className={isDiscount ? 'discount' : name} data-testid={name}>
          {value}
        </p>
      </RowValues>
    </div>
  );
};

interface TotalValuesProps {
  items: CartItemsProps[];
  values: {
    shipping: number;
    discount: {
      type: string | null;
      value: number;
      desc: string | null;
    };
    discountValue: number;
    totalItemValue: number;
    totalValue: number;
  };
}

const TotalValues: React.FC<TotalValuesProps> = ({ items, values }) => {
  return (
    <Container>
      <ValueRow name="Subtotal" value={formatNumber(values?.totalItemValue)} />
      <ValueRow name="Shipping" value={formatNumber(items.length === 0 ? 0 : values?.shipping)} />
      <ValueRow name="Discount" value={formatNumber(values?.discountValue)} isDiscount={values?.discountValue > 0} discountDescription={values?.discount?.desc} />
      <ValueRow name="Total" value={formatNumber(items.length === 0 ? 0 : values?.totalValue)} isTotal />
    </Container>
  );
};

export default TotalValues;
