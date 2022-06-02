import React, { createContext } from "react";
import axios from "axios";


async function login(data) {
    try {
        let res = await axios.post('http://localhost:3001/user/login', data);
        if (res.data.success) {
            window.localStorage.setItem('token', JSON.stringify(res.data.token))
            return { sucess: true, message: res.data.message };
        } else {
            window.localStorage.removeItem('token');
            return { sucess: false, message: res.data.message };
        }

    } catch (e) {
        window.localStorage.removeItem('token');
        return { sucess: false, message: 'Something Went Wrong' };
    }
}
async function register(data) {
    try {
        let res = await axios.post('http://localhost:3001/user/register', data);
        if (res.data.success) {
            window.localStorage.setItem('token', JSON.stringify(res.data.token))
            return { sucess: true, message: res.data.message };
        } else {
            window.localStorage.removeItem('token');
            return { sucess: false, message: res.data.message };
        }

    } catch (e) {
        window.localStorage.removeItem('token');
        return { sucess: false, message: 'Something Went Wrong' };
    }
}

async function logout() {
    window.localStorage.removeItem('token')
    try {
        let res = await axios.post('http://localhost:3001/user/logout', data);
        window.localStorage.removeItem('token');
        return { sucess: false, message: res.data.message };

    } catch (e) {
        window.localStorage.removeItem('token');
        return { sucess: false, message: 'Something Went Wrong' };
    }
}

export const userContext = createContext('');

export default function UserContextProvider({ children }) {
    return (<userContext.Provider value={{ login, register, logout }}>
        {children}
    </userContext.Provider>
    );
}