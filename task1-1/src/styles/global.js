import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 *{
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  body{
    background: linear-gradient(
      40deg,
      rgba(208, 62, 103, 1) 0%,
      rgba(126, 37, 157, 1) 50%,
      rgba(25, 70, 231, 1) 100%
    );
  }
  
  button{
    cursor: pointer;
    outline: none;
    border: none;
    background-color: transparent;
  }

  input{
    border: none;
  }
  input:focus-visible {
    outline: 0.15rem solid ${({ theme }) => theme.colors.blue};
  }
`;

export default GlobalStyle;
