import React from 'react';
import './App.css';
import Layout from './components/Containers/Layouts/Layout';
import BurgerBuilder from './components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/Containers/checkout/Checkout';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Orders from './components/Orders/Order/Orders';

class App extends React.Component{

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;