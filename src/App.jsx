import React from 'react';
import { Route } from 'react-router-dom';
import Home from './app/index'
import List from './app/list'
import ListError from './app/listError'

class App extends React.Component {
    render() {
        return <>
            <Route path='/home' component={Home} />
            <Route path='/list' component={List} />
            <Route path='/listError' component={ListError} />
        </>
    }
}
export default App