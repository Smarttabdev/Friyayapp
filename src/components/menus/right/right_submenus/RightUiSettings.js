import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconButton from 'Components/shared/buttons/IconButton';
import { getUiSettings } from 'Src/helpers/user_config';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import { toggleLeftMenu } from 'Src/newRedux/interface/menus/thunks';
import { setRightFiltersMenuOpen } from 'src/newRedux/filters/actions';
import { setUserUiSettings } from 'Src/helpers/user_config';

const localStorageTagForOpenFilters = 'showRightFilterMenu';

const RightUiSettings = ({
  setRightMenuOpenForMenu,
  viewKey,
  page,
  displayLeftMenu,
  sprintBarVisible,
  pinnedLensesBarVisible,
  keepFiltersOpen,
  query,
  topicId,
  setUserUiSettings,
  toggleLeftMenu,
  setRightFiltersMenuOpen,
  userId
}) => {
  const { boardTabsClosed, rightBarQuickOpen } = query || {};
  const [quickOpen, setQuickOpen] = useState(false);

  useEffect(() => {
    handleOpenRightMenuOnHover();
  }, [rightBarQuickOpen]);

  const handleOpenRightMenuOnHover = () => {
    const usersIdArray = rightBarQuickOpen?.value || [];
    if (usersIdArray.includes(userId)) {
      setQuickOpen(true);
    } else {
      setQuickOpen(false);
    }
  };

  const optionClickHandler = option => () => {
    if (option === 'Sprint Bar')
      return setUserUiSettings({
        sprint_bar_visible: !sprintBarVisible
      });

    if (option === 'Toolbar') {
      return setUserUiSettings({
        pinned_lenses_bar_visible: !pinnedLensesBarVisible
      });
    }

    if (option === 'Left Board menu') {
      return toggleLeftMenu(!displayLeftMenu);
    }

    if (option === 'Tabs') {
      return mutations.setConfig({
        owner: toGid('Topic', topicId),
        config: `${viewKey}.boardTabsClosed`,
        value: !boardTabsClosed?.value
      });
    }

    if (option === 'Filter bar') {
      setRightFiltersMenuOpen(!keepFiltersOpen);
      if (!keepFiltersOpen) {
        setRightMenuOpenForMenu(false);
      }
      window.localStorage.setItem(
        localStorageTagForOpenFilters,
        !keepFiltersOpen
      );
      return;
    }

    if (option === 'Quick Open') {
      let closeArray = [];
      closeArray =
        rightBarQuickOpen?.value?.length > 0
          ? [...rightBarQuickOpen.value]
          : [];
      closeArray = closeArray.find(id => id === userId)
        ? closeArray.filter(id => id !== userId)
        : closeArray.concat(userId);
      mutations.setConfig({
        owner: toGid('Topic', topicId),
        config: 'right_submenu_quick_open_close_array',
        value: closeArray
      });
      const quickOpen = !!closeArray.includes(userId);
      return setQuickOpen(quickOpen);
    }
  };

  const renderOption = (title, option) => {
    return (
      <a
        className="right-submenu_item option"
        onClick={optionClickHandler(option)}
      >
        <span>{title}</span>
        {option === 'Sprint Bar' && <ToggleSwitch on={sprintBarVisible} />}
        {option === 'Toolbar' && <ToggleSwitch on={pinnedLensesBarVisible} />}
        {option === 'Left Board menu' && <ToggleSwitch on={displayLeftMenu} />}
        {option === 'Tabs' && (
          <ToggleSwitch on={boardTabsClosed?.value ? false : true} />
        )}
        {option === 'Filter bar' && <ToggleSwitch on={keepFiltersOpen} />}
        {option === 'Quick Open' && <ToggleSwitch on={quickOpen} />}
      </a>
    );
  };

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => setRightMenuOpenForMenu(true)}
        />
        <span className="ml5">UI Settings</span>
      </div>
      <div className="right-submenu_content">
        {page === 'topic' && renderOption('Sprint Bar', 'Sprint Bar')}
        {page === 'topic' && renderOption('Filter bar', 'Filter bar')}
        {page === 'topic' && renderOption('Toolbar', 'Toolbar')}
        {page === 'topic' && renderOption('Left Board menu', 'Left Board menu')}
        {page === 'topic' && viewKey && renderOption('Tabs', 'Tabs')}
        {page === 'topic' && renderOption('Quick Open', 'Quick Open')}
      </div>
    </div>
  );
};

const RefetchContainer = createRefetchContainer(
  RightUiSettings,
  {
    query: graphql`
      fragment RightUiSettings_query on Query
        @argumentDefinitions(
          owner: { type: "ID!" }
          config: { type: "String!" }
        ) {
        boardTabsClosed: config(owner: $owner, config: $config) {
          value
        }
        rightBarQuickOpen: config(
          owner: $owner
          config: "right_submenu_quick_open_close_array"
        ) {
          id
          value
        }
      }
    `
  },
  graphql`
    query RightUiSettingsRefetchQuery($owner: ID!, $config: String!) {
      ...RightUiSettings_query @arguments(owner: $owner, config: $config)
    }
  `
);

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page,
    filters: { keepOpen },
    menus,
    user
  } = sm;

  const topicId = page.topicId || '0';
  const sprintBarVisible = getUiSettings(state).sprint_bar_visible;
  const ui_settings = getUiSettings(state);
  const viewKey = getRelevantViewForPage(state, topicId);
  return {
    page: page.page,
    topicId,
    viewKey,
    sprintBarVisible,
    displayLeftMenu: menus.displayLeftMenu,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    keepFiltersOpen: keepOpen,
    userId: user?.id
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  toggleLeftMenu,
  setRightFiltersMenuOpen,
  setUserUiSettings
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query RightUiSettingsQuery($owner: ID!, $config: String!) {
        ...RightUiSettings_query @arguments(owner: $owner, config: $config)
      }
    `,
    vars: ({ topicId, viewKey }) => ({
      owner: toGid('Topic', topicId),
      config: `${viewKey}.boardTabsClosed`
    })
  })
);
