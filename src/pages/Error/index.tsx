import React  from 'react';

import { Container, Title } from './styles';
import error from '~/assets/img/error.png';

const Error: React.FC = () => {
  return (
    <Container>
    <img src={error} alt="Error" className="error-bg"/>
      <Title>
          Oops...
      </Title>
      <p>Sorry, we had a problem loading our resources.</p>
      <p>Please, try again later!</p>
    </Container>
  );
};

export default Error;
