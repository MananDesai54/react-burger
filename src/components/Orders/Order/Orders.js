import React, { Component } from 'react';
import Order from '../Order';
import axios from '../../../axios-order';
import withError from '../../../HOC/withError';

class Orders extends Component {

    state = {
        orders : [],
        loading:true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res=>{
                const fetchOrders = [];
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({
                    loading:false,
                    orders:fetchOrders
                })
            })
            .catch(err=>{
                this.setState({
                    loading:false
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.length > 0 
                    ? this.state.orders.map((order)=>(
                        <Order 
                            key={order.id} 
                            order={order} 
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))
                    : <p style={{
                        textAlign:'center'
                    }}>No Orders</p>}
            </div>
        )
    }
}

export default withError(Orders,axios);