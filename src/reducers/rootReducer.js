import { combineReducers } from 'redux'
import pricebooks from './pricebooks'
import saleChannels from './saleChannels'
import invoice from './invoice'
export default combineReducers({
    pricebooks,
    saleChannels,
    invoice,
})
