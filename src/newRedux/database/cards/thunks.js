import Ability from 'Lib/ability';
import api from './apiCalls';
import { getGroups } from 'Src/newRedux/database/groups/thunks';
import analytics from 'Lib/analytics';
import get from 'lodash/get';
import { addTopics } from 'Src/newRedux/database/topics/actions';
import { addCards, deleteCard, changeCard } from './actions';
import { getCardsFilter } from './selectors';
import {
  getArchivedLabelId,
  returnBeforeAndAfterCardIdsFromItemOrder,
  returnRecordWithNewAttributes,
  mapRelationship,
  idFromSlug,
  toId
} from 'Lib/utilities';
import { deNormalizeCard, normalizeCard, normalizeCards } from './schema';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { success, failure } from 'Utils/toast';
import { updateOrCreateTopicOrderFromCardMove } from 'Src/newRedux/database/topicOrders/abstractions';
import { getRelevantTopicOrderByTopic } from 'Src/newRedux/database/topicOrders/selectors';
import { batchActions } from 'redux-batch-enhancer';
import { logRollBarError } from 'Lib/rollbar';
import { removeCardFromDock } from 'Src/newRedux/interface/dock/thunks';
import store from 'store/store';
import { updateLogTimeCard } from 'Src/newRedux/database/logtimes/actions';
import { getFilterSettings, getUiSettings } from 'Src/helpers/user_config';
import { updateUserProfile } from 'Src/newRedux/database/user/thunks';
import { MAX_CARDS_PROGRESS_COUNT } from 'AppConstants';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import cardLenses from 'Lib/config/lenses/cards';
import { addTipItem, deleteTipItem } from 'Lib/items';

const PAGE_SIZE = 30;

//add and/or remove topic relationships from a card (does nothing for order!  Use in places like the left menu)
export const addRemoveCardFromTopics = (
  card,
  addTopicIds = [],
  removeTopicIds = [],
  removeFromParentCardId
) => async (dispatch, getState) => {
  let removeTopicIdsCopy = removeTopicIds.slice();
  const sm = stateMappings(getState());
  addTopicIds = addTopicIds.filter(id => id != 0 && id != '0');
  // if topic to remove in a card doesn't included in card that topics belongs to, find its descendants
  if (
    removeTopicIds.length > 0 &&
    removeTopicIds[0] !== null &&
    !card.relationships.topics.data.includes(removeTopicIds[0])
  ) {
    const { topics } = sm;
    const parentTopicToRemove = topics[removeTopicIds[0]];
    removeTopicIdsCopy =
      dispatch(getRightDescendants(parentTopicToRemove, card)) || [];
    removeTopicIdsCopy = removeTopicIdsCopy.map(topic => topic.id);
  }

  const cardTopics = [
    ...card.relationships.topics.data.filter(
      topicId => !removeTopicIdsCopy.includes(topicId)
    ),
    ...addTopicIds
  ];
  const cardUpdate = returnRecordWithNewAttributes({
    record: card,
    attributes: ['relationships.subtopics.data', 'relationships.topics.data'],
    values: [cardTopics, cardTopics]
  });

  if (removeFromParentCardId) {
    const { cards } = sm;
    const modifyParentCard = cards[removeFromParentCardId];
    dispatch(
      updateCard({
        ...modifyParentCard,
        relationships: {
          ...modifyParentCard.relationships,
          nested_tips: {
            data: modifyParentCard.relationships.nested_tips.data.filter(
              id => id != card.id
            )
          }
        }
      })
    );
    cardUpdate.relationships.follows_tip = { data: null };
  }

  await dispatch(updateCard(cardUpdate));
};

export const addRemoveAssignedUsersOnCard = (
  card,
  addUserIds = [],
  removeUserIds = []
) => async (dispatch, getState) => {
  const cardAssignedUsers = [
    ...card.relationships.tip_assignments.data.filter(
      userId => !removeUserIds.includes(userId)
    ),
    ...addUserIds
  ];
  const cardUpdate = returnRecordWithNewAttributes({
    record: card,
    attributes: ['relationships.tip_assignments.data'],
    values: [cardAssignedUsers]
  });

  dispatch(updateCard(cardUpdate));
};

