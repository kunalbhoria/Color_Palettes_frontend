import React from "react";
import { withStyles } from "@mui/styles";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom';
import styles from '../Styles/PaletteHeaderStyle';
// import './PaletteNav.css'

function PaletteHeader(props) {

    const { changeShade, colorShade, colorFormat, changeFormat, showSlider, classes } = props;

    return (<header className={classes.paletteHeader}>
        <nav className={classes.paletteNav}>
            <div className={classes.logo}>
                <Link to={'/'}>ReactColorPicker</Link>
            </div>
            {showSlider && (<span className={classes.level}>Level: {colorShade}</span>)}
            {showSlider && (<div className={classes.slider}>
                <Slider
                    defaultValue={500}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={changeShade}
                />
            </div>)}
            <div className={classes.formatSelector}>
                <Select style={{ fontSize: 'inherit' }} value={colorFormat} onChange={changeFormat} variant={'standard'}>
                    <MenuItem value={"hex"}>HEX - #ffffff</MenuItem>
                    <MenuItem value={"rgb"}>RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value={'rgba'}>RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
        </nav>
    </header>)
}

export default withStyles(styles)(PaletteHeader);