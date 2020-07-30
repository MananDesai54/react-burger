import React from 'react';
import './App.css';
import Layout from './components/Containers/Layouts/Layout';
import BurgerBuilder from './components/Containers/BurgerBuilder/BurgerBuilder';

class App extends React.Component{

  render() {
    return (
      <div className="App">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }

}

export default App;