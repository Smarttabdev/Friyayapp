import React, { Component, Fragment } from 'react';
// import { object, func, number, array } from 'prop-types';
import { connect } from 'react-redux';

import { moveTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';

import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createSubTopicsWithTitle } from 'actions/topic';
import { getThisDomain } from 'Src/lib/utilities';
import TopicListCard from './TopicListCard';
import TopicViewMenu from 'Src/components/shared/topics/TopicViewMenu';
import { setTopicPanelView } from 'Src/newRedux/interface/menus/thunks';
import SubtopicViewOptionsDropdown from 'Src/components/shared/topics/elements/SubtopicViewOptionsDropdown';
import SubtopicFilterDropdown from 'Src/components/shared/topics/elements/SubtopicFilterOptionsDropdown';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { setDomainSubtopicsView } from 'Src/newRedux/interface/menus/thunks';
import { createTopic, updateTopic } from 'Src/newRedux/database/topics/thunks';
import {
  getUiSettings,
  setUserUiSettings,
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import Tooltip from 'Components/shared/Tooltip';
import BoardTypeFilters from 'src/components/lenses/topic_lenses/BoardTypeFilters';
import BoardAndCardTypeListDropdown from 'Src/components/shared/BoardAndCardTypeListDropdown';

class TopicListLens extends Component {
  constructor(props) {
    super(props);
    this.handleTopicViewSelect = this.handleTopicViewSelect.bind(this);
    this.setTopicPanelView = props.setTopicPanelView;
    this.setDomainSubtopicsView = props.setDomainSubtopicsView;
    this.viewDropdownRef = React.createRef();
  }

  state = {
    showAddSubtopicBox: false,
    title: '',
    boardType: null
  };

  componentDidMount() {
    if (this.props.showAddTopicInput === true) {
      this.setState({ showAddSubtopicBox: true });
    }
    this.handleCurrentBoardTypeFilter();
  }

  componentDidUpdate(prevProps) {
    if (this.props.showAddTopicInput !== prevProps.showAddTopicInput) {
      this.setState({ showAddSubtopicBox: true });
    }
    if (this.state.viewDropdown === true) {
      const dropdown = this.viewDropdownRef.current;
      this.hideViewDropdownOnClickOut(dropdown);
    }
    if (this.props.boardTypeFilter !== prevProps.boardTypeFilter) {
      this.handleCurrentBoardTypeFilter();
    }
  }

  getCurrentDomain = () => {
    const { domains } = this.props;
    const thisDomain = getThisDomain(domains);
    window.currentDomain = thisDomain;

    return thisDomain;
  };

  handleCurrentBoardTypeFilter = () => {
    const { boardTypeFilter } = this.props;
    if (boardTypeFilter.includes('PROJECT_BOARDS')) {
      return this.setState({
        boardType: 'project'
      });
    }
    if (boardTypeFilter.includes('GOAL_BOARDS')) {
      return this.setState({
        boardType: 'goal'
      });
    }
    if (boardTypeFilter.includes('NOTE_BOARDS')) {
      return this.setState({
        boardType: 'notes'
      });
    }
    if (boardTypeFilter.includes('FILE_BOARDS')) {
      return this.setState({
        boardType: 'file'
      });
    }
    if (boardTypeFilter.includes('KNOWLEDGE_BOARDS')) {
      return this.setState({
        boardType: 'knowledge'
      });
    }
    if (boardTypeFilter.includes('TASK_BOARDS')) {
      return this.setState({
        boardType: 'task'
      });
    }
    if (boardTypeFilter.includes('DATA_BOARDS')) {
      return this.setState({
        boardType: 'data'
      });
    }
    return this.setState({ boardType: null });
  };

  handleTopicViewSelect = topicViewMode => {
    const { topic, setUserUiSettings } = this.props;
    setUserUiSettings({
      subtopic_panel_visible: true,
      subtopic_view: topicViewMode
    });
  };

  handleToggleAddTopic = () => {
    this.setState({ showAddTopic: !this.state.showAddTopic });
  };

  handleKeyPress = async e => {
    const { currentGroup, createTopic } = this.props;
    const relationships = currentGroup
      ? {
          share_settings: {
            data: [{ id: currentGroup.id, type: 'groups' }]
          }
        }
      : null;
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTopic = {
        attributes: {
          title: this.state.newTopicTitle,
          parent_id: (this.props.topic || {}).id,
          tag_list: [this.state.boardType]
        },
        relationships
      };
      createTopic(newTopic);

      this.setState({ showAddTopic: false, newTopicTitle: '' });
    } else if (e.key == 'Escape' || e.keyCode == 27) {
      this.setState({ showAddTopic: false, newTopicTitle: '' });
    }
  };

  handleViewsClick = () => {
    this.setState({ viewDropdown: !this.state.viewDropdown });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideViewDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ viewDropdown: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  render() {
    const forId = Math.ceil(Math.random() * 100000, 6);
    const {
      topic,
      topics,
      active_design,
      setUserFilterSettings,
      boardTypeFilter,
      moveTopicFromDragAndDrop
    } = this.props;
    const {
      subtopicPanelVisible,
      showAddTopic,
      newTopicTitle,
      viewDropdown
    } = this.state;
    const activeDesign = active_design.card_font_color;
    const addTopic = (
      <div data-tip={'Add Board'} data-for={forId} style={{ display: 'flex' }}>
        <i
          onClick={this.handleToggleAddTopic}
          style={{
            color: activeDesign ? activeDesign : null,
            fontSize: '16px',
            fontWeight: 600
          }}
          className="tiphive-icon material-icons addIcon"
        >
          add
        </i>
        <Tooltip {...{ place: 'right' }} id={forId} />
      </div>
    );

    return (
      <Fragment>
        <div style={{ position: 'relative' }}>
          <h3 className="subtopic-header-text">
            <div className="boards-btn-container">
              <span
                className="subtopic-header-text-text"
                style={{
                  borderBottom:
                    boardTypeFilter.length === 0
                      ? `2px solid ${activeDesign ? activeDesign : '#c48FC8'}`
                      : ''
                }}
                onClick={() => setUserFilterSettings({ board_type: [] })}
              >
                All Boards
              </span>
              <i
                style={{
                  fontSize: '12px',
                  color: activeDesign ? activeDesign : '',
                  marginTop: '8px',
                  marginLeft: '3px',
                  cursor: 'pointer'
                }}
                onClick={this.handleViewsClick}
                className={`fa fa-caret-${
                  !this.state.viewDropdown ? 'down' : 'up'
                }`}
              ></i>
              <BoardTypeFilters defaultColor={activeDesign} />
              {addTopic}
            </div>
          </h3>
          {this.state.viewDropdown ? (
            <span
              ref={this.viewDropdownRef}
              className="viewOptionsAndFilterDropdown"
            >
              <span className="title">Show Boards as:</span>
              <SubtopicViewOptionsDropdown
                onSelect={this.handleTopicViewSelect}
              />
              <span className="title">Filter:</span>
              <SubtopicFilterDropdown
                closeDropdown={() => this.setState({ viewDropdown: false })}
              />
            </span>
          ) : null}
        </div>
        <div className="topic-list-board">
          {showAddTopic && (
            <div className="flex">
              <BoardAndCardTypeListDropdown
                itemType={this.state.boardType}
                listType="board"
                setItemType={boardTypeValue =>
                  this.setState({ boardType: boardTypeValue })
                }
                containerStyle={{ margin: 'auto' }}
              />
              <input
                type="text"
                onChange={({ target }) =>
                  this.setState({ newTopicTitle: target.value })
                }
                placeholder="Type new Board title"
                onKeyPress={this.handleKeyPress}
                value={newTopicTitle}
                className="add-subtopic-input topic-list-card"
                autoFocus
                style={{ flexBasis: 'calc(100% - 44px)' }}
              />
            </div>
          )}
          <GenericDragDropListing
            itemList={topics}
            dropZoneProps={{ topicId: topic ? topic.id : null }}
            itemType={dragItemTypes.TOPIC}
            onDropItem={moveTopicFromDragAndDrop}
            renderItem={subtopic => (
              <TopicListCard key={subtopic.id} topic={subtopic} />
            )}
          />
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design },
    page: { groupId }
  } = sm;
  const ui_settings = getUiSettings(state);
  const currentGroup = sm.groups[groupId];
  const filter_setting = getFilterSettings(state);

  return {
    active_design,
    subtopicPanelVisible: ui_settings.topics_panel_visible,
    domains: getDomains(state),
    myTopicsView: ui_settings.current_active_template,
    currentGroup,
    boardTypeFilter: filter_setting.board_type || []
  };
};

const mapDispatch = {
  createSubtopic: createSubTopicsWithTitle,
  moveTopicFromDragAndDrop,
  setTopicPanelView,
  setDomainSubtopicsView,
  createTopic,
  setUserUiSettings,
  updateTopic,
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(TopicListLens);
