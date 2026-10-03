import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4 {
    font-family: ${({ theme }) => theme.fonts.display};
    font-weight: 600;
    line-height: 1.2;
    margin: 0 0 ${({ theme }) => theme.space[3]};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0 0 ${({ theme }) => theme.space[3]};
  }

  a {
    color: ${({ theme }) => theme.colors.accentStrong};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: inherit;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
