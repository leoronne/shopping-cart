import React from 'react';
import { BeatLoader } from 'react-spinners';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container>
      <BeatLoader
        css={`
          display: block;
          margin: 0 auto;
          border-color: red;
        `}
        size={18}
        color="#333333"
      />
    </Container>
  );
};
export default Loader;