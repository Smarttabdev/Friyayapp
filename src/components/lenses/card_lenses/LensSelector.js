import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import cardViews from 'Src/lib/config/lenses/cards';
import {
  updateTopic,
  setTopicFilterSettings
} from 'Src/newRedux/database/topics/thunks';
import Icon from 'Components/shared/Icon';
import QSModal from 'Components/pages/quick_setup';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import {
  getUiSettings,
  setUserUiSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { setLeftSubtopicMenuOpenForTopic } from 'Src/newRedux/interface/menus/actions';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';
import { createTopicOrder } from 'Src/newRedux/database/topicOrders/thunks';
import { initBoard } from 'Src/helpers/topics';
import AllToolsList from './AllToolsList';

let customBoards = Object.values(cardViews);
const viewTabs = [
  'All Tools',
  'Favorite',
  'My Tools',
  'Team',
  'General',
  'Project',
  'Task',
  'Document',
  'Chat',
  'Data',
  'Goal',
  'Reporting'
];
customBoards = [
  ...customBoards,
  { ...cardViews.MY_DAY, category: 'my_tools' },
  { ...cardViews.MY_PLAN, category: 'my_tools' },
  { ...cardViews.MY_RESULTS, category: 'my_tools' },
  { ...cardViews.MY_TEAMS, category: 'my_tools' },
  { ...cardViews.MY_NOTES, category: 'my_tools' },
  { ...cardViews.MY_TASKS, category: 'my_tools' }
];

const ViewOptionCard = ({ onSelect, board }) => {
  const imageUrl = `/images/lenses/${board.previewImage}.png`;

  return (
    <div className="board-selector-card" onClick={() => onSelect(board)}>
      <h4 className="board-selector-card_title">{board.name}</h4>
      <div
        className="board-selector-card_image-container"
        style={board.previewImage == 'drive' ? { flexGrow: '1' } : {}}
      >
        {board.previewImage == 'drive' ? (
          <div
            className="board-selector-card_image flex-r-center-center"
            style={{ width: '100%' }}
          >
            <img src="https://www.gstatic.com/images/branding/product/2x/drive_48dp.png" />
          </div>
        ) : (
          <img src={imageUrl} className="board-selector-card_image" />
        )}
      </div>
      <div className="board-selector-description">{board.description}</div>
    </div>
  );
};

const PlainViewOptionCard = ({ onSelect, board }) => {
  const imageUrl =
    board.previewImage == 'drive'
      ? 'https://www.gstatic.com/images/branding/product/2x/drive_48dp.png'
      : `/images/lenses/${board.previewImage}.png`;

  return (
    <div
      className="board-selector-card"
      onClick={() => onSelect(board)}
      style={{ flexDirection: 'row', flex: 1 }}
    >
      <img src={imageUrl} className="board-selector-card_image" />
      <div>
        <h4 className="board-selector-card_title" style={{ textAlign: 'left' }}>
          {board.name}
        </h4>
        <div className="board-selector-description">{board.description}</div>
      </div>
    </div>
  );
};

class LensSelector extends PureComponent {
  static propTypes = {
    topic: PropTypes.object,
    updateTopic: PropTypes.func,
    plainView: PropTypes.bool,
    onUpdateComplete: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: viewTabs[0],
      quickSetup: false,
      boards: customBoards,
      favTools: []
    };
  }

  componentDidMount() {
    this.updateFavTools();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.updateFavTools();
    }
  }

  updateFavTools = () => {
    let favTools = [];
    const screenOne = this.props.screenOneFavTools?.value || [];
    const screenTwo = this.props.screenTwoFavTools?.value || [];
    const screenFour = this.props.screenFourFavTools?.value || [];
    const screenSeven = this.props.screenSevenFavTools?.value || [];
    const screenEight = this.props.screenEightFavTools?.value || [];
    favTools = [
      ...screenOne,
      ...screenTwo,
      ...screenFour,
      ...screenSeven,
      ...screenEight
    ];
    favTools = [...new Set(favTools)];
    this.setState({ favTools });

    favTools = favTools.map(x => {
      return { ...cardViews[x], category: 'favorite', unique: x };
    });

    if (!favTools?.length) return;
    let result = [...favTools, ...customBoards];
    this.setState({ boards: result });
  };

  handleClickTab = selectedTab => {
    this.setState({ selectedTab });
  };

  toggleQuickSetup = () => {
    this.setState({ quickSetup: !this.state.quickSetup });
  };

  handleSelectView = async (board, boardType) => {
    const { topic } = this.props;
    await initBoard(topic, board, boardType);
  };

  render() {
    const { selectedTab, boards } = this.state;

    return (
      <div className="board-selector">
        {!this.props.plainView && (
          <Fragment>
            <h4 className="board-selector_title"> Select Tool </h4>
            <div className="board-selector_subtitle">
              Pick a Tool to use this board for notes, project planning,
              knowledge base, sheets and more - you can easily change the Tool
              later on.
            </div>
          </Fragment>
        )}
        <div style={{ display: 'none' }} className="board-selector-tab-wrapper">
          <div className="board-selector_tab-container">
            {viewTabs.map(tab => (
              <a
                className={cx('board-selector_tab', {
                  selected: selectedTab == tab
                })}
                key={tab}
                onClick={() => this.handleClickTab(tab)}
              >
                <span>{tab}</span>
              </a>
            ))}
          </div>
          {/* {!this.props.plainView && (
            <a
              className="board-selector-tab-right-content"
              onClick={this.toggleQuickSetup}
            >
              <Icon icon="map" />
              Quick Setup
            </a>
          )} */}
        </div>
        <div className="board-selector_view-list p-y-5px">
          {selectedTab === viewTabs[0] && (
            <AllToolsList
              boards={boards}
              handleSelectView={this.handleSelectView}
            />
          )}
          {boards?.length > 0 &&
            boards
              .filter(
                board =>
                  board.category.toLowerCase() ==
                  selectedTab.replace(' ', '_').toLowerCase()
              )
              .map(board => {
                return this.props.plainView ? (
                  <PlainViewOptionCard
                    key={board.key}
                    onSelect={this.handleSelectView}
                    board={board}
                  />
                ) : (
                  <ViewOptionCard
                    key={board.key}
                    onSelect={this.handleSelectView}
                    board={board}
                  />
                );
              })}
        </div>
        {this.state.quickSetup && (
          <QSModal
            toggleModal={this.toggleQuickSetup}
            topic={this.props.topic}
          />
        )}
      </div>
    );
  }
}

const mapState = state => {
  const {
    page: { topicId, domainId },
    user
  } = stateMappings(state);
  const ui_settings = getUiSettings(state);

  return {
    parentTopicId: topicId,
    parentDomainId: domainId,
    pinnedLenses: ui_settings.pinned_lenses || [],
    currentUser: user
  };
};

const mapDispatch = {
  updateTopic,
  createTopicOrder,
  createCard,
  setTopicFilterSettings,
  setUserUiSettings,
  createTopic,
  setLeftSubtopicMenuOpenForTopic,
  setUserLensPinSettings,
  setUserFilterSettings
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(LensSelector, {
    query: graphql`
      query LensSelectorQuery($owner: ID!) {
        screenOneFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen1"
        ) {
          id
          value
        }
        screenTwoFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen2"
        ) {
          id
          value
        }
        screenFourFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen4"
        ) {
          id
          value
        }
        screenSevenFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen7"
        ) {
          id
          value
        }
        screenEightFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen8"
        ) {
          id
          value
        }
      }
    `,
    vars: ({ currentUser }) => ({
      owner: toGid('User', currentUser?.id || null)
    })
  })
);
