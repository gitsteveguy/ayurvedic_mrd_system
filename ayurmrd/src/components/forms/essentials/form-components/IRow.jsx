import React from 'react'

export default function IRow(props) {
    let title
    if(props.title)
        title = <h2>{props.title}</h2>
    return (
        <div className="input_row">
            {title}
            <div className="inputs-container">
                {props.children}
            </div>
        </div>
    )
}
