import React from 'react'
const Login = ({values, events}) => (
  <div>
    <h2>log in to application</h2>
    <p>username <input value={values.username} onChange={events.onUsernameChange}/></p>
    <p>password <input type="password" value={values.password} onChange={events.onPasswordChange}/></p>
    <button type="button" onClick={events.loginHandler}>login</button>
  </div>
)

export default Login
