import React, { Component } from 'react';
import Aux from '../../../HOC/Auxillary';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Model from '../../UI/Model/Model';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-order';
import Spinner from '../../UI/Spinner/Spinner';
import withError from '../../../HOC/withError';
import { connect } from 'react-redux';
// import * as Actions from '../../../store/actions/actionTypes';
import * as BurgerActions from '../../../store/actions/index';

// const INGREDIENT_PRICE = {
//     salad:0.4,
//     cheese:0.4,
//     meat:1.3,
//     bacon:0.5,
//     loading:false
// }

class BurgerBuilder extends Component {

    state = {
        // ingredients :null,
        // price:10,
        purchasable:false,
        purchasing:false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //      .then(response=>{
        //          this.setState({
        //              ingredients:response.data
        //          })
        //      })
        //      .catch(err=>this.setState({
        //          ingredients:err
        //      }));
        // this.setState({
        //     ingredients:this.props.ingredients
        // })
        this.props.initIngredient();
    }

    // addIngredientHandler = (type)=>{
    //     const newCount = this.state.ingredients[type]+1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = newCount;
    //     const newPrice = this.state.price + INGREDIENT_PRICE[type];
        
    //     this.setState({
    //         ingredients:updatedIngredients,
    //         price:newPrice
    //     })
        
    //     this.updatePurchasable(updatedIngredients);
    // }

    // removeIngredientHandler = (type)=>{
    //     if(this.state.ingredients[type]<=0) {
    //         return
    //     }
    //     const newCount = this.state.ingredients[type]-1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = newCount;
    //     const newPrice = this.state.price - INGREDIENT_PRICE[type];
        
    //     this.setState({
    //         ingredients:updatedIngredients,
    //         price:newPrice
    //     })
    //     this.updatePurchasable(updatedIngredients);
    // }

    updatePurchasable = (updatedIngredients)=>{
        const ingredients = {
            ...updatedIngredients
        }
        const sum = Object.keys(ingredients)
                                  .map(ingredient=>ingredients[ingredient])
                                  .reduce((sum,el)=>sum+el);
        // this.setState({
        //     purchasable:sum>0
        // });
        return sum > 0;
    }

    handlePurchasing = ()=>{
        if(this.props.isAuth) {
            this.setState({
                purchasing:true
            })
        } else {
            this.props.history.push('/auth');
        }
    }

    modelClose = ()=>{
        this.setState({
            purchasing:false
        })
    }
    
    purchaseContinue = ()=>{

        // const queryParams = [];
        // for(let ingredient in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(ingredient)+'='+encodeURIComponent(this.props.ingredients[ingredient]));
        // }
        // queryParams.push('price='+this.props.price.toFixed(2));
        // const queryString = queryParams.join('&');

        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?'+queryString
        // });
        this.props.initPurchase()
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0;
        }
        let orderSummary = null;

        let burger = this.props.error ? <p style={{textAlign:'center'}}>Unfortunately ingredients can't be loaded.</p> : <Spinner />;

        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdd={this.props.addIngredient}
                        ingredientRemove={this.props.removeIngredient}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ingredients)}
                        purchasing={this.handlePurchasing}
                        isAuth={this.props.isAuth}
                    />
                </Aux>
            )
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingredients}
                    close={this.modelClose}
                    continue={this.purchaseContinue} 
                    price={this.props.price}
                />
            );
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

const mapStateToProps = (state) => {
    return {
        ingredients:state.burger.ingredients,
        price:state.burger.price,
        error:state.burger.error,
        isAuth:state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredient : (name) => { dispatch(BurgerActions.addIngredient(name)) },
        removeIngredient : (name) => { dispatch(BurgerActions.removeIngredient(name))},
        initIngredient : () => {dispatch(BurgerActions.initIngredients())},
        initPurchase : () => {dispatch(BurgerActions.purchaseInit())}
    }
}

// export default BurgerBuilder;
export default connect(mapStateToProps,mapDispatchToProps)(withError(BurgerBuilder,axios));