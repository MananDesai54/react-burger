import React from 'react';
import './Bars.css'

export default function BarToggle(props) {
    return (
        <div onClick={props.clicked} className="DrawerToggle">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
