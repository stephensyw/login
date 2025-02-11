import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	
	const[username, setUsername] = useState('')
	const[password, setPassword] = useState('')
	
	const handleSubmit = (e) => {
		e.preventDefault()
		
		fetch(
			'https://login-qeg7.onrender.com/api/register', {
				
				method: "POST",
				headers : {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ username, password })
			}
		).then((response) => {
			return response.json().then((data) => {
				if(!response.ok){
					alert(`${data.message}`)
					throw new Error(`${data.message}`)
				}
				alert(`${data.message}`)
			})
		}).catch((error) => {
			console.error(`${error.message}`)
		})
	}
		
	return(
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<label>Username: </label>
				<input 
					type="text"
					value={username}
					onChange={ (e) => setUsername(e.target.value) }
				/>
				<br />
				<label>Password: </label>
				<input
					type="password"
					value={password}
					onChange={ (e) => setPassword(e.target.value) }
				/>
				<br />
				<input type="submit" value="Register" />
			</form>
		</div>
	)
}

export default Login
