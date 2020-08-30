import * as saleChannelsConstants from '../constants/saleChannels'
const initialState = []
export default (state = initialState, action) => {
    switch (action.type) {
        case saleChannelsConstants.GET_SALE_CHANNELS_LIST:
            console.log(action)
            return [...action.saleChannels]
        default:
            return state
    }
}
