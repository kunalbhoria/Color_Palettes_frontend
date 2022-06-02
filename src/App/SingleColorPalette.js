import React, { useState } from "react";
import ColorBox from "./ColorBox";
import PaletteHeader from "./PaletteHeader";
import PaletteFooter from "./PaletteFooter";
import SnackBar from "./SnackBar";

import { selectPalette } from "../Hooks/selectPalette";

import { Link, useParams } from "react-router-dom";

import { withStyles } from "@mui/styles";
import styles from '../Styles/PaletteStyle';
// import getSinglePalette from '../Hooks/getSinglePalette';

function SingleColorPalette({ classes }) {

    let params = useParams();
    let isLoading = true;

    const isError = false;

    const {palette,error} = selectPalette({ task: 'COLOR', ...params });
    if(error){
        isError
    }
    if (!(palette.length <= 1) && isLoading) {
        isLoading = false;
    }

    // console.log(palette)
    const { name, id, emoji, colors } = palette;

    const [colorFormat, setColorFormat] = useState('rgba');
    const [snackBar, setSnackBar] = useState({ open: false });

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
        </div> :
            <div className={classes.palette}>
                <PaletteHeader
                    colorFormat={colorFormat}
                    changeFormat={changeFormat}
                    showSlider={false}
                />
                <div className={classes.paletteColors}>
                    {colors.map(color => <ColorBox
                        key={color.name}
                        color={color[colorFormat]}
                        name={color.name}
                        id={color.name}
                        showMore={false}
                    />)}
                    <div className={classes.goBackBox}><Link to={`/palette/${params.type}/${id}`}><span
                        className="go-backBtn">Go Back</span></Link></div>
                </div>

                <SnackBar
                    snackBar={snackBar}
                    handleSnackBarClose={handleSnackBarClose}
                    colorFormat={colorFormat}
                />
                {!isLoading && <PaletteFooter name={name} emoji={emoji} />}
            </div>}</>)
};


export default withStyles(styles)(SingleColorPalette);