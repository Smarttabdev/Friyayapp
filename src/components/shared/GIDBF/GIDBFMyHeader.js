import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getUiSettings } from 'Src/helpers/user_config';
import { getThisDomain } from 'Lib/utilities';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import TimeframeSelector from 'Src/components/shared/GIDBF/TimeframeSelector';
import Icon from 'Components/shared/Icon';
import MainFormPage from 'Components/pages/MainFormPage';
import WorkspaceActionsDropdown from 'Src/components/shared/WorkspaceActionsDropdown';
import TopicActionsDropdown from 'Src/components/shared/topics/elements/TopicActionsDropdown';
import DomainLogo from 'Src/components/shared/DomainLogo';

const GIDBFMyHeader = ({
  currentDomain,
  user,
  cardsHidden,
  topic,
  topicId,
  topicTitle,
  lensType,
  active_design,
  isHome,
  showWorkspaceLogo
}) => {
  const { card_font_color } = active_design || {};
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef();

  const isCardsHidden = () => {
    return cardsHidden || (topic && topic.attributes.card_hidden);
  };

  const isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  const hideWorkspaceDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || isVisible(element)) {
        setShowOptions(false);
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  useEffect(() => {
    if (showOptions) {
      const dropdown = dropdownRef.current;
      hideWorkspaceDropdownOnClickOut(dropdown);
    }
  }, [showOptions]);
  return (
    <div className="my_plan-header">
      {showWorkspaceLogo && (
        <div
          data-tip={currentDomain.attributes.name}
          data-for={`workspace-${currentDomain.attributes.name}`}
          className="flex"
        >
          <DomainLogo
            domain={currentDomain}
            preferredColor={active_design.workspace_font_color}
            rounded
            componentClass="domain-logo domain-logo-workspace-header"
          />
        </div>
      )}
      <div className="title" onClick={() => setShowOptions(true)} role="button">
        {!isHome ? topicTitle : 'Main board'}
      </div>
      <div className="domain">
        <span className="mr5">/</span>
        {lensType == 'MY_PLAN'
          ? 'My Plan'
          : lensType == 'MY_DAY'
          ? 'My Day'
          : lensType == 'MY_TEAMS'
          ? 'My Teams'
          : 'My Notes'}
      </div>
      {lensType == 'MY_TEAMS' ? (
        <div
          title="Add Team"
          className="add-team-button mt5"
          onClick={() => setisMenuOpen(!isMenuOpen)}
        >
          <Icon icon="add" color="#808080" />
        </div>
      ) : null
      // (
      //   <div className="user">
      //     <UserAvatar
      //       user={get(user, 'attributes')}
      //       margin={0}
      //       size={24}
      //       tooltipText={false}
      //       color="#bbb"
      //       noPointer
      //     />
      //     <div className="name">{get(user, 'attributes.first_name')}</div>
      //   </div>
      // )
      }
      {lensType == 'MY_DAY' && <TimeframeSelector lensType="dayLens" />}
      {showOptions && isHome && (
        <span
          ref={dropdownRef}
          className="workspaceOptions"
          style={{ top: '40px' }}
        >
          <WorkspaceActionsDropdown />
        </span>
      )}

      {showOptions && !isHome && (
        <span
          ref={dropdownRef}
          className="topicOptions"
          style={{ top: '40px' }}
        >
          <TopicActionsDropdown
            color={card_font_color}
            topic={topic}
            cardsHidden={isCardsHidden}
            withoutAddImage
            noButton={true}
          />
        </span>
      )}
      {isMenuOpen && (
        <div style={{ position: 'absolute', left: '270px' }}>
          <MainFormPage
            selectedTab="group-pane"
            onClose={() => setisMenuOpen(!isMenuOpen)}
          />
        </div>
      )}
    </div>
  );
};

const mapState = state => {
  const {
    user,
    page: { topicId, isHome },
    utilities: { active_design },
    topics
  } = stateMappings(state);
  const currentDomain = getThisDomain(getDomains(state));
  const ui_settings = getUiSettings(state);
  const cardHidden = ui_settings.card_hidden;

  return {
    isHome,
    currentDomain,
    user,
    topicId,
    active_design,
    topic: topics[topicId],
    cardHidden
  };
};

export default connect(mapState)(GIDBFMyHeader);
