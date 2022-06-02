import React, { Component, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MiniPalette from "./MiniPalette";
import { withStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import { red, blue } from "@mui/material/colors";
import styles from './Styles/PaletteListStyle';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from "axios";


function PaletteList({ classes, deletePalette, direction }) {

    // const  = props;
// console.log(palettes)
const [palettes,setPalettes]= useState([]);
const getPalettes = async()=>{
    let res =await axios.get('http://localhost:3001/palette/all');
    console.log(res.data)
    let data =res.data;
    console.log(data)
    if(data.success){
        console.log(data.message);
        setPalettes(data.data);
    }else{
        console.log(data.message,data.error);
    }
}
useEffect(()=>{
getPalettes();
},[])


    const [deleteId, setDeleteId] = useState('');
    const [open, setOpen] = useState(false);
    const openDialog = (id) => {
        setOpen(true);
        setDeleteId(id);
    }
    const closeDialog = () => {
        setOpen(false);
        setDeleteId('');
    }
    const handleDeletePalette = () => {
        try{
            let res = axios.delete(`http://localhost:3001/palette/${deleteId}`) 
            closeDialog();
            getPalettes();
        }catch(e){
            console.log('could not delete',e);
        }
    }

    console.log(direction)
    const miniPalette = palettes.map(palette => (<CSSTransition key={palette.id} classNames='fade' timeout={500} ><MiniPalette key={palette.id} openDialog={openDialog}  {...palette} /></CSSTransition>));

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.navBar}>
                    <h1 className={classes.title}>React Palette</h1>
                    <Link className={classes.addPaletteLink} to={'/palette/new'} >add new palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                {/* <div className={classes.palettes}> */}
                    {miniPalette}
                {/* </div> */}
                </TransitionGroup>
            </div>
            <Dialog open={open} onClose={closeDialog} >
                <DialogTitle>Delete this palette?</DialogTitle>
                <List sx={{ pt: 0 }}>
                    <ListItem button onClick={handleDeletePalette} >
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}
                            ><CheckIcon /></Avatar></ListItemAvatar>
                        <ListItemText primary='Delete' />
                    </ListItem>
                    <ListItem button onClick={closeDialog}>
                        <ListItemAvatar><Avatar style={{ backgroundColor: red[100], color: red[600] }}
                        ><CloseIcon /></Avatar></ListItemAvatar>
                        <ListItemText primary='Cancel' />
                    </ListItem>
                </List>
            </Dialog>
        </div>)
}

export default withStyles(styles)(PaletteList);