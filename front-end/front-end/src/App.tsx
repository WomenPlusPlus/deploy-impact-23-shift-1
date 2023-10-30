import React from 'react';
import AuthNavigator from './Navigation/AuthNavigator';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import theme from './Styles/MUITheme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthNavigator />
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
