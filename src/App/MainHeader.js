import React from "react";
import { withStyles } from "@mui/styles";
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom';
// import styles from '../Styles/PaletteHeaderStyle';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Login from "@mui/icons-material/Login";
// import './PaletteNav.css'

const styles = {
    mainHeader:{
        // display:'flex',

    },
    nav:{
        display:'flex',
        padding:'0.5rem 1rem'
    }
}
function MainHeader({ classes }) {

    return (<header className={classes.mainHeader}>

        <nav className={classes.nav}>

            <div className={classes.logo}>
                <Link to={'/'}>React Color Palettes</Link>
            </div>

            <Button variant="outlined" startIcon={<Login />}>
                Login
            </Button>
            <Button variant="contained" endIcon={<Login />}>
                Login
            </Button>

        </nav>

    </header>)
}

export default withStyles(styles)(MainHeader);