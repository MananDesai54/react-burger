import React, { Component,Fragment } from 'react';
import Button from '../../../UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../../axios-order';
import Spinner from '../../../UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name:'',
        email:'',
        address:{
            streetCode:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler = (e) =>{
        e.preventDefault();
        this.setState({
            loading:true
        })
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Manan',
                address:{
                    city:'Surat',
                    pin:394326
                },
                email:'manan@test.com'
            },
            deliveryMethod:'fastest'
        }
        axios.post('/orders.json',order)
             .then(response=> {
                console.log(response);
                this.setState({
                    loading:false,
                    purchasing:false
                });
                this.props.history.push('/');
             })
             .catch(err=>{
                 console.log(err);
                 this.setState({
                     loading:false,
                     purchasing:false
                 });
                 this.props.history.push('/');
             });
    }

    render() {
        console.log(this.props)
        return (
            <div className={classes.ContactData}>
            {this.state.loading ? <Spinner /> :<Fragment> 
                    <h4>Enter Contact Data</h4>
                    <form>
                        <input type="text" name="name" id="name" placeholder="Your name"/>
                        <input type="email" name="email" id="email" placeholder="Your email"/>
                        <input type="text" name="street" id="street" placeholder="Your street"/>
                        <input type="text" name="postal code" id="postal code" placeholder="Your postal code"/>
                        <Button 
                            btnType="Success"
                            clicked={this.orderHandler}
                        >
                            Order
                        </Button>
                    </form>
                </Fragment>
            }
            </div>
        )
    }
}

export default ContactData;