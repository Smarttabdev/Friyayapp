import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';
import SplitterLayout from 'react-splitter-layout';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import lensConfig from 'Lib/config/lenses/lenses';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
import LensSelector from 'Src/components/lenses/card_lenses/LensSelector';
import { updateShowTutorial } from 'Src/newRedux/database/user/thunks';
import { updateShowTutorialAttribute } from 'Src/newRedux/database/user/actions';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import DynamicCardContainerRightPanel from 'Src/components/shared/assemblies/DynamicCardContainerRightPanel';
import TutorialView from '../shared/tutorial/tutorial-view';
import get from 'lodash/get';

//To force a view, simply set it as forceViewToDisplay:
const forceViewToDisplay = null; // CardViewConstructionPlayground;

class DynamicCardContainer extends PureComponent {
  // dynamically calculate layout-splitter position to make the split layout resizable.
  // As split layout with position fix breaks resizing this hack is required.
  setSplitterWidth = () => {
    const layoutPane = document.querySelector(
      '.layout-pane:not(.layout-pane-primary)'
    );
    if (layoutPane) {
      const width = layoutPane.style['width'];
      document.querySelector('.layout-splitter').style['right'] = width;
    }
  };

  componentDidMount() {
    const viewKey = this.getViewKey();
    this.setSplitterWidth();
    //this.props.updateShowTutorial(false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.cardsSplitScreen) {
      this.setSplitterWidth();
    }
  }
  state = {
    isLeftPaneOpen: true
    // showTutorial: true,
  };

  toggleLeftPane = () =>
    this.setState(({ isLeftPaneOpen }) => ({
      isLeftPaneOpen: !isLeftPaneOpen
    }));

  static propTypes = {
    cardView: PropTypes.string,
    cardsHidden: PropTypes.bool
  };

  isTopicView(property) {
    if (
      property === 'TOPIC_HEXES' ||
      property === 'TOPIC_TILES' ||
      property === 'TOPIC_LIST'
    ) {
      return true;
    }

    return false;
  }

  getViewKey = () => {
    const { topic, cardView } = this.props;
    let topic_default = get(topic, 'attributes.default_view_id');
    if (cardView) {
      return cardView;
    } else if (topic_default) {
      return topic_default;
    }
  };

  hideTutorial = () => {
    this.props.updateShowTutorialAttribute({
      attributes: { showTutorial: false }
    });
    this.props.updateShowTutorial(false);
  };

  render() {
    const { isLeftPaneOpen } = this.state;
    const {
      cardsHidden,
      cardsSplitScreen,
      page,
      showTutorial,
      show_tutorial
    } = this.props;
    let viewKey = this.getViewKey();
    const cardsHiddenForUser =
      typeof cardsHidden !== 'undefined'
        ? cardsHidden
        : this.isTopicView(viewKey);

    if (this.isTopicView(viewKey) && !cardsHiddenForUser) {
      viewKey = 'GRID';
    }
    const CardViewComponent =
      forceViewToDisplay || (viewKey && lensConfig.cards[viewKey])
        ? lensConfig.cards[viewKey].viewComponent
        : LensSelector;

    let splitLayoutProps = {
      secondaryInitialSize: 30
    };

    const isSplitLayoutDisabled = lensConfig.cards[viewKey]
      ? lensConfig.cards[viewKey].isSplitLayoutDisabled
      : false;

    if (lensConfig.cards[viewKey] && lensConfig.cards[viewKey].layoutConfig) {
      splitLayoutProps = lensConfig.cards[viewKey].layoutConfig;
    }

    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingIndicator />}>
          <div className="cards-container">
            {(page === 'home' || page === 'topics') &&
              (showTutorial || show_tutorial) && (
                <TutorialView hideTutorial={this.hideTutorial} />
              )}

            {cardsHiddenForUser ? (
              <div className="placeholder-board" />
            ) : isSplitLayoutDisabled ? (
              <div className="splitter-layout splitter-layout-custom">
                <CardViewComponent {...this.props} />
              </div>
            ) : (
              <SplitterLayout
                key={viewKey}
                customClassName="splitter-layout-custom"
                primaryMinSize={25}
                secondaryMinSize={30}
                onDragEnd={() => {
                  this.setSplitterWidth();
                }}
                percentage
                {...splitLayoutProps}
              >
                {isLeftPaneOpen && <CardViewComponent {...this.props} />}
                {!!cardsSplitScreen && (
                  <DynamicCardContainerRightPanel
                    isLeftPaneOpen={isLeftPaneOpen}
                    toggleLeftPane={this.toggleLeftPane}
                  />
                )}
              </SplitterLayout>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

const mapDispatch = {
  updateShowTutorial,
  updateShowTutorialAttribute
};

const mapState = state => {
  const { menus, user, page } = stateMappings(state);
  const cardsSplitScreen = menus.cardsSplitScreen;

  return {
    cardsSplitScreen,
    page: page.page,
    show_tutorial: get(user, 'attributes.show_tutorial'),
    showTutorial: get(user, 'attributes.showTutorial')
  };
};

export default connect(mapState, mapDispatch)(DynamicCardContainer);
