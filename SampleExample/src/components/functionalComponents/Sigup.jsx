import { useState } from 'react';

const Sigup = ({ onNavigate = () => {} }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const BASE = 'https://threerd-sem-internship-5.onrender.com/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        try {
            const res = await fetch(BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            });
            if (!res.ok) throw new Error('Signup failed');
            const data = await res.json().catch(() => ({}));
            setMsg(data.message || 'Signup successful');
            setEmail(''); setUsername(''); setPassword('');
        } catch (err) {
            setMsg(err.message || 'Signup error');
        }
    };

    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                </label>
                <br />
                <br />
                <label>
                    Username:
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" />
                </label>
                <br />
                <br />
                <label>
                    Password:
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
                </label>
                <br />
                <br />
                <button type="submit">Sign Up</button>
            </form>
            {msg && <p>{msg}</p>}
            <p>
                Already having an account?
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} style={{ marginLeft: 6 }}>
                    Login
                </a>
            </p>
        </div>
    );
};

export default Sigup;