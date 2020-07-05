import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { render, waitForElement, fireEvent } from '@testing-library/react';

import { shallow, mount } from 'enzyme';

import * as ProductContext from '../Context/ProductsContext';
import * as VoucherContext from '../Context/VouchersContext';

import DefaultLayout from '../layouts/DefaultLayout/index';

describe('Tests for Error page', () => {
  it('Should render the Error page', async () => {
    const TestComponent = () => {
      const { errorProd } = useContext(ProductContext.Context);
      const { errorVouc } = useContext(VoucherContext.Context);

      return (
        <>
          <span data-testid="error-value">{`Error ${errorProd || errorVouc ? true : false}`}</span>
          <DefaultLayout />
        </>
      );
    };
    const wrapper = mount(
      <ProductContext.ProductsProvider>
        <VoucherContext.VouchersProvider>
          <TestComponent />
        </VoucherContext.VouchersProvider>
      </ProductContext.ProductsProvider>
    );
    if (wrapper.find('[data-testid="error-value"]').text() === 'Error true')
      expect(wrapper.find('[data-testid="error-value"]').hasClass('error-bg')).toEqual(true);
    else expect(wrapper.find('[data-testid="error-value"]').hasClass('error-bg')).toEqual(false);
  });
});

describe('Tests for Loading page', () => {
  it('Should render the Loading page', async () => {
    const TestComponent = () => {
      const { loadingProd } = useContext(ProductContext.Context);
      const { loadingVouc } = useContext(VoucherContext.Context);
      return (
        <>
          <span data-testid="loading-value">{`Loading ${loadingProd || loadingVouc ? true : false}`}</span>
          <DefaultLayout />
        </>
      );
    };

    const wrapper = mount(
      <ProductContext.ProductsProvider loadingProd={true}>
        <VoucherContext.VouchersProvider loadingVouc={true}>
          <TestComponent />
        </VoucherContext.VouchersProvider>
      </ProductContext.ProductsProvider>
    );
    if (wrapper.find('[data-testid="loading-value"]').text() === 'Loading true') expect(wrapper.exists('.loader-container')).toEqual(true);
  });
});

describe('Tests for Products page', () => {
  it('Should render the Products page', async () => {
    const { getByTestId } = render(
      <ProductContext.ProductsProvider>
        <VoucherContext.VouchersProvider>
          <DefaultLayout />
        </VoucherContext.VouchersProvider>
      </ProductContext.ProductsProvider>
    );
    const prodNode = await waitForElement(() => getByTestId('product-cointainer'));
    expect(prodNode).toBeInTheDocument();
  });
});

describe('Tests for Products Voucher Code input', () => {
  it('Should add voucher code', async () => {
    const { getByText, getByPlaceholderText } = render(
      <ProductContext.ProductsProvider>
        <VoucherContext.VouchersProvider>
          <DefaultLayout />
        </VoucherContext.VouchersProvider>
      </ProductContext.ProductsProvider>
    );
    const inputNode = await waitForElement(() => getByPlaceholderText('Voucher Code'));
    fireEvent.change(inputNode, { target: { value: '#100DOLLARS' } });

    const buttonNode = await waitForElement(() => getByText('APPLY'));
    fireEvent.click(buttonNode);

    const discountNode = await waitForElement(() => getByText('USD 100.00'));

    expect(inputNode.value).toBe('#100DOLLARS');
    expect(discountNode).toBeInTheDocument();
  });
});

describe('Tests for Products Buy Button', () => {
  it('Should add item', async () => {
    const { getByTestId } = render(
      <ProductContext.ProductsProvider>
        <VoucherContext.VouchersProvider>
          <DefaultLayout />
        </VoucherContext.VouchersProvider>
      </ProductContext.ProductsProvider>
    );

    const prodNode = await waitForElement(() => getByTestId('Banana'));
    fireEvent.click(prodNode);
    const cartNode = await waitForElement(() => getByTestId('cart-Banana'));
    const valuetNode = await waitForElement(() => getByTestId('cart-Banana-value'));
    expect(cartNode).toBeInTheDocument();
    expect(valuetNode).toHaveTextContent('USD 10.00');
  });
});

describe('Tests for Products Checkout Order', () => {
  it('Should calculate Total', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <ProductContext.ProductsProvider>
        <VoucherContext.VouchersProvider>
          <DefaultLayout />
        </VoucherContext.VouchersProvider>
      </ProductContext.ProductsProvider>
    );
    let prodNode = await waitForElement(() => getByTestId('Banana'));
    fireEvent.click(prodNode);
    let cartNode = await waitForElement(() => getByTestId('cart-Banana'));
    let valuetNode = await waitForElement(() => getByTestId('cart-Banana-value'));
    expect(cartNode).toBeInTheDocument();
    expect(valuetNode).toHaveTextContent('USD 10.00');

    prodNode = await waitForElement(() => getByTestId('Apple'));
    fireEvent.click(prodNode);
    cartNode = await waitForElement(() => getByTestId('cart-Apple'));
    valuetNode = await waitForElement(() => getByTestId('cart-Apple-value'));
    expect(cartNode).toBeInTheDocument();
    expect(valuetNode).toHaveTextContent('USD 20.00');

    const inputNode = await waitForElement(() => getByPlaceholderText('Voucher Code'));
    fireEvent.change(inputNode, { target: { value: '#30OFF' } });

    const buttonNode = await waitForElement(() => getByText('APPLY'));
    fireEvent.click(buttonNode);

    const discountNode = await waitForElement(() => getByTestId('Discount'));
    expect(discountNode).toHaveTextContent('USD 9.00');

    expect(inputNode.value).toBe('#30OFF');
    expect(discountNode).toBeInTheDocument();

    const subtotalNode = await waitForElement(() => getByTestId('Subtotal'));
    expect(subtotalNode).toHaveTextContent('USD 30.00');

    const totalNode = await waitForElement(() => getByTestId('Total'));
    expect(totalNode).toHaveTextContent('USD 51.00');
  });
});
