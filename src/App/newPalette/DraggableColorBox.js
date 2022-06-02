import React, { Component } from "react";
import { DeleteRounded } from "@mui/icons-material";
import { withStyles } from '@mui/styles';
import { SortableElement } from "react-sortable-hoc";
import styles from '../../Styles/DraggableBoxStyle';

class DraggableColorBox extends Component {

    render() {
        const { color, name, removeColor, classes } = this.props;
        return (<div style={{ backgroundColor: color }}
            className={classes.root}
        >
            <div className={classes.boxContent}>
                <p>{name}</p>
                <span onClick={removeColor} className={classes.deleteBtn}>
                    <DeleteRounded />
                </span>
            </div>
        </div>)
    }
}

export default SortableElement(withStyles(styles)(DraggableColorBox));