import React from 'react'
import './Container.css';
import Sidebar from './ui-elements/Sidebar'

export default function Container(props) {
  let child_container_class = 'child-container'
  if (props.type === 'flex')
    child_container_class = 'child-container-flex'
  return (
    <div className='container'>
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
    </div>
  )
}
