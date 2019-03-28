import React, { Component } from 'react';
import {Route , Switch , BrowserRouter} from 'react-router-dom'
import './styles/App.scss'
import Dashboard from './dashboard/index'
import Login from './dashboard/login/index'
import Home from './common/Home'

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
    		<Switch>
	    		<Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard}/>   
	    		<Route path="/login" component={Login}/>	 
	    		<Route path="*" component={Home} />
	    	</Switch>	
    	</BrowserRouter>
 
    );
  }
}

export default App;
