import { updateStore } from 'Lib/relay';
import {
  createEdge,
  deleteEdge,
  getBoardType,
  toGid,
  toId,
  compactFilters
} from 'Lib/utilities';
import reduxStore from 'Src/store/store';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getFilterSettings } from 'Src/helpers/user_config';
import { getSort } from 'Components/lenses/card_lenses/Starter/utils';

const getStarterLensConnectionVars = () => {
  const state = reduxStore.getState();
  const {
    tools,
    page: { topicId }
  } = stateMappings(state);

  const sort = getSort(tools.starterLens.sort);

  const itemTypes = tools.starterLens.activeFilters.filter(x => x != 'ALL');

  const filters = {
    ...compactFilters(getFilterSettings(state)),
    query: tools.starterLens.searchQuery
  };

  const connectionVars = {
    itemTypes,
    sort,
    filters,
    topicId: toGid('Topic', topicId)
  };

  return connectionVars;
};

// export function addTopicItem({ topic, componentName, vars }) {
export function addTopicItem(topic, componentName, vars) {
  const connectionVars = vars ?? getStarterLensConnectionVars();

  updateStore(store => {
    const id = toGid('Item:Topic', toId(topic.id));
    let record;
    try {
      record = store.create(id, 'Item');
    } catch (err) {
      return;
    }
    const boardType = getBoardType(topic)?.toUpperCase();
    const itemType = boardType ? `${boardType}_BOARD` : 'BOARD';
    if (
      connectionVars.itemTypes.length &&
      !connectionVars.itemTypes.includes(itemType)
    )
      return;
    record.setValue(id, 'id');
    record.setValue(toGid('Topic', topic.id), 'itemId');
    record.setValue(itemType, 'itemType');
    record.setValue('Topic', 'baseType');
    record.setValue(topic.attributes.title, 'title');
    record.setValue(topic.attributes.slug, 'slug');
    record.setValue(topic.attributes.created_at, 'createdAt');
    record.setValue(topic.attributes.updated_at, 'updatedAt');
    createEdge({
      store,
      record,
      connectionField: `__${componentName}_items_connection`,
      connectionVars,
      edgeType: 'ItemEdge',
      prepend: true
    });
  });
}

export function deleteTopicItem(topicId) {
  updateStore(store => {
    const id = toGid('Item:Topic', topicId);
    deleteEdge({
      id,
      connectionField: '__StarterLens_items_connection',
      connectionVars: getStarterLensConnectionVars(),
      store
    });
    store.delete(id);
  });
}

export function addTipItem(tip, componentName, vars) {
  componentName = componentName || 'StarterLens';

  const connectionVars = vars ?? getStarterLensConnectionVars();
  console.log('Adding tip item', { tip, componentName, connectionVars });

  console.log('Got here 1');

  updateStore(store => {
    const id = toGid('Item:Tip', toId(tip.id));
    let record;
    try {
      record = store.create(id, 'Item');
    } catch (err) {
      console.log(err);
      return;
    }

    console.log('Got here 2');
    const cardType = tip.attributes.card_type;
    const itemType = cardType === 'CARD' ? 'CARD' : `${cardType}_CARD`;
    if (
      connectionVars.itemTypes.length &&
      !connectionVars.itemTypes.includes(itemType)
    )
      return;
    console.log('Got here 3');
    record.setValue(id, 'id');
    record.setValue(toGid('Tip', tip.id), 'itemId');
    record.setValue(itemType, 'itemType');
    record.setValue('Tip', 'baseType');
    record.setValue(tip.attributes.title, 'title');
    record.setValue(tip.attributes.slug, 'slug');
    record.setValue(tip.attributes.created_at, 'createdAt');
    record.setValue(tip.attributes.updated_at, 'updatedAt');
    createEdge({
      store,
      record,
      connectionField: `__${componentName}_items_connection`,
      connectionVars,
      edgeType: 'ItemEdge',
      prepend: true
    });
    console.log('Got here 4');
  });
}

export function deleteTipItem(tipId) {
  updateStore(store => {
    const id = toGid('Item:Tip', tipId);
    deleteEdge({
      id,
      connectionField: '__StarterLens_items_connection',
      connectionVars: getStarterLensConnectionVars(),
      store
    });
    store.delete(id);
  });
}

export function moveTipItem(tipId, topicId, parentId) {}
