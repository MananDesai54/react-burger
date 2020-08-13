import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label:'Salad',
        type:'salad'
    },
    {
        label:'Cheese',
        type:'cheese'
    },
    {
        label:'Bacon',
        type:'bacon'
    },
    {
        label:'Meat',
        type:'meat'
    },
]

const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control=>(
                <BuildControl 
                    key={control.label} 
                    label={control.label}
                    added={()=>{props.ingredientAdd(control.type)}}
                    removed={()=>{props.ingredientRemove(control.type)}}
                    disabled={props.disabled[control.type]}
                />
            ))}
            <button 
                className={classes.OrderButton} 
                // disabled={!props.purchasable  || !props.isAuth}
                disabled={!props.purchasable}
                onClick={props.purchasing}
            >
                {props.isAuth ? 'ORDER NOW' : 'SIGNUP TO CONTINUE'}
            </button>
        </div>
    )
}

export default BuildControls;