export const addRemoveLabelsOnCard = (
  card,
  addLabelIds = [],
  removeLabelIds = []
) => async (dispatch, getState) => {
  const cardLabels = [
    ...card.relationships.labels.data.filter(
      labelId => !removeLabelIds.includes(labelId)
    ),
    ...addLabelIds
  ];
  const cardUpdate = returnRecordWithNewAttributes({
    record: card,
    attributes: ['relationships.labels.data'],
    values: [cardLabels]
  });
  dispatch(updateCard(cardUpdate));
  if (removeLabelIds.includes('1')) {
    await api.unarchiveCard(card.id);
  }
};

export const archiveCard = (card, lastLocation) => async (
  dispatch,
  getState
) => {
  vex.dialog.confirm({
    unsafeMessage: `
      Are you sure you want to Archive this Card?
      <br /><br />
      You can use the label filters in the Action Bar to your right to view archived Cards.
    `,
    callback: async value => {
      if (value) {
        const cardUpdate = returnRecordWithNewAttributes({
          record: card,
          attributes: ['attributes.is_disabled'],
          values: [true]
        });
        await dispatch(
          changeAndPostActionOnCardOrRevert({
            original: card,
            update: cardUpdate,
            action: 'archive'
          })
        );
        await removeCardFromDock(card.id);
        dispatch(goToPathOneLevelUpFromCardDetails(lastLocation));
      }
    }
  });
};

export const changeAndPostActionOnCardOrRevert = ({
  original,
  update,
  action
}) => async (dispatch, getState) => {
  dispatch(changeCard(update));
  try {
    await api.postActionOnCard(original.id, action);
    const {
      page: { topicId },
      topics
    } = stateMappings(getState());
    const filter_setting = getFilterSettings(getState());
    const includeArchivedCards = filter_setting.include_archived_cards;
    if (includeArchivedCards) {
      dispatch(getCard(original.id));
    } else {
      deleteCard(original.id);
    }
  } catch (error) {
    failure('There was a problem saving your changes');
    logRollBarError(error, 'warning', 'changeAndPostActionOnCardOrRevert');
    dispatch(changeCard(original));
  }
};

export const createChat = ({ title, topicId }) => async dispatch => {
  await createCard({
    attributes: { title },
    relationships: {
      topics: {
        data: [{ id: topicId, type: 'topics' }]
      }
    }
  });
};

