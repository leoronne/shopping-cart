import React from 'react';

import { render, waitForElement } from '@testing-library/react';

import Header from '../components/Header/index';

describe('Tests for Header', () => {
  it('Should render the Header Component', async () => {
    const { getByTestId } = render(<Header />);
    const fieldNode = await waitForElement(() => getByTestId('header-cointainer'));
    expect(fieldNode).toBeInTheDocument();
  });
});

describe('Tests for Header: logo', () => {
  it('Should render the logo element of the Header Component', async () => {
    const { getByTestId } = render(<Header />);
    const fieldNode = await waitForElement(() => getByTestId('logo'));
    expect(fieldNode).toBeInTheDocument();
  });
});

describe('Tests for Header: Nav Profile', () => {
  it('Should render the Nav Profile element of the Header Component', async () => {
    const { getByText } = render(<Header />);
    const linkElement = getByText(/Leonardo Ronne/i);
    expect(linkElement).toBeInTheDocument();
  });
});
