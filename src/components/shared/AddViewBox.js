import React, { Component, Fragment } from 'react';
import Icon from 'Components/shared/Icon';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import BoardAndCardTypeListDropdown from './BoardAndCardTypeListDropdown';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import cardLenses from 'Lib/config/lenses/cards';
import {
  boardTypes,
  getBoardType
} from 'Src/components/shared/CardAndBoardTypes';

class AddViewBox extends Component {
  state = {
    addButtonClicked: false,
    viewTitle: '',
    boardType: null
  };

  componentDidMount() {
    this.setState({ boardType: cardLenses[this.props.viewKey].boardType });
  }

  handleKeyPress = async e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { parentTopic, createTopic } = this.props;
      const topicId = parentTopic ? parentTopic.id : '0';
      await createTopic({
        attributes: {
          title: this.state.viewTitle,
          parent_id: topicId,
          tag_list: [this.state.boardType],
          default_view_id: getBoardType(this.state.boardType).defaultTool
        }
      });
      this.setState({ viewTitle: '' });
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      this.setState(prev => {
        return {
          addButtonClicked: !prev.addButtonClicked
        };
      });
    }
  };

  toggleAddView = () => {
    this.setState(prev => {
      return {
        addButtonClicked: !prev.addButtonClicked
      };
    });
  };

  handleChangeTitle = state => {
    this.setState(state);
  };

  render() {
    const {
      state: { addButtonClicked },
      props: { cardFontColor, autoFocus }
    } = this;

    return (
      <Fragment>
        {!addButtonClicked ? (
          <div onClick={this.toggleAddView} style={{ cursor: 'pointer' }}>
            +
          </div>
        ) : (
          <Fragment>
            {/* <Icon
              additionalClasses="indexview-topic-segment_topic-icon"
              icon="hashtag"
              fontAwesome
              color={cardFontColor || '#e1e1e1'}
            /> */}
            <BoardAndCardTypeListDropdown
              listType="board"
              itemType={this.state.boardType}
              setItemType={boardTypeValue =>
                this.setState({ boardType: boardTypeValue })
              }
              smallModal
              containerStyle={{ paddingBottom: 10 }}
            />
            <input
              type="text"
              placeholder="Type Board title"
              onChange={({ target }) =>
                this.handleChangeTitle({ viewTitle: target.value })
              }
              value={this.state.viewTitle}
              // onKeyPress={this.handleKeyPress}
              onKeyDown={this.handleKeyPress}
              className="add-subtopic-input"
              autoFocus={autoFocus}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapState = state => {
  const {
    topics,
    page: { topicId }
  } = stateMappings(state);

  const parentTopic = topics[topicId];

  return {
    parentTopic,
    viewKey: getRelevantViewForPage(state)
  };
};

const mapDispatch = {
  createTopic
};

export default connect(mapState, mapDispatch)(AddViewBox);
