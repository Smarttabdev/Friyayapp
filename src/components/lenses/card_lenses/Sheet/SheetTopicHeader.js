import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component, Fragment, useMemo } from 'react';
import { connect } from 'react-redux';

import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import TopicActionsDropdown from 'Components/shared/topics/elements/TopicActionsDropdown';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import TopicTitleLink from 'Src/components/shared/topics/elements/TopicTitleLink';
import { sheetConfig } from './sheetConfig/index';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import IconButton from 'Components/shared/buttons/IconButton';
import { moveTopicContents } from 'Src/newRedux/database/topics/thunks';
import { viewTopic, updateTopic } from 'Src/newRedux/database/topics/thunks';
import { getParsedColumn } from 'Lib/utilities';
import Icon from 'Src/components/shared/Icon';

const Column = ({
  column,
  customFields,
  tips,
  topic,
  isExpanded,
  columnState,
  cards,
  updateTopic,
  onChange,
  sheetBorderStyle
}) => {
  // should render empty div when !expanded in order to keep the grid
  const parsedColumn = useMemo(() => {
    return getParsedColumn(column, {
      customFields,
      tips
    });
  }, [column, customFields, tips]);

  const config = parsedColumn.config;
  const cssModifier = parsedColumn.getValue('cssModifier');
  const cellClassNames = classNames('sheet-view__cell', {
    [`sheet-view__cell--${cssModifier}`]: cssModifier
  });
  const ColumnComponent = config.Component || null;
  return (
    <div key={column} className={cellClassNames} style={sheetBorderStyle}>
      {[
        'assignee',
        'start_date',
        'due_date',
        'priority',
        'confidence_range',
        'creation_date',
        'days_left',
        'duration',
        'speed'
      ].includes(column) ? (
        ColumnComponent ? (
          <ColumnComponent
            topic={topic}
            parsedColumn={parsedColumn}
            handleValueUpdate={updateTopic}
          />
        ) : (
          config.render(
            topic,
            // { card: topic },
            columnState,
            onChange,
            updateTopic,
            parsedColumn,
            { isTopic: true }
          )
        )
      ) : column == 'boards' ? (
        <ColumnComponent
          currentTopic={topic}
          parsedColumn={parsedColumn}
          handleValueUpdate={updateTopic}
        />
      ) : (
        !isExpanded && config.renderSummary(cards, parsedColumn, topic)
      )}
    </div>
  );
};

