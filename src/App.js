import React from 'react';
import './App.css';
import Layout from './components/Containers/Layouts/Layout';
import BurgerBuilder from './components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/Containers/checkout/Checkout';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
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
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState : () => {dispatch(Actions.authCheckState())}
  }
}

export default connect(null,mapDispatchToProps)(App);