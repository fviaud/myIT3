import * as types from "./types.js"

export const projectsReducer = (state = { values: [] }, action) => {
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
                values: [...action.data.projects],
                totalPages: action.data.totalPages
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