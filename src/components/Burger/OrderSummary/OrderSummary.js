import React from 'react';
import Aux from '../../../HOC/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary = props =>{
    const order = Object.keys(props.ingredients)
                       .map(ingredient=>(
                           <li key={ingredient}>
                                <strong style={{textTransform:'capitalize'}}>
                                    {ingredient} : 
                                </strong>
                                {props.ingredients[ingredient]}
                            </li>
                       ))

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious Burger with following Ingredients</p>
            <ul>
                {order}
            </ul>
            <p> <strong>Total Price : </strong> ${props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <Button 
                btnType="Danger"
                clicked={props.close}
            >
                Cancel
            </Button>
            <Button 
                btnType="Success"
                clicked={props.continue}
            >
                Continue
            </Button>
        </Aux>
    )
};

export default  OrderSummary;