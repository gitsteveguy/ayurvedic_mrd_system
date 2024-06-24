import React from 'react'
import logo from '../../assets/ayurvedic_mrd_system_logo_without_text.svg';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SickRoundedIcon from '@mui/icons-material/SickRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableViewIcon from '@mui/icons-material/TableView';
import LogoutIcon from '@mui/icons-material/Logout';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar(props) {
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
        <a href="/dashboard" className={props.active_menu==='Dashboard'?'active':''}>
          <span>
        <DashboardRoundedIcon />
        </span>
          <h3>Dashboard</h3>
        </a>
        <a href="/staff" className={props.active_menu==='Staff'?'active':''}>
          <span>
          <PeopleRoundedIcon/>
          </span>
          <h3>Staff</h3>
        </a>
        <a href="/patients" className={props.active_menu==='Patients'?'active':''}>
        <span>
          <SickRoundedIcon/>
          </span>
          <h3>Patients</h3>
        </a>
        <a href="/analytics" className={props.active_menu==='Analytics'?'active':''}>
        <span>
          <BarChartRoundedIcon/>
          </span>
          <h3>Analytics</h3>
        </a>
        <a href="/dashboard" className={props.active_menu==='Settings'?'active':''}>
        <span>
          <SettingsRoundedIcon/>
          </span>
          <h3>Settings</h3>
        </a>
        <a href="/dashboard/demo/repeatingform" className={props.active_menu==='Repeating Form'?'active':''}>
        <span>
          <TableViewIcon/>
          </span>
          <h3>Repeating Form</h3>
        </a>
        <a href="/dashboard/demo/fetchform" className={props.active_menu==='Fetch Form'?'active':''}>
        <span>
          <TableViewIcon/>
          </span>
          <h3>Fetch Form</h3>
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
