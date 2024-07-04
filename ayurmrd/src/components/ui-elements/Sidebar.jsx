import React from 'react'
import logo from '../../assets/ayurvedic_mrd_system_logo_without_text.svg';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SickRoundedIcon from '@mui/icons-material/SickRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import './Sidebar.css';

export default function Sidebar(props) {
  const currentUser = useAuth();
  const permissions = currentUser.permissions;
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logOut = ()=>{
    signOut()
    navigate('/login')
  }
  return (
    <>
      <div id='sidebar_base'></div>
<aside>
      <div className="top">
        <div className="logo">
          <img src={logo} alt='Logo'/>
          <h2>Ayurvedic MRD System</h2>
        </div>
        <div id="close-btn" className="close">
          <span className="material-symbols-rounded">
            close
          </span>
        </div>
      </div>
      <div className="sidebar">
        {permissions.includes('view_self') && !permissions.includes('view_patient') &&  <a href="/patients/view_patient" className={props.active_menu==='Patients'?'active':''}>
        <span>
        <PersonIcon/>
          </span>
          <h3>My Profile</h3>
        </a>}
        {permissions.includes('view_analytics') && <a href="/dashboard" className={props.active_menu==='Dashboard'?'active':''}>
          <span>
        <DashboardRoundedIcon />
        </span>
          <h3>Dashboard</h3>
        </a>}
        {permissions.includes('edit_staff') && <a href="/staff" className={props.active_menu==='Staff'?'active':''}>
          <span>
          <PeopleRoundedIcon/>
          </span>
          <h3>Staff</h3>
        </a>}
        {permissions.includes('view_patient') && <a href="/patients" className={props.active_menu==='Patients'?'active':''}>
        <span>
          <SickRoundedIcon/>
          </span>
          <h3>Patients</h3>
        </a>}
        {permissions.includes('view_analytics') && <a href="/analytics" className={props.active_menu==='Analytics'?'active':''}>
        <span>
          <BarChartRoundedIcon/>
          </span>
          <h3>Analytics</h3>
        </a>}
        <a href="/dashboard" className={props.active_menu==='Settings'?'active':''}>
        <span>
          <SettingsRoundedIcon/>
          </span>
          <h3>Settings</h3>
        </a>
        <a onClick={logOut} style={{cursor: 'pointer'}}>
        <span>
          <LogoutIcon/>
          </span>
          <h3>Logout</h3>
        </a>
      </div>
    </aside>
    </>
  )
}
