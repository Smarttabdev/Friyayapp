import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { VIEWS_ENUM as BOARDS } from 'Enums';
import {
  togglePanel,
  selectCardViewForTopic,
  selectGridViewForTopic,
  selectListViewForTopic,
  selectSmallGridViewForTopic,
  selectTaskViewForTopic,
  selectViewForAll
} from 'Actions/tipsView';
import { updateTopicView } from 'Actions/topic';
import Ability from 'Lib/ability';
import { toggleLabelsPanel } from 'Actions/labelsPanel';
import { connect } from 'react-redux';

class TopicViewFilter extends Component {
  static propTypes = {
    // showTopicFilterView: PropTypes.bool,
    topic: PropTypes.object,
    selectCard: PropTypes.func.isRequired,
    selectList: PropTypes.func.isRequired,
    selectGrid: PropTypes.func.isRequired,
    selectSmallGrid: PropTypes.func.isRequired,
    selectTask: PropTypes.func.isRequired,
    selectDocuments: PropTypes.func.isRequired,
    selectTodo: PropTypes.func.isRequired,
    toggleTopicPanel: PropTypes.func.isRequired,
    toggleLabelPanel: PropTypes.func.isRequired,
    setAllTopics: PropTypes.func.isRequired,
    view: PropTypes.number,
    updateView: PropTypes.func.isRequired,
    selectWiki: PropTypes.func.isRequired
  };

  static defaultProps = {
    topic: null
  };

  setAll = board => {
    this.props.setAllTopics(board);
  };

  setDefaultView = board => {
    const {
      props: { topic, updateView }
    } = this;
    if (topic !== null) {
      updateView(topic.id, board);
    }
  };

  getItems = () => {
    const {
      props: {
        topic,
        selectCard,
        selectGrid,
        selectList,
        selectSmallGrid,
        selectTask,
        selectDocuments,
        selectTodo,
        selectWiki
      }
    } = this;

    const id = topic !== null ? topic.id : null;

    return [
      {
        name: BOARDS.GRID,
        iconClass: 'view_module',
        tooltip: 'Grid Board',
        text: 'Notes',
        action: () => id !== null && selectGrid(id)
      },
      {
        name: BOARDS.LIST,
        iconClass: 'view_stream',
        tooltip: 'List Board',
        text: 'List',
        action: () => id !== null && selectList(id)
      },
      {
        name: BOARDS.CARD,
        iconClass: 'view_quilt',
        tooltip: 'Card Board',
        text: 'Card',
        action: () => id !== null && selectCard(id)
      },
      {
        name: BOARDS.TASK,
        iconClass: 'view_day',
        tooltip: 'Task Board',
        text: 'Task',
        action: () => id !== null && selectTask(id)
      },
      {
        name: BOARDS.WIKI,
        iconClass: 'view_column',
        tooltip: 'Wiki Board',
        text: 'Wiki',
        action: () => id !== null && selectWiki(id)
      },
      {
        name: BOARDS.SMALL_GRID,
        iconClass: 'apps',
        tooltip: 'Small Notes Board',
        text: 'Small Notes',
        action: () => id !== null && selectSmallGrid(id)
      },
      {
        name: BOARDS.TODO,
        iconClass: 'view_column',
        tooltip: 'Todo Board',
        text: 'Todo',
        action: () => id !== null && selectTodo(id)
      },
      {
        name: BOARDS.DOCUMENTS,
        iconClass: 'chrome_reader_mode',
        tooltip: 'Documents Board',
        text: 'Documents',
        action: () => id !== null && selectDocuments(id)
      }
    ];
  };

  render() {
    const {
      props: { showTopicFilterView, topic, view, toggleTopicPanel }
    } = this;

    const defaultView =
      topic !== null ? topic.attributes.default_view_id : null;

    const topicViewClass = classNames({
      'topic-board-filter': true,
      show: showTopicFilterView
    });

    return (
      <div className={topicViewClass}>
        <div className="flex-c-start-spacebetween full-height">
          <article className="full-width">
            <div className="flex-c mt10">
              <a
                onClick={toggleTopicPanel}
                className="mb15 close-topic-board-filter"
              >
                <i className="fa fa-chevron-right" />
              </a>
              <label className="mb10" style={{ textTransform: 'uppercase' }}>
                My Board :
              </label>
            </div>
            <div className="flex-c mt20">
              {this.getItems().map(viewIcon => (
                <div
                  key={`topic_view_item_${viewIcon.name}`}
                  className={classNames({
                    'mb10 flex-r-center': true,
                    active: view === viewIcon.name
                  })}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="flex-r-center"
                    onClick={() => viewIcon.action()}
                  >
                    <span className="material-icons mr10">
                      {viewIcon.iconClass}
                    </span>{' '}
                    {viewIcon.text}
                  </div>
                  <div
                    className="flex-r-center-end"
                    style={{ marginLeft: 'auto' }}
                  >
                    {viewIcon.name === defaultView && (
                      <span className="badge">Default Tool</span>
                    )}
                    <span className="navbar-right dropdown">
                      <button
                        className="btn btn-link"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        style={{ color: 'silver', lineHeight: 1 }}
                      >
                        <i className="material-icons">more_vert</i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            onClick={() => this.setAll(viewIcon.name)}
                            style={{ color: '#222' }}
                          >
                            Apply this tool to all my Boards
                          </a>
                        </li>
                        {topic !== null &&
                          Ability.can('update', 'self', topic) && (
                            <li>
                              <a
                                onClick={() =>
                                  this.setDefaultView(viewIcon.name)
                                }
                                style={{ color: '#222' }}
                              >
                                Make default tool
                              </a>
                            </li>
                          )}
                      </ul>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }
}

const mapState = ({ labelsPanel: { isVisible } }) => ({
  isVisible
});

const mapDispatch = {
  selectCard: selectCardViewForTopic,
  selectGrid: selectGridViewForTopic,
  selectList: selectListViewForTopic,
  selectSmallGrid: selectSmallGridViewForTopic,
  selectTask: selectTaskViewForTopic,
  toggleTopicPanel: togglePanel,
  toggleLabelPanel: toggleLabelsPanel,
  setAllTopics: selectViewForAll,
  updateView: updateTopicView
};

export default connect(mapState, mapDispatch)(withRouter(TopicViewFilter));
