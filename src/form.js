import React, { Component } from 'react';
import { css } from 'glamor';


const rule = css ({
    'backgroundColor': 'initial',
    'height': '400px',
    'width': '300px',
    'display': 'flex',
    'flexDirection' : 'column',
    'textAlign': 'right',
})

const ruleButton = css ({
    'backgroundColor': 'initial',
    'fontSize': '25px',
    'color': 'white',
    'border': '2px solid white',
    'borderRadius': '20px',
    'margin': '50px',

    ':hover': {
        'fontWeight': 'bold',
    },
})

const ruleInput = css ({
    'padding': '10px',
    'height': '20px',
    'borderRadius': '20px',
    'margin': '20px',
    'border': 'none',
})

let Form = (props) =>{    
    return(
        <form className={rule} onSubmit={props.onSubmit}>
            <label className='form-email'>
                Email:
                <input
                type='email'
                className={ruleInput}
                onChange={props.onChange}
                id='email'
                />
            </label>

            <label className='form-password'>
                Password:
                <input
                type='password'
                className={ruleInput}
                onChange={props.onChange}
                id='password'
                />
            </label>

            <button className={ruleButton} type='submit'>Lets go</button>
        </form>
    )
}

export default Form;