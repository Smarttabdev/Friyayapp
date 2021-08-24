import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import DMLoader from 'Src/dataManager/components/DMLoader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import SheetLens from 'Src/components/lenses/card_lenses/Sheet/SheetLens';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';

const BoardBlock = ({
  id,
  config,
  topicId,
  topic,
  subTopic,
  viewTopic,
  ...restProps
}) => {
  const handleSelectTopic = topics => {
    mutations.updateBlock({
      id,
      config: {
        ...config,
        topic_id: topics[0].value
      }
    });
  };

  const handleCloseTopic = () => {
    mutations.updateBlock({
      id,
      config: {
        ...config,
        topic_id: null
      }
    });
  };

  const handleTopicClick = () => {
    viewTopic({ topicSlug: subTopic.attributes.slug });
  };

  return (
    <Fragment>
      {!config.topic_id && (
        <Fragment>
          <div className="mb15">Select board:</div>
          <div className="flex-1 flex flex-c" style={{ minHeight: 0 }}>
            <TopicsListDropdown
              actionButtonLabel="Select Board"
              actionButtonHandler={() => false}
              actionButtonClass="btn-primary"
              path={topic ? topic.attributes.path.concat({ id: 0 }) : null}
              startAt={topic ? 0 : null}
              hideHeader
              inputMode="list"
              hideAddTopicLink
              skipConfirmation
              onInputBlur={() => {}}
              onInputFocus={() => {}}
              onSelectTopic={handleSelectTopic}
              selectedTopics={[]}
              extraStyle={{
                maxHeight: 'unset',
                display: 'block',
                position: 'static'
              }}
              showAddBoard
            />
          </div>
        </Fragment>
      )}
      {subTopic && (
        <Fragment>
          <div className="bold pointer" onClick={handleTopicClick}>
            {subTopic.attributes.title}
          </div>
          <SheetLens
            forceColor={false}
            topicId={subTopic.id}
            additionalClasses="ActionPlan-board"
            cardRequirements={{ topicId: subTopic.id }}
          />
        </Fragment>
      )}
      {config.topic_id && (
        <DMLoader
          dataRequirements={{
            topic: {
              topicId: config.topic_id
            }
          }}
          loaderKey="topic"
        />
      )}
    </Fragment>
  );
};

const mapState = (state, props) => {
  const { topics } = stateMappings(state);
  return {
    subTopic: props.config.topic_id && topics[props.config.topic_id]
  };
};

const mapDispatch = {
  viewTopic
};

export default {
  label: 'Board',
  iconProps: {
    icon: 'hashtag',
    color: '#9B51E0',
    fontAwesomeIcon: true,
    style: { fontSize: 20 }
  },
  renderDropdown: ({ id, type, config }) => {
    const handleSelectBoard = () => {
      mutations.updateBlock({
        id,
        config: {
          ...config,
          topic_id: null
        }
      });
    };
    return (
      <li onClick={handleSelectBoard}>
        <a>Select board</a>
      </li>
    );
  },
  Component: connect(mapState, mapDispatch)(BoardBlock)
};
