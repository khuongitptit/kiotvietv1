import * as invoiceConstants from '../constants/invoiceConstants'
export const actionChangeType = () => {
    return {
        type: invoiceConstants.CHANGE_TYPE,
    }
}
export const actionSelectPricebook = pricebook => {
    return {
        type: invoiceConstants.SELECT_PRICEBOOK,
        pricebook,
    }
}
export const actionSelectSaleChannel = saleChannel => {
    return {
        type: invoiceConstants.SELECT_SALECHANNEL,
        saleChannel,
    }
}
export const actionAddProduct = ({ product, price }) => {
    return {
        type: invoiceConstants.ADD_PRODUCT,
        payload: { product, price },
    }
}
export const actionRemoveProduct = productId => {
    return {
        type: invoiceConstants.REMOVE_PRODUCT,
        productId,
    }
}
export const actionChangeQuantity = ({ productId, newQuantity }) => {
    return {
        type: invoiceConstants.CHANGE_QUANTITY,
        payload: { productId, newQuantity },
    }
}
export const actionAddProductNote = ({ productId, note }) => {
    return {
        type: invoiceConstants.ADD_PRODUCT_NOTE,
        payload: { productId, note },
    }
}
export const actionAddInvoiceDescription = description => {
    return {
        type: invoiceConstants.ADD_INVOICE_DESCRIPTION,
        description,
    }
}
