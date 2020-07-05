import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  
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
    --font-family-base: 'Poppins', 'Roboto', sans-serif;
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
    --hover-effect: brightness(1.5);
    --box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.3);
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
    font-family: var(--font-family-base);
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
    transform: translateY(-1px);
    transform: translateX(1px);
  }

  .text--center {
    text-align: center;
  }

`;
