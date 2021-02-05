// import { getUser } from "../../api/api.users"
import 'regenerator-runtime/runtime'
import * as types from "./types"

import { auth } from "../../firebase";

const apiUserMap = (user) => ({
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
});

export const requestUserAction = () => {
    return {
        type: types.REQUEST_CURENTUSER_ACTION
    }
}

// export const fetchUserAction = () => {
//     return async (dispatch) => {
//         dispatch(requestUserAction())
//         try {
//             const response = await getUser()
//             dispatch(addUserStoreAction(response.data))
//         } catch (error) {
//             dispatch(errorFetchUserAction("erreur accès api users"))
//         }
//     }
// }

export const signInUsersAction = (user) => {
    return async (dispatch) => {
        dispatch(requestUserAction())
        try {
            const { email, password } = user;
            const response = await auth.signInWithEmailAndPassword(email, password);
            dispatch(addUserStoreAction(apiUserMap(response.user)))
        } catch (error) {
            dispatch(errorSignInUserAction(error.message))
        }
    }

}

export const addUserStoreAction = (data) => {
    return {
        type: types.ADD_CURENTUSER_STORE,
        data
    }
}

export const errorSignInUserAction = (error) => {
    return {
        type: types.ERR_SIGNIN_CURENTUSER,
        error
    }
}