import { changeCards } from 'Src/newRedux/database/cards/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import store from 'Src/store/store';
import { fetchQuery } from 'Lib/relay';

export const loadLogTimes = async cardIds => {
  if (!cardIds?.length) return;
  const data = await fetchQuery(
    graphql`
      query cardsLogTimesQuery($ids: [ID!]) {
        tips(ids: $ids) {
          edges {
            node {
              id
              logTimes {
                id
                jsonApi
              }
            }
          }
        }
      }
    `,
    { ids: cardIds }
  );
  const tips = getNodes(data.tips);
  const { cards } = stateMappings(store.getState());
  const updatedCards = cardIds
    .map(id => {
      const card = cards[id];
      if (!card) return;
      const tip = tips.find(tip => toId(tip.id) === id);
      if (!tip) return;
      return {
        ...card,
        attributes: {
          ...card.attributes,
          log_times: tip.logTimes.map(l => l.jsonApi)
        }
      };
    })
    .map(x => x);
  store.dispatch(changeCards(updatedCards));
};
