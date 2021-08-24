import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsageComponent from './usageComponent';
import ExampleComponent from './examplesComponent';

class TutorialView extends Component {
  static propTypes = {
    hideTutorial: PropTypes.func,
    children: PropTypes.node
  };

  state = {
    activeTab: 'usage'
  };

  changeTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;
    const usageClass =
      activeTab === 'usage' ? 'tab-item active-tab' : 'tab-item';
    const exampleClass =
      activeTab === 'example' ? 'tab-item active-tab' : 'tab-item';
    return (
      <div className="tutorial-board-container">
        <div className="tutorial-header">
          <span onClick={() => this.changeTab('usage')} className={usageClass}>
            how it works
          </span>
          <span
            onClick={() => this.changeTab('example')}
            className={exampleClass}
          >
            see examples
          </span>
          <button
            type="button"
            className="close close-dialog"
            aria-label="Close"
            onClick={this.props.hideTutorial}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {activeTab === 'usage' && (
          <UsageComponent hideTutorial={this.props.hideTutorial} />
        )}
        {activeTab === 'example' && <ExampleComponent />}
      </div>
    );
  }
}

export default TutorialView;
