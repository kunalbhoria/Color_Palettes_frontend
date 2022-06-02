import React,{ createContext} from "react";
import useFetchDefaultPalette from "../Hooks/useFetchDefaultPalette";
export const DefaultPaletteContext = createContext({palettes:[],error:true});


export default function DefaultPaletteProvider(props){
    const {palettes,error,message} = useFetchDefaultPalette();
    return(<DefaultPaletteContext.Provider value={{palettes,error}}>{props.children}</DefaultPaletteContext.Provider>)
}