import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any login logic here using email and password state
    console.log('Email:', email);
    console.log('Password:', password);
    // Add your API call or authentication logic here
  };

  return (
    <div className="session">
      <div className="left">
        {/* Your SVG code here */}
      </div>
      <form action="" className="log-in" autoComplete="off" onSubmit={handleSubmit}>
        <h4>We are <span>NUVA</span></h4>
        <p>Welcome back! Log in to your account to view today's clients:</p>
        <div className="floating-label">
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="email">Email:</label>
          <div className="icon">
            {/* Your SVG code here */}
          </div>
        </div>
        <div className="floating-label">
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="password">Password:</label>
          <div className="icon">
            {/* Your SVG code here */}
          </div>
        </div>
        <button type="submit">Log in</button>
        <a href="https://codepen.io/elujambio/pen/yjwzGP" className="discrete" target="_blank" rel="noopener noreferrer">
          Basic version
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
