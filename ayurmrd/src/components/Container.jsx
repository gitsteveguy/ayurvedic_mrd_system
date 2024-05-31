import React from 'react'
import './Container.css';
import Sidebar from './ui-elements/Sidebar'

export default function Container(props) {
  let child_container_class = 'child-container'
  if(props.type==='flex')
    child_container_class= 'child-container-flex'
  return (
    <div className='container'>
        <Sidebar active_menu={props.active_menu} />
        <main>
            <h1 id='page_title'>{props.page_name}</h1>
            <div className={child_container_class}>
            {props.child}
            {props.children}
            </div>
        </main>
    </div>
  )
}
