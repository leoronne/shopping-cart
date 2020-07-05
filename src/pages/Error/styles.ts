import styled from 'styled-components';


export const Container = styled.div`
  grid-area: MC;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  background-color: var(--background);
  padding: 20px;
  line-height: 1.9;
  color: var(--quinary);
  position: relative;

  p {
    z-index: 2;
  }

  .error-bg {
    width: 20%;
    max-width: 140.25px;
  }
  
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 40px;
  color: #bb202d;
  z-index: 2;
`;
