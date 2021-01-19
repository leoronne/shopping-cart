import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { Container } from './styles';

const Loader: React.FC<{ color?: string }> = ({ color = '#a0101b' }) => {
  return (
    <Container className="loader-container" data-testid="loader-spinner">
      <CircularProgress size={15} style={{ color }} />
    </Container>
  );
};
export default Loader;
