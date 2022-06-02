import React,{ createContext,useContext} from "react";

import useFetchUserPalettes from "../Hooks/useFetchUserPalettes";
import { isUserContext } from "./isUserContext";
export const UserPaletteContext = createContext({palettes:[],error:true});


export default function UserPaletteProvider(props){
    const {user} = useContext(isUserContext);
    
    let defaultValue = {
        palettes:[],
        message:'Something Went Wrong',
        error:true
    }
    const userDetails = useFetchUserPalettes();
    let {RefreshUserPalettes} = userDetails;
    if(user && user.user) {
        var {palettes,message,error} = userDetails;
    }else{
        var {palettes,message,error} = defaultValue;
    }
    

    return(<UserPaletteContext.Provider value={{palettes,error,RefreshUserPalettes}}>{props.children}</UserPaletteContext.Provider>)
}