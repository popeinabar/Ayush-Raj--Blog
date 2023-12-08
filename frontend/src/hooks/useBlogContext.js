import { BlogContext } from "../Context/BlogContext";
 import { useContext } from "react";

 export const useBlogContext=()=>{
    const context = useContext(BlogContext)
    if(!context){
        throw Error('usecontext should be inside context provider')
    }
    return context
 }