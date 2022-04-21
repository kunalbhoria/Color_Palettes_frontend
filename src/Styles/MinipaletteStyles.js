import { red } from "react-color/lib/helpers/color";

 export default {
    root:{
        padding:'6px',
        borderRadius:'4px',
        backgroundColor:'white',
        position:'relative',
        '&:hover svg':{
            opacity:1
        }
    },
    colors:{
        backgroundColor:'#dae1e4',
        height:'120px',
        width:'100%',
        display:'flex',
        flexWrap:'wrap',
        borderRadius:'5px',
        overflow:'hidden',
        alignContent:'flex-start'
    },
    title:{
        width:'100%',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        margin:'0px',
        fontSize:'1rem',
        paddingTop:'0.5rem'
        
    },
    emoji:{
        marginLeft:'0.5rem',
        fontSize:'1.5rem'
    },
    colorBox:{
        width:'20%',
        height:'25%',
        margin:'0px'
    },
    deleteBtn:{
        backgroundColor:'#e72323db',
        color:'white',
        position:'absolute',
        right:'0',
        top:0,
        boxSizing:'content-box',
        padding:'2px',
        borderRadius:'1px',
        opacity:'0',
    }
}