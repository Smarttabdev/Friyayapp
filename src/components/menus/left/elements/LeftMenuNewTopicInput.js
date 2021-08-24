import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty, trim, compose, not } from 'ramda';
import set from 'lodash/set';
const isValid = compose(not, isEmpty, trim);
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import BoardAndCardTypeListDropdown from 'src/components/shared/BoardAndCardTypeListDropdown';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import cardLenses from 'Lib/config/lenses/cards';
import { getBoardType } from 'Components/shared/CardAndBoardTypes';
import { initBoard } from 'Src/helpers/topics';

class LeftMenuNewTopicInput extends Component {
  static propTypes = {
    handleTopicCreateSubmit: PropTypes.func,
    isSavingTopic: PropTypes.bool
  };

  constructor(props) {
    super(props);

    const lensConfig = cardLenses[props.viewKey];

    this.state = {
      title: '',
      submitted: false,
      boardType:
        (props.boardType !== undefined
          ? props.boardType
          : lensConfig?.boardType) || null,
      boardIndex: this.props.boardIndex
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown, true);

    if (this.props.boardIndex === 0) {
      this.setState({ boardType: null });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true);
  }

  handleKeyDown = e => {
    (e.key == 'Escape' || e.keyCode == 27) && this.props.onDismiss();
  };

  handleSubmit = async e => {
    e.preventDefault();
    const {
      props: {
        createTopic,
        onDismiss,
        parentTopicId,
        rootUrl,
        routerHistory,
        currentGroup,
        noRedirect,
        afterCreate,
        newTopicRelationships
      },
      state: { title }
    } = this;

    let relationships = currentGroup
      ? {
          share_settings: {
            data: [
              { id: 'everyone', type: 'users' },
              { id: currentGroup.id, type: 'groups' }
            ]
          }
        }
      : null;
    const baseUrl = rootUrl == '/' ? rootUrl : rootUrl + '/';

    if (isValid(title)) {
      noRedirect &&
        this.setState({
          isSavingTopic: true
        });
      let tag_list;
      if (this.state.boardType === 'notes') {
        tag_list = ['notes'];
        relationships = this.props.isMyNotes && {
          share_settings: {
            data: [
              {
                id: 'private',
                type: 'users',
                sharing_object_id: 'private',
                sharing_object_type: 'users',
                sharing_object_name: 'Just Me (Private)'
              }
            ]
          }
        };
      } else {
        tag_list = [this.state.boardType];
      }
      const boardType = getBoardType(this.state.boardType);
      const tool = cardLenses[boardType.defaultTool];

      const newTopic = {
        attributes: {
          title: title,
          parent_id: parentTopicId,
          tag_list,
          default_view_id: tool?.key
        },
        relationships: {
          ...relationships,
          assignments: {
            ...newTopicRelationships?.assignments
          }
        }
      };
      const serverTopic = await createTopic(newTopic);
      tool &&
        (await initBoard(serverTopic.data.data, tool, this.state.boardType));
      afterCreate && afterCreate(serverTopic.data.data);
      !noRedirect &&
        routerHistory.push(
          `${baseUrl}boards/${serverTopic.data.data.attributes.slug}`
        );
      noRedirect &&
        this.setState({
          isSavingTopic: false,
          title: ''
        });
    } else {
      this.setState(state => ({ ...state, submitted: true }));
    }

    onDismiss();
  };

  render() {
    const {
      state: { submitted, isSavingTopic, boardType },
      props: { card_font_color, extraStyle }
    } = this;

    return (
      <div
        className={classNames({
          'left-menu-add-topic-form': true,
          disabled: isSavingTopic
        })}
        style={extraStyle}
      >
        <form
          className="form-inline"
          method="post"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <BoardAndCardTypeListDropdown
              listType="board"
              setItemType={boardType => this.setState({ boardType })}
              itemType={boardType}
              smallModal={this.props.boardTypeSmallModal}
            />
            <input
              type="text"
              name="topic[title]"
              className="form-control form-control-minimal left-menu-add-topic-form_input"
              style={{
                color: this.props.noDesign
                  ? 'inherit'
                  : `${card_font_color || 'inherit'}`
              }}
              placeholder="Type Board name"
              id="topic_title"
              autoFocus
              onFocus={({ target }) => {
                target.selectionStart = target.selectionEnd =
                  target.value.length;
                target.setSelectionRange(
                  target.value.length,
                  target.value.length
                );
                target.scrollLeft = target.scrollWidth;
              }}
              onBlur={() =>
                this.setState(state => ({ ...state, submitted: false }))
              }
              required={submitted}
              onChange={({ target: { value } }) =>
                this.setState(state => ({ ...state, title: value }))
              }
            />
            <button
              style={{ color: '#A0A0A0', backgroundColor: 'transparent' }}
              type="submit"
              className="btn btn-default"
              data-disable-with={isSavingTopic ? null : '...'}
            >
              <Icon fontAwesome icon={isSavingTopic ? 'ellipsis-h' : 'check'} />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const currentGroup = sm.groups[sm.page.groupId];
  const { card_font_color } = sm.utilities.active_design;

  return {
    parentTopicId:
      props.parentTopicId || sm.page.parentTopicId || sm.page.topicId,
    rootUrl: sm.page.rootUrl,
    routerHistory: sm.routing.routerHistory,
    currentGroup,
    card_font_color,
    viewKey: getRelevantViewForPage(state)
  };
};

const mapDispatch = {
  createTopic
};

export default connect(mapState, mapDispatch)(LeftMenuNewTopicInput);
