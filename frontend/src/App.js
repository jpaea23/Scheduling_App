import React from 'react';

import Layout from './hoc/Layout/Layout';

import Authentication from './containers/Authentication/Authentication';
import Scheduler from './containers/Scheduler/Scheduler'

class App extends React.Component {
  render(){
    return (
      <Layout>
         <Scheduler/>
         <Authentication/>
      </Layout>
    );
  }
}

export default App;
