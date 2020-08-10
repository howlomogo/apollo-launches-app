import React, { Component } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import Circle from './Circle'

class LaunchItem extends Component {
  render() {
    return (
      <div className='card card-body mb-3'>
        <div className='row'>
          <div className='col-sm-6'>
            <h4>
              Mission Name:
              &nbsp;{this.props.launch.mission_name || 'No Mission Name'}
            </h4>
            <p>
              Date:&nbsp;
              <Moment format='DD-MM-YYYY HH:mm'>
                {this.props.launch.launch_date_local}
              </Moment>
            </p>
          </div>
          <div className='col-sm-3'>
            <h4>Launch Successful:</h4>
            <Circle
              success={this.props.launch.launch_success}
            />
          </div>
          <div className='col-sm-3'>
            <Link to={`/launch/${this.props.launch.flight_number}`} className='btn btn-primary'>
              Launch Details
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LaunchItem