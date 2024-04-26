import React from 'react'

export default function LoginForm() {
  return (
    <form action="/dashboard" method="get">
      <div className="input_row">
        <div className="input_group">
            <input id='username' type="text" name='username'/>
            <label htmlFor="username">Username</label>
        </div>
       </div>
       <div className="input_row">
        <div className="input_group">
            <input id='password' type="password" name='password'/>
            <label htmlFor="password">Password</label>
        </div>
       </div>
       <div className="input_row">
        <div className="input_group">
            <input id='login' type="submit" className='primary-btn formbtn' name='login' value='Login'/>
        </div>
       </div>
    </form>
  )
}
