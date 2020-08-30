import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionAddInvoiceDescription } from '../../actions/invoice'
import { Input } from 'antd'
import './Summary.scss'
class Summary extends Component {
    calTotalMoney = () => {
        const pricebookId = this.props.invoice.pricebook.id
        let total = 0
        this.props.invoice.invoiceDetails.forEach(invoiceDetail => {
            if (pricebookId === 0) {
                total += invoiceDetail.product.basePrice
            } else {
                let tmpPrice = 0
                invoiceDetail.product.priceBooks.forEach(priceBook => {
                    if (priceBook.priceBookId === pricebookId) {
                        tmpPrice = priceBook.price
                    }
                })
                total += tmpPrice
            }
        })
        return total
    }
    calTotalQuantity = () => {
        let total = 0
        this.props.invoice.invoiceDetails.forEach(invoiceDetail => {
            total += invoiceDetail.quantity
        })
        return total
    }
    render() {
        const { invoice } = this.props
        return (
            <div className='summary'>
                <div className='total'>
                    <p className='tth'>Tổng tiền hàng</p>{' '}
                    <p className='total-quantity'>{this.calTotalQuantity()}</p>
                    <p className='total-money'>{this.calTotalMoney()}</p>
                </div>
                <div className='description'>
                    <Input.TextArea
                        prefix={<i class='fas fa-pencil-alt edit-icon'></i>}
                        placeholder='Ghi chú'
                    />
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
        addInvoiceDescription: description => {
            dispatch(actionAddInvoiceDescription(description))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Summary)
