const Login = () => {
  return (
    <div>
        <h2>Login page</h2>
        <div id="Box">
              <input type="text" placeholder="Username or Email" />
            </div>
            <p></p>
            <div id="Box">
             <input type="password" placeholder="Password" />
            </div>
            <p></p>
            <div>
              <button>Login</button>
              <p>IF YOU DON'T HAVE ACCOUT REGISTER</p><button>Register</button>
            </div>
    </div>
  );
}
export default Login;   