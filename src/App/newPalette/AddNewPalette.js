import React, { useState, memo, useContext } from "react";
import NewPaletteNav from './NewPaletteNav';
import ColorPicker from './ColorPicker';
import { withStyles } from "@mui/styles";
import DraggableColorBoxList from "./DraggableColorBoxList";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from "react-router-dom";
import { arrayMove } from "react-sortable-hoc";
import styles from '../../Styles/AddNewPaletteStyle';
import { saveNewPalette } from "../../Hooks/useAuth";
import { isUserContext } from "../../Context/isUserContext";


const drawerWidth = 350;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));







function AddNewPalette(props) {

  try {
    const theme = useTheme();
    const { classes, palettes, maxColor = 20 } = props;
    const [open, setOpen] = useState(false);
    const [Colors, setColors] = useState(palettes[0].colors);
    const [savePalette, setSavePalette] = useState({ success: false, message: 'Something went wrong' })

    const { user } = useContext(isUserContext);


    const navigate = useNavigate()

    const isPaletteFull = Colors.length >= maxColor;

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
    const handleAddColor = (color) => {
      setColors([...Colors, color]);
    };



    const removeColor = (colorName) => {
      setColors(Colors.filter(color => color.name != colorName));
    }

    const handleSaveNewPalette = async (newPalette, RefreshUserPalettes) => {
      let id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
      newPalette.id = id.replaceAll('/', '')
      newPalette.colors = Colors;
      if (user && user.user) {
        let isSaved = await saveNewPalette(newPalette);
        if (isSaved.success) {
          setSavePalette(isSaved);
          console.log(isSaved.message)
          RefreshUserPalettes()
          navigate('/');

        } else {
          setSavePalette(isSaved)
          console.log(isSaved.message)
        }
      }
      else {
        console.log('user not logedin')
      }
    };



    const onSortEnd = ({ oldIndex, newIndex }) => {
      setColors(arrayMove(Colors, oldIndex, newIndex));
    };

    const clearPaletteColors = () => {
      setColors([]);
      console.log('palette cleared')
    }
    const addRandomColor = () => {
      let isDuplicateColor = true;
      let allColors = palettes.map(palette => palette.colors).flat();
      let randomColor;
      while (isDuplicateColor) {
        let randomNumber = Math.floor(Math.random() * allColors.length);
        randomColor = allColors[randomNumber];
        isDuplicateColor = Colors.some(color => color.name === randomColor.name);
      }

      setColors([...Colors, randomColor]);
    }

    return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <NewPaletteNav open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleSaveNewPalette={handleSaveNewPalette}
            palettes={palettes}
          />
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <div className={classes.drawerFormContainer}>
              <Typography variant="h4" component={'h4'}>Design Your Palette</Typography>
              <div className={classes.buttons}>
                <Button className={classes.btn} variant="contained" onClick={clearPaletteColors} color="warning">Clear Palette</Button>
                <Button className={classes.btn} variant="contained" onClick={addRandomColor} color="secondary" disabled={isPaletteFull}>Random Color</Button>
              </div>

              <ColorPicker handleAddColor={handleAddColor} Colors={Colors} isPaletteFull={isPaletteFull} />
            </div>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <div className={classes.BoxContainer}>
              <DraggableColorBoxList
                distance={10}
                Colors={Colors}
                removeColor={removeColor}
                axis='xy'
                onSortEnd={onSortEnd}
              />
            </div>
          </Main>

        </Box>
      </div>
    );
  } catch (error) {
    console.log('error', error)
  }
}

export default withStyles(styles)(memo(AddNewPalette))