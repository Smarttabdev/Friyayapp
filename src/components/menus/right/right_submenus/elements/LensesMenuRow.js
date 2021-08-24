import React from 'react';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  setUserLensPinSettings,
  updateTopic
} from 'Src/newRedux/database/topics/thunks';
import { selectCustomLens } from 'Src/newRedux/database/lenses/thunks';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import Ability from 'Lib/ability';
import DefaultBadge from 'Components/shared/badges/DefaultBadge';
import Icon from 'Components/shared/Icon';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import { viewPayload } from 'Src/utils/views';
import DriveIcon from 'Src/components/svg_icons/driveIcon';
import { setDomainUiSettings } from 'Src/newRedux/database/domains/thunks';
import {
  getUiSettings,
  getCustomLensId,
  getUserConfig,
  setUserUiSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { updateUserUiSettings } from 'Src/newRedux/database/user/thunks';

const LensesMenuRow = ({
  currentTopic,
  isSelected,
  setRightMenuOpenForMenu,
  updateTopic,
  pinedLenses,
  board,
  page,
  userId,
  selectCustomLens,
  query,
  ...props
}) => {
  const handleSelectView = () => {
    const {
      setUserUiSettings,
      displayTopics,
      setUserFilterSettings,
      updateUserUiSettings
    } = props;
    const payload = viewPayload(board.key, displayTopics);
    setUserUiSettings(payload);
    setRightMenuOpenForMenu(false);
    page == 'topics' &&
      updateUserUiSettings({
        newSettings: { all_topics_view: payload.current_active_template }
      });
    if (board.name == 'My Tasks' || board.key == 'MY_WEEKLY_SPREAD_VIEW') {
      setUserFilterSettings({
        assigned: [Number(userId)]
      });
    } else {
      setUserFilterSettings({ assigned: [] });
    }
  };

  const handleSetViewAsDefaultForTopic = board => {
    const attributes = { default_view_id: board.key };
    updateTopic({ id: currentTopic.id, attributes });
  };

  const togglePinLens = board => () => {
    const { setUserLensPinSettings } = props;
    if (query?.activePinnedLensesOrder) {
      const order = query.activePinnedLensesOrder.order.includes(board.key)
        ? query.activePinnedLensesOrder.order.filter(x => x != board.key)
        : query.activePinnedLensesOrder.order.concat(board.key);

      return mutations.confirmUpdatePinnedLensesOrder({
        topicId: props.topicId || 0,
        pinnedLensesOrder: query.activePinnedLensesOrder,
        order
      });
    }
    const payload = {
      ui_settings: {
        pinned_lenses: pinedLenses.includes(board.key)
          ? pinedLenses.filter(x => x !== board.key)
          : [...pinedLenses, board.key]
      },
      action: pinedLenses.includes(board.key) ? 'remove' : 'add',
      view: board.key
    };
    return setUserLensPinSettings(payload);
  };

  const handleViewClick = () => {
    if (props.lensId) {
      selectCustomLens({
        current_active_lens_id: null,
        id: props.configurationId,
        current_active_template: board.key
      });
    } else {
      handleSelectView();
    }
  };

  return (
    <div className="right-submenu_item option" key={board.name}>
      <a
        className={`darker-grey-link ${
          isSelected && !props.customLensId ? 'active' : ''
        }`}
        onClick={handleViewClick}
      >
        {board.icon == 'drive' ? (
          <DriveIcon className="ml4 mr4 icon" fill="#515050" />
        ) : (
          <Icon
            fontAwesome={board.fontAwesomeIcon}
            icon={board.icon}
            outlined={
              board.outlineIcon || board.icon == 'category' ? true : false
            }
            teamIcon={board.teamIcon}
            projectIcon={board.projectIcon}
          />
        )}
        <span className="ml6">{board.name}</span>
        {currentTopic &&
          board.key == currentTopic.attributes.default_view_id && (
            <DefaultBadge />
          )}
      </a>
      {(currentTopic && Ability.can('update', 'self', currentTopic)) ||
      props.topicId ||
      props.lensId ||
      page === 'home' ? (
        <OptionsDropdownButton>
          {currentTopic && Ability.can('update', 'self', currentTopic) && (
            <a
              className="dropdown-option-item"
              onClick={() => handleSetViewAsDefaultForTopic(board)}
            >
              Make default
            </a>
          )}

          {(props.topicId || page === 'home') && (
            <a className="dropdown-option-item" onClick={togglePinLens(board)}>
              {pinedLenses.includes(board.key) ? 'Unpin Tool' : 'Pin Tool'}
            </a>
          )}
          {props.lensId && (
            <a onClick={handleSelectView} className="dropdown-option-item">
              Select Tool
            </a>
          )}
        </OptionsDropdownButton>
      ) : null}
    </div>
  );
};

const mapState = (state, props) => {
  const {
    user,
    page: { topicId, page }
  } = stateMappings(state);
  const uiSettings = getUiSettings(state);
  const userConfiguration = getUserConfig(state);
  return {
    configurationId: userConfiguration.id,
    lensId: getCustomLensId(state),
    page,
    userId: user.id,
    topicId,
    displayTopics: uiSettings.subtopic_panel_visible,
    pinedLenses: props.pinedLenses || uiSettings.pinned_lenses || []
  };
};

const mapDispatch = {
  setUserLensPinSettings,
  setRightMenuOpenForMenu,
  selectCustomLens,
  setUserUiSettings,
  updateTopic,
  setDomainUiSettings,
  setUserFilterSettings,
  updateUserUiSettings
};

LensesMenuRow.propTypes = {
  currentTopic: object,
  isSelected: bool,
  setRightMenuOpenForMenu: func.isRequired,
  board: object.isRequired
};

export default connect(mapState, mapDispatch)(LensesMenuRow);
