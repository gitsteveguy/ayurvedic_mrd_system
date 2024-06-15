import React from 'react'
import axios from 'axios'
import {useSignIn} from 'react-auth-kit'
import { useNavigate } from "react-router-dom";



export default function LoginForm() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)
    const post_api_url = 'http://localhost:5000/login'
    axios.post(post_api_url,data).then(response => {
      if(response)
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer"
        })
       navigate("/dashboard");
    }).catch(err=>console.log(err))
  }
  const handleAutofill = (e)=>{
    console.log(e.animationName);
    switch (e.animationName) {
    case 'onAutoFillStart':
      e.target.classList.add('input_has_value');
      case 'onAutoFillCancel':
        e.target.classList.remove('input_has_value');
    }
  }

  return (
    <form name='LoginForm' id='LoginForm' onSubmit={handleSubmit}>
      <div className="input_row">
        <div className="input_group">
          <input id='username' className='animated_inputs' type="text" name='username' autoComplete="off"  onAnimationStart={handleAutofill}/>
          <label htmlFor="username">Username</label>
        </div>
      </div>
      <div className="input_row">
        <div className="input_group">
          <input className='animated_inputs' id='password' type="password" name='password' autoComplete="off" onAnimationStart={handleAutofill}/>
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className="input_row">
        <div className="input_group login">
          <button type='submit'  form="LoginForm" className=' primary-btn' tooltip='Just click here to Login' value="login">Login</button>
        </div>
      </div>
    </form>
  )
}
