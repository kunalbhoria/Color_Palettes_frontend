import React, { useState, useEffect } from "react";
import axios from "axios";
function useFetchUserPalettes() {

    const [userPalettes, setUserPalettes] = useState({ palettes: [], error: true, message: 'Someting Went Wrong!' })

    async function fetchUserPalette() {
        try {
            let token = JSON.parse(window.localStorage.getItem('token'));
            if (token) {
                let res = await axios.post('http://localhost:3001/user/palette/all', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                let data = res.data
                if (data.success && data.data.palettes.length > 0) {
                    // let shadedPalettes = await generteColorShade(data.data)
                    setUserPalettes({ palettes: data.data.palettes, error: false, message: 'Something Went Wrong!' });
                }
            } else {
                setUserPalettes({ palettes: [], error: true, message: 'No user Palette' });
            }
        } catch (e) {
            console.log(e)
            setUserPalettes({ palettes: [], error: true, message: 'No user Palette' });
        }
    }


    useEffect(() => {
        fetchUserPalette();
    }, [])


    return { ...userPalettes, RefreshUserPalettes: fetchUserPalette };
};

export default useFetchUserPalettes;