import * as types from "./types.js"

export const projectsReducer = (state = { values: [] }, action) => {
    // export const projectsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_PROJECTS_ACTION:
            return {
                ...state,
                isLoading: true
            }
        case types.ADD_PROJECTS_STORE:
            return {
                ...state,
                isLoading: false,
                values: [...state.values, ...action.data]
            }
        case types.ERR_FETCH_PROJECTS:
            return {
                isLoading: false,
                error: action.error
            }
        default:
            return { ...state }
    }
}