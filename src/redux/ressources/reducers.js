import * as types from "./types.js"

export const ressourcesReducer = (state = { values: [] }, action) => {
    switch (action.type) {
        case types.REQUEST_RESSOURCES_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case types.ADD_RESSOURCES_STORE:
            return {
                ...state,
                isLoading: false,
                values: [...state.values, action.data]
            }
        case types.ERR_FETCH_RESSOURCES:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return { ...state }
    }
}