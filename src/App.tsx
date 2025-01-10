import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Foll from './Foll';
import FollTable from './table/FollTable'


function App() {
  return (
    <Router>
      <div className="App">
        <Foll />
        <FollTable />
      </div>
    </Router>
  );
}

export default App;
