import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.palette.background.default};
    color: ${({ theme }) => theme.palette.text.primary};
    transition: all 0.3s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.palette.grey[300]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }

  /* Animation for page transitions */
  .page-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }

  .page-exit {
    opacity: 1;
  }

  .page-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

export default GlobalStyles;