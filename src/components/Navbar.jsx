import React from 'react'
import '../styles/styles.css'

const Navbar = () => {
	return(
		<nav>
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/login">Login</a></li>
				<li><a href="/register">Register</a></li>
			</ul>
		</nav>
	)
}

export default Navbar
