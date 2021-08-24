import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { createTopic } from 'Src/newRedux/database/topics/thunks';
import BoardAndCardTypeListDropdown from 'Src/components/shared/BoardAndCardTypeListDropdown';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';

const h5Style = {
  display: 'table',
  width: '100%',
  marginTop: 0,
  height: '100%'
};

const addHiveDivStyle = {
  width: '100%',
  display: 'table-cell',
  verticalAlign: 'middle',
  cursor: 'pointer'
};

class TopicNewItemEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createMode: true,
      topicTitle: props.title,
      createButtonText: 'Create',
      boardType: null
    };
  }

  handleTitleChange = e => {
    const value = e.target.value;
    this.setState({
      topicTitle: value
    });
  };

  handleAddHive = () => {
    this.setState({
      createMode: true
    });
  };

  handleTopicSubmit = async e => {
    e.preventDefault();
    const {
      props: { topic, handleTopicCreated, id },
      state: { topicTitle, boardType }
    } = this;
    this.setState(state => ({ ...state, createButtonText: 'Creating...' }));
    const added = await this.props.createTopic({
      attributes: {
        title: topicTitle,
        parent_id: topic ? topic.id : null,
        tag_list: [boardType]
      }
    });
    added && handleTopicCreated(id);
  };

  render() {
    const { createMode, topicTitle, createButtonText } = this.state;

    let hexContent = null;
    if (createMode) {
      hexContent = (
        <div>
          <div>
            <input
              type="text"
              onChange={this.handleTitleChange}
              onBlur={e => (e.target.placeholder = `${topicTitle}`)}
              placeholder={topicTitle}
              onFocus={e => (e.target.placeholder = '')}
              className="topic-title"
              autoFocus
              style={{ paddingLeft: 30 }}
            />
          </div>
          <button type="submit" className="btn btn-link">
            {createButtonText}
          </button>
        </div>
      );
    } else {
      hexContent = (
        <h5 style={h5Style}>
          <div onClick={this.handleAddHive} style={addHiveDivStyle}>
            <p>{topicTitle}</p>
          </div>
        </h5>
      );
    }

    return (
      <div className="hex-wrapper">
        <BoardAndCardTypeListDropdown
          containerClasses="create-hex-board-style"
          itemType={this.state.boardType}
          listType="board"
          setItemType={boardTypeValue =>
            this.setState({ boardType: boardTypeValue })
          }
        />
        <div
          className="hex board-create-hex create-hex create-hex-subtopic"
          id={this.props.id}
          style={{ paddingTop: 10 }}
        >
          <div className="corner-1" />
          <div className="corner-2" />
          <div className="inner" style={{ height: '100%' }}>
            <form
              className="flex-r-center-center"
              onSubmit={this.handleTopicSubmit}
              style={{ height: '100%' }}
            >
              {hexContent}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

TopicNewItemEdit.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number.isRequired,
  createTopic: PropTypes.func,
  topic: PropTypes.object,
  group: PropTypes.object,
  handleTopicCreated: PropTypes.func.isRequired
};

const mapState = () => {
  return {};
};

const mapDispatch = {
  createTopic
};

export default connect(mapState, mapDispatch)(withRouter(TopicNewItemEdit));
