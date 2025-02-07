import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Protected = () => {
	const[username, setUsername] = useState()
	const[loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const location = useLocation()

	//useEffect(() => {
	//	const token = localStorage.getItem("token")
	//	
	//	if(!token){
	//		return
	//	}
	//	
	//	fetch(
	//		'http://localhost:5000/api/protected', {
	//			headers: {
	//				"Authorization": `Bearer ${token}`
	//			}
	//		}
	//	).then((response) => {
	//		if(!response.ok){
	//			navigate("/login")
	//			throw new Error("Unauthorized")
	//		}
	//		return response.json()
	//	}).then((data) => {
	//		setUsername(data.username)
	//	}).catch((error) => {
	//		alert(error.message)
	//		console.error(error.message)
	//	})
	//	
	//	const Logout = () => {
	//		localStorage.removeItem('token');
	//		navigate('/login');
	//	}
	//	
	//}, [location.pathname])
	
	useEffect(() => {
		const token = localStorage.getItem("token")
		
		const logout = () => {
			localStorage.removeItem("token")
			navigate("/login")
		}
		
		if(!token) {
			navigate("/login")
			alert("No token found ...Redirecting to login")
			console.error("No token found ...Redirecting to login")
		}
		
		try{
			const decoded = jwtDecode(token)
			setUsername(decoded.username)
			setLoading(false)
			
			const interval = setInterval(() => {
				if (decoded.exp * 1000 < Date.now()){
					logout()
				}
			}
			, 1000)
			
			return () => clearInterval(interval);
			
		}catch(error){
			console.error("Invalid token")
			logout()
		}		
	},[navigate])
	
	if (loading) {
        return <h2>Checking authentication...</h2>;
    }
	
	return(
		<div>
			<h1>Protected</h1>
			<p>This is Protected, {username}</p>
			<p>Will auto logout after 5 second </p>
		</div>
	)
}

export default Protected
