import moment from 'moment';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import StringHelper from 'Src/helpers/string_helper';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { removeComment } from 'Src/newRedux/database/comments/thunks';
import UserAvatar from 'Src/components/shared/users/elements/UserAvatar';
import IconButton from 'Components/shared/buttons/IconButton';
import CommentBox from './CommentBox';

class CommentItem extends PureComponent {
  static propTypes = {
    isCommentBelongsToCurrentUser: PropTypes.bool
  };

  handleDeleteCommentClick = () => {
    vex.dialog.confirm({
      message: 'Are you sure you want to delete this comment?',
      callback: value => {
        value && this.props.removeComment(this.props.comment.id);
      }
    });
  };

  render() {
    const {
      cardId,
      comment,
      inEditMode,
      dateFormatter,
      onToggleEditMode,
      isCommentBelongsToCurrentUser,
      card_font_color,
      user,
      isPendingComment,
      updatePendingComment
    } = this.props;

    return (
      <div
        className={cx('comment-item', {
          'comment-item--in-edit-mode': inEditMode
        })}
      >
        <div className="comment-item_avatar-container">
          <UserAvatar userId={user?.id} />
        </div>
        <div className="comment-item_comment-container">
          {inEditMode ? (
            <CommentBox
              cardId={cardId}
              comment={comment}
              onCloseCommentBox={onToggleEditMode}
              inEditMode={inEditMode}
              updatePendingComment={updatePendingComment}
            />
          ) : (
            <Fragment>
              <div
                className="comment-item_commenter-container"
                style={{ color: card_font_color ? card_font_color : '' }}
              >
                <span className="comment-item_commenter">
                  {user.attributes.name}
                  {!isPendingComment && (
                    <span
                      className="comment-item_date"
                      style={{ color: card_font_color ? card_font_color : '' }}
                    >
                      {dateFormatter
                        ? dateFormatter(comment)
                        : moment(comment.attributes.created_at).format(
                            'MMMM D, h:mm a'
                          )}
                    </span>
                  )}
                </span>
                {isCommentBelongsToCurrentUser && (
                  <span className="comment-item_buttons">
                    <IconButton
                      fontAwesome
                      icon="edit"
                      onClick={() => onToggleEditMode(comment.id)}
                    />
                    <IconButton
                      fontAwesome
                      icon="trash"
                      onClick={this.handleDeleteCommentClick}
                    />
                  </span>
                )}
              </div>
              <div
                className="comment-item_comment fr-view"
                dangerouslySetInnerHTML={{
                  __html: StringHelper.simpleFormat(comment.attributes.body)
                }}
                style={{ color: card_font_color ? card_font_color : '' }}
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const { people } = stateMappings(state);
  const commentAttributes = props.comment.attributes;

  return {
    user:
      people[
        commentAttributes.user_id
          ? commentAttributes.user_id
          : commentAttributes.user.id
      ]
  };
};

const mapDispatch = {
  removeComment
};

export default connect(mapState, mapDispatch)(CommentItem);
