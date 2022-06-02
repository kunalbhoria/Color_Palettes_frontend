import React,{useState,useEffect} from "react";
import axios from "axios";
import {generteColorShade} from './generateShades'

function useFetchDefaultPalette() {

const [dPalettes,setDPalettes]=useState({palettes:[],error:true,message:'Someting Went Wrong!'})

async function fetchDefaultPalette(){
try{
    let res = await axios.get('http://localhost:3001/default/palette/all');
    let data = res.data
    if(data.success && data.data.palettes.length>0){
        // let shadedPalettes = await generteColorShade(data.data)
        setDPalettes({palettes:data.data.palettes,error:false,message:'Something Went Wrong!'});
    }else{
        setDPalettes({palettes:[],error:true,message:'No default Palette'});
    }
}catch(e){
    console.log(e)
    setDPalettes({palettes:[],error:true,message:'No default Palette'});
}
}


    useEffect(()=>{
      fetchDefaultPalette();  
    },[])


  return dPalettes;
};

export default useFetchDefaultPalette;