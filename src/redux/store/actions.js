import { getUser } from "../../api/api.users"
import 'regenerator-runtime/runtime'
import * as types from "./types"

export const fetchUserAction = () => {
    return async (dispatch) => {
        dispatch(requestUserAction())
        try {
            const response = await getUser()
            dispatch(addUserStoreAction(response.data))
        } catch (error) {
            dispatch(errorFetchUserAction("erreur accès api users"))
        }
    }
}

export const requestUserAction = () => {
    return {
        type: types.REQUEST_USER_ACTION
    }
}

export const addUserStoreAction = (data) => {
    return {
        type: types.ADD_USER_STORE,
        data
    }
}

export const errorFetchUserAction = (error) => {
    return {
        type: types.ERR_FETCH_USER,
        error
    }
}