const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors())
app.use(express.json())

const users = [
	{
		username: "admin",
		password: "111"
	},
	{
		username: "user",
		password: "111"
	}
]

app.post('/api/register', (req, res) => {
	const { username, password } = req.body
	const existingUser = users.find( user => user.username === username )
	
	if(existingUser){
		return res.status(400).json({
			message: "User already exists."
		})
	}
	
	users.push({
		username,
		password
	})
	
	res.status(201).json({
		message: "User successfully register."
	})
})

app.post('/api/login', (req, res) =>{
	const { username, password } = req.body
	
	const user = users.find( user => user.username === username && user.password === password )
	
	if(user){
		const token = jwt.sign({username}, "secret_key", {expiresIn: "5s"})
		res.status(200).json({
			token: token,
			message: "Successfully logged in"
		})
	}
	
	res.status(401).json({
		message: "Invalid credentials"
	})
})

//app.get('/api/protected', (req, res) => {
//	const token = req.headers.authorization?.split(" ")[1]
//	
//	if(!token){
//		return res.status(401).json({
//			message: "Unauthorized"
//		})
//	}
//	
//	try{
//		const decoded = jwt.verify(token, "secret_key")
//		res.json({
//			username: decoded.username
//		})
//	}catch(error){
//		alert("Invalid token")
//		console.error("Invalid token")
//	}
//})

app.listen(PORT, '0.0.0.0', () => {
	console.log('Listening at port 5000 ...')
})
