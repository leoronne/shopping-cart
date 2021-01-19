import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 100%;
`;

export const ProductsListcontainer = styled.div`
  height: 630px;
  width: 630px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.9s ease-in-out !important;

  @media (max-width: 1046px) {
    grid-template-columns: repeat(4, 1fr);
    overflow-x: auto;
    overflow-y: hidden;
    height: 320px;
    scrollbar-width: thin;
    transition: 0.9s ease-in-out !important;
  }

  @media (max-width: 670px) {
    width: 350px;
  }

  @media (max-width: 390px) {
    width: 200px;
  }

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--symbol);
    border-radius: 4px;
    transition: var(--transition-slow);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
    transition: var(--transition-slow);
  }
`;
