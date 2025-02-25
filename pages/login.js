import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '../components/Layout'
import axios from 'axios'
import { API } from '../config'
import { showErrorMessage } from '../helper/alert'
import { authenticate, isAuth } from '../helper/auth'

function Login() {
	const [state, setState] = useState({
		email: '',
		password: '',
		buttonText: 'Login',
		error: '',
	})

	const { email, password, buttonText, error } = state

	const handleChange = (name) => (e) => {
		setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Login' })
	}
	const login = (e) => {
		e.preventDefault()
		console.log('Login')
		setState({ ...state, buttonText: 'Logging in' })
		const loginData = { email: state.email, password: state.password }
		axios
			.post(`${API}/api/login`, loginData)
			.then((response) => {
				console.log('Login success', response)
				authenticate(response, () => (isAuth() && isAuth().role === 'admin' ? Router.push('/admin') : Router.push('/user')))
			})
			.catch((error) => {
				console.log('Login error', error)
				setState({ ...state, buttonText: 'Login', error: error.response.data.error })
			})
	}

	useEffect(() => {
		isAuth() && Router.push('/')
	}, [])

	const loginForm = () => (
		<form onSubmit={login}>
			<div className='form-group'>
				<label className='text-muted'>Email</label>
				<input
					type='email'
					className='form-control'
					value={email}
					onChange={handleChange('email')}
					required
				/>
			</div>
			<div className='form-group'>
				<label className='text-muted'>Password</label>
				<input
					type='password'
					className='form-control'
					value={password}
					onChange={handleChange('password')}
					required
				/>
			</div>
			<br />
			{error && showErrorMessage(error)}
			<button className='btn btn-outline-primary'>{buttonText}</button>
			<Link
				href='/'
				className='nav-link text-dark'
			>
				Forgot password
			</Link>
		</form>
	)
	return (
		<Layout>
			<h1>Login</h1>
			{loginForm()}
		</Layout>
	)
}

export default Login
