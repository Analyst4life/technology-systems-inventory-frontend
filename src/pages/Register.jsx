import {Link} from 'react-router-dom'
import { useState } from 'react'

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />


            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit">Register</button>

            <p>Already have an account? <Link to="/login">Login</Link></p>
            
            </form>
    )
}

export default Register