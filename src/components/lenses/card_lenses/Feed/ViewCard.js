import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import Ability from 'lib/ability';
import tiphive from 'lib/tiphive';
import { SCREEN } from 'Enums';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import UserAvatar from 'Src/components/shared/users/elements/UserAvatar.js';
import LikeButton from 'Src/components/shared/cards/elements/LikeButton.js';
import StarButton from 'Src/components/shared/cards/elements/StarButton.js';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardLabels from 'Components/shared/cards/elements/assemblies/CardLabels';
import GridBody from '../Grid/GridBody';
import CommentsList from 'Src/components/shared/comments/CommentsList';
import StringHelper from 'Src/helpers/string_helper';
import { createCommentForCard } from 'Src/newRedux/database/comments/thunks';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import TextEditor from 'Components/shared/text_editor';
import IconButton from 'Components/shared/buttons/IconButton';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ActivityIndicator from 'Components/shared/cards/elements/assemblies/ActivityIndicator';

class ViewCard extends Component {
  constructor(props) {
    super(props);
    this.commentInput = React.createRef();
    this.state = {
      commentBody: '',
      isCommenting: false
    };
  }

  static propTypes = {
    card: PropTypes.object,
    comments: PropTypes.array,
    parentTopic: PropTypes.object
  };

  handleKeyPress = async e => {
    const { card, createCommentForCard } = this.props;
    // if (e.key === 'Enter') {
    e.preventDefault();
    this.setState({ isCommenting: true });
    const newComment = {
      type: 'comments',
      attributes: {
        body: this.state.commentBody
      }
    };
    await createCommentForCard({ newComment, cardId: card.id });
    this.setState({ isCommenting: false, commentBody: '' });
    // }
  };

  render() {
    const {
      card,
      parentTopic,
      switchScreen,
      createCommentForCard,
      users,
      setEditCardModalOpen,
      active_design
    } = this.props;
    const { commentBody, isCommenting } = this.state;
    const canLike = Ability.can('like', 'self', card);
    const { card_font_color } = active_design || {};

    // const userMapper = ({ id, attributes: { name, username } }) => ({
    //   key: username.replace(/\d+$/, ''),
    //   value: username.replace(/\d+$/, ''),
    //   id
    // });

    // let usersToDisplay = users.map(userMapper);

    return (
      <div id={`card-${card.id}`} className="card-wrapper">
        <div className="card-header">
          <UserAvatar user={card.attributes.creator} showTooltip />
          <div className="card-title-bold">
            {(card.attributes.creator || {}).name}
          </div>
          <span className="card-date">
            {parentTopic ? `in ${parentTopic.attributes.title}, ` : null}
            {moment(card.attributes.created_at).format('MMM DD, YY')}
          </span>
          {!!switchScreen && !tiphive.userIsGuest() && (
            <a
              className="btn-label light-gray mr8"
              onClick={() => {
                switchScreen(SCREEN.LABEL_LISTING);
              }}
            >
              <i className="fa fa-tag fa-lg" />
            </a>
          )}
          <ActivityIndicator updatedAt={get(card, 'attributes.updated_at')} />
          <IconButton
            icon="tag"
            fontAwesome
            onClick={() =>
              setEditCardModalOpen({ cardId: card.id, tab: 'Label' })
            }
            color={'#d9d9d9'}
          />
          {canLike && <LikeButton card={card} />}
          <StarButton card={card} />
          <CardActionsDropdown card={card} />
        </div>
        <div className="card-subheader">
          <span className="card-title-bold">{card.attributes.title}</span>
        </div>
        <div className="card-body">
          <Link
            className="grid-card_body-link"
            to={`/cards/${card.attributes.slug}`}
          >
            <GridBody item={card} />
          </Link>
        </div>
        <CardLabels card={card} expandDirection="right" />
        <CommentsList
          cardId={card.id}
          wrapperClass="card-comments"
          customCommentBox={
            <form
              onSubmit={this.handleKeyPress}
              style={{ position: 'relative' }}
            >
              <TextEditor
                type="comment"
                tabIndex={1}
                placeholder="Add comment"
                body={commentBody}
                onChange={e => this.setState({ commentBody: e })}
                toolbarInline={true}
                extraStyle={{ paddingRight: '90px' }}
                required
              />
              <input
                type="submit"
                value={isCommenting ? 'Sending...' : 'Comment'}
                className="btn btn-default commentButton"
              />
            </form>
          }
        >
          {comments =>
            comments.map(comment => (
              <div key={comment.id} className="comment-wrapper">
                <span>
                  {get(comment, 'attributes.user.name') ||
                    users[comment.attributes.user_id].attributes.name}
                </span>
                <strong>commented</strong>
                <span>{moment(comment.attributes.created_at).fromNow()}:</span>
                <span
                  className="comment-body"
                  dangerouslySetInnerHTML={{
                    __html: StringHelper.simpleFormat(comment.attributes.body)
                  }}
                />
              </div>
            ))
          }
        </CommentsList>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    people,
    utilities: { active_design }
  } = stateMappings(state);
  const users = people;

  return {
    active_design,
    users,
    user: state._newReduxTree.database.user
  };
};

const mapDispatch = {
  createCommentForCard,
  setEditCardModalOpen
};

export default connect(mapState, mapDispatch)(ViewCard);
// export default ViewCard;
