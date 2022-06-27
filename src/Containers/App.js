import React, { useState, useEffect } from "react";
import CardList from "../Components/CardList";
import SearchBar from "../Components/SearchBar";
import Scroll from "../Components/Scroll";
import './App.css'
import ErrorBoundry from "../Components/ErrorBoundry";

function App () {
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchfield] = useState('')
    const [count, setCount] = useState(0)


    const onSearchChange = (event) => {
        setSearchfield(event.target.value)
    }

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users=> setRobots(users));
        console.log(count);
    },[count])
    
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })

    if(!robots.length){
        return <h1>Loading</h1>
    }else{
        return (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <button onClick={()=> setCount(count+1)}>Click me !</button>
                <SearchBar searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/> 
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}
export default App