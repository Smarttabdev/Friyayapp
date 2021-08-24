import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import PropTypes from 'prop-types';
import TextEditor from 'Components/shared/text_editor';
import {
  createCommentForCard,
  updateComment
} from 'Src/newRedux/database/comments/thunks';

class CommentBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      commentBody: props.comment ? props.comment.attributes.body : null,
      savingComment: false
    };
  }

  handleCommentChange = commentBody => {
    this.setState({ commentBody });
  };

  handleSubmitComment = async e => {
    e && e.preventDefault();
    const {
      cardId,
      comment,
      createCommentForCard,
      onCloseCommentBox,
      updateComment,
      user
    } = this.props;

    const body = this.state.commentBody;

    this.setState({ savingComment: true });

    if (comment) {
      const commentUpdate = {
        id: comment.id,
        attributes: { body }
      };
      if (!cardId) {
        this.props.updatePendingComment(comment.id, body);
      } else await updateComment(commentUpdate);
      this.setState({ savingComment: false, commentBody: '' });
      onCloseCommentBox();
    } else {
      const newComment = {
        type: 'comments',
        attributes: { body }
      };
      if (!cardId) {
        this.props.handleAddPendingComment({
          id: this.props.pendingCommentsLength + 1,
          type: 'comment',
          attributes: {
            body,
            user: {
              avatar_url: user?.user_profile?.avatar.url,
              id: Number(user?.id),
              name: user?.name,
              type: 'users'
            }
          }
        });
      } else await createCommentForCard({ newComment, cardId });
      this.setState({ savingComment: false, commentBody: '' });
    }
  };

  render() {
    const {
      comment,
      onCloseCommentBox,
      inEditMode,
      toolbarInline,
      toolbarVisibleWithoutSelection,
      cardId
    } = this.props;
    const { commentBody, savingComment } = this.state;

    return (
      <div className="comment-box">
        <form id="comment-form" onSubmit={this.handleSubmitComment}>
          <TextEditor
            type="comment"
            tabIndex={1}
            placeholder="Type comment"
            body={commentBody}
            onChange={this.handleCommentChange}
            froalaEditorEvents={
              inEditMode
                ? {}
                : {
                    'froalaEditor.initialized': (e, editor) =>
                      editor.toolbar.hide(),
                    'froalaEditor.focus': (e, editor) => editor.toolbar.show()
                  }
            }
            required
            toolbarInline={toolbarInline}
            toolbarVisibleWithoutSelection={toolbarVisibleWithoutSelection}
          />

          <div className="comment-box_buttons-container">
            {comment && (
              <a
                className="btn btn-default"
                onClick={() => onCloseCommentBox()}
              >
                Close
              </a>
            )}
            {!cardId ? (
              <input
                type="button"
                onClick={this.handleSubmitComment}
                value={
                  savingComment ? 'Sending...' : comment ? 'Update' : 'Comment'
                }
                className="btn btn-default"
                style={{ borderRadius: toolbarInline ? '8px' : null }}
              />
            ) : (
              <input
                type="submit"
                value={
                  savingComment ? 'Sending...' : comment ? 'Update' : 'Comment'
                }
                className="btn btn-default"
                style={{ borderRadius: toolbarInline ? '8px' : null }}
              />
            )}
          </div>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  const { user } = stateMappings(state);
  return { user };
};

const mapDispatch = {
  createCommentForCard,
  updateComment
};

export default connect(mapState, mapDispatch)(CommentBox);
