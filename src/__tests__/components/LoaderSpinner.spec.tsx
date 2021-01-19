import React from 'react';
import { render } from '@testing-library/react';

import { LoaderSpinner } from '../../components';

describe('LoaderSpinner', () => {
  it('should render', async () => {
    const { asFragment } = render(<LoaderSpinner />);

    const html = asFragment();

    expect(html).toMatchSnapshot();
  });
});
