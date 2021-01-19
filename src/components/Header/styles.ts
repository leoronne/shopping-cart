import styled from 'styled-components';

export const Container = styled.header`
  grid-area: HD;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  width: 100%;
  height: var(--nav-size);
  background-color: var(--secondary);
  padding: 10px;

  a {
    height: 100%;
    text-decoration: none;
    transition: var(--filter-transition);

    &:hover {
      text-decoration: none;
      filter: var(--hover-effect);
    }
  }
`;

export const Left = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 0px;

  p {
    font-weight: 600;
    color: var(--primary);
    margin-left: 15px;
    display: none;
  }

  img {
    max-width: 40px;
  }

  @media (min-width: 480px) {
    margin-left: 15px;

    p {
      display: flex;
    }
  }
`;

export const Right = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 0px;

  @media (min-width: 480px) {
    margin-right: 15px;
  }
`;

export const NavProfile = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .icon-profile-active {
    width: 100%;
    color: var(--quaternary);
    font-weight: 600;
    height: 36px;
    background-color: var(--terciary);
    border-radius: 18px;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 14px;
      margin-left: 10px;
      text-decoration: none;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
`;
