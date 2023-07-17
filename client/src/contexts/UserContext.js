import React, { useContext, useEffect, useState } from "react"
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";


const Context = React.createContext()

export function useUserContext() {
    return useContext(Context)
}

export function UserContext({ children }) {
    const [signup, setSignup] = useState(false)
    const [user, setUser] = useState({
        loginStatus: false
    })

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    const login = async (email, password, google_login = false) => {
        const values = {
            email: email,
            password: password,
            google_login: google_login
        }
        try {
            const user = await axios.post("/api/userlogin/login", values);

            if (user.data) {
                user.data.loginStatus = true
                user.data.google_login = google_login
                localStorage.setItem("user", JSON.stringify(user.data));
                setUser(user.data)
                console.log("Login Successfull....")
                // window.location.replace("/templates");
            }
            else {
                register(email, password, false);
            }
        } catch (err) {
            console.log(err.message)
            console.log(err.response.data)
            console.log("Login failed.");
        }
    }

    const register = async (email, password) => {
        const values = {
            email: email,
            password: password
        }
        try {
            const user = await axios.post("/api/userlogin/register", values);
            console.log("Registeration successfull.");
            // window.location.replace("/templates");
        } catch (err) {
            console.log(err.message)
            console.log(err.response.data)
            console.log("Registeration failed.");
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            if (codeResponse) {
                await axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${codeResponse.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        console.log("GOOGLE LOGIN")
                        console.log(res)
                        login(res.data.email, res.data.id, true);
                    })
                    .catch((err) => console.log(err));
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const responseFacebook = (response) => {
        console.log("FACEBOOK LOGIN")
        console.log(response);
		login(response.email, response.id, true);
	};

    const logout = () => {
        if (user.google_login) {
            googleLogout()
            user.google_login = false
        }
        localStorage.removeItem('user');
        user.loginStatus = false
        localStorage.setItem("user", JSON.stringify(user));
        setUser({
            loginStatus: false,
            ...user
        })
    };


    return (
        <Context.Provider value={{
            user,
            setUser,
            signup,
            setSignup,
            login,
            logout,
            register,
            googleLogin,
            responseFacebook,
        }}>
            {children}
        </Context.Provider>
    )
}