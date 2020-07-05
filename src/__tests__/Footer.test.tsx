import React from 'react';

import { render, waitForElement } from '@testing-library/react';

import Footer from '../components/Footer/index';

describe('Tests for Footer', () => {
  it('Should render the Footer Component', async () => {
    const { getByTestId } = render(<Footer />);
    const fieldNode = await waitForElement(() => getByTestId('footer-cointainer'));
    expect(fieldNode).toBeInTheDocument();
  });
});

describe('Tests for Footer: link', () => {
  it('Should render the link element of the Footer Component', async () => {
    const { getByTestId } = render(<Footer />);
    const fieldNode = await waitForElement(() => getByTestId('footer-link'));
    expect(fieldNode).toBeInTheDocument();
  });
});

