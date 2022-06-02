import React, { useState, useEffect,memo } from "react";
import { ChromePicker } from 'react-color';
import { withStyles } from "@mui/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@mui/material/Button';
import styles from '../../Styles/ColorPickerStyle';


function ColorPicker(props) {
   const { handleAddColor, Colors, isPaletteFull, classes } = props;

   const [currentColor, setCurrentColor] = useState('red');
   const [colorName, setColorName] = useState('red');

   const handleSetCurrentColor = (color) => {
      setCurrentColor(color.hex);
      setColorName('');
   }
   const handleSetColorName = (e) => {
      setColorName(e.target.value);
   }

   useEffect(() => {
      ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
         return Colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())

      });
      ValidatorForm.addValidationRule('isColorUnique', () => {
         return Colors.every(({ color }) => color !== currentColor)
      });
   })

   return (<div className={classes.pickerContainer}>

      <ChromePicker
         color={currentColor}
         onChangeComplete={handleSetCurrentColor}
         className={classes.colorPicker}
      />

      <ValidatorForm onSubmit={() => handleAddColor({ color: currentColor, name: colorName })}  >
         <TextValidator
            className={classes.nameInput}
            variant='filled'
            margin='normal'
            placeholder="Color Name"
            onChange={handleSetColorName}
            value={colorName}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['Color Name is required', 'Color name must be unique', 'Color already used !']}
         />
         <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: isPaletteFull ? 'rgba(180,180,180,1)' : currentColor }}
            type='sumbit'
            disabled={isPaletteFull}
            className={classes.addBtn}
         >
            {isPaletteFull ? 'Pallete Full' : 'Add Color'}
         </Button>
      </ValidatorForm>

   </div>);
}

export default withStyles(styles)(memo(ColorPicker));