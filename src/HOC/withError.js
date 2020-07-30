import React from 'react';
import Aux from './Auxillary';
import Model from '../components/UI/Model/Model';

const withError = (WrappedComponent,axios) => {
    return class extends React.Component { 

        state = {
            error : null
        }

        componentWillMount() { //or user constructor
            this.reqInterceptor =  axios.interceptors.request.use(req=>{
                this.setState({
                    error:null
                });
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res,err=>{
                this.setState({
                    error:err
                })
            })
        }
        componentWillUnmount() {
            console.log('Hello');
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return(
                <Aux>
                    <Model 
                        show={this.state.error}
                        clicked={()=>{
                            this.setState({
                                error:null
                            })
                        }}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withError;