import { Spin } from "antd";
import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import { useUserContext } from '../../contexts/UserContext';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";
import GitHubLogin from 'react-github-login';
import style from "./authentication.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Login() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [password, setPassword] = useState("");
	const [strength, setStrength] = useState('');
	const [color, setColor] = useState('');

	const CLIENT_KEY = "967278741aab4a1b098d69edd7e014ff08dc8b2c";
	const CLIENT_ID = "6786c50c201453792949";

	const { signup, setSignup, login, googleLogin, responseFacebook, register } = useUserContext();


	function checkEmail() {
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setIsEmailValid(emailRegex.test(email));

		var validationMessage = document.getElementById('validationMessage');
		if (isEmailValid) {
			validationMessage.textContent = 'Email is valid.';
			validationMessage.style.color = 'green';
		} else {
			validationMessage.textContent = 'Email is invalid.';
			validationMessage.style.color = 'red';
		}
	}


	const handlePasswordChange = (e) => {
		setPassword(e.target.value);

		const passwordLength = e.target.value.length;
		const hasUppercase = /[A-Z]/.test(e.target.value);
		const hasLowercase = /[a-z]/.test(e.target.value);
		const hasNumber = /[0-9]/.test(e.target.value);
		const hasSpecialChar = /[!@#$%^&*]/.test(e.target.value);

		let strength = '';
		let color = '';

		if (passwordLength > 7 && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
			strength = 'Strong';
			color = 'green';
		} else if (passwordLength >= 6 && (hasUppercase || hasLowercase) && (hasNumber || hasSpecialChar)) {
			strength = 'Moderate';
			color = 'orange';
		} else {
			strength = 'Weak';
			color = 'red';
		}

		setStrength(strength);
		setColor(color);
	};


	// const history = useHistory();	
	// useEffect(() => {
	// 	const urlParams = new URLSearchParams(window.location.search);
	// 	const code = urlParams.get('code');
	// 	const values = {
	// 		code: code
	// 	}

	// 	if (code) {
	// 		// Exchange the code for an access token
	// 		console.log(code)
	// 		async function getAccessToken() {
	// 			await axios.get("http://localhost:5002/api/userlogin/accessToken", values)
	// 		}
	// 		getAccessToken()
	// 	}
	// }, []);



	const handleSuccess = async (res) => {
		async function getAccessToken() {
			try {
				await axios.get("api/userlogin/getAccessToken?code=" + res.code)
					.then((response) => {
						console.log(response.data)
						if (response.data.accessToken)
							getUserData(response.data.accessToken)
					})
					.catch((err) => { console.log(err) })
			} catch (error) {
				console.log("ERROR")
				console.log(error)
			}
		}
		getAccessToken()
	};

	async function getUserData(accessToken) {
		try {
			await axios.get("api/userlogin/getUserData", {
				params: {
					accessToken: accessToken,
				},
			})
				.then((response) => {
					console.log("GITHUB USER DATA")
					console.log(response.data)
				})
				.catch((err) => { console.log(err) })
		} catch (error) {
			console.log(error)
		}
	}

	const handleFailure = (response) => {
		console.error(response);
		// Handle authentication failure
	};

	return (
		<div className={style.auth_parent}>
			{loading && <Spin size="large" />}
			<div className={style.main_container}>
				<div className={style.header}>
					<h2>Please Login To Continue</h2>
					<h2>X</h2>
				</div>
				<div className={style.signIn_container}>
					<div layout="vertical">
						<div className={style.sign_in_up}>
							<div><button className={style.btn_signin_up} onClick={() => { setSignup(true) }}><h1>Register</h1></button></div>
							<div><button className={style.btn_signin_up} onClick={() => { setSignup(false) }}><h1>Login</h1></button></div>
						</div>
						<hr />
						{signup ?
							(
								<div>
									<div className={style.inputForm}>
										<div className={style.formInput} name="email" label="email">
											<i className={style.icon}><AccountCircleIcon /></i>
											<input className={`${style.inputField} ${style.inputField_inner}`} type="text" placeholder="Email" name="email" value={email} required onChange={(e) => {
												setEmail(e.target.value)
												checkEmail()
											}} />
											<div id="validationMessage"></div>
										</div>
										<div className={style.formInput} name="password" label="Password">
											<i className={style.icon}><LockIcon /></i>
											<input className={`${style.inputField} ${style.inputField_inner}`} placeholder="Password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
											<div style={{ color }}>Strength: {strength}</div>
										</div>
										<div className={style.login_register_button}>
											<button className={style.signIn_btn} onClick={() => {
												register(email, password)
											}}>
												LOGIN
											</button>
										</div>
									</div>

									<hr style={{
										width: "85%",
										margin: "auto",
									}} />

									<div className={style.signIn_option}>
										<div className={style.option_btn} id="google_signIn">
											<button className={`${style.google_btn} ${style.btn}`} onClick={() => googleLogin()}><span className={style.option_border}><GoogleIcon style={{ fontSize: "28px", paddingTop: "3px" }} /></span> <span className={style.option_name}>Google</span></button>
										</div>

										<div className={`${style.option_btn}`} id="facebook_signIn">
											<FacebookLogin
												appId="846682357045128"
												autoLoad={false}
												fields="name,email,picture"
												textButton="Facebook"
												size='small'
												cssClass={`${style.facebook_btn} ${style.btn}`}
												icon={`${style.option_border} fa-brands fa-facebook-f`}
												callback={responseFacebook}
											/>
										</div>

										<div className={style.option_btn} id="google_signIn">
											{/* <button onClick={handleGitHubLogin}>Login with GitHub</button> */}
											<GitHubLogin
												clientId={CLIENT_ID}
												redirectUri="http://localhost:3000/login"
												onSuccess={handleSuccess}
												onFailure={handleFailure}
											/>
										</div>
									</div>
								</div>
							) : (
								<div>
									<div className={style.inputForm}>
										<div className={style.formInput} name="email" label="email">
											<i className={style.icon}><AccountCircleIcon /></i>
											<input className={`${style.inputField} ${style.inputField_inner}`} type="text" placeholder="Email" name="email" value={email} required onChange={(e) => {
												setEmail(e.target.value)
												checkEmail()
											}} />
											<div id="validationMessage"></div>
										</div>
										<div className={style.formInput} name="password" label="Password">
											<i className={style.icon}><LockIcon /></i>
											<input className={`${style.inputField} ${style.inputField_inner}`} placeholder="Password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
											<div style={{ color }}>Strength: {strength}</div>
										</div>
										<div className={style.login_register_button}>
											<button className={style.signIn_btn} onClick={() => {
												login(email, password)
											}}>
												LOGIN
											</button>
										</div>
									</div>

									<hr style={{
										width: "85%",
										margin: "auto",
									}} />

									<div className={style.signIn_option}>
										<div className={style.option_btn} id="google_signIn">
											<button className={`${style.google_btn} ${style.btn}`} onClick={() => googleLogin()}><span className={style.option_border}><GoogleIcon style={{ fontSize: "28px", paddingTop: "3px" }} /></span> <span className={style.option_name}>Google</span></button>
										</div>

										<div className={`${style.option_btn}`} id="facebook_signIn">
											<FacebookLogin
												appId="846682357045128"
												autoLoad={false}
												fields="name,email,picture"
												textButton="Facebook"
												size='small'
												cssClass={`${style.facebook_btn} ${style.btn}`}
												icon={`${style.option_border} fa-brands fa-facebook-f`}
												callback={responseFacebook}
											/>
										</div>


									</div>
								</div>
							)
						}

						{/* <div>
							<div id="google_signIn">
								{user.loginStatus ? (
									<div>
										<img src={user.picture} alt="user image" />
										<h3>User Logged in</h3>
										<p>Name: {user.name}</p>
										<p>Email Address: {user.email}</p>
										<br />
										<br />
										<button onClick={googleLogOut}>Log out</button>
									</div>
								) : (
									<button onClick={() => googleLogin()}>Sign in with Google 🚀 </button>
								)}
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
