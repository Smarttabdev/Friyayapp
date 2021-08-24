import React, { Fragment, PureComponent } from 'react';
import { func } from 'prop-types';
import { get } from 'lodash';
import VisibilitySensor from 'react-visibility-sensor';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import withDataManager from 'Src/dataManager/components/withDataManager';

//A component for placing at the bottom of an incomplete list.  When it enters the viewport it will call the DataManager for the next page of data
class DMLoader extends React.PureComponent {
  timer = null;
  mounted_ = false;
  state = {
    loading: false,
    isVisible: true
  };

  componentDidMount() {
    this.mounted_ = true;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.mounted_ = false;
  }

  handleCheckIfStillOnPage = () => {
    const { dmData, loaderKey } = this.props;
    this.mounted_ &&
    this.state.isVisible &&
    dmData[loaderKey] &&
    !dmData[loaderKey].allLoaded
      ? this.handleCallNextPageOfData()
      : this.setState({ loading: false });
  };

  handleVisibilityChange = isVisible => {
    this.setState({ isVisible });
    isVisible && this.handleCallNextPageOfData();
  };

  handleCallNextPageOfData = async () => {
    const { dmData, dmRequestNextPageForRequirement, loaderKey } = this.props;
    if (loaderKey && dmData[loaderKey] && !dmData[loaderKey].allLoaded) {
      this.setState({ loading: true });
      await dmRequestNextPageForRequirement(loaderKey);
      this.timer = setTimeout(() => this.handleCheckIfStillOnPage(), 200);
    }
  };

  render() {
    const { dmData, loaderKey } = this.props;
    return (
      <VisibilitySensor
        onChange={this.handleVisibilityChange}
        partialVisibility
      >
        {this.state.loading || !get(dmData, [loaderKey, 'allLoaded']) ? (
          <div className="dmloader" style={this.props.style}>
            <LoadingIndicator />
          </div>
        ) : (
          <div></div>
        )}
      </VisibilitySensor>
    );
  }
}

const mapState = (state, props) => ({});
const dataRequirements = props => props.dataRequirements;

export default withDataManager(dataRequirements, mapState, {})(DMLoader);
