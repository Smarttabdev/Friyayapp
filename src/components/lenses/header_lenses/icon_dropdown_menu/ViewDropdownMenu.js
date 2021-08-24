import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconDropdownMenu from 'Components/shared/IconDropdownMenu';
import { setLeftSubtopicMenuOpenForTopic } from 'Src/newRedux/interface/menus/actions';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { setUserUiSettings, getUiSettings } from 'Src/helpers/user_config';
import { getTopicUISettings } from 'Src/newRedux/database/topics/selectors';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import {
  setRightFiltersMenuOpen,
  setRightFiltersDefaultSubmenuState,
  setRightFiltersMenuOpenExpanded
} from 'Src/newRedux/filters/actions';

class ViewDropdownMenu extends Component {
  state = {
    animate: false
  };

  static propTypes = {
    topic: PropTypes.object,
    currentTopics: PropTypes.array,
    displayLeftSubtopicMenuForTopic: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    displayTopics: PropTypes.bool,
    setLeftSubtopicMenuOpenForTopic: PropTypes.func.isRequired,
    topicId: PropTypes.string,
    viewTopic: PropTypes.func.isRequired,
    setUserUiSettings: PropTypes.func,
    cardFontColor: PropTypes.string
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentTopics?.length !== prevProps.currentTopics?.length) {
      this.setState({ animate: true });

      setTimeout(() => {
        this.setState({ animate: false });
      }, 5000);
    }
  }

  toggleTopPanel = () => {
    const { displayTopics } = this.props;
    this.props.setUserUiSettings({
      subtopic_panel_visible: !displayTopics
    });
  };

  toggleLeftPanel = () => {
    const {
      topic,
      displayLeftSubtopicMenuForTopic: { topicId }
    } = this.props;
    this.props.setLeftSubtopicMenuOpenForTopic(topicId ? null : topic.id);
  };

  toggleAddOptions = () => {
    const { addViewsPanelVisible, setUserUiSettings } = this.props;
    const payload = {
      add_option: !addViewsPanelVisible
    };
    setUserUiSettings(payload);
  };

  toggleBoardTabs = () => {
    mutations.setConfig({
      owner: toGid('Topic', this.props.topicId),
      config: `${this.props.cardView}.boardTabsClosed`,
      value: !this.props.boardTabsClosed?.value
    });
  };

  render() {
    const {
      currentTopics,
      displayTopics,
      displayLeftSubtopicMenuForTopic: { topicId },
      cardFontColor,
      showAddViewsPanel,
      addViewsPanelVisible,
      topicHeader
    } = this.props;
    const topicsList = currentTopics.map(topic => ({
      id: topic.id,
      title: topic.attributes.title,
      attributes: { tag_list: topic.attributes?.tag_list || [] },
      clickHandler: () =>
        this.props.viewTopic({ topicSlug: topic.attributes.slug })
    }));
    let toggleList = [
      {
        title: 'Keep open in top panel',
        toggleState: displayTopics,
        toggleHandler: this.toggleTopPanel
      },
      {
        title: 'Keep open in left panel',
        toggleState: !!topicId,
        toggleHandler: this.toggleLeftPanel
      },
      {
        title: 'Show Boards in Tabs',
        toggleState: !this.props.boardTabsClosed?.value,
        toggleHandler: this.toggleBoardTabs
      }
    ];
    showAddViewsPanel &&
      toggleList.push({
        title: 'Quick Add',
        toggleState: addViewsPanelVisible,
        toggleHandler: this.toggleAddOptions
      });
    return (
      <IconDropdownMenu
        topicHeader={topicHeader}
        title="Boards"
        icon="hashtag"
        color="#9B51E0"
        outlined
        dropdownStyle={{ left: 'unset', right: 0 }}
        cardFontColor={cardFontColor}
        itemList={topicsList}
        toggleList={toggleList}
        additionalClasses={'medium-icon-hashtag'}
        animate={this.state.animate}
        activeFilterShowed={
          this.props.activeFilters.filter(filter => !filter.disabled).length > 0
        }
        currentTool={this.props.viewKey}
        setRightFiltersDefaultSubmenuState={
          this.props.setRightFiltersDefaultSubmenuState
        }
        setRightFiltersMenuOpen={this.props.setRightFiltersMenuOpen}
        isRightFilterOpened={this.props.isRightFilterOpened}
        setRightFiltersMenuOpenExpanded={
          this.props.setRightFiltersMenuOpenExpanded
        }
        boardList
        containerClasses="board-list-dropdown"
      />
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    topics,
    page: { topicId: pageTopicId },
    utilities: { active_design },
    filters: { keepOpen }
  } = sm;
  const topicId = props?.topic?.id || pageTopicId;
  const topicViews = ['TOPIC_HEXES', 'TOPIC_LIST', 'TOPIC_TILES'];
  const uiSettings = getTopicUISettings(state);
  const cardView = getRelevantViewForPage(state);
  const displayTopics =
    uiSettings.subtopic_panel_visible === null && topicViews.includes(cardView)
      ? true
      : uiSettings.subtopic_panel_visible;
  const currentTopics = Object.values(topics).filter(
    topic => topic.attributes.parent_id === topicId
  );
  return {
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayTopics,
    topicId,
    cardView,
    currentTopics,
    cardFontColor: active_design.card_font_color,
    addViewsPanelVisible: getUiSettings(state).add_option,
    isRightFilterOpened: keepOpen
  };
};

const mapDispatch = {
  setLeftSubtopicMenuOpenForTopic,
  setUserUiSettings,
  viewTopic,
  setRightFiltersMenuOpen,
  setRightFiltersMenuOpenExpanded,
  setRightFiltersDefaultSubmenuState
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(ViewDropdownMenu, {
    query: graphql`
      query ViewDropdownMenuQuery(
        $topicId: ID!
        $config: String!
        $hasTopic: Boolean!
      ) {
        boardTabsClosed: config(owner: $topicId, config: $config)
          @include(if: $hasTopic) {
          value
        }
      }
    `,
    vars: ({ topicId, cardView }) => ({
      hasTopic: !!topicId,
      topicId: toGid('Topic', topicId),
      config: `${cardView}.boardTabsClosed`
    })
  })
);
