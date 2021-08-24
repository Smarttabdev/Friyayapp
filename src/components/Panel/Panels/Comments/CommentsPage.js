import React, { Fragment, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCommentsByTopicId } from 'Src/newRedux/database/comments/selectors';
import { createCommentForTopic } from 'Src/newRedux/database/comments/thunks';
import BackButton from '../../BackButton';
import TextEditor from 'Components/shared/text_editor';
import { useCommentSubscriptions } from 'Src/graphql/hooks';

import '../../styles.module.scss';
import StringHelper from 'Src/helpers/string_helper';

const CommentsPage = ({ topic, comments, onBack, createCommentForTopic }) => {
  const sortedComments = useMemo(() => {
    return comments.sort(
      (a, b) =>
        moment(get(b, 'attributes.created_at')).valueOf() -
        moment(get(a, 'attributes.created_at')).valueOf()
    );
  }, [comments]);

  const handleCommentSubmit = function(e) {
    // newline on Shift+Enter or Ctrl+Enter
    if (e.which == 13) {
      if (e.shiftKey || e.ctrlKey) {
        this.cursor.enter();
      } else {
        const msg = this.html.get();
        this.html.set('');
        const newComment = {
          attributes: { body: msg }
        };
        createCommentForTopic({ newComment, topicId: get(topic, 'id') });
      }
    }
  };

  return (
    <Fragment>
      <div styleName="topbar">
        <BackButton onClick={onBack} />
        <div styleName="title">
          Comments in {get(topic, 'attributes.title')}
        </div>
      </div>
      <div styleName="panel-main comment-list">
        {sortedComments.map((comment, i) => (
          <div key={i} styleName="list-item comment-item">
            <img
              styleName="avatar"
              src={get(comment, 'attributes.user.avatar_url')}
            />
            <div styleName="main">
              <div styleName="author">
                {get(comment, 'attributes.user.name')}
              </div>
              <div
                className="comment-item_comment fr-view"
                dangerouslySetInnerHTML={{
                  __html: StringHelper.simpleFormat(comment.attributes.body)
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div styleName="input">
        <TextEditor
          type="comment"
          tabIndex={1}
          placeholder="Type message"
          required
          toolbarInline
          froalaEditorEvents={{
            keyup: handleCommentSubmit
          }}
          extraStyle={{ background: '#fff', borderRadius: '6px' }}
          settings={{
            heightMin: 40,
            heightMax: 65,
            zIndex: 1000,
            multiLine: false
          }}
        />
      </div>
    </Fragment>
  );
};

const hoc = Component => props => {
  useCommentSubscriptions(toGid('Topic', props.topic?.id));
  return <Component {...props} />;
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const { topics } = sm;
  const topicId = props.topicId || sm.page.topicId;
  const topic = topics[topicId];
  return {
    topicId,
    topic,
    comments: getCommentsByTopicId(state)[topicId] || []
  };
};

const mapDispatch = {
  createCommentForTopic
};

export default connect(mapState, mapDispatch)(hoc(CommentsPage));
