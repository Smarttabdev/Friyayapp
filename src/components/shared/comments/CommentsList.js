import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import classNames from 'classnames';
import { getCommentsByCardId } from 'Src/newRedux/database/comments/selectors';
import CommentItem from './CommentItem';
import CommentBox from './CommentBox';
import { useCommentSubscriptions } from 'Src/graphql/hooks';

class CommentsList extends Component {
  state = {
    editCommentId: null,
    hideComments: this.props.hideComments
  };

  handleToggleCommentEditMode = commentId => {
    this.setState({ editCommentId: commentId ? commentId : null });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.hideComments !== this.props.hideComments) {
      this.setState({ hideComments: this.props.hideComments });
    }
  };

  render() {
    const {
      cardId,
      comments,
      children,
      currentUser,
      wrapperClass,
      dateFormatter,
      customCommentBox,
      card_font_color,
      toolbarInline,
      toolbarVisibleWithoutSelection,
      cacheKey,
      card,
      pendingComments
    } = this.props;

    const { editCommentId } = this.state;

    const commentsToDisplay = cardId ? comments : pendingComments;

    return (
      <div className={classNames('comments-list', wrapperClass)}>
        {!this.state.hideComments && (
          <Fragment>
            {children
              ? children(commentsToDisplay)
              : commentsToDisplay.map(comment => (
                  <CommentItem
                    cardId={cardId}
                    comment={comment}
                    inEditMode={editCommentId == comment.id}
                    key={comment.id}
                    dateFormatter={dateFormatter}
                    isCommentBelongsToCurrentUser={
                      currentUser.id ==
                      (comment.attributes.user_id || comment.attributes.user.id)
                    }
                    onToggleEditMode={this.handleToggleCommentEditMode}
                    card_font_color={card_font_color}
                    isPendingComment={!cardId}
                    updatePendingComment={this.props.updatePendingComment}
                  />
                ))}

            {customCommentBox
              ? customCommentBox
              : !editCommentId && (
                  <CommentBox
                    cardId={cardId}
                    toolbarInline={toolbarInline}
                    toolbarVisibleWithoutSelection={
                      toolbarVisibleWithoutSelection
                    }
                    handleAddPendingComment={this.props.handleAddPendingComment}
                    pendingCommentsLength={pendingComments?.length ?? 0}
                  />
                )}
          </Fragment>
        )}
      </div>
    );
  }
}

const hoc = Component => props => {
  useCommentSubscriptions(toGid('Tip', props.card?.id));
  return <Component {...props} />;
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const card = sm.cards[props.cardId];
  return {
    card: card,
    comments: getCommentsByCardId(state)[props.cardId] || [],
    currentUser: sm.user
  };
};

export default connect(mapState)(hoc(CommentsList));
