import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import Loader from './Loader'

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`

class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params

    // We need the flight_number as an int
    flight_number = parseInt(flight_number)

    return (
      <React.Fragment>
        <Query query={LAUNCH_QUERY} variables={{flight_number}}>
          {
            ({ loading, error, data }) => {
              if (loading) return (
                <div className='text-center'>
                  <Loader />
                </div>
              )
              if (error) console.log(error)

              let launchSuccessful = 'No'

              switch (data.launch.launch_success) {
                case true:
                  launchSuccessful = 'Yes'
                  break;
                case false:
                  launchSuccessful = 'No'
                  break;
                default:
                  launchSuccessful = 'Unknown'
                  break;
              }

              console.log(data)
              return (
                <div>
                  <h4 className='my-3'>
                    Mission: {data.launch.mission_name}
                  </h4>
                  <h4 className='mb-3'>
                    Launch Details
                  </h4>

                  <ul className='list-group'>
                    <li className='list-group-item'>
                      Flight Number: {data.launch.flight_number}
                    </li>
                    <li className='list-group-item'>
                      Launch Year: {data.launch.launch_year}
                    </li>
                    <li className='list-group-item'>
                      Launch Successful:&nbsp;
                      <span className={classNames({
                        'text-success': data.launch.launch_success,
                        'text-danger': data.launch.launch_success === false,
                        'text-warning': data.launch.launch_success === null
                      })}>
                        {launchSuccessful}
                      </span>
                    </li>
                  </ul>
                  <h4 className='my-3'>
                    Rocket Details
                  </h4>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      Rocket ID: {data.launch.rocket.rocket_id}
                    </li>
                    <li className='list-group-item'>
                      Rocket Name: {data.launch.rocket.rocket_name}
                    </li>
                    <li className='list-group-item'>
                      Rocket Type: {data.launch.rocket.rocket_type}
                    </li>
                  </ul>
                  <hr />
                  <Link to='/' className='btn btn-secondary'>Back</Link>
                </div>
              )
            }
          }
        </Query>
      </React.Fragment>
    )
  }
}

export default Launch