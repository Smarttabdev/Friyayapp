import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tutorial extends Component {
  static propTypes = {
    showTutorial: PropTypes.func,
    children: PropTypes.node,
    hideEvent: PropTypes.func
  };

  render() {
    return (
      <div className="tutorial-container">
        <p className="tutorial-title" onClick={this.props.showTutorial}>
          <strong>how does it work?</strong>
        </p>
        <p>
          you can also open this tutorial in your user profile menu in the top
          right corner
        </p>
        <a onClick={() => this.props.hideEvent()}>hide</a>
      </div>
    );
  }
}

export default Tutorial;
