import * as types from "./types.js"

export const usersReducer = (state = { values: [{ id: 0, name: "fred" }] }, action) => {
    switch (action.type) {
        case types.REQUEST_USERS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case types.ADD_USERS_STORE:
            return {
                ...state,
                isLoading: false,
                values: [...state.values, action.data]
            }
        case types.ERR_FETCH_USERS:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return { ...state }
    }
}