import React, { Fragment, useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { func, string, array, object } from 'prop-types';
import { pageViewMappings } from 'Lib/config/lenses/lenses';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { reduceArrayToMappedObjectForAttribute, toGid } from 'Lib/utilities';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import get from 'lodash/get';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import FormInput from 'Components/shared/forms/FormInput';
import IconButton from 'Components/shared/buttons/IconButton';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import LensesMenuRow from './elements/LensesMenuRow';
import CustomLensMenuRow from './elements/CustomLensMenuRow';
import { createCustomLens } from 'Src/newRedux/database/lenses/thunks';
import { setDomainUiSettings } from 'Src/newRedux/database/domains/thunks';
import {
  getCustomLensId,
  getUserConfig,
  getUiSettings,
  setUserUiSettings
} from 'Src/helpers/user_config';
import { hiddenTools } from 'src/components/shared/lensesUtils';

const RightLensesMenu = ({
  currentPage,
  setRightMenuOpenForMenu,
  viewKey,
  currentTopic,
  pinedLenses,
  pinnedLensesBarVisible,
  setDomainUiSettings,
  setUserUiSettings,
  query,
  ...props
}) => {
  // eslint-disable-line
  const [loading, setLoading] = useState(false);
  const [createLens, setCreateLens] = useState(false);
  const [lensTitle, setLensTitle] = useState('');
  const [favTools, setFavTools] = useState([]);

  useEffect(() => {
    updateFavTools();
  }, [query]);

  const viewOptions = pageViewMappings[currentPage];
  const selected = viewOptions[viewKey];
  const viewSegments = reduceArrayToMappedObjectForAttribute(
    Object.values(viewOptions),
    'category'
  );

  const updateFavTools = () => {
    let favorites = [];
    const screenOne = query.screenOneFavTools?.value || [];
    const screenTwo = query.screenTwoFavTools?.value || [];
    const screenFour = query.screenFourFavTools?.value || [];
    const screenSeven = query.screenSevenFavTools?.value || [];
    const screenEight = query.screenEightFavTools?.value || [];
    favorites = [
      ...screenOne,
      ...screenTwo,
      ...screenFour,
      ...screenSeven,
      ...screenEight
    ];
    favorites = [...new Set(favorites)];
    setFavTools(favorites);
  };

  const submitLens = async () => {
    setLoading(true);
    setCreateLens(false);
    setLensTitle('');
    await props.createCustomLens({
      title: lensTitle
    });
    setLoading(false);
  };

  const handleShowPinnedLensesBarClick = () => {
    const payload = {
      pinned_lenses_bar_visible: !pinnedLensesBarVisible
    };
    setUserUiSettings(payload);
  };

  const customLenses = useMemo(() => {
    if (props.topicId) {
      return Object.values(props.tools).filter(
        tool => get(tool, 'attributes.kind') === 'topic'
      );
    }
    return Object.values(props.tools).filter(
      tool => get(tool, 'attributes.kind') === 'domain'
    );
  }, [props.topicId, props.tools]);

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => setRightMenuOpenForMenu(true)}
        />
        <span className="ml5">Tools</span>
      </div>
      <div className="right-submenu_pinned-tools-btn">
        <span>Show Pinned Tools Bar</span>
        <ToggleSwitch
          on={pinnedLensesBarVisible}
          onClick={handleShowPinnedLensesBarClick}
        />
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="right-submenu_content">
          <Fragment>
            <div className="right-submenu_section-header">CUSTOM TOOLS</div>
            {customLenses
              .filter(lens => lens?.relationships?.filter_setting?.data)
              .map(tool => (
                <CustomLensMenuRow
                  key={tool.id}
                  {...tool}
                  userId={props.userId}
                  topicId={props.topicId}
                  userConfigurationId={props.userConfigurationId}
                  customLensId={props.customLensId}
                  board={viewOptions[tool.attributes.current_active_template]}
                  pinedLenses={pinedLenses}
                  query={query}
                />
              ))}
            <div className="right-submenu_section-header">FAVORITE TOOLS</div>
            {favTools?.length > 0 &&
              favTools.map(tool => {
                const board = viewOptions[tool];
                return (
                  <LensesMenuRow
                    customLensId={props.customLensId}
                    isSelected={board == selected}
                    key={board.key}
                    board={board}
                    currentTopic={currentTopic}
                    isPinedLense={pinedLenses.includes(board.key)}
                    pinedLenses={pinedLenses}
                    query={query}
                  />
                );
              })}
            {createLens ? (
              <div className="Right-design-add-wrapper">
                <FormInput
                  autoFocus
                  defaultValue={lensTitle}
                  onChange={setLensTitle}
                  onSubmit={submitLens}
                  placeholder="Tool Title"
                />
                <div className="add-card-input-footer">
                  <p>hit enter to create</p>
                  <a onClick={submitLens}>Create</a>
                </div>
              </div>
            ) : (
              <div
                onClick={() => setCreateLens(true)}
                className="right-submenu_item option"
              >
                Create New
              </div>
            )}
          </Fragment>
          {Object.keys(viewSegments)
            .filter(cat => cat !== 'board_views')
            .map(viewCategory => (
              <Fragment key={viewCategory}>
                <div className="right-submenu_section-header">{`${viewCategory
                  .replace('_', ' ')
                  .toUpperCase()} ${
                  viewCategory !== 'board_lists' ? 'TOOLS' : ''
                }`}</div>
                {viewSegments[viewCategory]
                  .filter(board => !hiddenTools.includes(board.key))
                  .map(
                    board =>
                      (!board.disabledPages ||
                        board.disabledPages.indexOf(currentPage) === -1) && (
                        <LensesMenuRow
                          customLensId={props.customLensId}
                          isSelected={board == selected}
                          key={board.key}
                          board={board}
                          currentTopic={currentTopic}
                          isPinedLense={pinedLenses.includes(board.key)}
                          pinedLenses={pinedLenses}
                          query={query}
                        />
                      )
                  )}
              </Fragment>
            ))}
        </div>
      )}
    </div>
  );
};