export const createCard = ({ attributes, relationships, domain }) => async (
  dispatch,
  getState
) => {
  const viewKey = getRelevantViewForPage(getState());

  if (!attributes.card_type) {
    attributes.card_type = cardLenses[viewKey]?.cardType || 'CARD';
  }

  const filters = getCardsFilter(getState());
  if (filters.priority.length > 1) {
    const selectedPriorities = [];
    filters.priority.forEach(x => {
      if (
        !filters.filter_states[`priority=${JSON.stringify(x)}`] ||
        (filters.filter_states[`priority=${JSON.stringify(x)}`] &&
          !filters.filter_states[`priority=${JSON.stringify(x)}`].disabled)
      ) {
        selectedPriorities.push(x);
      }
    });
    if (selectedPriorities.length == 1) {
      attributes['priority_level'] = selectedPriorities[0];
    }
  }
  if (filters.assigned.length > 0) {
    const selectedAssignees = [];
    filters.assigned.forEach(x => {
      if (
        !filters.filter_states[`assigned=${JSON.stringify(x)}`] ||
        (filters.filter_states[`assigned=${JSON.stringify(x)}`] &&
          !filters.filter_states[`assigned=${JSON.stringify(x)}`].disabled)
      ) {
        selectedAssignees.push(x);
      }
    });
    if (Object.keys(relationships).includes('tip_assignments')) {
      let temp = relationships.tip_assignments.data.concat(selectedAssignees);
      let set = new Set(temp);
      temp = Array.from(set);

      relationships.tip_assignments.data = temp;
    } else {
      relationships['tip_assignments'] = { data: [].concat(selectedAssignees) };
    }
  }
  if (filters.label.length > 0) {
    const selectedLabels = [];
    filters.label.forEach(x => {
      if (
        !filters.filter_states[`label=${JSON.stringify(parseInt(x))}`] ||
        (filters.filter_states[`label=${JSON.stringify(parseInt(x))}`] &&
          !filters.filter_states[`label=${JSON.stringify(parseInt(x))}`]
            .disabled)
      ) {
        selectedLabels.push(x);
      }
    });
    if (Object.keys(relationships).includes('labels')) {
      let temp = relationships.labels.data.concat(selectedLabels);
      let set = new Set(temp);
      temp = Array.from(set);
      relationships.labels.data = temp;
    } else {
      relationships['labels'] = { data: [].concat(selectedLabels) };
    }
  }
  const deNormalizedCard = deNormalizeCard({ attributes, relationships });
  try {
    const dispatches = [];

    const newServerCard = await api.postCard(deNormalizedCard, domain);
    dispatches.push(
      addCards(
        normalizeCard({
          data: {
            data: mapRelationships(newServerCard.data.included)(
              newServerCard.data.data
            )
          }
        }).cards
      )
    );
    if (relationships.follows_tip && relationships.follows_tip.data) {
      dispatches.push(getCard(relationships.follows_tip.data));
    }

    // increase cards progress counter
    const lensKey = get(getUiSettings(getState()), 'current_active_template');
    const userId = get(stateMappings(getState()), 'user.id');
    const userProfile = get(
      stateMappings(getState()),
      'user.attributes.user_profile'
    );
    if (['MY_PLAN', 'TEAM_PLAN', 'PROJECT_PLAN'].includes(lensKey)) {
      const newUserProfile = {};
      if (
        lensKey === 'MY_PLAN' &&
        userProfile.my_plan_cards_count <= MAX_CARDS_PROGRESS_COUNT
      ) {
        newUserProfile.my_plan_cards_count =
          userProfile.my_plan_cards_count + 1;
      } else if (
        lensKey === 'TEAM_PLAN' &&
        userProfile.team_plan_cards_count <= MAX_CARDS_PROGRESS_COUNT
      ) {
        newUserProfile.team_plan_cards_count =
          userProfile.team_plan_cards_count + 1;
      } else if (
        lensKey === 'PROJECT_PLAN' &&
        userProfile.project_plan_cards_count <= MAX_CARDS_PROGRESS_COUNT
      ) {
        newUserProfile.project_plan_cards_count =
          userProfile.project_plan_cards_count + 1;
      }
      if (Object.keys(newUserProfile).length > 0) {
        dispatches.push(updateUserProfile(userId, newUserProfile));
      }
    }

    dispatch(batchActions(dispatches));

    // should not be here
    // addTipItem(newServerCard.data.data);

    success('New card created!');

    analytics.track('Card Created', {
      id: newServerCard.data.data.id,
      title: newServerCard.data.data.attributes.title,
      topic_ids: newServerCard.data.data.relationships.topics.data.map(
        topic => topic.id
      ),
      topic_titles: newServerCard.data.data.relationships.topics.data.map(
        topic => topic.title
      )
    });

    return newServerCard;
  } catch (error) {
    failure('Unable to save new card');
    logRollBarError(error, 'warning', 'Create Card Error');
    console.error(error);
    return null;
  }
};

export const mapRelationships = included => cardDatum => {
  let mappedObject = cardDatum;

  for (let relation of [
    'share_settings',
    'topics',
    'labels',
    'tip_assignments',
    'attachments',
    'versions'
  ]) {
    mappedObject.relationships[relation].data = mapRelationship(
      cardDatum,
      included,
      relation
    );
  }
  mappedObject.relationships['nested_tips'].data = mapRelationship(
    cardDatum,
    included,
    'nested_tips',
    'tip_detail'
  );

  return mappedObject;
};

export const getCard = cardId => async dispatch => {
  try {
    const cardData = await api.fetchCard(cardId);
    const normalizedData = normalizeCard({
      data: {
        data: mapRelationships(cardData.data.included)(cardData.data.data)
      }
    });
    dispatch(
      batchActions([
        addCards(normalizedData.cards),
        addTopics(normalizedData.topics)
      ])
    );
    return;
  } catch (error) {
    failure('Unable to load card');
    logRollBarError(error, 'warning', `Get Card Error, id: ${cardId}`);
  }
};

