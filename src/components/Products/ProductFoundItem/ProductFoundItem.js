import React, { Component } from 'react'
import { Select } from 'antd'
import './ProductFoundItem.scss'
const { Option } = Select
class ProductFoundItem extends Component {
    render() {
        const { product } = this.props
        let totalStock = 0
        product.inventories.forEach(inventory => {
            totalStock += inventory.onHand
        })
        return (
            <Option key={product.id}>
                <div className='option'>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className='product-img'
                    />
                    <p className='product-name'>{product.name}</p>
                    <p className='product-code'>{product.code}</p>
                    <p className='product-price'>
                        Giá:&nbsp;{product.basePrice}
                    </p>
                    <p className='product-stock-quantity'>
                        Tồn kho&nbsp;{totalStock}
                    </p>
                    <p className='product-ordered-number'>KH đặt&nbsp;{}</p>
                </div>
            </Option>
        )
    }
}

export default ProductFoundItem
