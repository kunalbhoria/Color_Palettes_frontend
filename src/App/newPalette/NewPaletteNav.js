import React from "react";

import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import PaletteFormDialog from './PaletteFormDialog';
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import styles from '../../Styles/NewPaletteNavStyle';


const drawerWidth = 350;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



function NewPaletteNav(props) {
  const { open, palettes, handleDrawerOpen, handleSaveNewPalette, classes } = props;
  return (
    <div>

      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>

        </Toolbar>
        <div className={classes.buttons}>
          <Link to={'/'}>
            <Button className={classes.btn} variant="contained" color="secondary" >Go Back</Button>
          </Link>
          <PaletteFormDialog handleSaveNewPalette={handleSaveNewPalette} palettes={palettes} />
        </div>
      </AppBar>
    </div>

  );
}

export default withStyles(styles)(NewPaletteNav);