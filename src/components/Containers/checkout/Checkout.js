import React from 'react';
import CheckoutSummary from '../../Orders/CheckoutSummary/CheckoutSummary';
import { Route , Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends React.Component {

    // state = {
    //     ingredients:{},
    //     price:0
    // }

    componentDidMount() {
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // for(let queryEntry of query) {
        //     if(queryEntry[0]==='price') {
        //         this.setState({
        //             price:+queryEntry[1]
        //         })
        //     }else {
        //         ingredients[queryEntry[0]] = +queryEntry[1];
        //     }
        // }
        // this.setState({
        //     ingredients:ingredients
        // })
    }

    checkoutCancelled = e => {
        this.props.history.goBack();
    }

    checkoutContinued = e => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        if(!this.props.ingredients || this.props.purchased) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div style={{
                marginTop:'2rem'
            }}>
                <CheckoutSummary 
                    ingredients={this.props.ingredients} 
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                />
                {/* <Route 
                    path={`${this.props.match.path}/contact-data`}  
                    render={(props)=><ContactData ingredients={this.props.ingredients} price={this.props.price} {...props} />}
                /> */}
                <Route 
                    path={`${this.props.match.path}/contact-data`}  
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients:state.burger.ingredients,
        purchased:state.order.purchased
        // price:state.price
    }
}

export default connect(mapStateToProps)(Checkout);