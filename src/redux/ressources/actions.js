import { getRessources } from "../../api/api.ressources"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchRessourcesAction = () => {
    return async (dispatch) => {
        dispatch(requestRessourcesAction())
        try {
            const response = await getRessources()
            dispatch(addRessourcesStoreAction(response.data))
        } catch (error) {
            dispatch(errorFetchRessourcesAction("erreur accès api Ressources"))
        }
    }
}

export const requestRessourcesAction = () => {
    return {
        type: types.REQUEST_RESSOURCES_ACTION
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