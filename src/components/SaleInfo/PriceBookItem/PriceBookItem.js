import React, { Component } from 'react'
import { Form } from 'antd'
const { Item } = Form
class PriceBookItem extends Component {
    render() {
        const pricebook = this.props
        return <Item>{pricebook.name}</Item>
    }
}

export default PriceBookItem
