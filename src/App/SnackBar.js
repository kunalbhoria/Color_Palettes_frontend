import React from "react";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function SnackBar({ snackBar, handleSnackBarClose, colorFormat }) {
    return (
        <Snackbar
            open={snackBar.open}
            autoHideDuration={3000}
            onClose={handleSnackBarClose}
            message={`Format Changed to ${colorFormat}`}

            action={
                <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleSnackBarClose}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />)
}


export default SnackBar;