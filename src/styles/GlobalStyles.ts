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

  *, button, input {
    border: 0;
    outline: 0;
    font-family: 'Poppins', 'Roboto', sans-serif;
  }
  
  :root {
    --primary: #333333;
    --secondary: #d8d8d8;
    --terciary: #efefef;
    --quaternary: #292b2f;
    --quinary: #393d42;
    --senary: #828386;
    --background: #ffffff;
    
    --white: #fff;
    --gray: #8a8c90;
    --symbol: #74777a;
    --notification: #f84a4b;
    --link: #5d80d6;
    --ifm-scrollbar-hover: #555;
    --transition-slow: 0.4ms;
    --filter-transition: filter var(--transition-slow) ease;
    --hover-effect: brightness(1.5);
    --box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.3);
    --nav-size: 60px;
    --footer-size: 60px;
  }

  .text--center {
    text-align: center;
  }

`;
