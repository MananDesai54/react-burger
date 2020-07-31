import React from 'react';
import CheckoutSummary from '../../Orders/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {

    state = {
        ingredients:{},
        price:0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let queryEntry of query) {
            if(queryEntry[0]==='price') {
                this.setState({
                    price:+queryEntry[1]
                })
            }else {
                ingredients[queryEntry[0]] = +queryEntry[1];
            }
        }
        this.setState({
            ingredients:ingredients
        })
    }

    checkoutCancelled = e => {
        this.props.history.goBack();
    }

    checkoutContinued = e => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div style={{
                marginTop:'2rem'
            }}>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                />
                <Route 
                    path={`${this.props.match.path}/contact-data`}  
                    render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />}
                />
            </div>
        )
    }

}

export default Checkout;