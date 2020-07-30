import React from 'react';
import PropTypes from 'prop-types';
import Aux from '../../HOC/Auxillary';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {

    let transformedIngredients = Object.keys(ingredients)
        .map((ingredient)=>{
            return [...Array(ingredients[ingredient])].map((_,index)=>(
                <BurgerIngredient key={index+ingredient} type={ingredient} />
            ))//other way
            // return Array(ingredients[ingredient]).fill(<BurgerIngredient key={index} type={ingredient} />)
        })
        //flatten array
        .reduce((arr,el)=>{
            return arr.concat(el);
        },[]);

        //other way to flatten
        // console.log(transformedIngredients.flat(Infinity).length);
        
        //to calculate total num of ingredient
    // console.log(Object.values(ingredients).reduce((a,b)=>a+b));
        if(transformedIngredients.length === 0) {
            transformedIngredients = <p>Please Start Adding Ingredients...!</p>
        }

    return (
        <Aux>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
        </Aux>
    )
}

Burger.propTypes = {
    ingredients:PropTypes.object,
}

export default Burger;
