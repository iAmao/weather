import React from 'react';
import logo from './logo.svg';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Routes from './routes';
import { darkTheme, lightTheme } from './styles/theme';
import './App.css';

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
    background-color: ${props => props.theme.mode === 'dark' ? 'red' : '#FFF'};
  }
`

function App() {
  const [theme, setTheme] = React.useState(lightTheme);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Routes />
      </>
    </ThemeProvider>
  );
}

export default App;
