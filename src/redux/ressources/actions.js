import { getRessources, addRessource } from "../../api/api.ressources"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const requestRessourcesAction = () => {
    return {
        type: types.REQUEST_RESSOURCES_ACTION
    }
}

export const fetchRessourcesAction = (projectId, page) => {
    return async (dispatch) => {
        dispatch(requestRessourcesAction())
        try {
            const objetByPage = objetByPage || 10
            const newPage = page || 1
            const response = await getRessources(projectId)
            const totalPages = Math.ceil(response.data.length / objetByPage)
            const ressources = response.data.filter((ressource, index) => index < newPage * objetByPage && index >= (newPage - 1) * objetByPage)
                .map((ressource) => (ressource.id % 2 == 0 ? { type: "environment" } : { type: "virual machine" }))


            // const response = { data: [] }
            // dispatch(addRessourcesStoreAction(response.data))
            dispatch(addRessourcesStoreAction({ ressources, totalPages }))

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