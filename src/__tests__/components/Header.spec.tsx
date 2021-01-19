import React from 'react';
import { render } from '@testing-library/react';

import { Header } from '../../components';

describe('Header', () => {
  it('should render', async () => {
    const { asFragment } = render(<Header />);

    const html = asFragment();

    expect(html).toMatchSnapshot();
  });
});
