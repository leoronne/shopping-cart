import React from 'react';
import { Tooltip } from '@material-ui/core';

import logo from '../../assets/img/logo.png';
import avatar from '../../assets/img/avatar.jpg';

import { useStyles } from '../../styles/MaterialUI';
import { Container, Left, Right, NavProfile } from './styles';

const Header: React.FC = () => {
  const classes = useStyles();
  const userName = 'Leonardo Ronne';

  return (
    <Container>
      <Left>
        <a href="/">
          <img src={logo} alt="Shooping Cart" />
        </a>
        <p>Shopping</p>
      </Left>

      <Right>
        <NavProfile>
          <Tooltip title={`Connected as ${userName}`} placement="left" arrow classes={{ tooltip: classes.tooltip }}>
            <a href="https://github.com/leoronne" className="icon-profile-active" target="_blank" rel="noopener noreferrer">
              <img src={avatar} alt={userName} className="avatar-profile" />
              <span>{userName}</span>
            </a>
          </Tooltip>
        </NavProfile>
      </Right>
    </Container>
  );
};

export default Header;
