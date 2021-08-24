import React, { Component } from 'react';
import { connect } from 'react-redux';
import RightActionBar from './RightActionBar';
import lazyComponent from 'Components/lazy';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';

const RightSubMenu = lazyComponent(() =>
  import('./right_submenus/RightSubMenu')
);

class RightActionBarContainer extends Component {
  state = {
    openOnMouseHover: false
  };

  componentDidMount() {
    this.handleOpenRightMenuOnHover();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query?.config !== this.props.query?.config) {
      this.handleOpenRightMenuOnHover();
    }
  }

  handleOpenRightMenuOnHover = () => {
    const { userId, query } = this.props;
    const usersIdArray = query?.config?.value || [];
    if (usersIdArray.includes(userId)) {
      this.setState({ openOnMouseHover: true });
    } else {
      this.setState({ openOnMouseHover: false });
    }
  };

  handleMouseEvents = type => {
    const { setRightMenuOpenForMenu } = this.props;
    const { openOnMouseHover } = this.state;

    if (type === 'enter' && openOnMouseHover) {
      return setRightMenuOpenForMenu(true);
    }
    if (type === 'leave' && openOnMouseHover) {
      return setRightMenuOpenForMenu(false);
    }
    return null;
  };

  render() {
    const { displaySubmenu } = this.props;

    return (
      <div
        onMouseEnter={() => this.handleMouseEvents('enter')}
        onMouseLeave={() => this.handleMouseEvents('leave')}
        className={`right-action-bar-container ${
          displaySubmenu ? 'expanded' : ''
        }`}
      >
        <div
          className={`right-action-bar-container_submenu-outer-container ${
            displaySubmenu ? 'in-focus' : ''
          }`}
        >
          {displaySubmenu && <RightSubMenu />}
        </div>
        <RightActionBar />
      </div>
    );
  }
}

const RefetchContainer = createRefetchContainer(
  RightActionBarContainer,
  {
    query: graphql`
      fragment RightActionBarContainer_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "right_submenu_quick_open_close_array") {
          id
          value
        }
      }
    `
  },
  graphql`
    query RightActionBarContainerRefetchQuery($owner: ID!) {
      ...RightActionBarContainer_query @arguments(owner: $owner)
    }
  `
);

const mapState = state => {
  const {
    page: { topicId },
    user
  } = stateMappings(state);
  return {
    displaySubmenu: state._newReduxTree.ui.menus.displayRightSubMenuForMenu,
    topicId,
    userId: user?.id
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query RightActionBarContainerQuery($owner: ID!) {
        ...RightActionBarContainer_query @arguments(owner: $owner)
      }
    `,
    vars: ({ topicId }) => ({
      owner: toGid('Topic', topicId)
    })
  })
);