class SheetTopicHeader extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    configureColumns: PropTypes.bool.isRequired,
    isExpanded: PropTypes.bool,
    level: PropTypes.number.isRequired,
    topic: PropTypes.object.isRequired,
    onAddCardOrSubtopic: PropTypes.func.isRequired,
    onTopicExpand: PropTypes.func.isRequired,
    disableModalAdd: PropTypes.bool,
    disabledModalAddHandler: PropTypes.func
  };

  static defaultProps = {
    disableModalAdd: false
  };

  state = { isEditing: false, timeoutID: null };

  handleToggleEditMode = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleDrop = itemProps => {
    if (itemProps.draggedItemProps.itemType === dragItemTypes.TOPIC) {
      if (itemProps.draggedItemProps.item.id !== this.props.topic.id) {
        this.props.moveTopicContents({
          destinationTopicId: this.props.topic.id,
          topicId: itemProps.draggedItemProps.item.id
        });
      }
    }
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  handleExpand = () => this.props.onTopicExpand(this.props.topic.id);

  handleDragEnter = () =>
    !this.props.isExpanded && this.props.onTopicExpand(this.props.topic.id);

  getClickHandler = () => {
    const { timeoutID } = this.state;
    const { viewTopic, topic, onViewTopic } = this.props;
    const delay = 250;
    if (onViewTopic) {
      return onViewTopic(topic);
    }
    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          viewTopic({ topicSlug: topic.attributes.slug });
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
    }
  };

  updateTopic = updates => {
    const { updateTopic, topic } = this.props;
    updateTopic({ id: topic.id, ...updates });
  };

  render() {
    const {
      level,
      topic,
      isExpanded,
      onTopicExpand,
      color,
      disableModalAdd,
      disabledModalAddHandler,
      customFields,
      sheetBorderStyle,
      tips
    } = this.props;
    const iconProps = topic.attributes.tag_list.includes('goal')
      ? {
          icon: 'flag',
          outlined: true,
          color: '#56CCF2'
        }
      : topic.attributes.tag_list.includes('project')
      ? {
          icon: 'category',
          outlined: true,
          color: '#EB5757'
        }
      : topic.attributes.tag_list.includes('notes')
      ? {
          icon: 'vertical_split',
          outlined: true,
          color: '#6FCF97',
          fontSize: 18
        }
      : topic.attributes.tag_list.includes('file')
      ? {
          icon: 'ballot',
          outlined: true,
          color: '#5C5DB9'
        }
      : topic.attributes.tag_list.includes('knowledge')
      ? {
          icon: 'chrome_reader_mode',
          outlined: true,
          color: '#EEDB88'
        }
      : topic.attributes.tag_list.includes('task')
      ? {
          icon: 'calendar_today',
          outlined: true,
          color: '#EAA971'
        }
      : topic.attributes.tag_list.includes('data')
      ? {
          icon: 'bubble_chart',
          outlined: true,
          color: '#eb98cf'
        }
      : {
          icon: 'hashtag',
          color: '#9B51E0'
        };

    return (
      <GenericDropZone
        dropsDisabled
        itemType={dragItemTypes.CARD}
        onDragEnter={this.handleDragEnter}
      >
        <div className="sheet-view__topic-header project-plan-board">
          <div
            className="sheet-view__cell sheet-view__cell--title"
            style={{
              paddingLeft: `${(level - 1) * 20 + 7}px`,
              ...sheetBorderStyle
            }}
          >
            {this.state.isEditing ? (
              <TopicTitleEditor
                topic={topic}
                onFinishEditing={this.handleToggleEditMode}
              />
            ) : (
              <Fragment>
                <div className="sheet-view__title-wrapper">
                  <GenericDropZone
                    dropClassName="nest-card-zone"
                    onDragStart={e => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    itemType={dragItemTypes.TOPIC}
                    onDrop={this.handleDrop}
                    key="nest-zone"
                  >
                    <div className="nest-zone">
                      <IconButton
                        color={color}
                        additionalClasses="sheet-card__nested-cards-caret dark-grey-icon-button"
                        fontAwesome
                        icon={isExpanded ? 'caret-down' : 'caret-right'}
                        onClick={this.handleExpand}
                      />
                    </div>
                  </GenericDropZone>
                  <Icon
                    style={{
                      paddingLeft: '5px'
                    }}
                    {...iconProps}
                  />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TopicTitleLink
                      additionalClasses="sheet-view__topic-title ml10"
                      topic={topic}
                      onClick={this.getClickHandler}
                    />
                  </div>
                  <IconButton
                    color={color}
                    additionalClasses="sheet-view__topic-title-edit-btn"
                    fontAwesome
                    icon="pencil"
                    onClick={this.handleToggleEditMode}
                  />
                  <AddCardOrSubtopic
                    disabledModalAddHandler={disabledModalAddHandler}
                    disableModalAdd={disableModalAdd}
                    color={color}
                    displayAddCardButton
                    displayAddSubtopicButton
                    addBothText=" "
                    topic={topic}
                    handleAddCardOrSubtopic={this.props.onAddCardOrSubtopic}
                    returnBoardType={this.props.addBoardReturnBoardType}
                    returnCardType={this.props.addCardReturnCardType}
                  />
                </div>
                <TopicActionsDropdown
                  color={color}
                  topic={topic}
                  onRenameTopicSelected={this.handleToggleEditMode}
                />
              </Fragment>
            )}
          </div>
          {this.props.columns &&
            this.props.columns.map(column => (
              <Column
                key={column}
                column={column}
                customFields={customFields}
                tips={tips}
                topic={topic}
                isExpanded={isExpanded}
                columnState={this.state[column]}
                cards={this.props.cards}
                updateTopic={this.updateTopic}
                sheetBorderStyle={sheetBorderStyle}
                onChange={val => this.setState({ [column]: val })}
              />
            ))}
          {this.props.configureColumns && (
            <div
              className="sheet-view__cell sheet-view__cell--add"
              style={sheetBorderStyle}
            />
          )}
        </div>
      </GenericDropZone>
    );
  }
}

const mapDispatch = {
  moveTopicContents,
  viewTopic,
  updateTopic
};

export default connect(undefined, mapDispatch)(SheetTopicHeader);
