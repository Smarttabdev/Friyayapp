import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import TopicsSelectMenu from './topics_select_menu';

class TopicsListDropdown extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  static propTypes = {
    actionButtonLabel: PropTypes.string,
    actionButtonHandler: PropTypes.func,
    actionButtonClass: PropTypes.string,
    hasInput: PropTypes.bool,
    path: PropTypes.array,
    startAt: PropTypes.string,
    isCollapsed: PropTypes.bool
  };

  static defaultProps = {
    hasInput: true,
    startAt: null,
    path: [],
    isCollapsed: false
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideWorkspaceDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element || !document.contains(element)) {
        removeClickListener();
        return;
      }
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.props.onInputBlur();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  render() {
    const {
      additionalClasses,
      hasInput,
      path,
      startAt,
      actionButtonClass,
      actionButtonLabel,
      actionButtonHandler,
      isCollapsed,
      hideHeader,
      hideTopicsSelectMenuInput,
      inputMode,
      disallowCreate,
      multiple,
      isRequired,
      hideAddTopicLink,
      hideTopicSelector,
      skipConfirmation,
      onInputFocus,
      onInputBlur,
      domain,
      selectedTopics,
      extraStyle,
      showAddBoard,
      tagged,
      newTopicRelationships
    } = this.props;
    return (
      <div
        className={cx(
          'dropdown-menu',
          'topics-list-dropdown',
          'stay-open',
          additionalClasses
        )}
        ref={this.containerRef}
        style={extraStyle}
      >
        <div className="panel-body">
          <TopicsSelectMenu
            selectTitle="Select a destination Board to move to"
            multiple={multiple}
            hasInput={hasInput}
            path={path}
            startAt={startAt}
            selectedTopics={selectedTopics || []}
            actionButtonLabel={actionButtonLabel}
            actionButtonHandler={actionButtonHandler}
            actionButtonClass={actionButtonClass}
            isCollapsed={isCollapsed}
            hideHeader={hideHeader}
            hideTopicsSelectMenuInput={hideTopicsSelectMenuInput}
            inputMode={inputMode}
            disallowCreate={disallowCreate}
            hideAddTopicLink={hideAddTopicLink}
            isRequired={isRequired}
            hideTopicSelector={hideTopicSelector}
            skipConfirmation={skipConfirmation}
            onInputBlur={onInputBlur}
            onInputFocus={onInputFocus}
            domain={domain}
            onChange={this.props.onChange}
            onSelectTopic={this.props.onSelectTopic}
            showAddBoard={showAddBoard}
            isNotes={this.props.isNotes}
            isMyNotes={this.props.isMyNotes}
            boardTypeSmallModal={this.props.boardTypeSmallModal}
            selectAllSubboards={this.props.selectAllSubboards}
            tagged={tagged}
            newTopicRelationships={newTopicRelationships}
            {...this.props.topicsSelectMenuProps}
          />
        </div>
      </div>
    );
  }
}

export default TopicsListDropdown;
