import { stateMappings } from 'Src/newRedux/stateMappings';
import { batchActions } from 'redux-batch-enhancer';
import * as topicActions from 'Src/newRedux/database/topics/actions';
import { normalizeTopic } from 'Src/newRedux/database/topics/schema';
import { mergeUserAttributes } from 'Src/newRedux/database/user/actions';
import { getGroups } from 'Src/newRedux/database/groups/thunks';

export default (message, dispatch, getState) => ({
  topic_created: () => {
    const { data: newTopic } = message.data;

    const userFollowedTopics = [
      ...stateMappings(getState()).user.relationships.following_topics.data,
      newTopic.id
    ];
    //Add topic to redux, and add it to topics user follows (in redux only, as server does this for us, we just don't update the user_follows at this moment)
    dispatch(
      batchActions([
        topicActions.addTopics(
          normalizeTopic({
            data: {
              data: newTopic
            }
          }).topics
        ),
        mergeUserAttributes({
          relationships: { following_topics: { data: userFollowedTopics } }
        })
      ])
    );
  },
  topic_updated: () => {
    const { data: updatedTopic } = message.data;

    const topics = normalizeTopic({ data: { data: updatedTopic } }).topics;

    dispatch(
      batchActions([
        topicActions.changeTopic(topics[updatedTopic.id]),
        // Should group followers change
        getGroups()
      ])
    );
  },
  topic_deleted: () => {
    const { topic_id: topicId } = message.data;

    const sm = stateMappings(getState());
    const thisTopic = sm.topics[topicId];

    if (!thisTopic) return;

    dispatch(topicActions.deleteTopic(topicId));

    const history = sm.routing.routerHistory;
    const rootUrl = sm.page.rootUrl;
    const baseUrl = rootUrl == '/' ? rootUrl : rootUrl + '/';
    const topicPath = thisTopic.attributes.path;
    const prevTopic = topicPath[topicPath.length - 2];
    const slug = prevTopic ? prevTopic.slug : '';

    const currentPath = sm.routing.routerHistory.location.pathname;
    currentPath === '/'
      ? history.push(`${baseUrl}`)
      : history.push(`${baseUrl}boards/${slug}`);
  },
  active_fields_updated: () => {
    const { topic_id: topicId, active_fields: activeFields } = message.data;
    const { topics } = stateMappings(getState());
    const topic = topics[topicId];
    const updatedTopic = {
      ...topic,
      attributes: {
        ...topic.attributes,
        active_fields: activeFields
      }
    };
    dispatch(topicActions.changeTopic(updatedTopic));
  }
});
