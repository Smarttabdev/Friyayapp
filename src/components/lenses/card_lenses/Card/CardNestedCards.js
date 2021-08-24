import moment from 'moment';
import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Ability from 'Lib/ability';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import {
  updateCard as updateCardAction,
  ensureCard
} from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { failure } from 'Utils/toast';
import { useTipCreatedUpdatedSubscription } from 'src/lib/hooks';

const DEFAULT_CARD = {
  attributes: {},
  relationships: { nested_tips: { data: [] } }
};
const DISPLAY_TYPES = {
  list: { key: 'list', optionText: 'Show as list' },
  todo: { key: 'todo', optionText: 'Show as todo-list' }
};
const DISPLAY_TYPES_KEY = 'nested_cards_display_types';
const LEVEL_PADDING_STEP = 20;

function getDisplayTypes() {
  const displayTypesString = localStorage.getItem(DISPLAY_TYPES_KEY) || '{}';
  const displayTypesJSON = JSON.parse(displayTypesString);

  return displayTypesJSON;
}

function getDisplayTypeForCard(cardId) {
  const displayTypes = getDisplayTypes();

  return displayTypes[cardId];
}

function setDisplayTypeForCard(cardId, displayType) {
  const displayTypesJSON = { ...getDisplayTypes(), [cardId]: displayType };
  const displayTypesString = JSON.stringify(displayTypesJSON);

  localStorage.setItem(DISPLAY_TYPES_KEY, displayTypesString);
}

const CardNestedCards = props => {
  const refetch = () => props.relay.refetchConnection(15);
  useTipCreatedUpdatedSubscription(props.topicId, refetch);
  const [displayType, setDisplayType] = useState(DISPLAY_TYPES.list.key);
  const [stateHelperCards, setStateHelperCards] = useState([]);

  useEffect(() => {
    const cardId = props.card.id;
    const displayType = getDisplayTypeForCard(cardId);
    setDisplayType(displayType);
    handleAddHelperCardsToLocalStore();
  }, []);

  useEffect(() => {
    handleAddHelperCardsToLocalStore();
  }, [props?.query]);

  const handleCardComplete = card => {
    if (Ability.can('update', 'self', card)) {
      const completed_percentage =
        card.attributes.completed_percentage == 100 ? 0 : 100;

      const completion_date = card.attributes.completion_date
        ? null
        : moment().toISOString();

      props.updateCard({
        id: card.id,
        attributes: { completed_percentage, completion_date }
      });
    } else {
      failure("You don't have permission to complete that card!");
    }
  };

  const handleDisplayTypeChange = displayType => {
    const cardId = props.card.id;
    setDisplayType(displayType);
    setDisplayTypeForCard(cardId, displayType);
  };

  const handleAddHelperCardsToLocalStore = async () => {
    const { ensureCard, query } = props;
    const { helperCards } = query || {};
    const cards = [];

    if (helperCards?.edges?.length) {
      for (const edge of helperCards.edges) {
        await ensureCard(toId(edge?.node?.id));
        cards.push(toId(edge?.node?.id));
      }
    }
    setStateHelperCards(cards.filter(Boolean));
  };

  const renderNestedCard = (cardId, level) => {
    const card = props.allCardsHash[cardId] || DEFAULT_CARD;
    const nestedCards = card.relationships.nested_tips.data;

    const hasNestedCards = !!nestedCards.length;
    const isCompleted = card.attributes.completed_percentage == 100;
    const levelPadding = level * LEVEL_PADDING_STEP;
    const style = { paddingLeft: `${levelPadding}px` };

    return (
      <Fragment key={cardId}>
        <div className="card-nested-cards__card" style={style}>
          {displayType === DISPLAY_TYPES.todo.key && (
            <IconButton
              fontAwesome
              icon={isCompleted ? 'check-square' : 'square'}
              onClick={() => handleCardComplete(card)}
            />
          )}
          <CardTitleLink card={card} />
          <div className="card-nested-cards__card-options">
            <CardActionsDropdown card={card} onAddCard={() => {}} />
          </div>
        </div>
        {hasNestedCards &&
          nestedCards.map(nestedCardId =>
            renderNestedCard(nestedCardId, level + 1)
          )}
      </Fragment>
    );
  };

  let nestedCards = (props.card.relationships.nested_tips || {}).data || [];
  nestedCards = [...stateHelperCards, ...nestedCards];
  const hasNestedCards = !!nestedCards.length;
  const displayTypeKeys = Object.keys(DISPLAY_TYPES);

  return (
    hasNestedCards && (
      <div className="card-nested-cards">
        <OptionsDropdownButton className="card-nested-cards__dropdown">
          {displayTypeKeys.map(key => (
            <span
              className="dropdown-option-item"
              key={key}
              onClick={() => handleDisplayTypeChange(key)}
            >
              {DISPLAY_TYPES[key].optionText}
            </span>
          ))}
        </OptionsDropdownButton>
        {nestedCards.map(cardId => renderNestedCard(cardId, 0))}
      </div>
    )
  );
};

const PaginationContainer = createPaginationContainer(
  CardNestedCards,
  {
    query: graphql`
      fragment CardNestedCards_query on Query
        @argumentDefinitions(owner: { type: "ID!" }, cursor: { type: String }) {
        helperCards: tips(first: 10, after: $cursor, helperFor: $owner)
          @connection(key: "CardNestedCards_helperCards") {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.helperCards,
    getFragmentVariables: (prevVars, count) => ({ ...prevVars, count }),
    getVariables: (_props, { cursor }, fragmentVars) => ({
      ...fragmentVars,
      cursor
    }),
    query: graphql`
      query CardNestedCardsRefetchQuery($cursor: String, $owner: ID!) {
        ...CardNestedCards_query @arguments(owner: $owner, cursor: $cursor)
      }
    `
  }
);

function mapState(state) {
  const sm = stateMappings(state);

  return { allCardsHash: sm.cards, topicId: sm.page.topicId };
}

const mapDispatch = { updateCard: updateCardAction, ensureCard };

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <PaginationContainer {...props} query={props} />, {
    query: graphql`
      query CardNestedCardsQuery($owner: ID!) {
        ...CardNestedCards_query @arguments(owner: $owner)
      }
    `,
    vars: ({ card }) => ({
      owner: toGid('Tip', card?.id || 0)
    })
  })
);
