import { getRessources, addRessource } from "../../api/api.ressources"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const requestRessourcesAction = () => {
    return {
        type: types.REQUEST_RESSOURCES_ACTION
    }
}

export const fetchRessourcesAction = (projectId) => {
    return async (dispatch) => {
        dispatch(requestRessourcesAction())
        try {
            // const response = await getRessources(projectId)
            const response = { data: [] }
            console.log(response.data)
            dispatch(addRessourcesStoreAction(response.data))
        } catch (error) {
            dispatch(errorFetchRessourcesAction("erreur accès api Ressources"))
        }
    }
}

export const addRessourceAction = (data) => {
    return async (dispatch) => {
        dispatch(requestRessourcesAction())
        try {
            await addRessource(data)
            // dispatch(fetchRessourcesAction())
            dispatch(addRessourceStoreAction(data))
        } catch (error) {
            dispatch(errorFetchRessourcesAction("erreur accès api Ressources"))
        }
    }
}

export const addRessourceStoreAction = (data) => {
    return {
        type: types.ADD_RESSOURCE_STORE,
        data
    }
}

export const addRessourcesStoreAction = (data) => {
    return {
        type: types.ADD_RESSOURCES_STORE,
        data
    }
}

export const errorFetchRessourcesAction = (error) => {
    return {
        type: types.ERR_FETCH_RESSOURCES,
        error
    }
}