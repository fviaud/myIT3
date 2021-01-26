import { getProject } from "../../api/api.projects"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchProjectAction = () => {
    return async (dispatch) => {
        dispatch(requestProjectAction())
        try {
            const response = await getProject()
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

export const errorFetchProjectAction = (error) => {
    return {
        type: types.ERR_FETCH_PROJECT,
        error
    }
}