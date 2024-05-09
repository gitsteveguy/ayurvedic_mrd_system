import React from 'react'
import './Container.css';
import Sidebar from './ui-elements/Sidebar'

export default function Container(props) {
  return (
    <div className='container'>
        <Sidebar active_menu={props.active_menu} />
        <main>
            <h1 id='page_title'>{props.page_name}</h1>
            <div className="child-container">
            {props.child}
            </div>
        </main>
    </div>
  )
}
