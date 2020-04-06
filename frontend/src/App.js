import React from 'react';
import Layout from './hoc/Layout/Layout';
import Scheduler from './containers/Scheduler/Scheduler'

class App extends React.Component {
  render(){
    return (
      <div>
        <Layout>
          <Scheduler/>
        </Layout>
      </div>
    );
  }
}

export default App;