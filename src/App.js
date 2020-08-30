import React, { Component } from 'react'
import Invoice from './components/Invoice'
import 'antd/dist/antd.css'
import './App.scss'
class App extends Component {
    render() {
        return (
            <div className='app'>
                <Invoice />
            </div>
        )
    }
}

export default App
