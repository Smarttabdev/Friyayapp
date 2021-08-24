import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Icon from 'Components/shared/Icon';
import { getFilterSettings } from 'Src/helpers/user_config';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import TopicItemTips from './TopicItemTips';
import { attachmentsUpdater } from '../FileBlock/utils';

const TopicItem = ({ topic, filterSettings, viewTopic }) => {
  const topicId = topic?.id;

  useEffect(() => {
    const disposers = [];
    disposers.push(
      requestSubscription({
        subscription: graphql`
          subscription TopicItemAttachmentCreatedSubscription($topicId: ID!) {
            attachmentCreated(topicId: $topicId) {
              attachment {
                id
                url
                tip {
                  id
                  title
                  slug
                }
              }
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        updater: store => {
          attachmentsUpdater({
            topicId,
            filterSettings,
            connectionField: '__TopicItemTips_tips_connection',
            connectionVars: {
              topicId: toGid('Topic', topicId),
              haveFiles: true,
              subtopics: filterSettings?.include_subtopic_cards,
              root: !filterSettings?.include_nested_cards
            },
            store
          });
        }
      })
    );
    return () => disposers.forEach(d => d.dispose());
  }, [topicId]);

  const handleTopicClick = () => {
    viewTopic({ topicSlug: topic.slug });
  };

  return (
    <Fragment>
      <div
        className="flex flex-r-center mb10 pointer"
        onClick={handleTopicClick}
      >
        <Icon icon="hashtag" color="#9B51E0" containerClasses="mr10" />
        {topic.title}
      </div>
      {queryRenderer({
        query: graphql`
          query TopicItemQuery(
            $topicId: ID
            $subtopics: Boolean
            $root: Boolean
          ) {
            ...TopicItemTips_tipsQuery
              @arguments(topicId: $topicId, subtopics: $subtopics, root: $root)
          }
        `,
        vars: {
          topicId: topic.id,
          subtopics: filterSettings.include_subtopic_cards,
          root: !filterSettings.include_nested_cards
        },
        render: ({ props }) => (
          <div className="ml22">
            <TopicItemTips
              topicId={topic.id}
              tipsQuery={props}
              filterSettings={filterSettings}
            />
          </div>
        )
      })}
    </Fragment>
  );
};

const mapState = state => {
  return {
    filterSettings: getFilterSettings(state)
  };
};

const mapDispatch = {
  viewTopic
};

export default connect(mapState, mapDispatch)(TopicItem);
