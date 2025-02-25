import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Router from 'next/router'
import { isAuth, logout } from '../helper/auth'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Router.onRouteChangeStart = (url) => nprogress.start()
Router.onRouteChangeComplete = () => nprogress.done()
Router.onRouteChangeError = () => nprogress.done()

const Layout = ({ children }) => {
	const head = () => (
		<Head>
			<link
				href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
				rel='stylesheet'
				integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
				crossOrigin='anonymous'
			/>
			<link
				rel='stylesheet'
				href='/static/css/styles.css'
			/>
		</Head>
	)
	const nav = () => (
		<ul className='nav nav-tabs bg-info'>
			{!isAuth() && (
				<React.Fragment>
					<li className='nav-item'>
						<Link
							className='nav-link text-dark'
							href='/login'
						>
							Login
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link text-dark'
							href='/register'
						>
							Register
						</Link>
					</li>
				</React.Fragment>
			)}
			{isAuth() && isAuth().role === 'admin' && (
				<li className='nav-item'>
					<Link
						className='nav-link text-dark'
						href='/admin'
					>
						{isAuth().name}
					</Link>
				</li>
			)}
			{isAuth() && isAuth().role === 'subscriber' && (
				<li className='nav-item ml-auto'>
					<Link
						className='nav-link text-dark'
						href='/user'
					>
						{isAuth().name}
					</Link>
				</li>
			)}
			{isAuth() && (
				<li className='nav-item '>
					<a
						onClick={logout}
						className='nav-link text-dark'
						href='/login'
					>
						Logout
					</a>
				</li>
			)}
		</ul>
	)

	return (
		<React.Fragment>
			{head()} {nav()} <div className='container pt-5 pb-5'>{children}</div>
		</React.Fragment>
	)
}

export default Layout
