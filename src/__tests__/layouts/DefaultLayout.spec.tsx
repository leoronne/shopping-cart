import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import notistack from 'notistack';

import { products as mockProducts, vouchers as mockVouchers } from '../../__mocks__';

import DefaultLayout from '../../layouts/DefaultLayout';

const enqueueSnackbar = jest.fn();
const closeSnackbar = jest.fn();

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}));

jest.mock('../../hooks', () => {
  return {
    useProducts: () => ({
      loadingProd: false,
      products: mockProducts,
    }),
    useVouchers: () => ({
      loadingVouc: false,
      vouchers: mockVouchers,
    }),
    useCart: () => ({
      cartItems: [],
    }),
  };
});

describe('DefaultLayout', () => {
  beforeEach(() => {
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => {
      return { enqueueSnackbar, closeSnackbar };
    });
  });

  it('should render', async () => {
    await act(async () => {
      const { asFragment, queryByTestId } = render(<DefaultLayout />);

      const html = asFragment();

      await waitFor(() => {
        expect(html).toMatchSnapshot();
        expect(queryByTestId('loader-spinner')).not.toBeTruthy();
        expect(queryByTestId('error-cointainer')).not.toBeTruthy();
      });
    });
  });
});
