import React, { Component } from 'react'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Launches from './components/Launches'
import Launch from './components/Launch'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className='container'>
            <Route exact path='/' component={Launches} />
            <Route exact path='/launch/:flight_number' component={Launch} />
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App