import { getProjects } from "../../api/api.projects"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchProjectsAction = () => {
    return async (dispatch) => {
        dispatch(requestProjectsAction())
        try {
            const response = await getProjects()
            // dispatch(addProjectsStoreAction(response.data))
            dispatch(addProjectsStoreAction(response))
        } catch (error) {
            dispatch(errorFetchProjectsAction("erreur accès api projects"))
        }
    }
}

export const requestProjectsAction = () => {
    return {
        type: types.REQUEST_PROJECTS_ACTION
    }
}

export const addProjectsStoreAction = (data) => {
    return {
        type: types.ADD_PROJECTS_STORE,
        data
    }
}

export const errorFetchProjectsAction = (error) => {
    return {
        type: types.ERR_FETCH_PROJECTS,
        error
    }
}