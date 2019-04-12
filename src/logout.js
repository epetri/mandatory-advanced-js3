import React, {Component} from 'react';
import { updateToken, token$ } from './store';
import { Redirect } from "react-router-dom";
import { css } from 'glamor';

const ruleButton = css ({
    'backgroundColor': 'initial',
    'fontSize': '20px',
    'color': 'white',
    'border': '2px solid white',
    'borderRadius': '20px',

    ':hover': {
        'fontWeight': 'bold',
    },
})

class Logout extends Component{
    constructor(props){
        super(props);
        this.state={
            token: token$.value,
            login: true,
        }        
        this.onClick = this.onClick.bind(this);
    }

    onClick(){        
        updateToken(null);        
        this.setState({
            login: false,
        })        
    }
    
    render(){
        if(!this.state.login){
            return <Redirect to='/'/>
        }
        return (
            <div>
                <p>Sure U wanna log out?</p>
                <button className={ruleButton} onClick={this.onClick}>logout</button>
            </div>
        )
    }

}



export default Logout;