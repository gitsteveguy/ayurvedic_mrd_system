import React from 'react'

export default function LoginForm() {
  return (
    <form name='LoginForm' id='LoginForm' action="/dashboard" method="get">
      <div className="input_row">
        <div className="input_group">
          <input id='username' type="text" name='username' />
          <label htmlFor="username">Username</label>
        </div>
      </div>
      <div className="input_row">
        <div className="input_group">
          <input id='password' type="password" name='password' />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="input_row">
        <div className="input_group login">
          <button type='submit' form="LoginForm" className=' primary-btn formbtn' tooltip='Just click here to Login' value="login">Login</button>
        </div>
      </div>
    </form>
  )
}
