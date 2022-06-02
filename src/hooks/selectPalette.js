import {useContext, useState} from 'react';
import { generteColorShade } from './generateShades';
import {DefaultPaletteContext} from '../Context/defaultPaletteContext';
import {UserPaletteContext} from '../Context/userPaletteContext';

function selectPalette(action) {
const types = ['local','user','default'];

if(!types.includes(action.type)) return {palette:[],error:true};



let allPalettes=[]

switch(action.type) {
  case 'default':
    let defaultPalette = useContext(DefaultPaletteContext);
    allPalettes = defaultPalette.palettes
    break;
  case 'user':
    let userPalette = useContext(UserPaletteContext);
    allPalettes = userPalette.palettes
    break;
    break;

  default:
    break;
}
if(allPalettes.length>=1){
const palette = allPalettes.filter(palette => palette.id == action.paletteId);
if(palette.length>=1){
  const colorShadedPalette = generteColorShade(palette[0]);
  let singleColorShades = [];
  if (action.task == 'COLOR') {
      for (let shade in colorShadedPalette.colors) {
        singleColorShades = singleColorShades.concat(colorShadedPalette.colors[shade].filter(color => color.id === action.colorId))
      }
      if(singleColorShades.length<=0){
        return {palette:[],error:true}
      }
      return { palette:{...colorShadedPalette,colors: singleColorShades.slice(1)}, error:false };
    } else {
      return {palette:colorShadedPalette,error:false};
    };
}else{ return {error:true,palette:[]}}

}else{
  return {palette:[],error:true}
}

}


export { selectPalette };