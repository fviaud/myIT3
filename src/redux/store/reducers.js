import * as types from "./types.js"

export const curentUser = (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_CURENTUSER_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case types.ADD_CURENTUSER_STORE:
            return {
                ...state,
                isLoading: false,
                values: action.data,
                error: null
            }
        case types.ERR_SIGNIN_CURENTUSER:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return { ...state }
    }
}