import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import RowItem from './RowItem';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import { moveTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { createTopic, viewTopic } from 'Src/newRedux/database/topics/thunks';
import { setTopicPanelView } from 'Src/newRedux/interface/menus/thunks';
import SubtopicViewOptionsDropdown from 'Src/components/shared/topics/elements/SubtopicViewOptionsDropdown';
import SubtopicFilterDropdown from 'Src/components/shared/topics/elements/SubtopicFilterOptionsDropdown';
import { getThisDomain } from 'Src/lib/utilities';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { setDomainSubtopicsView } from 'Src/newRedux/interface/menus/thunks';
import {
  getUiSettings,
  setUserUiSettings,
  setUserFilterSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import Tooltip from 'Components/shared/Tooltip';
import BoardTypeFilters from 'src/components/lenses/topic_lenses/BoardTypeFilters';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';

class RowLens extends React.Component {
  static propTypes = {
    topic: PropTypes.object,
    topicMinimized: PropTypes.bool,
    topics: PropTypes.array,
    toggleFollowTopic: PropTypes.func,
    moveTopicFromDragAndDrop: PropTypes.func,
    createTopic: PropTypes.func.isRequired,
    viewTopic: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.viewDropdownRef = React.createRef();

    this.state = {
      isShowMore: false,
      isShowForm: false,
      newTopic: '',
      boardType: null
    };

    this.createTopic = props.createTopic;
    this.viewTopic = props.viewTopic;
    this.handleClickAddTopic = this.handleClickAddTopic.bind(this);
    this.handleClickMore = this.handleClickMore.bind(this);
    this.handleSubmitNewTopic = this.handleSubmitNewTopic.bind(this);
    this.handleTopicViewSelect = this.handleTopicViewSelect.bind(this);
    this.setTopicPanelView = props.setTopicPanelView;
    this.setDomainSubtopicsView = props.setDomainSubtopicsView;
  }

  componentDidMount() {
    if (this.props.showAddTopicInput === true) {
      this.handleClickAddTopic();
    }
    this.handleCurrentBoardTypeFilter();
  }

  componentDidUpdate(prevProps) {
    if (this.props.showAddTopicInput !== prevProps.showAddTopicInput) {
      this.props.showAddTopicInput === true && this.handleClickAddTopic();
    }
    if (this.state.viewDropdown === true) {
      const dropdown = this.viewDropdownRef.current;
      this.hideViewDropdownOnClickOut(dropdown);
    }

    if (this.props.boardTypeFilter !== prevProps.boardTypeFilter) {
      this.handleCurrentBoardTypeFilter();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true);
  }

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
   * On click `More` event handler.
   *
   * @param {Event} e
   */
  handleClickMore(e) {
    e.preventDefault();

    this.setState({
      isShowMore: !this.state.isShowMore
    });
  }

  /**
   * On click add Board event handler.
   *
   * @param {Event} e
   */
  handleClickAddTopic(e) {
    e && e.preventDefault();
    this.setState({
      isShowForm: true
    });

    window.addEventListener('keydown', this.handleKeyDown, true);
  }

  /**
   * On submit new topic event handler.
   *
   * @param {Event} e
   */
  handleSubmitNewTopic = async e => {
    e.preventDefault();
    const { topic } = this.props;
    const { boardType } = this.state;
    const { target } = e;
    const title = target[0].value;

    this.setState({ isShowForm: false });
    window.removeEventListener('keydown', this.handleKeyDown, true);

    const newTopic = await this.createTopic({
      attributes: {
        title,
        parent_id: topic ? topic.id : null,
        tag_list: boardType && [boardType]
      }
    });
  };

  /**
   * On escape key pressed event handler.
   */
  handleEscapeKeyPressed = () => {
    this.setState({ isShowForm: false });
    window.removeEventListener('keydown', this.handleKeyDown, true);
  };

  /**
   * On key down event handler
   */
  handleKeyDown = key => {
    (key.keyCode == 27 || key.key == 'Escape') && this.handleEscapeKeyPressed();
  };

  getCurrentDomain = () => {
    const { domains } = this.props;
    const thisDomain = getThisDomain(domains);
    window.currentDomain = thisDomain;

    return thisDomain;
  };

  handleTopicViewSelect = topicViewMode => {
    const { topic, setUserUiSettings } = this.props;
    setUserUiSettings({
      subtopic_panel_visible: true,
      subtopic_view: topicViewMode
    });
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

  /**
   * Render topic bar input form DOM
   *
   * @return {DOM}
   */
  renderTopicBarInput() {
    return (
      <form
        style={{ width: '100%', display: 'flex' }}
        onSubmit={this.handleSubmitNewTopic}
      >
        <BoardAndCardTypeListDropdown
          itemType={this.state.boardType}
          listType="board"
          setItemType={boardTypeValue =>
            this.setState({ boardType: boardTypeValue })
          }
        />
        <input
          type="text"
          name="title"
          placeholder={`enter new Board title`}
          className="form-control form-control-minimal"
          autoFocus
        />
      </form>
    );
  }

  render() {
    const {
      topic,
      topics,
      moveTopicFromDragAndDrop,
      active_design,
      setUserFilterSettings,
      boardTypeFilter
    } = this.props;

    const {
      isShowMore,
      isShowForm,
      subtopicPanelVisible,
      viewDropdown
    } = this.state;
    const activeDesign = active_design.card_font_color;
    const forId = Math.ceil(Math.random() * 100000, 6);

    return (
      <div>
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
            <div
              data-tip={'Add Board'}
              data-for={forId}
              style={{ display: 'flex', alignSelf: 'center' }}
            >
              <i
                onClick={this.handleClickAddTopic}
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
        <div className="topic-row-container-root">
          <div
            className="topic-row-container special"
            style={
              isShowForm
                ? {
                    width: '288px',
                    transition: 'width 0.33s ease-in',
                    float: 'left',
                    marginLeft: '25px'
                  }
                : {}
            }
          >
            {isShowForm && this.renderTopicBarInput()}
          </div>
          <div className="topicRowContainerCon">
            <GenericDragDropListing
              itemList={topics}
              dropClassName={`topic-row-container ${
                isShowForm ? 'shrinked' : ''
              }`}
              itemContainerClassName={'topic-row-item'}
              dropZoneProps={{ topicId: topic ? topic.id : null }}
              itemType={dragItemTypes.TOPIC}
              onDropItem={moveTopicFromDragAndDrop}
              renderItem={subtopic => (
                <RowItem key={subtopic.id} topic={subtopic} />
              )}
              dragPreview={subtopic => (
                <RowItem key={subtopic.id} topic={subtopic} />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;
  const ui_settings = getUiSettings(state);
  const filter_setting = getFilterSettings(state);
  return {
    active_design,
    subtopicPanelVisible: ui_settings.topics_panel_visible,
    domains: getDomains(state),
    myTopicsView: ui_settings.current_active_template,
    boardTypeFilter: filter_setting.board_type || []
  };
};

const mapDispatch = {
  moveTopicFromDragAndDrop,
  createTopic,
  viewTopic,
  setTopicPanelView,
  setDomainSubtopicsView,
  setUserUiSettings,
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RowLens);
