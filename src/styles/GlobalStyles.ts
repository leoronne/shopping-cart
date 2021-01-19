import styled, { createGlobalStyle } from 'styled-components';

import noicon from '../assets/svg/noicon.svg';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  html, body, #root {
    height: 100%;
    scroll-behavior: smooth;
  }

  :root {
    --font-family: 'Poppins', 'Roboto', sans-serif;
    --primary: #333333;
    --secondary: #d8d8d8;
    --terciary: #efefef;
    --quaternary: #292b2f;
    --quinary: #999999;
    --senary: #828386;

    --background: #f5f6fb;

    --white: #fff;
    --gray: #3b3b3b;
    --light-gray: #bbb;
    --symbol: #74777a;
    --notification: #f84a4b;
    --link: #5d80d6;
    --color-theme: #a0101b;
    --ifm-scrollbar-hover: #555;
    --transition-slow: 0.6s ease-in-out !important;
    --filter-transition: filter var(--transition-slow);
    --hover-effect: brightness(1.2);
    --box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
    --nav-size: 60px;
    --footer-size: 60px;
    --cart-row-size: 60px;

    --product-row-height: 80px;
    --border-radius: 8px;
    --padding-low: 10px;
  }

  *, button, input {
    border: 0;
    outline: 0;
    font-family: var(--font-family);
  }

  input {
    padding: 6px 4px 6px 4px;
    border-radius: 5px !important;
    transition: 0.9s ease !important;
    border: 1px solid transparent !important;
  }

  input:disabled {
    background: var(--light-gray);

  }

  input:focus {
    outline: none !important;
    border: 1px solid var(--primary) !important;
    transition: 0.9s ease-in-out !important;
    box-shadow: 0px 0px 1px var(--primary);
  }

  button {
    transition: var(--transition-slow);
  }

  button:hover:enabled {
    filter: var(--hover-effect);
    transition: var(--transition-slow);
    box-shadow: var(--box-shadow);
    /* transform: translateY(-1px); */
    /* transform: translateX(1px); */
  }

  .text--center {
    text-align: center;
  }

`;

export const ProductIcon = styled.div<{ icon: string }>`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  background-image: ${(props) => (props.icon ? `url(${props.icon})` : `url(${noicon})`)};
  background-size: 30%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: var(--light-gray);
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
`;
