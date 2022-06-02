import React from "react";
import { withStyles } from '@mui/styles'
import styles from '../Styles/MinipaletteStyles';
import { DeleteRounded } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';


function MiniPalette(props) {
    const { classes, paletteName, id, colors, emoji, openDialog,type } = props;

    const navigate = useNavigate();
    const handleOpenDialog = (e) => {
        e.stopPropagation()
        openDialog(id);
    }

    let colorBoxes = colors.map(color => (
        <div
            key={color.name}
            className={classes.colorBox}
            style={{ backgroundColor: color.color }} />
    ))

    return (<div className={classes.root} onClick={() => { navigate(`/palette/${type}/${id}`) }}  >
        {type!='default'&&
        <DeleteRounded onClick={handleOpenDialog} className={classes.deleteBtn} style={{ transition: 'all 0.3s ease-in-out' }} />
    }
        <div className={classes.colors}>{colorBoxes}</div>
        <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
    </div>)
}

export default withStyles(styles)(MiniPalette);