export const getTipVersions = cardId => async (dispatch, getState) => {
  const id = idFromSlug(cardId);
  try {
    const cardData = await api.fetchVersions(id);
    const prevVersion = { ...getState()._newReduxTree.database.cards[id] };
    prevVersion.relationships.versions.data = cardData.data.data;
    var hash = {};
    hash[prevVersion['id']] = prevVersion;
    dispatch(batchActions([addCards(hash)]));
    var arr = [];
    cardData.data.data.forEach(val => {
      var attributes = val['attributes'];
      delete val['attributes'];
      Object.assign(val, attributes);
      arr.push(val);
    });
    return arr;
  } catch (error) {
    failure('Unable to load card');
    logRollBarError(error, 'warning', `Get Card Error, id: ${id}`);
  }
};

export const getCards = ({
  cardTypes,
  assignedId,
  assignedType,
  unassigned,
  dueDateFrom,
  dueDateTo,
  ccuDateFrom,
  ccuDateTo,
  startOrDueDateTo,
  noDueDate,
  filterIDs = null,
  labelId,
  topicId,
  topicsParams,
  pageNumber,
  pageSize,
  personId,
  isChat,
  isVideoRoom,
  includeArchived,
  includeSubtopics,
  isRoot,
  sort
}) => async (dispatch, getState) => {
  const relevantTopicOrderForTopic =
    getRelevantTopicOrderByTopic(getState())[topicId || '0'] || {};
  const topicOrderId = get(relevantTopicOrderForTopic, 'id');

  const fetchQueries = [
    assignedId && '&filter[assigned_to]=' + assignedId,
    assignedType && '&filter[assigned_to_type]=' + assignedType,
    unassigned && '&filter[unassigned]=true',
    dueDateFrom && '&filter[due_date_from]=' + encodeURIComponent(dueDateFrom),
    dueDateTo && '&filter[due_date_to]=' + encodeURIComponent(dueDateTo),
    ccuDateFrom && '&filter[ccu_date_from]=' + encodeURIComponent(ccuDateFrom),
    ccuDateTo && '&filter[ccu_date_to]=' + encodeURIComponent(ccuDateTo),
    startOrDueDateTo &&
      '&filter[start_or_due_date_to]=' + encodeURIComponent(startOrDueDateTo),
    noDueDate && '&filter[no_due_date]=true',
    labelId && '&filter[labels]=' + labelId,
    personId && '&filter[created_by]=' + personId,
    pageNumber && '&page[number]=' + pageNumber,
    pageSize && '&page[size]=' + pageSize,
    topicId && '&topic_id=' + topicId,
    topicOrderId && '&filter[topic_order_id]=' + topicOrderId,
    filterIDs && `&filter[filterIDs]=${filterIDs}`,
    isChat && '&is_chat=true',
    isVideoRoom && '&is_video_chat=true',
    includeArchived && '&archived=true',
    isRoot && '&root=true',
    sort && `&sort=${sort}`,
    cardTypes?.length && `&card_types=${cardTypes}`,
    includeSubtopics && '&subtopics=true',
    topicsParams && '&topics_params=' + JSON.stringify(topicsParams)
  ].filter(x => x);
  const fetchQuery = fetchQueries.join('');

  try {
    const cardsData = await api.fetchCards(fetchQuery);
    const normalizedData = normalizeCards({
      data: {
        data: cardsData.data.data.map(mapRelationships(cardsData.data.included))
      }
    });

    dispatch(
      batchActions([
        addCards(normalizedData.cards),
        addTopics(normalizedData.topics)
      ])
    );
    return cardsData;
  } catch (error) {
    failure('Unable to load cards');
    logRollBarError(error, 'warning', 'Get Cards Error');
  }
};

