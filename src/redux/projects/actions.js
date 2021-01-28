import { getProjects, addProject } from "../../api/api.projects"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchProjectsAction = (page) => {
    return async (dispatch) => {
        dispatch(requestProjectsAction())
        try {
            const objetByPage = objetByPage || 10
            const newPage = page || 1
            const response = await getProjects()
            const totalPages = Math.ceil(response.data.length / objetByPage)
            const projects = response.data.filter((project, index) => index < newPage * objetByPage && index >= (newPage - 1) * objetByPage)
            // dispatch(addProjectsStoreAction(response.data))
            dispatch(addProjectsStoreAction({ projects, totalPages }))
        } catch (error) {
            dispatch(errorFetchProjectsAction("erreur accès api projects"))
        }
    }
}

export const addProjectAction = (project) => {
    return async (dispatch) => {
        dispatch(requestProjectsAction())
        try {
            const response = await addProject(project)
            dispatch(fetchProjectsAction())
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