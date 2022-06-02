import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


export const isUserContext = createContext('')

export default function IsUserContextProvider({ children }) {
    const [isUser, setIsUser] = useState({user:false,token:''})

    async function findUser() {
        try {
            let userToken = window.localStorage.getItem('token');
            let token = JSON.parse(userToken);
            if (token) {
                let user = await verifyUser(token);
                if (user) {
                    return setIsUser({ user: true,id: token })
                }
            }
            window.localStorage.removeItem('token');
            return setIsUser({ user: false });
        } catch (e) {
            window.localStorage.removeItem('token');
            return setIsUser({ user: false })
        }
    }

    async function verifyUser(token) {
        try {
            let res = await axios.post('http://localhost:3001/user/verify', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data.success) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }


    useEffect(() => {
        findUser()
    }, [])

    return (<isUserContext.Provider value={{user:isUser, findUser}} >
        {children}
    </isUserContext.Provider>);
}