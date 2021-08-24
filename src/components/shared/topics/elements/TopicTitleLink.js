import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { bool, func, object, string } from 'prop-types';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import get from 'lodash/get';
import ActivityIndicator from 'Components/shared/cards/elements/assemblies/ActivityIndicator';
import lineClamp from 'Src/helpers/lineClamp';

const TopicTitleLink = ({
  additionalClasses = '',
  maxLines = 1,
  onClick,
  onDoubleClick,
  size = '',
  topic,
  viewTopic,
  cardTitleClass = true,
  color,
  hideActivityIndicator,
  truncate
}) => {
  const handleViewTopic = () => {
    onClick ? onClick() : viewTopic({ topicSlug: topic.attributes.slug });
  };

  const title = useRef();

  const truncateStyle = truncate && { display: 'flex' };

  // useEffect(() => {
  //   lineClamp(title.current, { lineCount: maxLines });
  // }, [title]);

  return (
    <a
      className={`${Boolean(topic.attributes?.ancestry) &&
        'list-nested-title-link'} ${
        cardTitleClass ? 'card-title' : ''
      } ${size} ${additionalClasses}`}
      onClick={handleViewTopic}
      onDoubleClick={onDoubleClick}
      style={{ color, ...truncateStyle }}
    >
      <span
        className={`line-clamp ${truncate && 'ellipsize-text'}`}
        ref={title}
      >
        {topic.attributes.title}
        {!hideActivityIndicator && (
          <ActivityIndicator updatedAt={get(topic, 'attributes.updated_at')} />
        )}
      </span>
    </a>
  );
};

TopicTitleLink.propTypes = {
  size: string,
  topic: object.isRequired,
  viewTopic: func,
  hideActivityIndicator: bool,
  truncate: bool
};

const mapDispatch = {
  viewTopic
};

export default connect(undefined, mapDispatch)(TopicTitleLink);
