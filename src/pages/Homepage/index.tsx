import React from 'react';

import { ProductsContainer, ShoppingCartContainer } from '../../components';

import { Container, GridContainer } from './styles';

const Homepage: React.FC = () => {
  return (
    <Container data-testid="product-cointainer">
      <GridContainer>
        <ProductsContainer />
        <ShoppingCartContainer />
      </GridContainer>
    </Container>
  );
};

export default Homepage;
