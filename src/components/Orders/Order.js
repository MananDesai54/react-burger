import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {

    const ingredients = Object.keys(props.ingredients)
                              .map((ing,index)=>(
                                  <span key={index} style={{
                                      textTransform:'capitalize',
                                      padding:'2px 5px',
                                      border:'1px solid #ccc',
                                      margin:'0 5px',
                                      borderRadius:'5px'
                                  }}>{ing}({props.ingredients[ing]})</span>
                              ))

    return (
        <div className={classes.Order}>
            <p style={{
                margin:'5px 0'
            }}>Ingredient : {ingredients} </p>
            <p>Price : ${props.price.toFixed(2)}</p>
        </div>
    )
}

export default Order;