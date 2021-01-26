import { getUsers } from "../../api/api.users"
import 'regenerator-runtime/runtime'
import * as types from "./types.js"

export const fetchUsersAction = () => {
    return async (dispatch) => {
        dispatch(requestUsersAction())
        try {
            const response = await getUsers()
            dispatch(addUsersStoreAction(response.data))
        } catch (error) {
            dispatch(errorFetchUsersAction("erreur accès api Users"))
        }
    }
}

export const requestUsersAction = () => {
    return {
        type: types.REQUEST_USERS_ACTION
    }
}

export const addUsersStoreAction = (data) => {
    return {
        type: types.ADD_USERS_STORE,
        data
    }
}

export const errorFetchUsersAction = (error) => {
    return {
        type: types.ERR_FETCH_USERS,
        error
    }
}