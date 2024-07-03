import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import './login.css'; 

function Login({ users, setLoggedUser, loggedUser }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userFound, setUserFound] = useState(null); //this state for visualtion if the user founnd or not.

  const navigate = useNavigate(); // Initialize the navigate function


  //fuction that handle with user that want to enter to site , and check if he exist
  const handleLogin = (event) => {
      event.preventDefault(); // Prevent form submission and prvent delete the users state
      // Check if the entered username and password match any user in the users array
      const userExists = users.find(user => user.userName === username && user.userPassword === password);
      const userFound = false; // Assume the user doesn't exist for demonstration

      if (userExists) {
        const userFound = true; // Assume the user doesn't exist for demonstration
        setUserFound(userFound);
        setLoggedUser(userExists); //define the loggedUser state be current user who log in
        navigate('/'); // Navigate to the home page on successful login
        console.log(userExists);
        console.log(loggedUser);
      } else {
        setUserFound(userFound);
      }
  };

 

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="login-card">
        <h2 className="text-center login-title">Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
              required
            />
           </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required
            />
          </div>
          <button onClick={handleLogin} type="submit" className="btn btn-danger btn-block login-button ">
            Login
          </button>
            {/* this visualition if userName or password are wrong*/}
            {userFound === null ? null : userFound ? (
              <div></div>)
             : (
              <div style={{ color: 'red' }}>UserName or password wrong</div>
            )}
          <p className="not-registered ">Not registered?</p>    
              <Link to='/register' className="cr-acc btn btn-info registerButton">Create an account</Link>    
        </form>
      </div>
    </div>
  );
};

export default Login;
