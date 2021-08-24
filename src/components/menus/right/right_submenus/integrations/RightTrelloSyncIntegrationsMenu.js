import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  syncFromBoard,
  syncFromTopic,
  fetchTopics
} from 'actions/right_bar_actions/trello_sync_panel_actions';
import Tooltip from 'Components/shared/Tooltip';
import Dropdown from 'Components/shared/Dropdown';

class TrelloSyncPanel extends Component {
  static propTypes = {
    trello: PropTypes.object,
    topic: PropTypes.object,
    syncFromBoard: PropTypes.func,
    syncFromTopic: PropTypes.func,
    fetchTopics: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      topicId: null,
      boardId: null,
      topics: {},
      topicTitle: '',
      boardTitle: '',
      triggerClose: false
    };
  }

  UNSAFE_componentWillMount() {
    this.props.fetchTopics();
  }

  UNSAFE_componentWillReceiveProps = props => {
    this.setState(state => ({
      topics: { ...props.trello.topics, ...state.topics }
    }));
  };

  handleUpArrowClick(e) {
    e.preventDefault();
    const { topicId, boardId } = this.state;
    if (!topicId || !boardId) return;
    vex.dialog.confirm({
      message: 'Are you sure you want to sync this Board from Trello board?',
      callback: value => {
        if (value) {
          this.props.syncFromBoard(topicId, boardId);
          vex.dialog.alert(
            'The selected Board will be synced in a while. Kindly refresh the Board page to see the change.'
          );
        }
      }
    });
  }

  handleDownArrowClick(e) {
    e.preventDefault();
    const { topicId, boardId } = this.state;
    if (!topicId || !boardId) return;
    vex.dialog.confirm({
      message: 'Are you sure you want to sync this Trello board from Board?',
      callback: value => {
        if (value) {
          this.props.syncFromTopic(topicId, boardId);
          vex.dialog.alert('The selected Board will be synced in a while.');
        }
      }
    });
  }

  toggleTopicDropdown = () =>
    this.setState(state => ({ triggerClose: !state.triggerClose }));

  renderNestedView = id => {
    const { topics } = this.state;
    let filteredTopics = topics[id];
    if (!filteredTopics) return null;
    filteredTopics = filteredTopics.sort((a, b) =>
      a.attributes.title.localeCompare(b.attributes.title)
    );

    filteredTopics.forEach(
      item => !topics[item.id] && this.props.fetchTopics(item.id)
    );

    const toggleExpand = t => {
      const newTopics = { ...topics };
      newTopics[id] = filteredTopics.map(item =>
        t.id == item.id ? { ...item, expanded: !item.expanded } : item
      );
      this.setState({ topics: newTopics });
    };

    const isLast = t => !topics[t] || topics[t].length == 0;

    return filteredTopics.map(t => (
      <li key={t.id}>
        {!isLast(t.id) && (
          <a onClick={() => toggleExpand(t)} style={{ padding: '5px' }}>
            <span
              className={`fa fa-${t.expanded ? 'caret-down' : 'caret-right'}`}
              style={{ marginLeft: '0px' }}
            ></span>
          </a>
        )}
        <a
          onClick={() => {
            this.setState({ topicId: t.id, topicTitle: t.attributes.title });
            this.toggleTopicDropdown();
          }}
        >
          {t.attributes.title}
        </a>
        {t.expanded && (
          <ul style={{ listStyle: 'none', padding: '5px 0px 0px 15px' }}>
            {this.renderNestedView(t.id)}
          </ul>
        )}
      </li>
    ));
  };

  render() {
    const syncFromTrelloId = Math.ceil(Math.random() * 100000, 6);
    const syncToTrelloId = Math.ceil(Math.random() * 100000, 6);
    const tooltipOptions = { place: 'bottom' };
    const { boards } = this.props.trello;
    const {
      topicId,
      boardId,
      topicTitle,
      triggerClose,
      boardTitle
    } = this.state;
    const menuStyle = { left: '0px', width: '206px' };
    const ulStyle = { listStyle: 'none', paddingLeft: '0px' };
    const syncStyle = { opacity: !!boardId && !!topicId ? '1' : '0' };

    return (
      <div>
        <div className="trello-sync-row">
          <img src="/images/logo.png" className="mr6" height="30" />
          <Dropdown
            triggerClose={triggerClose}
            closeOnClick={false}
            trigger={
              <a
                className="form-control trello-dropdown trello-input"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{topicTitle}</span>
              </a>
            }
            menuStyle={menuStyle}
          >
            <ul style={ulStyle}>{this.renderNestedView(null)}</ul>
          </Dropdown>
          <div className="trello-sync-options" style={syncStyle}>
            <a
              onClick={e => this.handleUpArrowClick(e)}
              data-for={syncFromTrelloId}
              data-tip="Sync Board from Trello board"
            >
              <i className="fa fa-long-arrow-up icon trello-sync-arrow" />
              <Tooltip {...tooltipOptions} id={syncFromTrelloId} />
            </a>
          </div>
        </div>

        <div className="trello-sync-row">
          <div className="fa fa-trello icon trello-board mr10" />
          <Dropdown
            trigger={
              <a
                className="form-control trello-dropdown trello-input"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{boardTitle}</span>
              </a>
            }
            menuStyle={menuStyle}
          >
            <ul style={ulStyle}>
              {boards.map(board => (
                <li
                  key={board.id}
                  onClick={() =>
                    this.setState({
                      boardId: board.id,
                      boardTitle: board.name
                    })
                  }
                >
                  {board.name}
                </li>
              ))}
            </ul>
          </Dropdown>
          <div className="trello-sync-options" style={syncStyle}>
            <a
              onClick={e => this.handleDownArrowClick(e)}
              data-for={syncToTrelloId}
              data-tip="Sync Trello board from Board"
            >
              <i className="fa fa-long-arrow-down icon trello-sync-arrow" />
              <Tooltip {...tooltipOptions} id={syncToTrelloId} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ trello, topic }) => ({ trello, topic });
const mapDispatch = {
  syncFromBoard,
  syncFromTopic,
  fetchTopics
};

export default connect(mapState, mapDispatch)(TrelloSyncPanel);
