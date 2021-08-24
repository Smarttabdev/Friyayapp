import React, { useState } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateUserUiSettings } from 'Src/newRedux/database/user/thunks';
import { getRootTopic } from 'Src/newRedux/database/topics/selectors';
import { updateUISettings } from 'Src/newRedux/database/topics/actions';
import { updateUiSettings as updateUiSettingsApi } from 'Src/newRedux/database/topics/apiCalls';
import Icon from 'Src/components/shared/Icon';
import cn from 'classnames';
import LoadingIndicator from 'Components/shared/LoadingIndicator';

const IntroInitialSetup = ({
  history,
  isLoading,
  rootTopic,
  updateUserUiSettings,
  updateUISettings
}) => {
  const [selectedPinnedLenses, setSelectedPinnedLenses] = useState([
    'TODO',
    'GRID',
    'FILES'
  ]);

  const setupsAttributes = [
    {
      id: 'Tasks',
      keys: ['TODO'],
      desc: 'Simple list of tasks',
      colorTheme: '#9B51E0'
    },
    {
      id: 'List',
      keys: ['TASK'],
      desc: 'Some documentation (like notes, files, info)',
      colorTheme: '#6FCF97'
    },

    // #Will be activate when the tools ready
    {
      id: 'Files',
      keys: ['FILES'],
      desc: 'Some files',
      colorTheme: '#F2994A'
    },
    {
      id: 'Notes',
      keys: ['GRID'],
      desc: 'Notes',
      colorTheme: '#56CCF2'
    },
    {
      id: 'ProjectPlan',
      keys: ['PROJECT_PLAN'],
      desc: 'Projects (just tasks)',
      colorTheme: '#F2C94C'
    },
    {
      id: 'Boards',
      keys: ['TOPIC_LIST'],
      desc: 'Projects (tasks, notes, files, chat)',
      colorTheme: '#4C8EF2'
    },
    {
      id: 'GIDBF',
      keys: [
        'OVERVIEW',
        'MY_PLAN',
        'MY_DAY',
        'MY_RESULTS',
        'TEAM_PLAN',
        'TEAM_DAY',
        'TEAM_RESULTS',
        'PROJECT_RESULTS',
        'TOPIC_TILES'
      ],
      desc: 'Team (weekly planning, tracking, chat)',
      colorTheme: '#AA30BE'
    },
    {
      id: 'KnowledgeBase',
      keys: ['KNOWLEDGE_BASE'],
      desc: 'Knowledge base',
      colorTheme: '#EB5757'
    },
    // #Will be activate when the tools ready
    // {
    //   id: 'Goals',
    //   keys: ['GOALS'],
    //   desc: 'Team goals',
    //   colorTheme: '#30BEB6'
    // },
    {
      id: 'SimpleCollaboration',
      keys: ['', 'TODO', 'FILES', 'GRID', 'CHAT', 'VIDEO_CHAT'],
      desc: 'Simple collaboration (files, notes, tasks and chats)',
      colorTheme: '#415EF6'
    },
    {
      id: 'Starter',
      keys: ['STARTER'],
      desc: 'A mix of things (create boards for each)',
      colorTheme: '#A77E7E'
    }
  ];

  const handleClickSetup = (id, keys) => async () => {
    const pinned_lenses = selectedPinnedLenses.includes(...keys)
      ? new Set(['STARTER', ...selectedPinnedLenses])
      : new Set(['STARTER', ...selectedPinnedLenses, ...keys]);
    const uiSettings = {
      //if user click cta button without activate toggle button
      pinned_lenses:
        //set project_boards as 1st lens if projects selected
        selectedPinnedLenses.some(
          key => key == 'PROJECT_PLAN' || key == 'TOPIC_LIST'
        )
          ? ['PROJECT_BOARDS', ...pinned_lenses]
          : [...pinned_lenses],
      current_active_template: selectedPinnedLenses.some(
        key => key == 'PROJECT_PLAN' || key == 'TOPIC_LIST'
      )
        ? 'PROJECT_BOARDS'
        : 'STARTER',
      subtopic_panel_visible: false,
      card_hidden: false,
      add_option: id !== 'GIDBF' && true,
      pinned_lenses_bar_visible: true
    };
    updateUISettings({
      topicId: rootTopic.id,
      ui_settings: uiSettings
    });
    await updateUiSettingsApi(
      rootTopic.attributes.user_configuration.data.id,
      uiSettings,
      null
    );
    await updateUserUiSettings({
      newSettings: {
        gidbf_updates_response: id
      }
    });
    await mutations.createPinnedLensesOrder({
      name: 'Team Default',
      topicId: '0',
      isTeamDefault: true,
      order: uiSettings.pinned_lenses
    });
    if (id === 'GIDBF') {
      history.push('/introduction/create_cards');
    } else {
      history.push('/introduction/choose_design');
    }
  };

  // return (
  //   <div className="intro-initial-setup">
  //     <div className="intro-initial-setup__header">
  //       <img
  //         className="intro-initial-setup-logo"
  //         src="/images/Friyay-Logo-01.png"
  //       />
  //     </div>
  //     <div className="intro-initial-setup__content">
  //       <div className="intro-initial-setup__instruction m-b-3">
  //         <h1>Pick your preferred initial setup</h1>
  //         <p>
  //           You can customize your setup at any time and add or remove tools as
  //           you go
  //         </p>
  //       </div>
  //       <div className="intro-initial-setup__panels">
  //         <div className="intro-initial-setup__panel intro-initial-setup__panel--green">
  //           <h2>Get It Done By Friday</h2>
  //           <p>Get focused on meeting weekly goals</p>
  //           <button
  //             className="large-btn"
  //             onClick={handleClickSetup('GIDBF')}
  //             disabled={isLoading}
  //           >
  //             Use this setup
  //           </button>
  //         </div>

  //         <div className="intro-initial-setup__panel intro-initial-setup__panel--blue">
  //           <h2>Simple collaboration</h2>
  //           <p>Chat, video chat, notes and tasks</p>
  //           <button
  //             className="large-btn"
  //             onClick={handleClickSetup('SimpleCollaboration')}
  //             disabled={isLoading}
  //           >
  //             Use this setup
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const handleToggleButton = keys => {
    if (selectedPinnedLenses.includes(...keys)) {
      setSelectedPinnedLenses(
        selectedPinnedLenses.filter(selectedKey => !keys.includes(selectedKey))
      );
    } else {
      setSelectedPinnedLenses([...selectedPinnedLenses, ...keys]);
    }
  };

  const renderToolList = setup => {
    return (
      <div key={setup.id}>
        <div
          className="left-padding"
          style={{ background: setup.colorTheme }}
        ></div>
        <div className="tool-content">
          <p>{setup.desc}</p>
          <i
            className={cn(
              'fa active-filter-chip__toggle-filter-btn fa-toggle-off grey-button-color',
              selectedPinnedLenses.includes(...setup.keys)
                ? 'fa-toggle-on green'
                : 'fa-toggle-off grey-button-color'
            )}
            onClick={() => handleToggleButton(setup.keys)}
          />
        </div>
        <div
          className="tool-cta pointer"
          onClick={!isLoading && handleClickSetup(setup.id, setup.keys)}
          style={{ background: setup.colorTheme }}
        >
          {isLoading ? (
            <div style={{ width: 24 }}>
              <LoadingIndicator />
            </div>
          ) : (
            <Icon
              icon="keyboard_backspace"
              style={{ transform: 'rotate(180deg)' }}
              outlined
              color="#ffffff"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="intro-initial-setup">
      <div className="intro-initial-setup__header">
        <img
          className="intro-initial-setup-logo"
          src="/images/Friyay-Logo-01.png"
        />
      </div>
      <div className="intro-initial-setup__content">
        <div className="intro-initial-setup__instruction m-b-3">
          <h1>What would you like to organize first?</h1>
        </div>
        <div className="tools-list-panel">
          {setupsAttributes.map(setupAttributes =>
            renderToolList(setupAttributes)
          )}
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  const { user } = stateMappings(state);
  const rootTopic = getRootTopic(state);
  return {
    isLoading: !(user && user.id) || !rootTopic,
    rootTopic
  };
};

const mapDispatch = {
  updateUserUiSettings,
  updateUISettings
};

export default connect(mapState, mapDispatch)(IntroInitialSetup);
