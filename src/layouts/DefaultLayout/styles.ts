import styled from 'styled-components';

// HD - Header
// MC - Main Content
// FT - Footer

export const Grid = styled.div`
  display: grid;
  grid-template-rows: var(--nav-size) auto var(--footer-size);
  grid-template-areas:
    'HD'
    'MC'
    'FT';
  height: 100vh;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
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
