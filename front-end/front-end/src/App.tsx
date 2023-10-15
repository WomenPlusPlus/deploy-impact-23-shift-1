import React from "react";
import AuthNavigator from './Navigation/AuthNavigator';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return(
    <Router>
      <AuthNavigator />
    </Router>
  )
}

export default App;
