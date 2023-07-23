import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LockIcon from '@mui/icons-material/Lock';
import { useUserContext } from '../../contexts/UserContext';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';
import style from "./authentication.module.css";


function Login() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [strength, setStrength] = useState('');
	const [color, setColor] = useState('');

	const CLIENT_ID = "6786c50c201453792949";

	const { user, setUser, signup, setSignup, login, googleLogin, responseFacebook, register, githubLoginFailure, githubLoginSuccess, encryptText } = useUserContext();

	useEffect(() => {
		setUser((prevState) => ({
			...prevState,
			userData: {
				...prevState.userData,
				email: email,
				password: encryptText(password),
				loginFrom: 'web'
			}
		}))
	}, [email, password]);

	const checkEmail = (e) => {
		setEmail(e.target.value)
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		let isEmailValid = emailRegex.test(e.target.value);

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
											<input className={`${style.inputField} ${style.inputField_inner}`} type="text" placeholder="Email" name="email" value={email} onChange={checkEmail} required />
											<div id="validationMessage"></div>
										</div>
										<div className={style.formInput} name="password" label="Password">
											<i className={style.icon}><LockIcon /></i>
											<input className={`${style.inputField} ${style.inputField_inner}`} placeholder="Password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
											<div style={{ color }}>Strength: {strength}</div>
										</div>
										<div className={style.login_register_button}>
											<button className={style.signIn_btn} onClick={() => {
												register()
											}}>
												SIGN UP
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

										<div className={style.option_btn} id="github_signIn">
											<GitHubLogin
												clientId={CLIENT_ID}
												redirectUri="http://localhost:3000/login"
												onSuccess={githubLoginSuccess}
												onFailure={githubLoginFailure}
												buttonText='Github'
												className={`${style.github_btn} ${style.btn}`}
											>
												<span className={style.option_border}><GitHubIcon style={{ fontSize: "28px", paddingTop: "3px" }} /></span> <span className={style.option_name}>Github</span>
											</GitHubLogin>
										</div>
									</div>
								</div>
							) : (
								<div>
									<div className={style.inputForm}>
										<div className={style.formInput} name="email" label="email">
											<i className={style.icon}><AccountCircleIcon /></i>
											<input className={`${style.inputField} ${style.inputField_inner}`} type="text" placeholder="Email" name="email" value={email} onChange={checkEmail} required />
											<div id="validationMessage"></div>
										</div>
										<div className={style.formInput} name="password" label="Password">
											<i className={style.icon}><LockIcon /></i>
											<input className={`${style.inputField} ${style.inputField_inner}`} placeholder="Password" type="password" name="password" value={password} onChange={handlePasswordChange} required />
											<div style={{ color }}>Strength: {strength}</div>
										</div>
										<div className={style.login_register_button}>
											<button className={style.signIn_btn} onClick={() => {
												login()
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

										<div className={style.option_btn} id="github_signIn">
											<GitHubLogin
												clientId={CLIENT_ID}
												redirectUri="http://localhost:3000/login"
												onSuccess={githubLoginSuccess}
												onFailure={githubLoginFailure}
												buttonText='Github'
												className={`${style.github_btn} ${style.btn}`}
											>
												<span className={style.option_border}><GitHubIcon style={{ fontSize: "28px", paddingTop: "3px" }} /></span> <span className={style.option_name}>Github</span>
											</GitHubLogin>
										</div>
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
