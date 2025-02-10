import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const[username, setUsername] = useState('')
	const[password, setPassword] = useState('')
	const navigate = useNavigate()
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		fetch(
			'https://localhost:5000/api/login', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username,
					password
				})
			}
		).then((response) => {
			return response.json().then((data) => {
				if (!response.ok){
					alert(`${data.message}`)
					throw new Error(`${data.message}`)
				}
				localStorage.setItem("token", data.token)
				navigate('/protected')
				alert(`${data.message}`)
			})
		}).catch((error) => {
			console.error(`${error.message}`)
		})
	}
	
	return(
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label>Username: </label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<br />
				<label>Password: </label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default Login
