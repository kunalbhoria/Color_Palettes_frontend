import React, { useState } from "react";
import ColorBox from "./ColorBox";
import PaletteHeader from "./PaletteHeader";
import PaletteFooter from "./PaletteFooter";
import SnackBar from "./SnackBar";

import { useParams } from "react-router-dom";
import { selectPalette } from "../Hooks/selectPalette";
// import getSinglePalette from "../Hooks/getSinglePalette";

import { withStyles } from "@mui/styles";
import styles from '../Styles/PaletteStyle';


function Palette({ classes }) {
    let params = useParams();
    let isLoading = true;

    const {palette,error} = selectPalette({ task: 'PALETTE', paletteId: params.paletteId,type:params.type });

    // if(error){throw new Error('Palette Not Found')}
    if(!(palette.length<=1) && isLoading){
        isLoading = false; 
    }
    
    // console.log(palette)
    let { name, id, emoji, colors } = palette
    const [colorFormat, setColorFormat] = useState('rgb')
    const [colorShade, setColorShade] = useState(400);
    const [snackBar, setSnackBar] = useState({ open: false });


    const changeShade = (shade) => {
        setColorShade(shade)
    };
    const changeFormat = (e) => {
        setSnackBar({ open: true });
        setColorFormat(e.target.value);
    }
    const handleSnackBarClose = () => {
        setSnackBar({ open: false });
    }

    return (<>
        {isLoading ? <div className="loading-box">
    <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
    Loading
</div>: 
    <div className={classes.palette}>

        <PaletteHeader
            colorShade={colorShade}
            changeShade={changeShade}
            colorFormat={colorFormat}
            changeFormat={changeFormat}
            showSlider={true}
        />

        <section className={classes.paletteColors}>
            {colors[colorShade].map(color => <ColorBox
                key={color.name}
                color={color[colorFormat]}
                name={color.name}
                id={color.id}
                showMore={true}
                moreLink={`/palette/${params.type}/${id}/${color.id}`}
            />)}
        </section>
 
        <SnackBar
            snackBar={snackBar}
            handleSnackBarClose={handleSnackBarClose}
            colorFormat={colorFormat}
        />
        {!isLoading && <PaletteFooter name={name} emoji={emoji} />}
    </div>}</>)
}

export default withStyles(styles)(Palette);