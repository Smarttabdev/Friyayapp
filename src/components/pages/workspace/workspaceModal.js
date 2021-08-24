/* eslint-disable quotes */
import React, { Component, Fragment } from 'react';
import IconButton from 'Components/shared/buttons/IconButton';

class WorkspaceModal extends Component {
  state = {
    isModalOpen: false
  };

  redirectHome = () => {
    window.location.href = '/choose_domain';
  };

  render() {
    return (
      <Fragment>
        <IconButton
          // color={this.props.color || '#F2C94C'}
          color="#6FCF97"
          additionalClasses="icon-button"
          icon="arrow_upward"
          onClick={this.redirectHome}
        />
      </Fragment>
    );
  }
}

export default WorkspaceModal;
