import React from 'react'
import './Container.css';
import Sidebar from './ui-elements/Sidebar'

export default function Container(props) {
  return (
    <div className='container'>
        <Sidebar />
        <main>
            <h1>{props.page_name}</h1>
            <div className="child-container">
            {props.child}
            </div>
        </main>
    </div>
  )
}
