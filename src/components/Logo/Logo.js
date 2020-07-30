import React from 'react';

const Logo = props => (
    <img 
        src={props.image} 
        alt="Burger Logo" 
        style={{
            height:props.height,
            width:50,
        }}
    />
)

export default Logo;