//similar to addRemoveCardFromTopics but also takes into consideration the order of cards
export const moveOrCopyCardInOrToTopic = ({
  afterCardId,
  beforeCardId,
  card,
  fromParentCardId,
  fromTopicId,
  toTopicId
}) => (dispatch, getState) => {
  if (Ability.can('update', 'self', card)) {
    const sm = stateMappings(getState());

    const dispatches = [];

    if (
      (fromTopicId && toTopicId && fromTopicId != toTopicId) ||
      fromParentCardId
    ) {
      const topicIdToRemoveFrom = sm.utilities.shiftKeyDown
        ? []
        : [fromTopicId];
      dispatches.push(
        addRemoveCardFromTopics(
          card,
          [toTopicId],
          topicIdToRemoveFrom,
          fromParentCardId
        )
      );
    }

    if (afterCardId || beforeCardId) {
      dispatches.push(
        updateOrCreateTopicOrderFromCardMove({
          afterCardId,
          beforeCardId,
          movedCardId: card.id,
          topicId: toTopicId
        })
      );
    }
    dispatch(batchActions(dispatches));
  } else {
    failure("You don't have permission to move that card!");
  }
};

export const nestCardUnderCard = ({
  nestedCard,
  parentCard,
  parentCardId,
  fromTopicId,
  toTopicId,
  itemOrder
}) => async (dispatch, getState) => {
  if (Ability.can('update', 'self', nestedCard)) {
    const sm = stateMappings(getState());
    parentCard = parentCard || sm.cards[parentCardId];
    const dispatches = [];
    if (fromTopicId && toTopicId && fromTopicId != toTopicId) {
      const topicIdToRemoveFrom = sm.utilities.shiftKeyDown
        ? []
        : [fromTopicId];

      dispatches.push(
        addRemoveCardFromTopics(nestedCard, [toTopicId], topicIdToRemoveFrom)
      );
    }

    let {
      afterCardId,
      beforeCardId
    } = returnBeforeAndAfterCardIdsFromItemOrder(nestedCard.id, itemOrder);
    if (itemOrder.length < 2) {
      afterCardId = parentCard.id;
      beforeCardId = null;
    }

    dispatches.push(
      moveOrCopyCardInOrToTopic({
        afterCardId,
        beforeCardId,
        card: nestedCard,
        fromTopicId,
        toTopicId
      })
    );

    // remove card from old parent
    const oldParentId = nestedCard.relationships.follows_tip.data;
    if (parentCard.id != oldParentId) {
      if (oldParentId) {
        const oldParent = sm.cards[oldParentId];
        dispatches.push(
          changeCard({
            ...oldParent,
            relationships: {
              ...oldParent.relationships,
              nested_tips: {
                data: oldParent.relationships.nested_tips.data.filter(
                  id => id != nestedCard.id
                )
              }
            }
          })
        );
      }

      // add card to new parent
      dispatches.push(
        changeCard({
          ...parentCard,
          relationships: {
            ...parentCard.relationships,
            nested_tips: {
              data: [
                ...parentCard.relationships.nested_tips.data,
                nestedCard.id
              ]
            }
          }
        })
      );
    }

    dispatches.push(
      updateCard({
        id: nestedCard.id,
        relationships: {
          follows_tip: { data: parentCard.id }
        }
      })
    );

    dispatch(batchActions(dispatches));
  } else {
    failure("You don't have permission to move that card!");
  }
};

export const removeCardSilent = cardId => async (dispatch, getState) => {
  dispatch(batchActions([deleteCard(cardId), removeCardFromDock(cardId)]));
  await api.deleteCard(cardId);
};

export const removeCard = (cardId, lastLocation) => async (
  dispatch,
  getState
) => {
  vex.dialog.confirm({
    message: 'Are you sure you want to delete this card?',
    callback: async value => {
      if (value) {
        const thisCard = getState()._newReduxTree.database.cards[cardId];
        dispatch(
          batchActions([deleteCard(cardId), removeCardFromDock(cardId)])
        );
        try {
          await api.deleteCard(cardId);
          deleteTipItem(cardId);
          dispatch(goToPathOneLevelUpFromCardDetails(lastLocation));
        } catch (error) {
          failure('Unable to remove card');
          logRollBarError(
            error,
            'warning',
            `Remove Card Error, card id: ${cardId}`
          );
          dispatch(addCards({ [thisCard.id]: thisCard }));
        }
      }
    }
  });
};

