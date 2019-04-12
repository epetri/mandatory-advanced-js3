import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import {token$, updateToken}  from './store';
import axios from 'axios'; 
import LoginForm from './form'

const apiRoot = 'http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={  
            email: '',
            password: '',
            login: false, 
            errMsg: null,
        }
        
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        let id = e.target.id;

        if(id === 'email'){
            this.setState({email : e.target.value})            
        } else if (id === 'password'){
            this.setState({password: e.target.value})
        }
    }

    onSubmit(e){        
        e.preventDefault();
        axios.post(apiRoot + '/auth', {email: this.state.email, password: this.state.password})
        .then((response) => {
            
            updateToken(response.data.token)
            this.setState({login: true})
        })
        .catch((err) => {
            this.setState({errMsg: 'inaccurate email or password'})
            
        })
    }

    render(){
        if (this.state.login){
            return <Redirect to='/home'/>;
        }
        return(
            <div className='login-container'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            {this.state.errMsg ? (<p className='errMsglogin'>{this.state.errMsg}</p>)
            : <h4>Enter your email and password to sign in</h4>}
            <LoginForm
                info={this.state}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />

            </div>
        )
    }
}

export default Login;
