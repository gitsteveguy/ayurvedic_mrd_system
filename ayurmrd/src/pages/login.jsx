import React from 'react'
import logo from '../assets/ayurvedic_mrd_system_logo_with_text.svg'
import FormContainer from '../components/forms/essentials/FormContainer'
import LoginForm from '../components/forms/LoginForm'
import './Login.css'

export default function Login() {
  return (
    <div className="login-container">
      <div className="card login-sub-container">
      <img src={logo} className="app-logo" alt="logo" />
      <FormContainer form={<LoginForm />}/>
      </div>
    </div>
  )
}
