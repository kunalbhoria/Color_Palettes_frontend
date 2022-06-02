import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { withStyles } from "@mui/styles";
import styles from '../Styles/ColorBoxStyle';

class ColorBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        this.copyToClipboard = this.copyToClipboard.bind(this)
    }

    copyToClipboard() {
        let color = this.props.color;
        navigator.clipboard.writeText(color)
        this.setState({ show: true }, () => {
            setTimeout(() => this.setState({ show: false }), 2000);
        })
    }


    render() {
        let { color, name, id, showMore, classes } = this.props;
        let show = this.state.show ? "show" : " ";
        return (<div
            className={classes.colorBox}
            onClick={this.copyToClipboard}
            style={{ backgroundColor: color }
            }>
            <p className={classes.colorName}>{name}</p>
            <span className={classes.copyBtn}>Copy</span>
            {showMore && (<Link to={this.props.moreLink} onClick={e => e.stopPropagation()} ><button className={classes.moreBtn}>
                More
            </button></Link>)}
            <div className={`${classes.overlay} ${show}`} />
            <div className={`${classes.copyMsg} ${show}`} >
                <h2>Copied!</h2>
                <p>{color}</p>
            </div>
        </div>)
    }
}

export default withStyles(styles)(ColorBox);