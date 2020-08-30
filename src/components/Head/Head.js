import React, { Component } from 'react'
import './Head.scss'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { actionChangeType } from '../../actions/invoice'
class Head extends Component {
    render() {
        const { invoice } = this.props
        const { isInvoice } = invoice
        console.log(invoice)
        return (
            <div className='head'>
                <img
                    src={process.env.PUBLIC_URL + '/assets/kiotviet-logo2.png'}
                    alt='kiotviet'
                    className='logo'
                />
                <div className='isBill'>
                    {isInvoice ? 'Hóa đơn' : 'Đặt hàng'}
                </div>
                <button
                    onClick={this.props.changeType}
                    className='toggleButton'
                >
                    <Icon type='retweet' />
                </button>
                <div className='divider'></div>
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
        changeType: () => {
            dispatch(actionChangeType())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Head)
