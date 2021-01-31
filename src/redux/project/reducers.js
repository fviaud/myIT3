import * as types from "./types.js"

export const projectReducer = (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_PROJECT_ACTION:
            return {
                ...state,
                values: null,
                isLoading: true
            }
        case types.ADD_PROJECT_STORE:
            return {
                ...state,
                isLoading: false,
                values: action.data
            }
        case types.ERR_FETCH_PROJECT:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return { ...state }
    }
}