import { createSelector } from 'reselect';
import { stateMappings } from 'Src/newRedux/stateMappings';
import get from 'lodash/get';

export const oldViewEnumInOrderOfIndex = [
  'MENU',
  'GRID',
  'SMALL_GRID',
  'LIST',
  'SHEET',
  'TASK',
  'WIKI',
  'KANBAN',
  'CARD',
  'TODO',
  'DOCUMENTS'
];

export const getRelevantViewForPage = createSelector(
  state => stateMappings(state).page,
  state => stateMappings(state).page.domainId,
  state => stateMappings(state).domains,
  (state, topicId) => topicId || stateMappings(state).page.topicId,
  state => stateMappings(state).topics,
  state => stateMappings(state).user.attributes.ui_settings,
  (page, domainId, domains, topicId, topics, userUiSettings) => {
    try {
      let currentLens;
      let relevantViewKey;
      switch (page.page) {
        case 'topics':
          relevantViewKey =
            userUiSettings.all_topics_view &&
            userUiSettings.all_topics_view.length > 0
              ? userUiSettings.all_topics_view
              : 'HEX';
          break;
        case 'user':
        case 'home':
        case 'topic':
          currentLens = get(
            topics[topicId],
            'attributes.user_configuration.data.attributes.ui_settings.current_active_template'
          );
          relevantViewKey = currentLens
            ? currentLens
            : get(topics, `${topicId}.attributes.default_view_id`);
          break;
        default:
          relevantViewKey =
            get(domains, `${domainId}.attributes.default_view_id`) || 'GRID';
      }

      return isNaN(relevantViewKey)
        ? relevantViewKey
        : oldViewEnumInOrderOfIndex[relevantViewKey];
    } catch (error) {
      console.log(error);
    }
  }
);
