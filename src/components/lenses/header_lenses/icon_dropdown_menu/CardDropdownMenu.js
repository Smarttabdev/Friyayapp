import React, { useMemo, useEffect, useState } from 'react';
import IconDropdownMenu from 'Components/shared/IconDropdownMenu';
import { connect } from 'react-redux';
import get from 'lodash/get';
import lensConfig from 'Lib/config/lenses/lenses';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { toggleCardsSplitScreen } from 'Src/newRedux/interface/menus/actions.js';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { setDomainUiSettings } from 'Src/newRedux/database/domains/thunks';
import {
  setUserUiSettings,
  getUiSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import { tipsVarsFromFilterSettings } from 'Lib/utilities';
import { useTipCreatedUpdatedSubscription } from 'Lib/hooks';
import LoadMore from 'Components/shared/LoadMore';

const CardDropdownMenu = ({
  topicId,
  cardView,
  setUserUiSettings,
  viewKey,
  toggleCardsSplitScreen,
  cardsSplitScreen,
  cardsHidden,
  cardFontColor,
  viewCard,
  tipsQuery,
  topicHeader,
  relay
}) => {
  const [animate, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 5000);
  }, [tipsQuery?.tips?.totalCount]);
  const cards = getNodes(tipsQuery?.tips);

  useTipCreatedUpdatedSubscription(topicId, () => relay.refetchConnection(15));

  const toggleCard = () => {
    setUserUiSettings({
      card_hidden: !cardsHidden,
      current_active_template: cardView
    });
  };

  const toggleSplit = () => {
    const isSplitLayoutDisabled = get(
      lensConfig.cards,
      `[${viewKey}].isSplitLayoutDisabled`,
      false
    );
    !isSplitLayoutDisabled && toggleCardsSplitScreen();
  };

  const cardsList = useMemo(() => {
    const list = cards.map(card => ({
      id: card.id,
      title: card.title,
      cardType: card.cardType,
      clickHandler: () => viewCard({ cardSlug: card.slug })
    }));
    list.push({
      id: 'loadMore',
      title: <LoadMore relay={relay} />,
      noIcon: true,
      clickHandler: () => true
    });
    return list;
  }, [cards]);

  const toggleList = [
    {
      title: 'Keep open on this Board',
      toggleState: !cardsHidden,
      toggleHandler: toggleCard
    },
    {
      title: 'Keep open in split screen',
      toggleState: cardsSplitScreen,
      toggleHandler: toggleSplit
    }
  ];
  return (
    <IconDropdownMenu
      title="Cards"
      dropdownStyle={{ left: 'unset', right: 0 }}
      icon="featured_play_list"
      color="#56CCF2"
      outlined
      cardFontColor={cardFontColor}
      itemList={cardsList}
      toggleList={toggleList}
      animate={animate}
      count={tipsQuery?.tips?.totalCount}
      additionalClasses={'medium-icon-card mt1'}
      topicHeader={topicHeader}
    />
  );
};

const mapState = (state, props) => {
  const {
    menus: { cardsSplitScreen },
    utilities: { active_design },
    page: { topicId: pageTopicId }
  } = stateMappings(state);

  const topicId = props?.topic?.id || pageTopicId;
  const uiSettings = getUiSettings(state);
  const topicViews = ['TOPIC_HEXES', 'TOPIC_LIST', 'TOPIC_TILES'];
  const cardView = getRelevantViewForPage(state);

  return {
    topicId,
    cardView,
    cardsSplitScreen,
    cardFontColor: active_design.card_font_color,
    cardsHidden: !get(uiSettings, 'card_hidden')
      ? !uiSettings.current_active_template && topicViews.includes(cardView)
      : get(uiSettings, 'card_hidden'),
    filterSettings: getFilterSettings(state)
  };
};

const mapDispatch = {
  setUserUiSettings,
  setDomainUiSettings,
  toggleCardsSplitScreen,
  viewCard
};

const PaginationContainer = containers.createTipsPaginationContainer(
  CardDropdownMenu,
  queries.tipsListQuery,
  queries.tipsListPaginationQuery
);

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <PaginationContainer {...props} tipsQuery={props} />, {
    query: queries.tipsListPaginationQuery,
    vars: props => ({
      rootTopics: !props.topicId,
      topicId: toGid('Topic', props.topicId),
      ...tipsVarsFromFilterSettings(props.filterSettings)
    })
  })
);
