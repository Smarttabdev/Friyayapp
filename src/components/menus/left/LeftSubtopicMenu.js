import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { array, func, object, string } from 'prop-types';
import cn from 'classnames';
import { stateMappings } from 'Src/newRedux/stateMappings';

import { getSortedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { moveOrCopyTopicInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { setLeftSubtopicMenuOpenForTopic } from 'Src/newRedux/interface/menus/actions';

import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import DMLoader from 'Src/dataManager/components/DMLoader';
import Icon from 'Components/shared/Icon';
import IconButton from 'Components/shared/buttons/IconButton';
import LeftMenuNewTopicInput from './elements/LeftMenuNewTopicInput';
import LeftMenuTopicRow from './elements/LeftMenuTopicRow';
import withDataManager from 'Src/dataManager/components/withDataManager';
import MenuCloseSideBar from 'Components/menus/shared/MenuCloseSideBar';
import { setSelection } from '../../../actions/activity';
import TopicPathContainer from 'Components/shared/topics/elements/TopicPathContainer';
import { getUiSettings } from 'Src/helpers/user_config';
import Switch from '../../shared/ToggleSwitch';

const SubtopicPathElement = ({
  baseUrl,
  element,
  isFirst,
  isLast,
  isSelected,
  onAddSubtopic,
  onBackTrack,
  setLeftSubtopicMenuOpenForTopic,
  length,
  active_design
}) => {
  const { workspace_font_color } = active_design;
  return (
    <div
      className={`${
        isSelected
          ? 'left-subtopic-menu_path-element active-bg'
          : 'left-subtopic-menu_path-element'
      }`}
      onFocus={() => this.props.setSelection(false)}
    >
      <Link
        className={`${
          isSelected ? 'grey-link flex-1 active' : 'grey-link flex-1'
        }`}
        to={`${baseUrl}/boards/${element.slug}`}
      >
        <span
          style={{ color: workspace_font_color }}
          onFocus={() => this.props.setSelection(false)}
        >
          {element.title} {!isLast && ' /'}
        </span>
      </Link>
      {/* {isLast && ( */}
      <div
        className="flex-r-nowrap"
        onFocus={() => this.props.setSelection(false)}
      >
        {/* {!isFirst && ( */}
        <IconButton
          fontAwesome
          icon="arrow-left"
          onClick={onBackTrack}
          color={workspace_font_color}
        />
        {/* )} */}
        <IconButton
          fontAwesome
          icon="plus"
          onClick={onAddSubtopic}
          color={workspace_font_color}
        />
      </div>
      {/* )} */}
      {/* {isFirst && ( */}
      {/* <IconButton
        additionalIconClasses="small"
        fontAwesome
        icon="chevron-right"
        onClick={() => setLeftSubtopicMenuOpenForTopic(null)}
        style={length > 1 ? { marginTop: '0px' } : {}}
        color={workspace_font_color}
      /> */}
      {/* )} */}
    </div>
  );
};

class LeftSubtopicMenu extends PureComponent {
  static propTypes = {
    moveOrCopyTopicInOrToTopicFromDragAndDrop: func.isRequired,
    pageTopicSlug: string,
    rootUrl: string.isRequired,
    selectedTopic: object,
    subtopics: array.isRequired,
    setLeftSubtopicMenuOpenForTopic: func.isRequired
  };

  state = {
    displayAddTopic: false
  };

  UNSAFE_componentWillReceiveProps({ openQuickAddForm }) {
    this.setState({
      displayAddTopic: this.state.displayAddTopic || openQuickAddForm
    });
  }

  handleToggleNewTopicInput = () => {
    this.setState(state => ({ displayAddTopic: !state.displayAddTopic }));
  };

  handleBackTrack = () => {
    const { selectedTopic, setLeftSubtopicMenuOpenForTopic } = this.props;
    const path = selectedTopic.attributes.path;
    const targetPathElement = path[path.length - 2];
    setLeftSubtopicMenuOpenForTopic('' + targetPathElement.id); //for some reason this not a string
  };

  handleExpandToggle = topicId => {
    this.props.setLeftSubtopicMenuOpenForTopic(topicId, true);
  };

  render() {
    const {
      dmLoading,
      moveOrCopyTopicInOrToTopicFromDragAndDrop,
      pageTopicSlug,
      rootUrl,
      selectedTopic,
      subtopics,
      setLeftSubtopicMenuOpenForTopic,
      leftDocked,
      active_design,
      page
    } = this.props;
    const { displayAddTopic } = this.state;
    const baseUrl = rootUrl == '/' ? '' : rootUrl;
    const path = selectedTopic ? selectedTopic.attributes.path : [];
    const isBoardsPage = ['home', 'topics'].includes(page);
    const { workspace_font_color, workspace_background_color } = active_design;

    const isActiveDesign = !!workspace_background_color;
    return (
      <div
        style={{
          borderTop:
            !isBoardsPage && isActiveDesign && selectedTopic
              ? `1px double ${workspace_font_color}`
              : '',
          borderRight:
            !isBoardsPage && isActiveDesign && selectedTopic
              ? `1px double ${workspace_font_color}`
              : ''
        }}
        className={cn(
          selectedTopic ? 'left-subtopic-menu in-focus' : 'left-subtopic-menu',
          leftDocked && 'left-subtopic-menu--left-docked'
        )}
        onFocus={() => this.props.setSelection(false)}
      >
        {selectedTopic && (
          <Fragment>
            <div className="leftmenu-switch">
              <Switch
                // onClick={this.handleDismissMenu}
                onClick={() => setLeftSubtopicMenuOpenForTopic(null)}
                on={selectedTopic ? true : false}
                className="flex-r-center"
              />
            </div>
            <TopicPathContainer
              topic={selectedTopic}
              renderAncestor={(topic, index) => (
                <SubtopicPathElement
                  baseUrl={baseUrl}
                  element={topic.attributes}
                  key={topic.id}
                  isFirst={index == 0}
                  isLast={index == path.length - 1}
                  length={path.length}
                  isSelected={pageTopicSlug == topic.attributes.slug}
                  onBackTrack={this.handleBackTrack}
                  onAddSubtopic={this.handleToggleNewTopicInput}
                  setLeftSubtopicMenuOpenForTopic={
                    setLeftSubtopicMenuOpenForTopic
                  }
                  active_design={active_design}
                />
              )}
            />

            {displayAddTopic && (
              <LeftMenuNewTopicInput
                parentTopicId={selectedTopic.id}
                onDismiss={this.handleToggleNewTopicInput}
              />
            )}
            <GenericDragDropListing
              itemList={subtopics}
              dragClassName="left-menu_draggable-subtopic"
              dropClassName="left-menu_content-list b"
              draggedItemProps={{ origin: { topicId: selectedTopic.id } }}
              dropZoneProps={{ topicId: selectedTopic.id }}
              itemType={dragItemTypes.TOPIC_LEFT_MENU}
              onDropItem={moveOrCopyTopicInOrToTopicFromDragAndDrop}
              renderItem={subtopic => (
                <LeftMenuTopicRow
                  baseUrl={baseUrl}
                  key={subtopic.id}
                  isSelected={subtopic.slug == pageTopicSlug}
                  onCaretClick={() =>
                    setLeftSubtopicMenuOpenForTopic(subtopic.id)
                  }
                  topic={subtopic}
                  isExpanded={this.state.isExpanded}
                  onExpandToggle={this.handleExpandToggle}
                  leftPanel
                />
              )}
            >
              <DMLoader
                dataRequirements={{
                  subtopicsForTopic: { topicId: selectedTopic.id }
                }}
                loaderKey="subtopicsForTopic"
              />

              {subtopics.length == 0 && !dmLoading && (
                <div className="mt20 text-center pr15 btn-xs">
                  <span style={{ color: workspace_font_color }}>
                    {' '}
                    No Boards here yet{' '}
                  </span>
                </div>
              )}
            </GenericDragDropListing>
          </Fragment>
        )}
        <MenuCloseSideBar
          right
          onClick={() => setLeftSubtopicMenuOpenForTopic(null)}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const { openQuickAddForm, topicId } =
    sm.menus.displayLeftSubtopicMenuForTopic || {};
  const selectedTopic = sm.topics[topicId] || null;
  const uiSettings = getUiSettings(state);
  const { utilities, page } = sm;
  return {
    leftDocked: !!topicId && uiSettings.pinned_lenses_bar_visible,
    openQuickAddForm: openQuickAddForm,
    pageTopicSlug: sm.page.topicSlug,
    rootUrl: sm.page.rootUrl,
    page: page.page,
    selectedTopic: selectedTopic,
    subtopics: selectedTopic
      ? getSortedTopicsByParentTopic(state)[selectedTopic.id] || []
      : [],
    active_design: utilities.active_design
  };
};

const mapDispatch = {
  moveOrCopyTopicInOrToTopicFromDragAndDrop,
  setLeftSubtopicMenuOpenForTopic,
  setSelection
};

const dataRequirements = props => {
  return {
    subtopicsForTopic: {
      topicId: props.selectedTopic ? props.selectedTopic.id : null
    },
    topicWithSlug: {
      topicSlug: props.selectedTopic
        ? props.selectedTopic.attributes.slug
        : null
    }
  };
};

export default withDataManager(
  dataRequirements,
  mapState,
  mapDispatch
)(LeftSubtopicMenu);
