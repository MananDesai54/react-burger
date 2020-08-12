import React, { Component } from 'react';
import Order from '../Order';
import axios from '../../../axios-order';
import withError from '../../../HOC/withError';
import { connect } from 'react-redux';
import * as Actions from '../../../store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders : [],
        loading:true
    }

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res=>{
        //         const fetchOrders = [];
        //         for(let key in res.data) {
        //             fetchOrders.push({
        //                 ...res.data[key],
        //                 id:key
        //             });
        //         }
        //         this.setState({
        //             loading:false,
        //             orders:fetchOrders
        //         })
        //     })
        //     .catch(err=>{
        //         this.setState({
        //             loading:false
        //         })
        //     })
        if(this.props.orders.length === 0) {
            this.props.fetchOrder();
        }
    }

    render() {
        return (
            <div>
                {this.props.orders.length > 0 
                    ? this.props.orders.map((order)=>(
                        <Order 
                            key={order.id} 
                            order={order} 
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))
                    : <p style={{
                        textAlign:'center'
                    }}>
                        <Spinner />
                    </p>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder : () => {dispatch(Actions.fetchOrders())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(Orders,axios));