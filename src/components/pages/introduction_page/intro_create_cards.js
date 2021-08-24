import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { getDefaultTopic } from 'Src/newRedux/database/topics/selectors';
import {
  getTopics,
  createDefaultTopic
} from 'Src/newRedux/database/topics/thunks';
import Icon from 'Components/shared/Icon';
import MyPlanLens from 'Components/lenses/card_lenses/Plan/MyPlan/MyPlanLens';
import { updateDomainFilterSettings } from 'Src/newRedux/database/domains/actions';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const IntroCreateCards = ({
  history,
  user,
  defaultTopic,
  getTopics,
  createDefaultTopic,
  cards,
  domainId,
  updateDomainFilterSettings,
  filterSettings,
  setUserFilterSettings
}) => {
  const [showReminder, setShowReminder] = useState(false);

  const isLoading = !get(user, 'id') || !defaultTopic;

  useEffect(() => {
    const prev_include_subtopic_cards = filterSettings.include_subtopic_cards;

    updateDomainFilterSettings({
      domainId,
      filter_setting: {
        include_subtopic_cards: true
      }
    });

    return () => {
      updateDomainFilterSettings({
        domainId,
        filter_setting: {
          include_subtopic_cards: prev_include_subtopic_cards
        }
      });
    };
  }, []);

  useEffect(() => {
    const filterStates = filterSettings.filter_states;
    delete filterStates['card_type="TASK"'];
    setUserFilterSettings({
      card_type: ['TASK'],
      filter_states: filterStates
    });
    getTopics({});
  }, []);

  useEffect(() => {
    if (user && !defaultTopic) {
      createDefaultTopic();
    }
  }, [user && user.id, defaultTopic]);

  const handleClickDone = () => {
    if (cards.length < 1) {
      setShowReminder(true);
      setTimeout(() => setShowReminder(false), 1000);
    } else history.push('/introduction/gidbf_guide_1');
  };

  return (
    <div className="create-cards initial-setup row">
      <img className="intro-logo" src="/images/friyay-logo-black.png" />
      <div className="initial-setup__content create-cards__content col-xs-12 col-md-8">
        <h1>What do you need to get done by Friday?</h1>
        {!isLoading && (
          <MyPlanLens
            cardRequirements={{}}
            cardView="MY_PLAN"
            cards={cards}
            cardsHidden={false}
            cardsSplitScreen={false}
            page="home"
            showTutorial={false}
            subtopics={[]}
            updateSelectedCard={() => {}}
            updateShowTutorial={() => {}}
            topicSectionProps={{
              footerProps: {
                addRowProps: {
                  initialCardType: 'TASK'
                }
              }
            }}
          />
        )}
        <div className="done_section">
          <button
            className="large-btn"
            onClick={handleClickDone}
            disabled={isLoading}
          >
            Next
          </button>
          {showReminder && (
            <div className="reminder">
              <Icon icon="info" outlined />
              <div style={{ fontSize: '16px' }}>Click enter to add card</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  const {
    user,
    cards,
    page: { domainId }
  } = stateMappings(state);
  const filterSettings = getFilterSettings(state);
  return {
    domainId,
    user,
    defaultTopic: getDefaultTopic(state),
    cards: Object.values(cards),
    filterSettings
  };
};

const mapDispatch = {
  getTopics,
  createDefaultTopic,
  updateDomainFilterSettings,
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(IntroCreateCards);
