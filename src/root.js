import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home'

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Route exact path='/' component={Home}/>
            </div>
        </BrowserRouter>
    )
}

export default Root