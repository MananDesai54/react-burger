import React, { Component } from 'react';
import Aux from '../../../HOC/Auxillary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Model from '../../UI/Model/Model';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-order';
import Spinner from '../../UI/Spinner/Spinner';
import withError from '../../../HOC/withError';

const INGREDIENT_PRICE = {
    salad:0.4,
    cheese:0.4,
    meat:1.3,
    bacon:0.5,
    loading:false
}

class BurgerBuilder extends Component {

    state = {
        ingredients :null,
        price:10,
        purchasable:false,
        purchasing:false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
             .then(response=>{
                 this.setState({
                     ingredients:response.data
                 })
             })
             .catch(err=>this.setState({
                 ingredients:err
             }));
    }

    addIngredientHandler = (type)=>{
        const newCount = this.state.ingredients[type]+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const newPrice = this.state.price + INGREDIENT_PRICE[type];
        
        this.setState({
            ingredients:updatedIngredients,
            price:newPrice
        })
        
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        if(this.state.ingredients[type]<=0) {
            return
        }
        const newCount = this.state.ingredients[type]-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const newPrice = this.state.price - INGREDIENT_PRICE[type];
        
        this.setState({
            ingredients:updatedIngredients,
            price:newPrice
        })
        this.updatePurchasable(updatedIngredients);
    }

    updatePurchasable = (updatedIngredients)=>{
        const ingredients = {
            ...updatedIngredients
        }
        const sum = Object.keys(ingredients)
                                  .map(ingredient=>ingredients[ingredient])
                                  .reduce((sum,el)=>sum+el);
        this.setState({
            purchasable:sum>0
        });
    }

    handlePurchasing = ()=>{
        this.setState({
            purchasing:true
        })
    }

    modelClose = ()=>{
        this.setState({
            purchasing:false
        })
    }
    
    purchaseContinue = ()=>{

        const queryParams = [];
        for(let ingredient in this.state.ingredients) {
            queryParams.push(encodeURIComponent(ingredient)+'='+encodeURIComponent(this.state.ingredients[ingredient]));
        }
        queryParams.push('price='+this.state.price);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        });

    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;

        let burger = <Spinner />
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdd={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.price}
                        purchasable={this.state.purchasable}
                        purchasing={this.handlePurchasing}
                    />
                </Aux>
            )
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    close={this.modelClose}
                    continue={this.purchaseContinue} 
                    price={this.state.price}
                />
            );
            }
            if(this.state.loading) {
                orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Model 
                    show={this.state.purchasing}
                    clicked={this.modelClose}
                >   
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        )
    }
}

// export default BurgerBuilder;
export default withError(BurgerBuilder,axios);