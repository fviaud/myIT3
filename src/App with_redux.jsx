import React, {useEffect} from "react"
import { useDispatch,useSelector } from "react-redux"
import { fetchUserAction } from "./store/actions"


export default () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {dispatch(fetchUserAction())}, []) 
    // return user.isLoading ? "loading" : <>{user.values.name}</>
    return user.isLoading ? "loading" : user.error ? user.error:
    <>{user.values && user.values.name}
    </>
}


