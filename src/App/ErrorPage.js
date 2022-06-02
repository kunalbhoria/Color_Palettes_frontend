import React from "react";
import {  useNavigate, useLocation } from 'react-router-dom';
// import backgroungImg from '../backgroundError.svg';

let style = {
    MainBox: {
        width: '100%',
        height: '90vh',
        // border:'2px solid red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color:'white'
        // fontSize:'1rem',
    },
    HeadingBox: {
        margin: '3rem',
        display: 'flex',
        backgroundColor:'#384bad',
        textShadow: '1.5px 1.5px #121212',

    },
    code: {
        fontSize: '2rem',
        padding: '0.5rem',
        fontWeight: '700'
    },
    heading: {
        padding: '0.5rem 1rem',
        borderLeft: '4px solid white',
        fontSize: '2rem',
        fontWeight: '500'
    },
    button: {
        fontSize: '18px',
        padding: '3px'
    }
}

export default function ErrorPage(props) {
    let Navigate = useNavigate()
    let location = useLocation();
    let isHomePage = false
    if (location.pathname == '/') {
        isHomePage = true;
    } else {
        isHomePage = false
    }
    console.log(location)
    const { errorCode = 404, heading = 'Page Not Found', message = 'Show Palettes List' } = props;


function handleNavigation(){
    if(errorCode==402){
        window.location.href='/'
    }
    Navigate('/')
    
};


    return (<div className="errorBox">
        <div style={style.MainBox}>
            <div style={style.HeadingBox}>
                <h1 style={style.code}>{errorCode}</h1>
                <h2 style={style.heading} >{heading}</h2>
            </div>
            {isHomePage ?
                <button style={style.button} onClick={() => { window.location.reload() }}>Refresh Page</button>
                : <button style={style.button} onClick={handleNavigation}>{message}</button>
            }
        </div>
    </div>)
}