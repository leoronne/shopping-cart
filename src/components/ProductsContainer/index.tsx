import React from 'react';

import { useProducts } from '../../hooks';

import ProductCard from './ProductCard';

import { Container, ProductsListcontainer } from './styles';

const ProductsContainer: React.FC = () => {
  const { products } = useProducts();
  return (
    <Container>
      <ProductsListcontainer>
        {products.map((product) => (
          <ProductCard name={product.name} value={product.price} quantity={product.available} id={product.id} key={product.id} />
        ))}
      </ProductsListcontainer>
    </Container>
  );
};

export default ProductsContainer;