export const removeChat = (chatId, { beforeDelete }) => async (
  dispatch,
  getState
) => {
  vex.dialog.confirm({
    message: 'Are you sure you want to delete this chat?',
    callback: async value => {
      if (value) {
        const thisChat = getState()._newReduxTree.database.cards[chatId];
        beforeDelete && beforeDelete();
        dispatch(
          batchActions([deleteCard(chatId), removeCardFromDock(chatId)])
        );
        try {
          await api.deleteCard(chatId);
        } catch (error) {
          failure('Unable to remove chat');
          logRollBarError(
            error,
            'warning',
            `Remove Chat Error, chat id: ${chatId}`
          );
          dispatch(addCards({ [thisChat.id]: thisChat }));
        }
      }
    }
  });
};

export const toggleLikeCard = card => async (dispatch, getState) => {
  const {
    attributes: { liked_by_current_user, likes_count }
  } = card;
  const newLikesCount = liked_by_current_user
    ? likes_count - 1
    : likes_count + 1;

  const cardUpdate = returnRecordWithNewAttributes({
    record: card,
    attributes: ['attributes.liked_by_current_user', 'attributes.likes_count'],
    values: [!liked_by_current_user, newLikesCount]
  });
  await dispatch(
    changeAndPostActionOnCardOrRevert({
      original: card,
      update: cardUpdate,
      action: liked_by_current_user ? 'unlike' : 'like'
    })
  );
};

export const toggleStarCard = card => async (dispatch, getState) => {
  const {
    attributes: { starred_by_current_user }
  } = card;
  const cardUpdate = returnRecordWithNewAttributes({
    record: card,
    attributes: ['attributes.starred_by_current_user'],
    values: [!starred_by_current_user]
  });
  await dispatch(
    changeAndPostActionOnCardOrRevert({
      original: card,
      update: cardUpdate,
      action: starred_by_current_user ? 'unstar' : 'star'
    })
  );
};

export const updateCard = ({
  attributes = {},
  id,
  relationships = {}
}) => async (dispatch, getState) => {
  const topics = stateMappings(getState()).topics;
  const card = getState()._newReduxTree.database.cards[id];
  const prevVersion = { ...getState()._newReduxTree.database.cards[id] };

  const newVersion = {
    id,
    ...prevVersion,
    attributes: { ...prevVersion.attributes, ...attributes },
    relationships: { ...prevVersion.relationships, ...relationships }
  };
  newVersion.attributes.is_disabled = get(
    newVersion,
    'relationships.labels.data',
    []
  ).includes(getArchivedLabelId(getState()));

  card && dispatch(changeCard(newVersion));
  try {
    const updatedCard = await api.patchCard(deNormalizeCard(newVersion));
    const normalizedData = normalizeCard({
      data: {
        data: mapRelationships(updatedCard.data.included)(updatedCard.data.data)
      }
    });
    dispatch(addCards(normalizedData.cards));
    return updatedCard;
  } catch (error) {
    failure('Unable to save changes');
    logRollBarError(error, 'warning', `Update Card Error, card id: ${id}`);
    dispatch(changeCard(prevVersion));
    return null;
  }
};

export const updateCardVersion = ({ attributes = {}, id }) => async (
  dispatch,
  getState
) => {
  const prevVersion = { ...getState()._newReduxTree.database.cards[id] };

  const newVersion = {
    ...prevVersion,
    attributes: { ...prevVersion.attributes, ...attributes }
  };

  dispatch(changeCard(newVersion));
};

export const getCardUrl = ({ cardSlug, cardId }) => (dispatch, getState) => {
  const sm = stateMappings(getState());
  const history = sm.routing.routerHistory;
  const path = history.location.pathname;
  const baseUrl =
    path == '/'
      ? path
      : path.includes('/cards/')
      ? `${path.split('/cards/')[0]}/`
      : path.includes('/introduction/')
      ? '/'
      : `${path}/`;

  const slug = cardSlug || sm.cards[cardId].attributes.slug;
  const url = `${baseUrl}cards/${slug}`.replace(/\/{2,}/g, '/');
  return url;
};

export const viewCard = ({ cardId, cardSlug, history }) => (
  dispatch,
  getState
) => {
  const sm = stateMappings(getState());
  history = history || sm.routing.routerHistory;
  history.push(dispatch(getCardUrl({ cardSlug, cardId })));
};

/**
 * Go back from card details
 *
 * @return {Void}
 */
