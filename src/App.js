import React from 'react';
import './App.css';
import Layout from './components/Containers/Layouts/Layout';
import BurgerBuilder from './components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/Containers/checkout/Checkout';
import { BrowserRouter,Route,Switch, Redirect } from 'react-router-dom';
import Orders from './components/Orders/Order/Orders';
import Auth from './components/Containers/Auth/Auth';
import Logout from './components/Containers/Auth/Logout';
import * as Actions from './store/actions/index';
import { connect } from 'react-redux';

class App extends React.Component{

  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"/>
      </Switch>
    )
    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            {routes}
          </Layout>
        </div>
      </BrowserRouter>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuth:state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState : () => {dispatch(Actions.authCheckState())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);