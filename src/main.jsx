import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './pages/Protected'

createRoot(document.getElementById('root')).render(
	<Router>
		<Navbar />
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/login" element={<Login />}/>
			<Route path="/register" element={<Register />}/>
			<Route path="/protected" element={<Protected />}/>
		</Routes>
	</Router>
)