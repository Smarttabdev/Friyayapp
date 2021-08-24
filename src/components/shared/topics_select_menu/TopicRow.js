import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
// import IconHex from '../../svg_icons/icon_hex';
import Icon from 'Components/shared/Icon';
import Tooltip from 'Components/shared/Tooltip';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';

const TopicRow = props => {
  const {
    topic,
    handleTopicSelect,
    handleTopicClick,
    selected,
    disabled,
    hasMoveToTopButton,
    updateTopic
  } = props;

  const topicRowClass = classNames('list-group-item', { selected, disabled });
  const uid = `topic-select-${topic.id}`;

  const handleMoveToTop = () => {
    updateTopic({
      id: topic.id,
      attributes: { parent_id: null }
    });
  };

  return (
    <li className={topicRowClass} key={uid} id={uid} defaultValue={selected}>
      <div
        className="icon-hex-container"
        onClick={e => handleTopicSelect(topic, e)}
      >
        {/* <IconHex
          width="25"
          height="25"
          scaleViewBox={false}
          fill={selected ? '#f2ab13' : '#eee'}
          strokeWidth="0"
        /> */}
        <Icon
          color={selected ? '#f2ab13' : '#9B51E0'}
          icon="hashtag"
          containerClasses="mr5"
        />
      </div>

      <a
        href="javascript:void(0)"
        className="link-menu-topic mr-auto"
        onClick={e => handleTopicSelect(topic, e)}
      >
        {topic.title || topic.attributes.title}
      </a>

      {hasMoveToTopButton && (
        <div
          className="mr4 pointer move-to-top-btn"
          data-tip="Move to top"
          data-for={`topic-${topic.id}-move-to-top-tt`}
          onClick={handleMoveToTop}
        >
          <a className="material-icons-outlined color-gray-75">publish</a>
          <Tooltip id={`topic-${topic.id}-move-to-top-tt`} />
        </div>
      )}

      <div className="link-menu-subtopics">
        <a
          href="javascript:void(0)"
          className="link-menu-subtopics-right"
          onClick={e => handleTopicClick(topic, e)}
        >
          <i className="fa fa-arrow-right" />
        </a>

        <a
          className="boards_desc"
          href="javascript:void(0)"
          onClick={e => handleTopicClick(topic, e)}
        >
          Boards
        </a>
      </div>

      <div className="clearfix" />
    </li>
  );
};

TopicRow.propTypes = {
  topic: PropTypes.object.isRequired,
  handleTopicSelect: PropTypes.func.isRequired,
  handleTopicClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
};

TopicRow.defaultProps = {
  selected: false,
  disabled: false
};

const mapDispatch = {
  updateTopic
};

export default connect(null, mapDispatch)(TopicRow);
