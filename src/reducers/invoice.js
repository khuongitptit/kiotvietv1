import * as invoiceConstants from '../constants/invoiceConstants'
const initialState = {
    isInvoice: true, //false = order
    pricebook: { name: 'Bảng giá chung', id: 0 },
    saleChannel: null,
    invoiceDetails: [], //{product,salePrice,quantity,note}//
    description: '',
}
export default (state = initialState, action) => {
    switch (action.type) {
        case invoiceConstants.CHANGE_TYPE:
            return { ...state, isInvoice: !state.isInvoice }
        case invoiceConstants.SELECT_PRICEBOOK:
            return { ...state, pricebook: action.pricebook }
        case invoiceConstants.SELECT_SALECHANNEL:
            return { ...state, saleChannel: action.saleChannel }
        case invoiceConstants.ADD_PRODUCT:
            let newState_AddProduct = {
                ...state,
                invoiceDetails: [...state.invoiceDetails],
            }
            newState_AddProduct.invoiceDetails.push({
                product: action.payload.product,
                quantity: 1,
                note: '',
                price: action.payload.price,
            })
            return {
                ...newState_AddProduct,
            }
        case invoiceConstants.REMOVE_PRODUCT:
            let newState_remove = {
                ...state,
                invoiceDetails: [...state.invoiceDetails],
            }
            let delIndex = -1
            newState_remove.invoiceDetails.forEach(invoiceDetail => {
                if (invoiceDetail.product.id === action.productId) {
                    delIndex = newState_remove.invoiceDetails.indexOf(
                        invoiceDetail
                    )
                }
            })
            if (delIndex !== -1) {
                newState_remove.invoiceDetails.splice(delIndex, 1)
            }
            return { ...newState_remove }
        case invoiceConstants.CHANGE_QUANTITY:
            console.log('actionchangequantity', action.payload.productId)
            let newState_changeQuantity = {
                ...state,
                invoiceDetails: [...state.invoiceDetails],
            }
            console.log(newState_changeQuantity)
            let changeQuantityIndex = -1
            for (
                let i = 0;
                i < newState_changeQuantity.invoiceDetails.length;
                i++
            ) {
                if (
                    newState_changeQuantity.invoiceDetails[i].product.id ===
                    action.payload.productId
                ) {
                    changeQuantityIndex = i
                }
            }
            if (changeQuantityIndex !== -1) {
                newState_changeQuantity.invoiceDetails[
                    changeQuantityIndex
                ].quantity = action.payload.newQuantity
            }
            return {
                ...newState_changeQuantity,
            }
        case invoiceConstants.ADD_PRODUCT_NOTE:
            let newState_AddProductNote = { ...state }
            let addNoteIndex = -1
            for (
                let i = 0;
                i < newState_AddProductNote.invoiceDetails.length;
                i++
            ) {
                if (
                    newState_AddProductNote.invoiceDetails[i].product.id ===
                    action.payload.productId
                ) {
                    addNoteIndex = i
                }
            }
            if (addNoteIndex !== -1) {
                newState_AddProductNote.invoiceDetails[addNoteIndex].note =
                    action.payload.note
            }
            return {
                ...newState_AddProductNote,
            }
        case invoiceConstants.ADD_INVOICE_DESCRIPTION:
            return { ...state, description: action.description }
        default:
            return state
    }
}
