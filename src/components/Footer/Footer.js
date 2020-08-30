import React, { Component } from 'react'
import './Footer.scss'
import { connect } from 'react-redux'
import axios from 'axios'
class Footer extends Component {
    render() {
        const invoiceToCreate = {}
        invoiceToCreate.branchId = 21093
        invoiceToCreate.soldById = 36204
        invoiceToCreate.customerId = 535174
        invoiceToCreate.description = 'description1'
        invoiceToCreate.invoiceDetails = []
        this.props.invoice.invoiceDetails.forEach(invoiceDetail => {
            let newInvoiceDetail = {}
            newInvoiceDetail.productId = invoiceDetail.product.id
            newInvoiceDetail.productCode = invoiceDetail.product.code
            newInvoiceDetail.quantity = invoiceDetail.quantity
            newInvoiceDetail.price = invoiceDetail.price
            newInvoiceDetail.note = invoiceDetail.note
            invoiceToCreate.invoiceDetails.push(newInvoiceDetail)
        })
        invoiceToCreate.customer = {
            id: 535174,
            code: 'KH000003',
        }
        const create = () => {
            axios({
                method: 'post',
                url: `http://localhost:3000/invoices`,
                data: invoiceToCreate,
            })
        }
        return (
            <div className='footer'>
                <button className='cancel'>
                    <p className='cancel-text'>Hủy</p>
                </button>
                <button className='create' onClick={create}>
                    {' '}
                    <p className='create-text'>Tạo hóa đơn</p>
                </button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        invoice: state.invoice,
    }
}
export default connect(mapStateToProps, null)(Footer)
