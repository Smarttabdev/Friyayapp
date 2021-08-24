import React, { Component } from 'react';
import CompletionSlider from 'Components/shared/CompletionSlider';
import { viewPayload } from 'Src/utils/views';
import { setUserUiSettings } from 'Src/helpers/user_config';
import { connect } from 'react-redux';

class PlanBoxHeader extends Component {
  navigateToLens = () => {
    const { type, setUserUiSettings } = this.props;
    const payload = viewPayload(`${type == 'my' ? 'MY' : 'TEAM'}_PLAN`);
    setUserUiSettings(payload);
  };

  render() {
    const { type, cards, completedCards, completionLevel } = this.props;
    return (
      <div className="header">
        <div className="title">
          <div className="lens_type" onClick={this.navigateToLens}>
            {type == 'my' ? 'My' : 'Team'} Plan - This Week
          </div>
        </div>
        <div className="user-results">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {cards.length - completedCards.length} to go
          </div>
          <div className="header-completion-slider">
            <CompletionSlider value={completionLevel} />
          </div>
          <div style={{ fontWeight: 'bold' }}>
            {completedCards.length}/{cards.length}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  setUserUiSettings
};

export default connect(undefined, mapDispatch)(PlanBoxHeader);
