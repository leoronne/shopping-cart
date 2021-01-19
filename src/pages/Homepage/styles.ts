import styled from 'styled-components';

export const Container = styled.div`
  grid-area: MC;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--background);
  padding: 20px;
  line-height: 1.9;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 1046px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

