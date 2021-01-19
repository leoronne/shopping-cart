import React from 'react';
import { render } from '@testing-library/react';

import { Footer } from '../../components';

describe('Footer', () => {
  it('should render', async () => {
    const { asFragment } = render(<Footer />);

    const html = asFragment();

    expect(html).toMatchSnapshot();
  });
});
