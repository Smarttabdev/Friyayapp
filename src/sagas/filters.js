import memoize from 'async/memoize';
import { take } from 'redux-saga/effects';
import topicActions from 'Src/newRedux/database/topics/actionEnum';
import store from 'Src/store/store';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getToolDefaultFilters } from 'Lib/utilities';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import cardLenses from 'Lib/config/lenses/cards';

const fetchActiveFiltersOrder = async args => {
  const doFetch = (
    { topicId, lenseId, lenseKey, name, defaultFilters },
    cb
  ) => {
    fetchQuery(
      graphql`
        query filtersActiveFiltersOrderQuery(
          $topicId: ID
          $lenseId: ID
          $lenseKey: String
          $name: String
          $defaultFilters: JSON
        ) {
          activeFiltersOrder: activeCustomOrder(
            orderType: filters
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
            create: true
            name: $name
            defaultFilters: $defaultFilters
            key: "team_default"
          ) {
            id
            name
            order
          }
        }
      `,
      { topicId, lenseId, lenseKey, name, defaultFilters }
    )
      .then(result => cb(null, result))
      .catch(cb);
  };

  const result = await new Promise((resolve, reject) => {
    memoize(doFetch)(args, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });

  return result?.activeFiltersOrder;
};

const getFiltersFromAction = (action, topicId) => {
  let filterSettings;

  if (action.type === topicActions.updateFilterSettings) {
    filterSettings = action.payload?.filter_setting;
  } else if (action.type === topicActions.change) {
    const topic = action.payload[topicId];
    if (!topic) return;
    filterSettings =
      topic.attributes.user_configuration.data.attributes.filter_setting;
  }

  if (!filterSettings) return;

  delete filterSettings.id;
  delete filterSettings.filter_settable_type;
  delete filterSettings.filter_settable_id;

  return filterSettings;
};

function* updateFiltersOrder(action) {
  const state = store.getState();
  const sm = stateMappings(state);
  const topicId = toGid('Topic', sm.page.topicId || 0);
  const lenseId = toGid('Lens', getCustomLensId(state));
  const lenseKey = getRelevantViewForPage(state);

  const defaultFilters = getToolDefaultFilters(lenseKey);

  const activeFiltersOrder = yield fetchActiveFiltersOrder({
    topicId,
    lenseId,
    lenseKey,
    defaultFilters,
    name: `Team Default - ${cardLenses[lenseKey]?.name}`
  });

  const actionFilters = getFiltersFromAction(action, topicId);

  const prevFilters = JSON.parse(activeFiltersOrder.order[0]);

  const updatedFilters = JSON.stringify({
    ...prevFilters,
    ...actionFilters
  });

  if (updatedFilters === activeFiltersOrder.order[0]) {
    return;
  }

  yield mutations.confirmUpdateCustomOrder({
    customOrder: activeFiltersOrder,
    orderTitle: 'Filters',
    orderType: 'filters',
    topicId,
    lenseId,
    lenseKey,
    order: [updatedFilters]
  });
}

export default function*() {
  while (true) {
    const action = yield take([
      topicActions.change,
      topicActions.updateFilterSettings
    ]);
    yield updateFiltersOrder(action);
  }
}
