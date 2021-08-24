import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopicItemNew from 'Src/components/pages/topic_page/topic_item_new';
import TopicItem from 'Src/components/pages/topic_page/topic_item';
import TopicNewItemEdit from 'Src/components/pages/topic_page/topic_new_item_edit';
import tiphive from 'Src/lib/tiphive';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import { moveOrCopyTopicInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import {
  removeTopic,
  removeTopicAndMoveContent,
  toggleFollowTopic
} from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { toggleHexPanel } from 'Src/newRedux/interface/menus/actions';
import { setTopicPanelView } from 'Src/newRedux/interface/menus/thunks';
import SubtopicViewOptionsDropdown from 'Src/components/shared/topics/elements/SubtopicViewOptionsDropdown';
import SubtopicFilterDropdown from 'Src/components/shared/topics/elements/SubtopicFilterOptionsDropdown';
import {
  getUiSettings,
  setUserUiSettings,
  setUserFilterSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import BoardTypeFilters from 'src/components/lenses/topic_lenses/BoardTypeFilters';

class SmallHexLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTopics: [],
      subtopicToDelete: null
    };
    this.handleTopicViewSelect = this.handleTopicViewSelect.bind(this);
    this.setTopicPanelView = props.setTopicPanelView;
    this.viewDropdownRef = React.createRef();
  }

  handleAddTopicClick = () => {
    const {
      state: { newTopics }
    } = this;
    const isEmpty = newTopics.length === 0;
    const last = newTopics[newTopics - 1];

    this.setState({
      newTopics: isEmpty ? [1] : [...newTopics, last + 1]
    });
  };

  componentDidMount() {
    if (this.props.showAddTopicInput === true) {
      this.handleAddTopicClick();
    }
    this.handleCurrentBoardTypeFilter();
  }

  componentDidUpdate(prevProps) {
    if (this.props.showAddTopicInput !== prevProps.showAddTopicInput) {
      this.props.showAddTopicInput === true && this.handleAddTopicClick();
    }
    if (this.state.viewDropdown === true) {
      const dropdown = this.viewDropdownRef.current;
      this.hideViewDropdownOnClickOut(dropdown);
    }
    if (this.props.boardTypeFilter !== prevProps.boardTypeFilter) {
      this.handleCurrentBoardTypeFilter();
    }
  }

  handleTopicCreated = topicId => {
    this.setState(state => ({
      ...state,
      newTopics: state.newTopics.filter(id => id !== topicId)
    }));
  };

  selectSubtopicDelete = subtopicToDelete => {
    this.setState({ subtopicToDelete });
  };

  handleToggleTopicSection = () => this.props.toggleHexPanel();

  handleTopicDelete = e => {
    e.preventDefault();

    vex.dialog.confirm({
      message: 'Are you sure you want to delete this Board?',
      callback: value => {
        if (value) {
          this.props.removeTopic(this.state.subtopicToDelete);
        }
      }
    });
  };

  handleTopicDeleteAndMove = selectedTopics => {
    const topicIDs = selectedTopics.map(topic => topic.id);
    const topicID = this.state.subtopicToDelete;

    this.props.removeTopicAndMoveContent(topicID, topicIDs);
    tiphive.hidePrimaryModal();
  };

  handleTopicViewSelect = topicViewMode => {
    const { setUserUiSettings } = this.props;
    setUserUiSettings({
      subtopic_panel_visible: true,
      subtopic_view: topicViewMode
    });
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

  /**
   * Render drag & drop TopicItem.
   *
   * @return {DOM}
   */
  renderDragAndDropItem = (subtopic, handler, index) => {
    const { handleStarSubhiveClick } = this.props;

    return (
      <TopicItem
        currentGroupId={null}
        group={null}
        topic={subtopic}
        isCurrentTopic={false}
        key={`hex-subtopic-${subtopic.id}`}
        handleStarSubhiveClick={handleStarSubhiveClick}
        handleDelete={this.handleTopicDelete}
        handleMoveDelete={this.handleTopicDeleteAndMove}
        selectSubtopic={this.selectSubtopicDelete}
        dropdownHasInput={false}
      />
    );
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
    const {
      props: {
        page,
        topic,
        active_design,
        boardTypeFilter,
        setUserFilterSettings
      },
      state: { newTopics, subtopicPanelVisible, viewDropdown }
    } = this;

    const activeDesign = active_design.card_font_color;

    const subtopicItems = [
      <TopicItemNew
        parentTopic={topic}
        handleAddTopicClick={this.handleAddTopicClick}
        key="new-subtopic"
      />,
      ...newTopics.map((topicId, index) => (
        <TopicNewItemEdit
          key={topicId}
          id={topicId}
          handleTopicSubmit={this.handleTopicSubmit}
          title={`Title ${index + 1}`}
          topic={topic}
          handleTopicCreated={this.handleTopicCreated}
        />
      ))
    ];

    return (
      <div className="hex-grid-wrapper">
        <div style={{ position: 'relative' }}>
          <h3 className="subtopic-header-text">
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
                marginTop: '4px',
                marginLeft: '3px',
                cursor: 'pointer'
              }}
              onClick={this.handleViewsClick}
              className={`fa fa-caret-${
                !this.state.viewDropdown ? 'down' : 'up'
              }`}
            ></i>
            <BoardTypeFilters defaultColor={activeDesign} />
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
        <div
          className="hex-grid hex-grid-small"
          style={{ paddingLeft: '51px' }}
        >
          {/* {page !== 'topics' && (
            <IconButton
              additionalClasses="hex-grid-close"
              icon="close"
              onClick={this.handleToggleTopicSection}
            />
          )} */}
          <div className="hex-inner-wrapper">
            <GenericDragDropListing
              headerItem={subtopicItems}
              itemList={this.props.topics}
              id={'topicHexList'}
              draggedItemProps={{ origin: { topicId: this.props.topicId } }}
              dragPreview={subtopic => <TopicItem topic={subtopic} />}
              dragClassName="small-hex_draggable-topic"
              dropZoneProps={{ topicId: this.props.topicId }}
              itemType={dragItemTypes.SUBTOPIC_HEX}
              onDropItem={this.props.moveOrCopyTopicInOrToTopicFromDragAndDrop}
              dropClassName="subtopics-hex-list subtopics-list"
              renderItem={this.renderDragAndDropItem}
            />
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

SmallHexLens.propTypes = {
  topic: PropTypes.object,
  topicMinimized: PropTypes.bool,
  topics: PropTypes.array,
  removeTopic: PropTypes.func.isRequired,
  removeTopicAndMoveContent: PropTypes.func.isRequired,
  toggleHexPanel: PropTypes.func.isRequired,
  toggleFollowTopic: PropTypes.func
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { page },
    utilities: { active_design }
  } = sm;
  const ui_settings = getUiSettings(state);
  const filter_setting = getFilterSettings(state);
  return {
    active_design,
    page,
    topicMinimized: !sm.menus.displayHexPanel,
    subtopicPanelVisible: ui_settings.topics_panel_visible,
    boardTypeFilter: filter_setting.board_type || []
  };
};

const mapDispatch = {
  removeTopic,
  removeTopicAndMoveContent,
  toggleFollowTopic,
  toggleHexPanel,
  moveOrCopyTopicInOrToTopicFromDragAndDrop,
  setTopicPanelView,
  setUserUiSettings,
  setUserFilterSettings,
  getFilterSettings
};

export default connect(mapState, mapDispatch)(SmallHexLens);