export const goToPathOneLevelUpFromCardDetails = lastLocation => {
  return (dispatch, getState) => {
    const state = getState();
    const sm = stateMappings(state);
    const {
      routing: { routerHistory }
    } = sm;
    const {
      location: { pathname }
    } = routerHistory;
    const index = pathname.indexOf('/cards/');
    if (index === -1) {
      return;
    }

    //should go back if it pushes the route and then user hits navigator back it goes to nowhere.
    lastLocation ? routerHistory.goBack() : routerHistory.push('/');
  };
};

/**
 * Get right topic descendants on a card by parent topic
 *
 * @param {Object}  parentTopic
 * @param {Object}  card
 * @return {[Object]}
 */
export const getRightDescendants = (parentTopic, card) => {
  return (dispatch, getState) => {
    const sm = stateMappings(getState());
    const { topics } = sm;
    // childTopicIds, find which is the right descendant here
    const childTopicIds = card.relationships.topics.data;
    // entryChildTopics, topics object which card belongs to
    const entryChildTopics = [];
    childTopicIds.forEach(id => {
      entryChildTopics.push(topics[id]);
    });
    // offspring, store the finding
    const offspring =
      parentTopic &&
      entryChildTopics.filter(childTopic =>
        childTopic.attributes.path
          .map(topicPath => topicPath.id)
          .includes(parentTopic.id)
      );
    return offspring;
  };
};

export const updateLogTime = (cardId, logtimeId, startTime, endTime) => {
  return async dispatch => {
    try {
      const requestData = {
        id: logtimeId,
        start_time: startTime,
        end_time: endTime
      };
      dispatch(updateLogTimeCard(logtimeId, startTime, endTime));
      await api.updateLogTime(cardId, requestData);
      success('Log time Updated');
    } catch (error) {
      failure('Unable to save changes');
      logRollBarError(
        error,
        'warning',
        `Update Card Error, card id: ${cardId}`
      );
      return null;
    }
  };
};

export const addLogTime = (cardId, startTime, endTime) => {
  return async dispatch => {
    try {
      const requestData = {
        start_time: startTime,
        end_time: endTime
      };
      await api.addLogTime(cardId, requestData);
      success('Log time Updated');
    } catch (error) {
      failure('Unable to save changes');
      logRollBarError(
        error,
        'warning',
        `Update Card Error, card id: ${cardId}`
      );
      return null;
    }
  };
};

export const copyCard = cardId => async dispatch => {
  try {
    const card = await api.copyCard(cardId);
    const normalizedCards = normalizeCard({
      data: {
        data: mapRelationships(card.data.included)(card.data.data)
      }
    }).cards;
    success('Card copied');
    return normalizedCards[card.data.data.id];
  } catch (error) {
    failure('Unable to copy card');
  }
};

export const copyAndOpenCard = (card, topicId) => async dispatch => {
  const allCards = await dispatch(
    getCards({
      topicId: card.relationships.topics.data[0]
    })
  );

  let allCardsTitle = allCards.data.data.map(c => c.attributes.title);

  const copy = await dispatch(copyCard(card.id));

  let { attributes, relationships } = copy;
  if (topicId) {
    relationships.topics = { data: [topicId] };
  }
  attributes.is_template = false;
  attributes.title = attributes.title + ' - copy';

  if (allCardsTitle.includes(attributes.title)) {
    const copies = allCardsTitle.filter(
      val => val.search(attributes.title) != -1
    );
    const copyCountReg = /\d+/;
    const copiesWithCount = copies.filter(val =>
      val.charAt(val.length - 1).match(copyCountReg)
    );
    if (copiesWithCount.length > 0) {
      const copyCounts = copiesWithCount.map(val =>
        parseInt(val.charAt(val.length - 1))
      );
      attributes.title = attributes.title + (Math.max(...copyCounts) + 1);
    } else {
      attributes.title = attributes.title + '1';
    }
  }
  const newCard = await dispatch(
    createCard({
      attributes,
      relationships
    })
  );

  dispatch(viewCard({ cardId: newCard.data.data.id }));
};

export const ensureCard = cardId => async (dispatch, getState) => {
  cardId = toId(cardId);
  const { cards } = stateMappings(getState());
  const card = cards[cardId];
  !card?.relationships?.versions && (await dispatch(getCard(cardId)));
};
