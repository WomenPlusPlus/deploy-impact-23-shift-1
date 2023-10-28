import React from 'react';
import AuthNavigator from './Navigation/AuthNavigator';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Styles/MUITheme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AuthNavigator />
      </ThemeProvider>
    </Router>
  );
}

export default App;
