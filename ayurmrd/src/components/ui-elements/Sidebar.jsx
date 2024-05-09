import React from 'react'
import logo from '../../assets/ayurvedic_mrd_system_logo_without_text.svg';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SickRoundedIcon from '@mui/icons-material/SickRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableViewIcon from '@mui/icons-material/TableView';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <>
      <div id='sidebar_base'></div>
<aside>
      <div className="top">
        <div className="logo">
          <img src={logo} />
          <h2>Ayurvedic MRD System</h2>
        </div>
        <div id="close-btn" className="close">
          <span className="material-symbols-rounded">
            close
          </span>
        </div>
      </div>
      <div className="sidebar">
        <a href="#" className="active">
          <span>
        <DashboardRoundedIcon />
        </span>
          <h3>Dashboard</h3>
        </a>
        <a href="#">
          <span>
          <PeopleRoundedIcon/>
          </span>
          <h3>Staff</h3>
        </a>
        <a href="#">
        <span>
          <SickRoundedIcon/>
          </span>
          <h3>Patients</h3>
        </a>
        <a href="#">
        <span>
          <BarChartRoundedIcon/>
          </span>
          <h3>Analytics</h3>
        </a>
        <a href="#">
        <span>
          <SettingsRoundedIcon/>
          </span>
          <h3>Settings</h3>
        </a>
        <a href="/dashboard/test">
        <span>
          <TableViewIcon/>
          </span>
          <h3>Sample Form</h3>
        </a>
      </div>
    </aside>
    </>
  )
}
