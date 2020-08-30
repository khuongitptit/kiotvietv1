import axios from 'axios'
import * as saleChannelsConstants from '../constants/saleChannels'
export const actionGetSaleChannelsListAPI = () => {
    console.log('sale channels')
    return dispatch => {
        axios({
            method: 'get',
            headers: {
                Retailer: 'khuongtest2',
                Authorization:
                    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1OTc4ODc2NDQsImV4cCI6MTU5Nzk3NDA0NCwiaXNzIjoiaHR0cDovL2lkLmtpb3R2aWV0LnZuIiwiYXVkIjpbImh0dHA6Ly9pZC5raW90dmlldC52bi9yZXNvdXJjZXMiLCJLaW90VmlldC5BcGkuUHVibGljIl0sImNsaWVudF9pZCI6ImU4MWNhOTJkLThjNzQtNGU2Zi1hZGI0LThlYTYzNmI3ZDA5MiIsImNsaWVudF9SZXRhaWxlckNvZGUiOiJraHVvbmd0ZXN0MiIsImNsaWVudF9SZXRhaWxlcklkIjoiNzUxNTE4IiwiY2xpZW50X1VzZXJJZCI6IjQwMDQ5IiwiY2xpZW50X1NlbnNpdGl2ZUFwaSI6IlRydWUiLCJzY29wZSI6WyJQdWJsaWNBcGkuQWNjZXNzIl19.kF6za7gFb6PfKYBUKhr52uD8XHnbSS2M9KXtZaViUWIxmWWbrURJYY6ooAqab71-V5C7OUlDrUudxmBa47OvnLvILoiBeE-jZO2E1y4XZ34f81EQ26UqI4mC7Pfzpq0sJiwio-VgHR5dFqzTPdEdumYAGovUsCufmeCvZC242_Lr4KFgurCKGXSMDra3phOHbAI98d6cFuUDQa3KjmMULuiTShzzLy7TpyL5P015kFXyY9UMybEYtlRGJc_tb6JZkmjKTkMJnas8tiOxTp2hoQ1f7J_j0HJ9rawtxvzPdI1FXSYK4xSsdr5-H-1W9dGsjI6nobiYXknOWTRZhFogXg',
            },
            url: 'http://localhost:3000/salechannel',
        }).then(res => {
            dispatch(actionGetSaleChannelsList(res.data))
        })
    }
}
export const actionGetSaleChannelsList = saleChannels => {
    return {
        type: saleChannelsConstants.GET_SALE_CHANNELS_LIST,
        saleChannels,
    }
}
