import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import DMLoader from 'Src/dataManager/components/DMLoader';
import TimelineCard from './TimelineCard';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { getLabels } from 'Src/newRedux/database/labels/selectors';
import { PRIORITY_LEVELS } from 'Src/constants';
import IconButton from 'Components/shared/buttons/IconButton';
import Select from 'react-select';
import Icon from 'Components/shared/Icon';

const TimelineGridSection = ({
  columns,
  cards,
  columnWidth,
  rangeStart,
  rangeEnd,
  handleDrop,
  topicId,
  groupByOptions,
  cardRequirements,
  afterCardCreated,
  handleDropOverCard,
  level = 0,
  labels,
  peopleArray,
  previousCardRequirements = {},
  selectedOption = {},
  getReselectCustomStyles
}) => {
  const cardListRef = useRef(null);
  const [expanded, setExpanded] = useState(true);
  const [selectDropdownOptions, setSelectDropdownOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectorColor, setSelectorColor] = useState('#000');
  const [gridRowHeight, setGridRowHeight] = useState(150);
  const marginLeft = `${level * 20 + 10}px`;

  useEffect(() => {
    setSelectedOptions([]);
    if (groupByOptions.length >= level && groupByOptions[level]?.label) {
      const selectOption = getOptionForGroupby(groupByOptions[level].label);
      setSelectorColor(groupByOptions[level].color);
      setSelectDropdownOptions(selectOption);
    } else {
      setSelectDropdownOptions([]);
    }
  }, [groupByOptions]);

  useEffect(() => {
    if (cardListRef.current?.clientHeight > 0) {
      const rowHeight = cardListRef.current?.clientHeight;
      setGridRowHeight(rowHeight);
    }
  }, [cards, cardListRef.current?.clientHeight]);

  const getCardNewRequirements = (selectedGroupby, selectedOption) => {
    switch (selectedGroupby) {
      case 'Assignee': {
        return {
          ...previousCardRequirements,
          newCardRelationships: {
            ...previousCardRequirements?.newCardRelationships,
            tip_assignments: { data: [selectedOption.id] }
          }
        };
      }
      case 'Label': {
        return {
          ...previousCardRequirements,
          newCardRelationships: {
            ...previousCardRequirements?.newCardRelationships,
            labels: { data: [selectedOption.id] }
          }
        };
      }
      case 'Priority level': {
        return {
          ...previousCardRequirements,
          newCardAttributes: {
            ...previousCardRequirements?.newCardAttributes,
            priority_level: selectedOption.value
          }
        };
      }
    }
  };

  const getFilteredCards = (selectedGroupby, selectedOption) => {
    switch (selectedGroupby) {
      case 'Assignee': {
        let filteredCards = [];
        if (selectedOption.label == 'UnAssigned') {
          filteredCards = cards.filter(
            card => card.relationships?.tip_assignments?.data.length == 0
          );
        } else {
          filteredCards = cards.filter(card =>
            card.relationships?.tip_assignments?.data.includes(
              selectedOption.id
            )
          );
        }
        return filteredCards;
      }
      case 'Label': {
        let filteredCards = [];
        if (selectedOption.label == 'UnAssigned') {
          filteredCards = cards.filter(
            card => card.relationships?.labels?.data.length == 0
          );
        } else {
          filteredCards = cards.filter(card =>
            card.relationships?.labels?.data.includes(selectedOption.id)
          );
        }
        return filteredCards;
      }
      case 'Priority level': {
        let filteredCards = [];
        if (selectedOption.label == 'UnAssigned') {
          filteredCards = cards.filter(
            card => card.attributes?.priority_level != null
          );
        } else {
          filteredCards = cards.filter(
            card => card.attributes?.priority_level == selectedOption.label
          );
        }
        return filteredCards;
      }
      default:
        return cards;
    }
  };

  const getCardRequirements = (selectedGroupby, selectedOption) => {
    switch (selectedGroupby) {
      case 'Assignee': {
        return {
          ...cardRequirements,
          assignedId: selectedOption.id
        };
      }

      case 'Label': {
        return {
          ...cardRequirements,
          labelId: selectedOption.id
        };
      }

      case 'Priority level': {
        return {
          ...cardRequirements,
          priorityLabel: selectedOption.label
        };
      }
    }
  };
  const getOptionForGroupby = selectedGroupby => {
    switch (selectedGroupby) {
      case 'Assignee': {
        const assigneeArray = peopleArray.map(item => ({
          id: item.id,
          label: item.attributes.name,
          value: item.attributes.name,
          color: '#56CCF2'
        }));
        assigneeArray.push({
          id: null,
          label: 'UnAssigned',
          value: 'UnAssigned',
          color: '#56CCF2'
        });
        return assigneeArray;
      }
      case 'Priority level': {
        const priorityArray = PRIORITY_LEVELS.map(item => ({
          id: item.id,
          value: item.level,
          label: item.level,
          color: item.color
        }));
        priorityArray.push({
          id: null,
          label: 'UnAssigned',
          value: 'UnAssigned',
          color: '#F256D9'
        });
        return priorityArray;
      }
      case 'Label': {
        const keys = Object.keys(labels);
        let labelArray = keys.map(key => ({
          id: labels[key].id,
          label: labels[key].attributes.name,
          value: labels[key].attributes.name,
          color:
            labels[key].attributes.color == 0
              ? '#aaa'
              : labels[key].attributes.color
        }));
        labelArray.push({
          id: null,
          label: 'UnAssigned',
          value: 'UnAssigned',
          color: '#6EC18B'
        });
        return labelArray;
      }
      default:
        return [];
    }
  };
  const expandCardsSection = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      {selectedOption.label && (
        <div
          className="timeline__groupby-title"
          style={{
            marginLeft: `${(level - 1) * 20 + 10}px`,
            backgroundColor: selectedOption.color
          }}
        >
          <IconButton
            fontAwesome
            icon={expanded ? 'caret-down' : 'caret-right'}
            onClick={() => expandCardsSection()}
            containerStyle={{
              width: 'initial',
              marginRight: '10px'
            }}
            center={false}
            color="#fff"
          />
          <span className={'timeline__groupby-title-text'}>
            {selectedOption.label}
          </span>
        </div>
      )}
      <div
        className={expanded ? 'timeline-cards__show' : 'timeline-cards__hide'}
        style={groupByOptions.length < 1 ? { flexGrow: 1 } : {}}
      >
        {groupByOptions[level] && selectedOptions.length > 0 ? (
          selectedOptions.map(selectedOption => (
            <ConnectedTimelineGridSection
              key={selectedOption.id}
              columns={columns}
              columnWidth={columnWidth}
              cards={getFilteredCards(
                groupByOptions[level].label,
                selectedOption
              )}
              selectedOption={selectedOption}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              topicId={topicId}
              afterCardCreated={afterCardCreated}
              cardRequirements={getCardRequirements(
                groupByOptions[level].label,
                selectedOption
              )}
              previousCardRequirements={getCardNewRequirements(
                groupByOptions[level].label,
                selectedOption
              )}
              handleDropOverCard={handleDropOverCard}
              handleDrop={handleDrop}
              groupByOptions={groupByOptions}
              getReselectCustomStyles={getReselectCustomStyles}
              level={level + 1}
            />
          ))
        ) : (
          <Fragment>
            <div
              className="timeline-grid__row"
              style={
                groupByOptions.length > 0
                  ? {
                      height:
                        gridRowHeight > 150 ? `${gridRowHeight}px` : '150px'
                    }
                  : { flexGrow: 1 }
              }
            >
              <div className="timeline-grid__columns">
                {columns.map((col, i) => (
                  <div key={i} className="timeline-grid__cell">
                    <GenericDropZone
                      key={i}
                      dropClassName="timeline-grid__drop-zone-guide"
                      itemType={dragItemTypes.CARD}
                      onDrop={() => {}}
                    />
                  </div>
                ))}
              </div>
              <div className="timeline-grid__drop-zones">
                {columns.map((col, i) => (
                  <GenericDropZone
                    key={i}
                    dropClassName="timeline-grid__drop-zone"
                    startDate={col.range[0]}
                    dueDate={col.range[1]}
                    newAttributes={
                      previousCardRequirements?.newCardAttributes || {}
                    }
                    newRelationships={
                      previousCardRequirements?.newCardRelationships || {}
                    }
                    itemType={dragItemTypes.CARD}
                    onDrop={handleDrop}
                  />
                ))}
              </div>
              <div
                className="timeline-grid__cards"
                style={{
                  display: 'block',
                  maxHeight: groupByOptions.length > 0 ? '320px' : '100%'
                }}
                ref={cardListRef}
              >
                {cards.map(card => {
                  return (
                    <TimelineCard
                      key={card.id}
                      card={card}
                      className="timeline-grid__card"
                      column={columns}
                      columnWidth={columnWidth}
                      topicId={topicId}
                      onDropOverCard={handleDropOverCard}
                    />
                  );
                })}
                <DMLoader
                  dataRequirements={{
                    cardsWithAttributes: {
                      attributes: {
                        ...cardRequirements,
                        dueDateFrom: moment(rangeStart).toISOString(),
                        startOrDueDateTo: moment(rangeEnd).toISOString()
                      }
                    }
                  }}
                  loaderKey="cardsWithAttributes"
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', flexGrow: 1 }}>
                  {columns.map((col, i) => (
                    <AddCardCard
                      key={i}
                      cardClassName="timeline-grid__add-card"
                      containerStyle={{ flexBasis: `${columnWidth}%` }}
                      newCardAttributes={{
                        due_date: col.range[1],
                        start_date: col.range[0],
                        ...(previousCardRequirements?.newCardAttributes || {})
                      }}
                      newCardRelationships={
                        previousCardRequirements?.newCardRelationships || {}
                      }
                      topicId={topicId}
                      afterCardCreated={afterCardCreated}
                      useCardFontColor
                      transparent
                      topMenu
                    />
                  ))}
                </div>
              </div>
            </div>
          </Fragment>
        )}
        {expanded && groupByOptions.length > level && (
          <div className="timeline-grid__selector" style={{ marginLeft }}>
            <Icon
              containerClasses={'add_icon'}
              containerStyle={{ backgroundColor: selectorColor }}
              color={'#fff'}
              style={{ padding: '0 10px' }}
              icon="add"
            />
            <Select
              menuPlacement="auto"
              value={selectedOptions}
              isMulti
              defaultValue={[selectDropdownOptions[0]]}
              onChange={selectedOptions => setSelectedOptions(selectedOptions)}
              options={selectDropdownOptions}
              styles={getReselectCustomStyles(level, selectorColor)}
              placeholder={`Select a ${groupByOptions[level].label}`}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapState = state => ({
  peopleArray: getPeopleArray(state),
  labels: state._newReduxTree.database.labels
});

const ConnectedTimelineGridSection = connect(mapState)(TimelineGridSection);

export default ConnectedTimelineGridSection;
