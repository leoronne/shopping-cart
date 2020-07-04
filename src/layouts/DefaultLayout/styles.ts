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
`;
