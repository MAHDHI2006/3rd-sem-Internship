const Sigup = ({ onNavigate = () => {} }) => {
    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <br />
                <br />
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <br />
                <button type="submit">Sign Up</button>
            </form>
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