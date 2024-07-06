import React from 'react'
import { setColorThemeLS,getColorThemeLS } from '../../hooks/ColorTheme';
import ReactSwitch from "react-switch";
import { useContext } from 'react';
import { ThemeContext } from '../Container';
import { useState } from 'react';
import axios from 'axios';
const DarkModeCheckbox = () => {
    const {colorTheme,setColorTheme} = useContext(ThemeContext)
    const post_api_url = 'http://localhost:5000/api/update_color_theme'

    const toggleTheme = ()=>{
        let newTheme = colorTheme==='light' ? 'dark' : 'light'
        axios.post(post_api_url, {colorTheme : newTheme}, { withCredentials: true }).then(response => {
            if (response.data.status==='success') {
                setColorTheme(newTheme)
                setColorThemeLS(newTheme)
            }})
        
    }

  return (
    <div style={{display:'flex',justifyContent:'start',alignContent:'center',gap:'1rem'}}>
    <h2>Dark Mode</h2>
    <ReactSwitch onChange={()=>{toggleTheme('light')}} checked={colorTheme==='dark'} />
    </div>
  )
}

export default DarkModeCheckbox