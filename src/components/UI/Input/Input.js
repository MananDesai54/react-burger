import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                {...props.validation}
                value={props.value}
                name={props.name}
                onChange={props.change}
            />
            break;
        
        case ('textarea'):
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig} 
                {...props.validation}
                value={props.value}
                name={props.name}
                onChange={props.change}
            />
            break;

        case('select'):
            inputElement = <select
                className={classes.InputElement}
                value={props.value} 
                {...props.validation}
                onChange={props.change}
                name={props.name}
            >
                {props.elementConfig.options.map((config,index)=>(
                    <option value={config.value} key={index}>
                        {config.displayValue}
                    </option>
                ))}
            </select>
            break
    
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.change}
                name={props.name} 
                {...props.validation}
            />
            break;
    }

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    )
}

export default Input;