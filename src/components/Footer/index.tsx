import React from 'react';

import { Container, GithubIcon } from './styles';

const Footer: React.FC = () => {
  return (
    <Container data-testid="footer-cointainer">
      <p className="text--center">{`©${new Date().getFullYear()}. All Rights Reserved.`}</p>
      <a href="https://github.com/leoronne/shopping-cart" target="_blank" rel="noopener noreferrer">
        <GithubIcon />
      </a>
    </Container>
  );
};

export default Footer;
