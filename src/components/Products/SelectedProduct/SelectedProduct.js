import React, { Component } from 'react'
import './SelectedProduct.scss'
import { debounce } from 'lodash'
import { Dropdown, Input, Icon } from 'antd'
import { connect } from 'react-redux'
import {
    actionRemoveProduct,
    actionChangeQuantity,
    actionAddProductNote,
    actionAddInvoiceDescription,
} from '../../../actions/invoice'
class SelectedProduct extends Component {
    constructor(props) {
        super(props)
        this.product = this.props.invoiceDetail.product

        this.state = {
            stockQuantity: this.getStockQuantity(this.product),
            quantity: 1,
            productNoteVisible: false,
            note: '',
            invalidQuantity: false,
        }
    }
    getStockQuantity = product => {
        let stockQuantity = 0
        product.inventories.forEach(inventory => {
            stockQuantity += inventory.onHand
        })
        return stockQuantity
    }
    increaseQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1 })
        if (this.state.quantity + 1 > this.state.stockQuantity) {
            this.setState({ invalidQuantity: true })
        }
        this.props.changeQuantity({
            productId: this.product.id,
            newQuantity: this.state.quantity + 1,
        })
    }
    decreaseQuantity = () => {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 })
            if (this.state.quantity - 1 <= this.state.stockQuantity) {
                this.setState({ invalidQuantity: false })
            }
            this.props.changeQuantity({
                productId: this.product.id,
                newQuantity: this.state.quantity - 1,
            })
        }
    }
    handleClickAddNote = () => {
        this.setState({ productNoteVisible: true })
    }
    handleProductNoteVisibleChange = flag => {
        const { invoiceDetail } = this.props
        const { product } = invoiceDetail
        this.setState({ productNoteVisible: flag })
        this.props.addProductNote({
            productId: product.id,
            note: this.state.note,
        })
    }
    handleRemoveProduct = productId => {
        this.props.removeProduct(productId)
    }
    handleChangeProductNote = value => {
        this.setState({ note: value })
    }
    render() {
        return (
            <div className='selected-product'>
                <p className='name'>{this.product.name}</p>
                <i
                    className='far fa-trash-alt btnDelete'
                    onClick={() => this.handleRemoveProduct(this.product.id)}
                ></i>
                <p className='code'>{this.product.code}</p>
                <div className='quantity-control'>
                    <p className='quantity'>
                        {this.state.quantity}
                        <div className='change-quantity'>
                            <Icon
                                type='caret-up'
                                className='increase'
                                onClick={this.increaseQuantity}
                            />
                            <Icon
                                type='caret-down'
                                className='decrease'
                                onClick={this.decreaseQuantity}
                            />
                        </div>
                    </p>
                    {this.state.invalidQuantity && (
                        <Icon type='warning' className='warning' />
                    )}
                </div>
                <p class='product-total'>{this.props.invoiceDetail.price}</p>
                <Dropdown
                    overlay={
                        <Input.TextArea
                            onChange={e =>
                                this.handleChangeProductNote(e.target.value)
                            }
                            value={this.state.note}
                        />
                    }
                    trigger={['click']}
                    visible={this.state.productNoteVisible}
                    onVisibleChange={this.handleProductNoteVisibleChange}
                >
                    <p className='note' onClick={this.handleClickAddNote}>
                        Ghi chú..&nbsp;<i class='fas fa-pencil-alt'></i>
                    </p>
                </Dropdown>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { invoice: state.invoice }
}
const mapDispatchToProps = dispatch => {
    return {
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectedProduct)
