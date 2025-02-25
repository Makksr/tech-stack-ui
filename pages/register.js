import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { showSuccessMessage, showErrorMessage } from '../helper/alert'
import { API } from '../config'
import { isAuth } from '../helper/auth'
import Router from 'next/router'

function Register() {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: '',
		buttonText: 'Register',
	})
	const { name, email, password, error, success, buttonText } = state
	const handleChange = (name) => (e) => {
		setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register' })
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		console.table({ name, email, password })
		setState({ ...state, buttonText: 'Registering' })
		axios
			.post(`${API}/api/register`, {
				name,
				email,
				password,
			})
			.then((response) => {
				console.log(response)
				setState({ name: '', email: '', password: '', buttonText: 'Submitted', success: response.data.message })
			})
			.catch((error) => {
				console.log(error)
				setState({ ...state, buttonText: 'Register', error: error.response.data.error })
			})
	}

	useEffect(() => {
		isAuth() && Router.push('/')
	}, [])

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label className='text-muted'>Name</label>
				<input
					type='text'
					className='form-control'
					value={name}
					onChange={handleChange('name')}
					required
				/>
			</div>
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
			<button className='btn btn-outline-primary'>{buttonText}</button>
		</form>
	)
	return (
		<Layout>
			{success && showSuccessMessage(success)}
			{error && showErrorMessage(error)}
			<div className='container'>
				<h2>Register</h2>
				<hr />
				{registerForm()}
			</div>
			{JSON.stringify(state)}
		</Layout>
	)
}

export default Register
