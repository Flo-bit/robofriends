import React, { Component } from "react";
import CardList from "../Components/CardList";
import SearchBar from "../Components/SearchBar";
import Scroll from "../Components/Scroll";
import './App.css'
import ErrorBoundry from "../Components/ErrorBoundry";

class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield:''
        }
    }

    onSearchChange = (event) => {
        this.setState({searchfield:event.target.value})
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users=> this.setState({robots:users}))
    }

    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        if(!robots.length){
            return <h1>Loading</h1>
        }else{
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBar searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/> 
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
    }
}
export default App