import React, { useEffect } from 'react'
import './Container.css';
import Sidebar from './ui-elements/Sidebar'
import { useState } from 'react';
import { getColorThemeLS,setColorThemeLS } from '../hooks/ColorTheme';
import { createContext } from 'react';
import axios from 'axios';
export const ThemeContext = createContext()


export default function Container(props) {
  const fetch_theme_api_url = 'http://localhost:5000/api/get_color_theme'
  axios.get(fetch_theme_api_url,{ withCredentials: true}).then(response => {
    if (!response) {
      throw new Error('Network response was not ok');
    }
    return (response.data);
  }).then((data) => {
    if (typeof data != {}) {
      setColorThemeLS(data.colorTheme)
    }
  })
  const [colorTheme,setColorTheme] = useState(getColorThemeLS())


  let child_container_class = 'child-container'
  if (props.type === 'flex')
    child_container_class = 'child-container-flex'
  return (
    <div className='container' data-theme={colorTheme}>
      <ThemeContext.Provider value={{colorTheme,setColorTheme}}>
      <Sidebar active_menu={props.active_menu} />
      <main>
        <h1 id='page_title'>{props.page_name}</h1>
        {props.hBtns && <div className="container-top-btn-grp" style={{margin:'0.5rem'}}>
          {props.hBtns.map((btn)=>{
            let borderRadius='24px';
            if(!btn.text)
              borderRadius='50%'
              return(
              <a href={btn.href} className={btn.className} style={{borderRadius:borderRadius}} tooltip={btn.tooltip}>{btn.icon}{btn.text}</a>)
          })
          }
        </div>}
        <div className={child_container_class}>
          {props.child}
          {props.children}
        </div>
      </main>
      </ThemeContext.Provider>
    </div>
  )
}
