import React from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateUserUiSettings } from 'Src/newRedux/database/user/thunks';

const IntroGIDBFNotice = ({ history, user, updateUserUiSettings }) => {
  const isLoading = !user;

  const handleClickNext = () => history.push('/introduction/initial_setup');

  const handleClickSkip = async () => {
    await updateUserUiSettings({
      newSettings: {
        gidbf_updates_response: 'skip'
      }
    });
    history.push('/');
  };

  return (
    <div className="has-bg-red initial-setup gidbf-notice row">
      <img className="intro-logo" src="/images/friyay-logo-black.png" />
      <div className="initial-setup__content col-xs-12 col-md-9">
        <div className="m-x-auto">
          <h1>New Updates!</h1>
          <p>
            Hi! We have made updates to Friyay to help you focus on Getting It
            Done By Friday.
          </p>
          <p>On the next page you can choose your preferred setup.</p>
          <button className="large-btn" onClick={handleClickNext}>
            Next
          </button>
          <br />
          <button
            className="large-btn initial-setup__text-btn"
            onClick={handleClickSkip}
            disabled={isLoading}
            style={{ textAlign: 'left' }}
          >
            Skip (keep my current setup)
          </button>
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  const { user } = stateMappings(state);
  return {
    user
  };
};

const mapDispatch = {
  updateUserUiSettings
};

export default connect(mapState, mapDispatch)(IntroGIDBFNotice);
