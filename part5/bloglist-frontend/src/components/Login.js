import React from 'react'
import { ErrorMessage, SuccessMessage } from './public/Notification'
const Login = ({ values, events }) => (
  <div>
    <h2>log in to application</h2>
    <ErrorMessage message={values.errorMessage}/>
    <SuccessMessage message={values.successMessage}/>
    <p>username <input value={values.username} onChange={events.onUsernameChange}/></p>
    <p>password <input type="password" value={values.password} onChange={events.onPasswordChange}/></p>
    <button type="button" onClick={events.loginHandler}>login</button>
  </div>
)

export default Login
