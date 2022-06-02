import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from './DraggableColorBox'
import { withStyles } from "@mui/styles";

const styles = {
    BoxContainer: {
        height: `100%`,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    }
}

const DraggableColorBoxList = SortableContainer(({ Colors, classes, removeColor }) => {
    return (
        <div className={classes.BoxContainer} style={{ height: '100%' }}>
            {Colors.map((color, i) => <DraggableColorBox
                index={i}
                key={color.name}
                color={color.color}
                removeColor={() => removeColor(color.name)}
                name={color.name} />)}
        </div>
    )
})

export default withStyles(styles)(DraggableColorBoxList);