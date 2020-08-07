import React, { Component,Fragment } from 'react';
import Button from '../../../UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../../axios-order';
import Spinner from '../../../UI/Spinner/Spinner';
import Input from '../../../UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                validation:{
                    required:true,
                },
                valid:false,
                value:''
            },
            city:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your City'
                },
                validation:{
                    required:true
                },
                valid:false,
                value:''
            },
            pin:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Pin code'
                },
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                validation:{
                    required:true
                },
                valid:false,
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {
                            value:'fastest',
                            displayValue:'Fastest'
                        },
                        {
                            value:'cheapest',
                            displayValue:'Cheapest'
                        },
                    ]
                },
                value:'fastest'
            }
        },
        loading:false
    }

    orderHandler = (e) =>{
        e.preventDefault();
        this.setState({
            loading:true
        })
        const orderDetails = {};
        Object.keys(this.state.orderForm).forEach(key=>{
            orderDetails[key] = this.state.orderForm[key].value;
        })
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:orderDetails
        }
        axios.post('/orders.json',order)
             .then(response=> {
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

    handleInput = (e)=>{
        const formData = {
            ...this.state.orderForm,
            
        };
        const updatedField = {
            ...formData[e.target.name]
        }
        updatedField.value = e.target.value;
        formData[e.target.name] = updatedField;
        formData[e.target.name].valid = this.checkValidity(this.state.orderForm[e.target.name].validation,e.target.value);
        console.log(formData[e.target.name]);
        this.setState({
            orderForm:{
                ...formData
            }
        })
    }

    checkValidity(rules,value) {
        let isValid = true;
        if(rules.required) {    
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    render() {

        const fields = Object.keys(this.state.orderForm)
                             .map(key=>({
                                 id:key,
                                 config:this.state.orderForm[key]
                             }));

        const inputFields = fields.map(field=>(
            <Input 
                key={field.id} 
                name={field.id}
                elementType={field.config.elementType} 
                elementConfig={field.config.elementConfig}
                validation={field.config.validation} 
                value={field.config.value} 
                change={(e)=>{this.handleInput(e)}}
            />
        ))

        return (
            <div className={classes.ContactData}>
            {this.state.loading ? <Spinner /> :<Fragment> 
                    <h4>Enter Contact Data</h4>
                    <form>
                        {/* <Input elementType="..." elementConfig="..." value="..." />
                        <Input inputtype="input" type="email" name="email" id="email" placeholder="Your email"/>
                        <Input inputtype="input" type="text" name="street" id="street" placeholder="Your street"/>
                        <Input inputtype="input" type="text" name="postal code" id="postal code" placeholder="Your postal code"/> */}
                        {inputFields}
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