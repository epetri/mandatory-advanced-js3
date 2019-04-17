import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { token$, updateToken }  from './store';
import jwt from 'jsonwebtoken';
import home from './home';
import login from './login';
import register from './register';
import Logout from './logout';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      token: token$.value,
      email: '',
    }
  }

  componentDidMount(){     
    this.subscription = token$.subscribe( (token) => this.setState({ token }));  
  }
 
   componentWillUnmount(){
     this.subscription.unsubscribe();
   }

  render() {
   const token = this.state.token;   
   
   

    return (
      <Router>
        <div className="App">
          <div className='app-container'>
            <header>
                <nav className='header-nav'>
                  {token ? <Link className='nav-link' to= '/logout'>Logout</Link> : <Link className='nav-link' to= '/'>login </Link> } 
                  {token ? <Link className='nav-link' to= '/home'>home</Link> : <Link className='nav-link' to= '/register'>Create account</Link>}
                  {token ? <p>{jwt.decode(token).email}</p> : null }
                </nav>
              </header>
              <Route exact path= '/' component={login}/>
              <Route path='/register' component={register}/>
              <Route path='/home' component={home}/>
              <Route path='/logout' component={Logout}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
