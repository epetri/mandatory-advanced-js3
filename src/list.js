import React from 'react';
import { css } from 'glamor';


const rule = css ({
    'listStyle': 'none',
})

const ruleButton = css ({
    'backgroundColor': 'initial',
    'color': 'white',
    'border': 'none',
    ':hover': {
        'fontWeight': 'bold',
    },
})


let List = (props) =>{

    function createLi(item){
        return (
            <li className={rule} key={item.id}>{item.content} 
                <button className={ruleButton} value={item.id} onClick={props.remove}>&times;</button>
            </li>  
        ) 
    }

    return(
        <ul>
            {props.state.map(item => createLi(item))}
        </ul>
    )
       

}

export default List;
