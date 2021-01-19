import React from 'react';
import { render } from '@testing-library/react';

import { Error } from '../../pages';

describe('Error', () => {
  it('should render', async () => {
    const { asFragment } = render(<Error />);

    const html = asFragment();

    expect(html).toMatchSnapshot();
  });
});
