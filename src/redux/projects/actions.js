import { getProjects, addProject } from "../../api/api.projects"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchProjectsAction = (page) => {
    return async (dispatch) => {
        dispatch(requestProjectsAction())
        try {
            const newPage = page || 1
            const response = await getProjects()
            const totalPages = response.data.length / 10
            const projects = response.data.filter((project, index) => index < newPage * 10 && index > (newPage - 1) * 10)
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