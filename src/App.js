import React, { Component } from 'react';
import Main from './components/MainComponent';
import {Navbar, NavbarBrand} from 'reactstrap';
import { DISHES } from './shared/dishes';

import './App.css';

class App extends Component {

  
  render() { 
    return ( 
      <div>
         <Main />
      </div>
     );
  }
}
 
export default App;