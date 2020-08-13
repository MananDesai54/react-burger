import React, { Component } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import classes from './Auth.module.css';
import * as auth from '../../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

    state = {
        controls : {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email Address',
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                value:''
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password',
                },
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
                value:''
            }
        },
        isSignup:true
    }

    handleInput = (e) => {
        const updatedControls = {
            ...this.state.controls,
            [e.target.name]: {
                ...this.state.controls[e.target.name],
                value:e.target.value,
                touched:true,
                // valid:this.checkValid
            }
        }
        this.setState({
            controls:updatedControls
        })
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.authUser(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthMode = (e) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                isSignup : !prevState.isSignup
            }
        })
    }

    render() {

        const fields = Object.keys(this.state.controls)
                             .map(key=>({
                                 id:key,
                                 config:this.state.controls[key]
                             }));
        let inputFields = fields.map(field=>(
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

        if(this.props.loading) { 
            inputFields = <Spinner />
        } 
        let errorMessage = '';
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        if(this.props.isAuth) {
            if(this.props.building) {
                return <Redirect to="/checkout" />
            }
            return <Redirect to="/" />
        }

        return (
            <div>
                {this.props.loading ? <Spinner /> :
                <form className={classes.Auth}>
                    <h1>Authenticate</h1>
                    {errorMessage}
                    {inputFields}
                    <Button 
                        btnType="Success"
                        clicked={this.submitHandler}
                    >
                        { this.state.isSignup ? 'Signup' : 'Login' }
                    </Button>
                    <Button 
                        btnType="Danger"
                        clicked={this.switchAuthMode}
                    >
                        Switch To { this.state.isSignup ? 'Login' : 'Signup' }
                    </Button>
                </form>}      
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !== null,
        building:state.burger.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authUser : (email,password,isSignup) => {dispatch(auth.auth(email,password,isSignup))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);