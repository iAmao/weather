import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Routes from './routes';
import { darkTheme, lightTheme } from './styles/theme';
import configureStore from './store';
// import './App.css';

const GlobalStyles = createGlobalStyle`
  body {
    overflow: hidden;
    background-color: ${props => props.theme.mode === 'dark' ? 'red' : '#FFF'};
  }
`

const { store, persistor } = configureStore();

function App() {
  const [theme, setTheme] = React.useState(lightTheme);
  return (
    <Provider store={store}>
      <PersistGate loading={() => <span>Loading...</span>} persistor={persistor}>
        <>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <Routes />
            </>
          </ThemeProvider>
        </>
      </PersistGate>
    </Provider>
  );
}

export default App;
