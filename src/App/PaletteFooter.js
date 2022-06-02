import React, { Component ,PureComponent } from "react";
import { withStyles } from '@mui/styles';
import styles from '../Styles/PaletteFooterStyle';

class PaletteFooter extends PureComponent {
    render() {
        const { name, emoji } = this.props;
        return (<footer className={this.props.classes.paletteFooter}>
            <p>{name}<span>{emoji}</span></p>
        </footer>)
    }
}

export default withStyles(styles)(PaletteFooter);