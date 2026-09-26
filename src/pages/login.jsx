import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()   

        localStorage.setItem('token', data.token)
        navigate('/dashboard')
                
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <label>Email</label>
            
            <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}            
        />

            <label>Password</label>
            
            <input 
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />                
            
            <button>Login</button>

            <p>Don't have an account? <Link to="/register">Register</Link></p>
            
        </form>
    )
}

export default Login