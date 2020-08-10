import React, { PureComponent } from 'react'

class Circle extends PureComponent {
  render() {
    let fillColour = ''

    switch (this.props.success) {
      case true:
        fillColour = 'green'
        break;
      case false:
        fillColour = 'red'
        break;
      default:
        fillColour = 'yellow'
        break;
    }

    return (
      <svg height='60' width='60'>
        <circle cx='30' cy='30' r='20' fill={fillColour} />
      </svg>
    )
  }
}

export default Circle