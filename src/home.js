import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { updateToken, token$ } from './store';
import Axios from 'axios';
import List from './list';



const apiRoot = "http://ec2-13-53-32-89.eu-north-1.compute.amazonaws.com:3000";

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            login: true,
            token: token$.value,
            value: '',
            todo: [],
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getTodos = this.getTodos.bind(this);
        this.removeItem = this. removeItem.bind(this);

    }

    getTodos(){
        this.subscription = token$.subscribe( (token) => {
            this.setState({ token }, () => {
                Axios.get(apiRoot + '/todos', {headers: {Authorization: 'Bearer ' + this.state.token}})
                .then((response) => {
                    this.setState({
                        todo: response.data.todos,
                    })
                })
            })
        });
     
    }

    componentDidMount(){
        this.getTodos();
    }
    
    componentWillUnmount(){
        this.getTodos();
    }

    onChange(e){
        this.setState({ value: e.target.value})        
    }

    onSubmit(e){
        e.preventDefault();
        let item = {
            content: this.state.value,
        }
        
        Axios.post(apiRoot + '/todos/', item, {headers: {Authorization: 'Bearer ' + this.state.token}})
       .then((response) => {
            this.setState({
            todo: [...this.state.todo, response.data.todo]
        })        
      })
    } 

    removeItem(e){
       let id = e.target.value;
        console.log(id);
        
        Axios.delete(apiRoot + '/todos/' + id, {headers: {Authorization: 'Bearer ' + this.state.token}})
        .then((response) => {
            const filter = [...this.state.todo];

            this.setState({
                todo: filter.filter(item => id !==item.id)
            })
        })
    }


    render(){
        return(
            <div className='todo'>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <div className='todo-container'>
                    <h1>What to do?</h1>
                    <form onSubmit={this.onSubmit} className='todo-container-form'>
                        <input type="text" 
                            onChange={this.onChange} 
                            value={this.state.value}></input>
                        <button 
                            onSubmit={this.onSubmit}>Add</button>
                    </form>
                </div>
                <div className='todo-list'>
                    <List state={this.state.todo} remove={this.removeItem} />
                </div>
            </div>
        )
    }
}

export default Home;