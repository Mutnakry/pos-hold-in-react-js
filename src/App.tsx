import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Foll from './Foll';
import FollTable from './table/FollTable'
import Main from './Category/Main';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Foll />
        <FollTable /> */}
        <Main/>
      </div>
    </Router>
  );
} 

export default App;



//////////// to git repository    https://github.com/Mutnakry/pos-hold-in-react-js.git
