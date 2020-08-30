import * as pricebooksContants from '../constants/pricebooks'
const initialState = []
export default (state = initialState, action) => {
    switch (action.type) {
        case pricebooksContants.GET_PRICEBOOKS_LIST:
            return [...action.pricebooks]
        default:
            return state
    }
}
