import React, { Component } from 'react'
import Head from './Head/Head'
import SaleInfo from './SaleInfo/SaleInfo'
import Products from './Products/Products'
import Summary from './Summary/Summary'
import Footer from './Footer/Footer'
import './Invoice.scss'

class Invoice extends Component {
    render() {
        return (
            <div className='invoice'>
                <Head />
                <SaleInfo />
                <Products />
                <Summary />
                <Footer />
            </div>
        )
    }
}

export default Invoice
