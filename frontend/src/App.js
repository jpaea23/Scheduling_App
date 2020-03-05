import React from 'react';

import Layout from './hoc/Layout/Layout';

import Scheduler from './containers/Scheduler/Scheduler'

class App extends React.Component {
  render(){
    return (
      <Layout>
         <Scheduler/>
      </Layout>
    );
  }
}

export default App;