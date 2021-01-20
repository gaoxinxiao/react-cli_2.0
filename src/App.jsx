import React from 'react';
import { Route } from 'react-router-dom';
import Home from './app/index'
import List from './app/list'
import ListError from './app/listError'

class App extends React.Component {
    render() {
        return <>
            美团页面
            <button onClick={(e) => {
                e.preventDefault()
                window.location.href = 'http://localhost:8080/'
            }}>跳中转页</button>
        </>
    }
}
export default App