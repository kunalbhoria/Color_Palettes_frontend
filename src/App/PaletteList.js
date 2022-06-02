import React, { useState, memo, useContext } from "react";
import { Link } from 'react-router-dom';
import MiniPalette from "./MiniPalette";
import LoginForm from "./LoginForm";

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
import styles from '../Styles/PaletteListStyle';
import Login from "@mui/icons-material/Login";
import Button from '@mui/material/Button';


import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { isUserContext } from "../Context/isUserContext";
import { DefaultPaletteContext } from "../Context/defaultPaletteContext";
import { UserPaletteContext } from "../Context/userPaletteContext";
import { logout, deletePalette } from '../Hooks/useAuth'

function PaletteList({ classes }) {
    let defaultPaletteData = useContext(DefaultPaletteContext)
    let { user, findUser } = useContext(isUserContext);

    const userPalettes = useContext(UserPaletteContext)

    const [deleteId, setDeleteId] = useState('');
    const [open, setOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const openDialog = (id) => {
        setOpen(true);
        setDeleteId(id);
    }
    const closeDialog = () => {
        setOpen(false);
        setDeleteId('');
    }
    const openLoginDialog = (id) => {
        setOpenLogin(true);
    }
    const closeLoginDialog = () => {
        setOpenLogin(false);
    }

    const handleLogout = () => {
        logout()
        findUser()
        userPalettes.RefreshUserPalettes()
    }

    const handleDeletePalette = async () => {
        try {
            let isDeleted = await deletePalette({ id: deleteId });
            if (isDeleted.success) {
                console.log('succesfully deleted')
                userPalettes.RefreshUserPalettes()

            } else {
                console.log('not  deleted')

            }

            closeDialog();

        } catch (e) {
            console.log('could not delete', e);
        }
    }

    const DefaultPalettes = defaultPaletteData.palettes.map(palette => (<CSSTransition key={palette.id} classNames='fade' timeout={500} ><MiniPalette key={palette.id} openDialog={openDialog} type={'default'}  {...palette} /></CSSTransition>));


    const UserPalettes = userPalettes.palettes.map(palette => (<CSSTransition key={palette.id} classNames='fade' timeout={500} ><MiniPalette key={palette.id} openDialog={openDialog} type={'user'}  {...palette} /></CSSTransition>));
    // const miniPalette = palettes.map(palette => (<CSSTransition key={palette.id} classNames='fade' timeout={500} ><MiniPalette  openDialog={openDialog}  {...palette} /></CSSTransition>));

    return (<>
        <div className={classes.root}>
            <div className={classes.loginBox} >
                {user && user.user ?
                    <Button onClick={handleLogout} variant="contained" startIcon={<Login />}>
                        Logout
                    </Button>
                    : <Button onClick={openLoginDialog} variant="contained" startIcon={<Login />}>
                        Login
                    </Button>
                }
            </div>
            <div className={classes.container}>
                <nav className={classes.navBar}>
                    <h1 className={classes.title}>React Palette</h1>
                    <Link className={classes.addPaletteLink} to={'/palette/add/new'} >add new palette</Link>


                </nav>
                <h2>User Palettes</h2>
                <TransitionGroup className={classes.palettes}>
                    {/* <div className={classes.palettes}> */}
                    {/* {miniPalette} */}
                    {UserPalettes}
                    {/* </div> */}

                </TransitionGroup>
                <h2>Default Palettes</h2>
                <TransitionGroup className={classes.palettes}>

                    {DefaultPalettes}

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

            <LoginForm open={openLogin} setUser={findUser} RefreshUserPalettes={userPalettes.RefreshUserPalettes} closeLoginDialog={closeLoginDialog} />
        </div>

    </>)
}

export default memo(withStyles(styles)(PaletteList));