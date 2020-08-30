import React, { Component } from 'react'
import { Select, Icon } from 'antd'
import { debounce } from 'lodash'
import axios from 'axios'
import { connect } from 'react-redux'
import SelectedProduct from './SelectedProduct/SelectedProduct'
import {
    actionAddProduct,
    actionRemoveProduct,
    actionChangeQuantity,
    actionAddProductNote,
    actionAddInvoiceDescription,
} from '../../actions/invoice'
import './Products.scss'
const { Option } = Select
class Products extends Component {
    constructor(props) {
        super(props)
        this.state = { keyword: '', products: [] }
    }
    handleSearchProducts = value => {
        const pricebookId = this.props.invoice.pricebook.id
        this.setState({ keyword: value })
        axios({
            method: 'get',
            url: `http://localhost:3000/products?keyword=${value}&pricebookId=${pricebookId}`,
        })
            .then(res => {
                console.log(res.data)
                this.setState({ products: res.data })
            })
            .catch(err => {
                this.setState({ products: [] })
            })
    }
    handleSearchProductsDebounced = debounce(
        value => this.handleSearchProducts(value),
        500
    )
    getCurrentPrice = product => {
        const pricebookId = this.props.invoice.pricebook.id
        let price = 0
        if (pricebookId === 0) {
            price = product.basePrice
        } else {
            product.priceBooks.forEach(priceBook => {
                if (priceBook.priceBookId == pricebookId) {
                    price = priceBook.price
                }
            })
        }
        return price
    }
    displayProductsFound = products => {
        const { addProduct } = this.props

        return products.map(product => {
            let totalStock = 0
            product.inventories.forEach(inventory => {
                totalStock += inventory.onHand
            })
            return (
                <Option
                    key={product.id}
                    value={product.name}
                    onClick={() =>
                        addProduct({
                            product,
                            price: this.getCurrentPrice(product),
                        })
                    }
                >
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
                        <p className='product-inventory-quantity'>
                            Tồn kho&nbsp;{totalStock}
                        </p>
                        <p className='product-ordered-quantity'>
                            KH đặt&nbsp;{}
                        </p>
                    </div>
                    <div className='divider'></div>
                </Option>
            )
        })
    }
    displaySelectedProducts = invoiceDetails => {
        return invoiceDetails.map(invoiceDetail => {
            return <SelectedProduct invoiceDetail={invoiceDetail} />
        })
    }
    render() {
        console.log(this.props.invoice.invoiceDetails)
        return (
            <div className='products'>
                <div className='search'>
                    <Select
                        dropdownClassName='select-dropdown'
                        showArrow={false}
                        className='select'
                        showSearch
                        placeholder={
                            <span>
                                <Icon type='search' />
                                &nbsp; Search products
                            </span>
                        }
                        optionFilterProp='children'
                        filterOption={false}
                        onSearch={value =>
                            this.handleSearchProductsDebounced(value)
                        }
                        notFoundContent={null}
                        value={
                            <span>
                                <Icon type='search' />
                                &nbsp; {this.state.keyword}
                            </span>
                        }
                    >
                        {this.displayProductsFound(this.state.products)}
                    </Select>
                </div>
                <div className='selected-products'>
                    {this.displaySelectedProducts(
                        this.props.invoice.invoiceDetails
                    )}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        invoice: state.invoice,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addProduct: product => {
            dispatch(actionAddProduct(product))
        },
        removeProduct: productId => {
            dispatch(actionRemoveProduct(productId))
        },
        changeQuantity: ({ productId, newQuantity }) => {
            dispatch(actionChangeQuantity({ productId, newQuantity }))
        },
        addProductNote: ({ productId, note }) => {
            dispatch(actionAddProductNote({ productId, note }))
        },
        addInvoiceDescription: description => {
            dispatch(actionAddInvoiceDescription(description))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products)
