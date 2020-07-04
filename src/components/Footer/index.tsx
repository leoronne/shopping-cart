import React from 'react';

import { Container, GithubIcon } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <p className="text--center">{`©${new Date().getFullYear()}. All Rights Reserved.`}</p>
      <p>
        <a href="https://github.com/leoronne/shopping-cart-challenge" target="_blank" rel="noopener noreferrer" data-tip="GitHub Project">
          <GithubIcon />
        </a>
      </p>
    </Container>
  );
};

export default Footer;
