import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

import AppProvider from '../../hooks';

import { Homepage } from '../../pages';

describe('Homepage', () => {
  it('should render', async () => {
    await act(async () => {
      const { asFragment } = render(
        <AppProvider>
          <Homepage />
        </AppProvider>
      );

      const html = asFragment();

      expect(html).toMatchSnapshot();
    });
  });

  it('should be able to apply vouchers', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <AppProvider>
          <Homepage />
        </AppProvider>
      );
      const voucherInput = (await waitFor(() => getByTestId('voucher-input'))) as HTMLInputElement;

      const value = '#100DOLLARS';

      fireEvent.change(voucherInput, { target: { value } });

      expect(voucherInput.value).toBe(value);

      const submitButton = await waitFor(() => getByTestId('submit-voucher'));

      fireEvent.click(submitButton);

      const discountValue = await waitFor(() => getByTestId('Discount'));

      await waitFor(() => {
        expect(discountValue.textContent).toContain('100.00');
      });
    });
  });

  it('should be able to remove vouchers', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <AppProvider>
          <Homepage />
        </AppProvider>
      );
      let voucherInput = (await waitFor(() => getByTestId('voucher-input'))) as HTMLInputElement;

      const value = '#100DOLLARS';

      fireEvent.change(voucherInput, { target: { value } });

      expect(voucherInput.value).toBe(value);

      const submitButton = await waitFor(() => getByTestId('submit-voucher'));

      fireEvent.click(submitButton);

      const discountValue = await waitFor(() => getByTestId('Discount'));

      expect(discountValue.textContent).toContain('100.00');

      const removeButton = await waitFor(() => getByTestId('remove-voucher'));

      fireEvent.click(removeButton);

      voucherInput = (await waitFor(() => getByTestId('voucher-input'))) as HTMLInputElement;

      await waitFor(() => {
        expect(voucherInput.value).toBe('');
        expect(discountValue.textContent).not.toContain('100.00');
      });
    });
  });

  it('should not be able to apply wrong vouchers', async () => {
    await act(async () => {
      const { getByTestId } = render(
        <AppProvider>
          <Homepage />
        </AppProvider>
      );
      const voucherInput = (await waitFor(() => getByTestId('voucher-input'))) as HTMLInputElement;

      const value = '#WRONGCODE';

      fireEvent.change(voucherInput, { target: { value } });

      expect(voucherInput.value).toBe(value);

      const submitButton = await waitFor(() => getByTestId('submit-voucher'));

      fireEvent.click(submitButton);

      const discountValue = await waitFor(() => getByTestId('Discount'));

      await waitFor(() => {
        expect(voucherInput.value).toBe('');
        expect(discountValue.textContent).toContain('0.00');
      });
    });
  });

  it('should be able to add products to cart', async () => {
    await act(async () => {
      const { getByTestId, queryByTestId } = render(
        <AppProvider>
          <Homepage />
        </AppProvider>
      );
      // Product 1
      const quantityProduct1 = await waitFor(() => getByTestId('quantity-left-product-1'));

      // Original quantity
      const quantityLeftProduct1 = quantityProduct1.textContent.replace(' left', '');

      const buyProduct1 = await waitFor(() => getByTestId('buy-button-product-1'));

      fireEvent.click(buyProduct1);

      // Updated Quantity
      expect(quantityProduct1.textContent).toBe(`${Number(quantityLeftProduct1) - 1} left`);

      // Product 2
      const quantityProduct2 = await waitFor(() => getByTestId('quantity-left-product-2'));

      // Original quantity
      const quantityLeftProduct2 = quantityProduct2.textContent.replace(' left', '');

      const buyProduct2 = await waitFor(() => getByTestId('buy-button-product-2'));

      fireEvent.click(buyProduct2);

      // Updated Quantity
      expect(quantityProduct2.textContent).toBe(`${Number(quantityLeftProduct2) - 1} left`);

      // Check if it is on the cart
      await waitFor(() => {
        expect(queryByTestId('cart-item-1')).toBeTruthy();
        expect(queryByTestId('cart-item-2')).toBeTruthy();
      });
    });
  });

  it('should be able to alter the quantity of the items on the cart', async () => {
    await act(async () => {
      const { getByTestId, queryByTestId } = render(
        <AppProvider>
          <Homepage />
        </AppProvider>
      );
      // Product 1
      const quantityProduct1 = await waitFor(() => getByTestId('quantity-left-product-1'));

      // Original quantity
      const quantityLeftProduct1 = quantityProduct1.textContent.replace(' left', '');

      const buyProduct1 = await waitFor(() => getByTestId('buy-button-product-1'));

      fireEvent.click(buyProduct1);

      // Updated Quantity
      expect(quantityProduct1.textContent).toBe(`${Number(quantityLeftProduct1) - 1} left`);
      expect(queryByTestId('cart-item-1')).toBeTruthy();

      // Add one more
      const addProduct1 = await waitFor(() => getByTestId('add-cart-item-1'));

      fireEvent.click(addProduct1);

      const quantityItem1 = await waitFor(() => getByTestId('cart-item-1-quantity'));

      expect(quantityItem1.textContent).toBe(`Quantity: 2`);
      expect(quantityProduct1.textContent).toBe(`${Number(quantityLeftProduct1) - 2} left`);

      // Remove all
      const removeProduct1 = await waitFor(() => getByTestId('remove-cart-item-1'));

      fireEvent.click(removeProduct1);
      fireEvent.click(removeProduct1);

      expect(queryByTestId('cart-item-1')).not.toBeTruthy();
      expect(quantityProduct1.textContent).toBe(`${quantityLeftProduct1} left`);
    });
  });

  it('should be able to submit order', async () => {
    await act(async () => {
      const { getByTestId, queryByTestId } = render(
        <AppProvider>
          <Homepage />
        </AppProvider>
      );
      // Product 1
      const quantityProduct1 = await waitFor(() => getByTestId('quantity-left-product-1'));

      // Original quantity
      const quantityLeftProduct1 = quantityProduct1.textContent.replace(' left', '');

      const buyProduct1 = await waitFor(() => getByTestId('buy-button-product-1'));

      fireEvent.click(buyProduct1);

      // Updated Quantity
      expect(quantityProduct1.textContent).toBe(`${Number(quantityLeftProduct1) - 1} left`);

      // Product 2
      const quantityProduct2 = await waitFor(() => getByTestId('quantity-left-product-2'));

      // Original quantity
      const quantityLeftProduct2 = quantityProduct2.textContent.replace(' left', '');

      const buyProduct2 = await waitFor(() => getByTestId('buy-button-product-2'));

      fireEvent.click(buyProduct2);

      // Updated Quantity
      expect(quantityProduct2.textContent).toBe(`${Number(quantityLeftProduct2) - 1} left`);

      // Check if it is on the cart
      expect(queryByTestId('cart-item-1')).toBeTruthy();
      expect(queryByTestId('cart-item-2')).toBeTruthy();

      const submitButton = await waitFor(() => getByTestId('submit-order'));

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(queryByTestId('cart-item-1')).not.toBeTruthy();
        expect(queryByTestId('cart-item-2')).not.toBeTruthy();
      });
    });
  });
});
