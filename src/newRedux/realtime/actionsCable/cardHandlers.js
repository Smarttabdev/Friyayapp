import { get } from 'lodash';

import { batchActions } from 'redux-batch-enhancer';
import * as topicActions from 'Src/newRedux/database/topics/actions';
import * as cardActions from 'Src/newRedux/database/cards/actions';
import * as cardThunks from 'Src/newRedux/database/cards/thunks';
import { normalizeCard } from 'Src/newRedux/database/cards/schema';
import { getGroups } from 'Src/newRedux/database/groups/thunks';
import { removeCardFromDock } from 'Src/newRedux/interface/dock/thunks';

export default (message, dispatch, getState) => ({
  card_created: () => {
    const { data: newCard, included } = message.data;
    const dispatches = [];

    dispatches.push(
      cardActions.addCards(
        normalizeCard({
          data: {
            data: cardThunks.mapRelationships(included)(newCard)
          }
        }).cards
      )
    );

    const followingTipIds = get(newCard, 'relationships.follows_tip.data', []);
    if (followingTipIds.length) {
      dispatches.push(cardThunks.getCards({ cardIds: followingTipIds }));
    }

    dispatch(batchActions(dispatches));
  },
  card_updated: () => {
    const { data: updatedCard, included } = message.data;

    const normalizedData = normalizeCard({
      data: {
        data: cardThunks.mapRelationships(included)(updatedCard)
      }
    });

    dispatch(
      batchActions([
        cardActions.addCards(normalizedData.cards),
        topicActions.addTopics(normalizedData.topics),
        // in case group followers changed
        getGroups()
      ])
    );
  },
  card_deleted: () => {
    const { tip_id: cardId } = message.data;

    dispatch(
      batchActions([cardActions.deleteCard(cardId), removeCardFromDock(cardId)])
    );
  }
});