const hoc = Component => props => {
  useEffect(() => {
    const disposer = subscriptions.pinnedLensesOrdersUpdated({
      onNext: () => props.relay.refetch(vars => vars)
    });
    return () => disposer.dispose();
  }, []);

  const pinedLenses =
    props.query?.activePinnedLensesOrder?.order || props.pinedLenses;

  return <Component {...props} pinedLenses={pinedLenses} />;
};

const RefetchContainer = createRefetchContainer(
  hoc(RightLensesMenu),
  {
    query: graphql`
      fragment RightLensesMenu_query on Query
        @argumentDefinitions(topicId: { type: ID }, owner: { type: "ID!" }) {
        activePinnedLensesOrder(topicId: $topicId) {
          id
          name
          order
        }
        screenOneFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen1"
        ) {
          id
          value
        }
        screenTwoFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen2"
        ) {
          id
          value
        }
        screenFourFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen4"
        ) {
          id
          value
        }
        screenSevenFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen7"
        ) {
          id
          value
        }
        screenEightFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen8"
        ) {
          id
          value
        }
      }
    `
  },
  graphql`
    query RightLensesMenuRefetchQuery($topicId: ID, $owner: ID!) {
      ...RightLensesMenu_query @arguments(topicId: $topicId, owner: $owner)
    }
  `
);

const mapState = state => {
  const {
    page: { topicId, page },
    topics,
    menus,
    user: { id },
    lensList
  } = stateMappings(state);
  const uiSettings = getUiSettings(state);
  const currentTopic = topics[topicId];
  const user_configuration = getUserConfig(state);

  return {
    customLensId: getCustomLensId(state),
    userConfigurationId: user_configuration.id,
    userId: id,
    topicId,
    tools: lensList,
    currentTopic,
    pinedLenses: uiSettings.pinned_lenses || [],
    pinnedLensesBarVisible: uiSettings.pinned_lenses_bar_visible,
    currentPage: page,
    displaySubmenu: menus.displayRightSubMenuForMenu,
    viewKey: getRelevantViewForPage(state)
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  createCustomLens,
  setUserUiSettings,
  setDomainUiSettings
};

RightLensesMenu.propTypes = {
  currentPage: string.isRequired,
  setRightMenuOpenForMenu: func.isRequired,
  viewKey: string,
  currentTopic: object,
  pinedLenses: array
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query RightLensesMenuQuery($topicId: ID, $owner: ID!) {
        ...RightLensesMenu_query @arguments(topicId: $topicId, owner: $owner)
      }
    `,
    vars: ({ topicId, userId }) => ({
      topicId: toGid('Topic', topicId || 0),
      owner: toGid('User', userId || null)
    })
  })
);
