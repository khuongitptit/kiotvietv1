import React, { Component } from 'react'
import { Dropdown, Menu, Input, Icon } from 'antd'
import { actionGetPriceBooksListAPI } from '../../actions/pricebooks'
import { connect } from 'react-redux'
import './SaleInfo.scss'
import { actionGetSaleChannelsListAPI } from '../../actions/saleChannels'
import { debounce } from 'lodash'
import {
    actionSelectPricebook,
    actionSelectSaleChannel,
} from '../../actions/invoice'
const { Item } = Menu
class SaleInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pricebooksFilted: [],
            saleChannelFilted: [],
            priceListSelectVisible: false,
            saleChannelSelectVisible: false,
        }
    }
    componentWillMount() {
        this.props.getPriceBooksList()
        this.props.getSaleChannelsList()
    }
    componentDidMount() {
        this.setState({ pricebooksFilted: this.props.pricebooks })
        this.setState({ saleChannelFilted: this.props.saleChannels })
    }
    handleSelectPriceList = () => {
        this.setState({
            priceListSelectVisible: !this.state.priceListSelectVisible,
        })
    }
    handlePriceListVisibleChange = flag => {
        this.setState({ priceListSelectVisible: flag })
    }
    handlePriceListMenuClick = e => {
        if (e.key !== 'search') {
            this.setState({ priceListSelectVisible: false })
        }
    }
    handleSaleChannelVisible = () => {
        this.setState({
            saleChannelSelectVisible: !this.saleChannelSelectVisible,
        })
    }
    handleSaleChannelVisibleChange = flag => {
        this.setState({ saleChannelSelectVisible: flag })
    }
    handleSaleChannelMenuClick = e => {
        if (e.key !== 'search') {
            this.setState({ saleChannelSelectVisible: false })
        }
    }
    handleSearchPriceListChangeDebounced = debounce(
        value => this.handleSearchPriceListChange(value),
        500
    )
    handleSearchPriceListChange(value) {
        this.setState({
            pricebooksFilted: this.props.pricebooks.filter(pricebook =>
                pricebook.name.includes(value)
            ),
        })
        console.log(
            this.props.pricebooks.filter(pricebook =>
                pricebook.name.toLowerCase().includes(value)
            )
        )
    }
    handleSearchSaleChannelChangeDebounced = debounce(
        value => this.handleSearchSaleChannelChange(value),
        500
    )
    handleSearchSaleChannelChange(value) {
        this.setState({
            saleChannelFilted: this.props.saleChannels.filter(saleChannel =>
                saleChannel.name.toLowerCase().includes(value)
            ),
        })
        console.log(
            this.props.saleChannels.filter(saleChannel =>
                saleChannel.name.toLowerCase().includes(value)
            )
        )
    }
    displayPriceBooks = pricebooks => {
        let priceBookWithBase = [{ name: 'Bảng giá chung', id: 0 }]
        pricebooks.forEach(pricebook => {
            priceBookWithBase.push(pricebook)
        })
        return priceBookWithBase.map(pricebook => {
            return (
                <Item onClick={() => this.props.selectPriceBook(pricebook)}>
                    {pricebook.name}
                </Item>
            )
        })
    }
    displaySaleChannels = saleChannels => {
        if (saleChannels.length > 0) {
            return saleChannels.map(saleChannel => {
                return (
                    <Item
                        prefix={<i className={saleChannel.img}></i>}
                        onClick={() =>
                            this.props.selectSaleChannel(saleChannel)
                        }
                    >
                        {saleChannel.name}
                    </Item>
                )
            })
        } else {
            return null
        }
    }
    priceList = (
        <div>
            <Menu onClick={this.handlePriceListMenuClick}>
                <Item key='search'>
                    <Input
                        prefix={<Icon type='search' />}
                        type='text'
                        onChange={e =>
                            this.handleSearchPriceListChangeDebounced(
                                e.target.value
                            )
                        }
                    />
                </Item>
                {this.displayPriceBooks(this.props.pricebooks)}
            </Menu>
        </div>
    )
    saleChannel = (
        <div className='saleChannel'>
            <Menu onClick={this.handleSaleChannelMenuClick}>
                <Item key='search'>
                    <Input
                        prefix={<Icon type='search' />}
                        type='text'
                        onChange={e =>
                            this.handleSearchSaleChannelChangeDebounced(
                                e.target.value
                            )
                        }
                    />
                </Item>
                {this.displaySaleChannels(this.props.saleChannels)}
            </Menu>
        </div>
    )
    render() {
        const { invoice } = this.props
        const { pricebook, saleChannel, products } = invoice
        return (
            <div className='saleInfo'>
                <div className='customer'>
                    <div className='user-icon'>
                        <Icon type='user' />
                    </div>
                    <div className='name'>Nguyễn Lan Hương</div>
                </div>
                <div className='saleOptions'>
                    <Icon type='dollar' className='dollar-icon' />
                    <div className='priceList'>
                        <Dropdown
                            overlay={this.priceList}
                            visible={this.state.priceListSelectVisible}
                            onVisibleChange={this.handlePriceListVisibleChange}
                            trigger={['click']}
                        >
                            <p onClick={this.handleSelectPriceList}>
                                {pricebook
                                    ? pricebook.name.substring(0, 20)
                                    : ''}{' '}
                                <Icon
                                    type='caret-down'
                                    className='priceList-downicon'
                                />
                            </p>
                        </Dropdown>
                    </div>
                    <div className='saleChannel'>
                        <Dropdown
                            overlay={this.saleChannel}
                            visible={this.state.saleChannelSelectVisible}
                            onVisibleChange={
                                this.handleSaleChannelVisibleChange
                            }
                            trigger={['click']}
                        >
                            <p onClick={this.handleSaleChannelVisible}>
                                <i
                                    className={
                                        saleChannel ? saleChannel.img : ''
                                    }
                                ></i>
                                <Icon
                                    type='caret-down'
                                    className='saleChannel-downicon'
                                />
                            </p>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        pricebooks: state.pricebooks,
        saleChannels: state.saleChannels,
        invoice: state.invoice,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getPriceBooksList: () => {
            dispatch(actionGetPriceBooksListAPI())
        },
        getSaleChannelsList: () => {
            dispatch(actionGetSaleChannelsListAPI())
        },
        selectPriceBook: pricebook => {
            dispatch(actionSelectPricebook(pricebook))
        },
        selectSaleChannel: saleChannel => {
            dispatch(actionSelectSaleChannel(saleChannel))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleInfo)
