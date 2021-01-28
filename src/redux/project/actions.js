import { getProject, updateProject } from "../../api/api.projects"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchProjectAction = (id) => {
    return async (dispatch) => {
        dispatch(requestProjectAction())
        try {
            const response = await getProject(id)
            const project = { ...response.data, members: [] }
            dispatch(addProjectStoreAction(project))
        } catch (error) {
            dispatch(errorFetchProjectAction("erreur accès api projects"))
        }
    }
}

export const requestProjectAction = () => {
    return {
        type: types.REQUEST_PROJECT_ACTION
    }
}

export const addProjectStoreAction = (data) => {
    return {
        type: types.ADD_PROJECT_STORE,
        data
    }
}

export const updateProjectAction = (id, data) => {
    return async (dispatch) => {
        dispatch(requestProjectAction())
        try {
            const response = await updateProject(id, data)
            dispatch(addProjectStoreAction(response.data))
        } catch {
            dispatch(errorFetchProjectAction("erreur accès api projects"))
        }
    }
}

export const errorFetchProjectAction = (error) => {
    return {
        type: types.ERR_FETCH_PROJECT,
        error
    }
}