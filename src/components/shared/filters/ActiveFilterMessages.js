import React, { useState, useRef } from 'react';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { connect } from 'react-redux';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import {
  setRightFiltersMenuOpen,
  setRightFiltersDefaultSubmenuState,
  setRightFiltersMenuOpenExpanded
} from 'Src/newRedux/filters/actions';
import cardLenses from 'Lib/config/lenses/cards';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import PropTypes from 'prop-types';
import { useClickOutside } from 'Lib/hooks';

function ActiveFilterMessages(props) {
  const {
    topic,
    topicId,
    appUser,
    hideMessageUsersArray,
    viewKey,
    setRightFiltersMenuOpen,
    setRightFiltersMenuOpenExpanded,
    setRightFiltersDefaultSubmenuState,
    isRightFilterOpened,
    pickBoard,
    removeHidden,
    showMainFilters,
    containerClasses,
    containerStyles,
    showingTitle
  } = props;

  const [hideMessage, setHideMessage] = useState(false);
  const [showPickBoard, setShowPickBoard] = useState(false);

  const ref = useRef();

  const handleHideFilterMessage = ({
    hideMessageUsersArray,
    topicId,
    userId
  }) => {
    hideMessageUsersArray.push(userId);
    mutations.setConfig({
      owner: toGid('Topic', topicId),
      config: `hide_${viewKey}_filter_message`,
      value: hideMessageUsersArray
    });
    setHideMessage(!hideMessage);
  };

  const showMessage = (userList, userId) => {
    return !userList.includes(userId);
  };

  useClickOutside(ref, () => {
    setShowPickBoard(false);
  });

  if (!hideMessage && showMessage(hideMessageUsersArray, appUser.id))
    return (
      <p
        className={`active-filter-message ${containerClasses}`}
        style={containerStyles}
        ref={ref}
      >
        Showing {showingTitle || cardLenses[viewKey].name}. You can
        <span
          className="action-button"
          onClick={() => (
            setRightFiltersDefaultSubmenuState(
              !showMainFilters && !isRightFilterOpened
                ? 'Card and Board types'
                : null
            ),
            setRightFiltersMenuOpenExpanded(true),
            setRightFiltersMenuOpen(!isRightFilterOpened)
          )}
        >
          change the filter
        </span>
        {pickBoard && (
          <span className="pick-a-board" style={{ position: 'relative' }}>
            &nbsp;or
            <span
              className="action-button"
              onClick={() => setShowPickBoard(!showPickBoard)}
            >
              pick a Board
            </span>
            {showPickBoard && (
              <TopicsListDropdown
                additionalClasses="pick-a-board-dropdown"
                actionButtonLabel="Share selected Boards"
                actionButtonHandler={() => {}}
                actionButtonClass="btn-primary"
                path={topic?.attributes?.path?.concat({ id: 0 })}
                startAt={topic?.attributes?.path && 0}
                hideHeader
                inputMode="list"
                disallowCreate
                multiple
                hideAddTopicLink
                skipConfirmation
                domain={window.currentDomain}
                onSelectTopic={() => {}}
                showAddBoard
                topicsSelectMenuProps={{ pickYourBoard: true }}
                extraStyle={{ top: '-150px', left: '105%' }}
                {...props}
              />
            )}
          </span>
        )}
        &nbsp;you want to see here.
        {!removeHidden && (
          <>
            <span
              className="hide-button"
              onClick={() =>
                handleHideFilterMessage({
                  hideMessageUsersArray,
                  topicId,
                  userId: appUser.id
                })
              }
            >
              Hide this message
            </span>
            .
          </>
        )}
      </p>
    );

  return null;
}

ActiveFilterMessages.propTypes = {
  pickBoard: PropTypes.bool
};

const mapState = state => {
  const {
    topics,
    page: { topicId },
    filters: { keepOpen }
  } = stateMappings(state);

  const topic = topics[topicId];
  const viewKey = getRelevantViewForPage(state);

  return {
    topic,
    viewKey,
    topicId,
    appUser: state.appUser,
    hideMessageUsersArray:
      topic?.attributes?.configs[`hide_${viewKey}_filter_message`] || [],
    isRightFilterOpened: keepOpen
  };
};

const mapDispatch = {
  setRightFiltersMenuOpen,
  setRightFiltersMenuOpenExpanded,
  setRightFiltersDefaultSubmenuState
};

export default connect(mapState, mapDispatch)(ActiveFilterMessages);
