import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Loader from './Loader'
import LaunchItem from './LaunchItem'

const LAUNCHES_QUERY = gql`
  query LaunchesQuery{
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

class Launches extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className='mt-4'>Launches</h1>

        <Query query={LAUNCHES_QUERY}>
          {
            ({ loading, error, data }) => {
              if (loading) return (
                <div className='text-center'>
                  <Loader />
                </div>
              )
              if (error) console.log(error)

              console.log(data)
              return (
                <React.Fragment>
                  {
                    data.launches.map(launch => (
                      <LaunchItem
                        key={launch.flight_number}
                        launch={launch}
                      />
                    ))
                  }
                </React.Fragment>
              )
            }
          }
        </Query>
      </React.Fragment>
    )
  }
}

export default Launches