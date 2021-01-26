import * as types from "./types.js"

export const user = (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_USER_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case types.ADD_USER_STORE:
            return {
                ...state,
                isLoading: false,
                values: action.data
            }
        case types.ERR_FETCH_USER:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return { ...state }
    }
}