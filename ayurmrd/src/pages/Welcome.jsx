import React from 'react'
import './Welcome.css'
import logo from '../assets/ayurvedic_mrd_system_logo_without_text.svg';
import { Link } from 'react-router-dom';
export default function Welcome() {
  return (
    <div className="Welcome">
    <header className="Welcome-header">
      <img src={logo} className="Welcome-logo" alt="logo" />
      <br/>
      <p>
        Congrats on setting everything up, we will start from here.
      </p>
      <br/>
      <Link to='/dashboard' className='complementary-btn'><h3>Go to Dashboard</h3></Link>
    </header>
  </div>
  )
}
