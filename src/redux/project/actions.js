import { getProject, updateProject } from "../../api/api.projects"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchProjectAction = (id) => {
    return async (dispatch) => {
        dispatch(requestProjectAction())
        try {
            const response = await getProject(id)
            console.log("response")
            dispatch(addProjectStoreAction(response.data))
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

export const updateProjectAction = (project) => {
    return async (dispatch) => {
        console.log(project)
        dispatch(requestProjectAction())
        try {
            const response = await updateProject(project.id, project)
            addProjectStoreAction(response)
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