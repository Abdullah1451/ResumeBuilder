import React, { useContext, useEffect, useState } from "react"
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from "axios";
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useResumeContext } from './ResumeContext';


const Context = React.createContext()

export function useUserContext() {
    return useContext(Context)
}

export function UserContext({ children }) {

    const { getUserResumeData } = useResumeContext()
    const [signup, setSignup] = useState(false)
    const [isStateSet, setIsStateSet] = useState(0)
    const [user, setUser] = useState({})
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('user'))
        const google_login = userData?.google_login || false;
        const loginStatus = userData?.loginStatus || false;
        if (userData) {
            delete userData.loginStatus;
            delete userData.google_login;
            if(loginStatus)
                getUserResumeData(userData.email)
        }
        setUser((prevState) => ({
            google_login,
            loginStatus,
            userData: userData || {},
        }))
    }, [])


    useEffect(() => {
        if (isStateSet > 0)
            login(true)
    }, [isStateSet])


    const encryptText = (text) => {
        const encryptedData = CryptoJS.SHA256(text).toString();
        return encryptedData;
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
            theme: "colored"
        });
    };


    //MANUAL AUTH
    const login = async (google_login = false) => {
        const values = {
            google_login: google_login,
            userData: user.userData,
        }
        try {
            const logged_user = await axios.post(backendUrl + "/api/userlogin/login", values);
            console.log("logged_user")
            console.log(logged_user)
            //AFTER LOGIN
            if (logged_user.data) {
                const loginStatus = true
                localStorage.setItem("user", JSON.stringify({
                    email: logged_user.data.email,
                    porfilePicture: logged_user.data.porfilePicture,
                    profile_url: logged_user.data.profile_url,
                    twitter_username: logged_user.data.twitter_username,
                    verifiedEmail: logged_user.data.verifiedEmail,
                    google_login: google_login,
                    loginStatus: loginStatus,
                    createdAt: logged_user.data.createdAt,
                    updatedAt: logged_user.data.updatedAt,
                    locale: logged_user.data.locale,
                    avatar_url: logged_user.data.avatar_url,
                    isGuestUser: logged_user.data?.isGuestUser,
                    github_primary: logged_user.data?.github_primary,
                    birthday: logged_user.data?.birthday,
                    gender: logged_user.data?.gender,
                    _id: logged_user.data._id,
                }));
                setUser({
                    google_login: google_login,
                    loginStatus: loginStatus,
                    userData: {
                        ...logged_user.data
                    }
                })
                getUserResumeData(logged_user.data.email)
                console.log("Login Successfull....")
                window.location.replace("/templates");
            }
            else {
                register();
            }
        } catch (err) {
            showErrorToast(err.response.data)
            console.log(err.message)
            console.log(err.response.data)
            console.log("Login failed.");
        }
    }


    const register = async () => {
        try {
            await axios.post(backendUrl + "/api/userlogin/register", user.userData)
                .then((response) => {
                    if (response.data) {
                        login(true)
                    }
                })
        } catch (err) {
            showErrorToast(err.response.data)
            console.log(err.message)
            console.log(err.response.data)
            console.log("Registeration failed.");
        }
    }


    //GOOGLE AUTH
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
                        setUser((prevState) => ({
                            ...prevState,
                            userData: {
                                ...prevState.userData,
                                email: res.data.email,
                                loginFrom: 'google',
                                id: String(res.data.id),
                                name: res.data.given_name,
                                locale: res.data.locale,
                                profilePicture: res.data.picture,
                                verifiedEmail: res.data.verified_email,
                            }
                        }))
                    })
                    .then(() => {
                        setIsStateSet(isStateSet + 1)
                    })
                    .catch((err) => console.log(err));
            }
        },
        onError: (error) => console.log('Login Failed:', error)
    });


    //FACEBOOK AUTH
    const responseFacebook = async (response) => {
        await axios
            .get(`https://graph.facebook.com/v14.0/me?fields=id,name,email,picture,gender,birthday,location,hometown,friends,likes,age_range,videos,posts,photos,fundraisers,is_guest_user,accounts&access_token=${response.accessToken}`)
            .then((response) => {
                setUser((prevState) => ({
                    ...prevState,
                    userData: {
                        ...prevState.userData,
                        email: response.data.email,
                        loginFrom: 'facebook',
                        id: String(response.data.id),
                        birthday: response.data.birthday,
                        friends: response.data.friends.summary.total_count,
                        gender: response.data.gender,
                        hometown_id: response.data.hometown.id,
                        hometown_name: response.data.hometown.name,
                        isGuestUser: response.data.is_guest_user,
                        likes: response.data.likes.data,
                        name: response.data.name,
                        profilePicture: JSON.stringify(response.data.picture.data),
                        posts: response.data.posts.data,
                    }
                }))
            })
            .then(() => {
                setIsStateSet(isStateSet + 1)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    //GITHUB AUTH
    const githubLoginSuccess = async (res) => {
        async function getGithubAccessToken() {
            try {
                await axios.get(backendUrl + "/api/userlogin/getGithubAccessToken?code=" + res.code)
                    .then((response) => {
                        if (response.data.accessToken) {
                            githubGetUserEmail(response.data.accessToken)
                        }
                    })
                    .catch((err) => { console.log(err) })
            } catch (error) {
                console.log("ERROR")
                console.log(error)
            }
        }
        getGithubAccessToken()
    };


    async function githubGetUserEmail(accessToken) {
        try {
            await axios.get("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            })
                .then((response) => {
                    response.data.map((item, index) => {
                        if (item.primary === true) {
                            setUser((prevState) => ({
                                ...prevState,
                                userData: {
                                    ...prevState.userData,
                                    email: item.email,
                                    github_primary: item.primary,
                                    github_visibility: item.visibility,
                                }
                            }))
                            githubGetUserData(accessToken)
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }


    async function githubGetUserData(accessToken) {
        try {
            await axios.get("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            })
                .then((response) => {
                    setUser((prevState) => ({
                        ...prevState,
                        userData: {
                            ...prevState.userData,
                            loginFrom: 'github',
                            id: String(response.data.id),
                            avatar_url: response.data.avatar_url,
                            bio: response.data.bio,
                            created_at: response.data.created_at,
                            events_url: response.data.events_url,
                            followers: response.data.followers,
                            followers_url: response.data.followers_url,
                            following: response.data.following,
                            following_url: response.data.following_url,
                            gists_url: response.data.gists_url,
                            updated_at: response.data.updated_at,
                            organizations_url: response.data.organizations_url,
                            public_repos: response.data.public_repos,
                            received_events_url: response.data.received_events_url,
                            repos_url: response.data.repos_url,
                            site_admin: response.data.site_admin,
                            subscriptions_url: response.data.subscriptions_url,
                            twitter_username: response.data.twitter_username,
                            type: response.data.type,
                            profile_url: response.data.url
                        }
                    }))
                })
                .then(() => {
                    setIsStateSet(isStateSet + 1)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
        }
    }


    const githubLoginFailure = (response) => {
        console.error(response);
    };


    //LINKEDIN AUTH
    const linkedinLoginSuccess = async (code) => {
        async function getLinkedinAccessTokenAndUserData() {
            try {
                await axios.get("/api/userlogin/getLinkedinAccessTokenAndUserData?code=" + code)
                    .then((response) => {
                        console.log("Access Code")
                        console.log(response.data)
                        setUser((prevState) => ({
                            ...prevState,
                            userData: {
                                ...prevState.userData,
                                email: response.data.email,
                                loginFrom: 'linkedin',
                                id: String(response.data.id),
                                name: response.data.localizedFirstName + response.data.localizedLastName,
                                firstName: response.data.localizedFirstName,
                                lastName: response.data.localizedLastName,
                                locale: response.data.firstName.preferredLocale.language,
                                location: response.data.firstName.preferredLocale.country,
                                linkedinProfilePicture: response.data.profilePicture['displayImage~'],
                                verifiedEmail: true,
                            }
                        }))
                    })
                    .then(() => {
                        setIsStateSet(isStateSet + 1)
                    })
                    .catch((err) => { console.log(err) })
            } catch (error) {
                console.log("ERROR")
                console.log(error)
            }
        }
        getLinkedinAccessTokenAndUserData()
    };



    //LOGOUT
    const logout = () => {
        if (user.google_login) {
            googleLogout()
            user.google_login = false
        }
        localStorage.removeItem('user');
        user.loginStatus = false
        localStorage.setItem("user", JSON.stringify({
            loginStatus: user.google_login,
            google_login: user.loginStatus,
            email: '',
            porfilePicture: '',
            createdAt: '',
            updatedAt: '',
        }));
        if (user.userData)
            setUser((prevState) => ({
                ...prevState,
                userData: {}
            }))

        console.log("LOGGED OUT SUCCESSFULLY")
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
            githubLoginFailure,
            githubLoginSuccess,
            linkedinLoginSuccess,
            encryptText,
            showErrorToast
        }}>
            {children}
        </Context.Provider>
    )
}