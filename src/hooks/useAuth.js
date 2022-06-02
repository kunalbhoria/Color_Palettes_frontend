// import React, { createContext } from "react";
import axios from "axios";
async function login(data) {
    try{
        let res = await axios.post('http://localhost:3001/user/login', data);
        if(res.data.success){
            window.localStorage.setItem('token',JSON.stringify(res.data.token))
            return {success:true,message:res.data.message};
        }else{
            window.localStorage.removeItem('token');
            return {success:false,message:res.data.message};
        }

    }catch(e){
        window.localStorage.removeItem('token');
        return {success:false,message:'Something Went Wrong'};
    }
}
async function register(data) {
    try{
        let res = await axios.post('http://localhost:3001/user/register', data);
        if(res.data.success){
            window.localStorage.setItem('token',JSON.stringify(res.data.token))
            return {success:true,message:res.data.message};
        }else{
            window.localStorage.removeItem('token');
            return {success:false,message:res.data.message};
        }

    }catch(e){
        window.localStorage.removeItem('token');
        return {success:false,message:'Something Went Wrong'};
    }
}

async function logout(){
    window.localStorage.removeItem('token')
    try{
        let res = await axios.post('http://localhost:3001/user/logout', data);
        window.localStorage.removeItem('token');
        return {success:false,message:res.data.message};
        
    }catch(e){
        window.localStorage.removeItem('token');
        return {success:false,message:'Something Went Wrong'};
    }
}

async function saveNewPalette(data){
    try{
   let token = JSON.parse(window.localStorage.getItem('token'));
   if(token){
           let res = await axios.post('http://localhost:3001/user/palette/add', data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
           });
           if(res.data.success){
               return{ success:true,message:"Palette successfully added"}
           }
           return {success:false,message:res.data.message};
        }else{
            return {success:false,message:res.data.message};
        }  

        }catch(e){
            return {success:false,message:'Something Went Wrong'};
        }
    
}

async function deletePalette(data){
    try{
   let token = JSON.parse(window.localStorage.getItem('token'));
   if(token){
           let res = await axios.delete(`http://localhost:3001/user/palette/delete/${data.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
           });
           if(res.data.success){
               return{ success:true,message:"Palette successfully deleted"}
           }
           return {success:false,message:res.data.message};
        }else{
            return {success:false,message:res.data.message};
        }  

        }catch(e){
            return {success:false,message:'Something Went Wrong'};
        }
    
}

// export const userContext = createContext('');

// export default function UserContextProvider({ children }) {
    // return (<userContext.Provider value={{login,register,logout}}>
    //         {children}
    //     </userContext.Provider>
    // );
// }

export {login,register,logout,saveNewPalette,deletePalette}