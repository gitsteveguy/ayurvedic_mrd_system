import React from 'react'

export default function ICol(props) {
    let downv ={gap : props.gap, position : props.position}
    if(props.down)
        downv = {flexDirection: 'column', gap : props.gap, position : props.position}
    return (
        <div className="input_group" style={downv}>
            {props.children}
        </div>
    )
}
