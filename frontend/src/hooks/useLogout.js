import { useAuthContext } from "./useAuthContext"
import {useBlogContext} from "./useBlogContext"

export const useLogout=()=>{
    const {dispatch:blogDispatch}=useBlogContext()
    const {dispatch}=useAuthContext()

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        blogDispatch({type:'SET_BLOGS', payload: null})
    }
    return{logout}
}

