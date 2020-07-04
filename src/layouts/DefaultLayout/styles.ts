import styled from 'styled-components';

// HD - Header
// MC - Main Content
// FT - Footer

export const Grid = styled.div`
  display: grid;
  grid-template-rows: 60px auto 60px;
  grid-template-areas:
    'HD'
    'MC'
    'FT';
  height: 100vh;
`;
