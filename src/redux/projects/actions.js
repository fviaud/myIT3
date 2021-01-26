import { getProjects } from "../../api/api.projects"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchProjectsAction = (page = 1) => {
    return async (dispatch) => {
        dispatch(requestProjectsAction())
        try {
            const response = await getProjects()
            const projects = response.data.filter((project, index) => index < page * 10 && index > (page - 1) * 10)
            // dispatch(addProjectsStoreAction(response.data))
            dispatch(addProjectsStoreAction(projects))
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