import * as types from "./types.js"

export const projectsReducer = (state = { values: [{ name: "project1", members: [{ id: 0, name: "fred" }, { id: 1, name: "toto" }] }] }, action) => {
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
                values: [...state.values, action.data]
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