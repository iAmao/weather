import React from 'react';
import logo from './logo.svg';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { darkTheme, lightTheme } from './styles/theme';
import './App.css';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.mode === 'dark' ? 'red' : '#FFF'};
  }
`

function App() {
  const [theme, setTheme] = React.useState(darkTheme);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>

          <button onClick={() => {
            // @ts-ignore
            setTheme(theme => theme.mode === 'dark' ? lightTheme : darkTheme)
          }}>Toggle</button>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
