import React from 'react';
import ReactTooltip from 'react-tooltip';

import logo from '~/assets/img/logo.png';
import avatar from '~/assets/img/avatar.jpg';

import { Container } from './styles';

const Header: React.FC = () => {
  const userName = 'Leonardo Ronne';
  return (
    <Container>
      <div className="header-cointainer">
        <div className="header-left">
          <a href="/">
            <img src={logo} alt="Shooping Cart Challenge" className="logo" data-tip="Home Page" />
          </a>
        </div>
        <div className="header-right">
          <li className="nav-profile">
            <a href="https://github.com/leoronne" className={'icon-profile-active'} target="_blank" rel="noopener noreferrer" data-tip={`Connected as ${userName}`}>
              <img src={avatar} alt={userName} className="avatar-profile" />
              <span>{userName}</span>
            </a>
          </li>
        </div>
      </div>
      <ReactTooltip place="bottom" type="dark" effect="solid" />
    </Container>
  );
};

export default Header;
