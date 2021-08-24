import React, { Fragment, useState, useEffect } from 'react';
import TimelineCard from './TimelineCard';
import IconButton from 'Components/shared/buttons/IconButton';
import Select from 'react-select';
import chroma from 'chroma-js';
import { capitalize, flatten } from 'lodash';

const TimelineSection = props => {
  const {
    card,
    columns,
    columnWidth,
    onFilterCard,
    level = 0,
    getReselectCustomStyles
  } = props;
  const [expanded, setExpanded] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const cardType = card.type;
  let childCards = card?.relationships?.nested_tips?.data;
  const selectorColor =
    childCards[0]?.attributes?.view?.backgroundColor || '#000';
  const marginLeft = `${level * 20}px`;
  let selectGroupby = [];
  let subchildCards;
  let selectedGroupby = '';
  useEffect(() => {
    if (cardType == 'groupby' && childCards[0]?.type == 'groupby') {
      const selectOptions = childCards.map(card => {
        const values = Object.values(card?.groupByPath);
        return {
          value: values[level + 1],
          label: capitalize(values[level + 1]),
          color: card?.attributes?.view?.backgroundColor
        };
      });
      setOptions(selectOptions);
    }

    if (childCards[0]?.type == 'tip_details') {
      childCards = childCards.filter(card => onFilterCard({ columns }, card));
    }
  }, [card]);

  // Function below determines all the cards to show when no specific select option is there.
  const allCardsFromChildGroupby = cards => {
    const allCards = cards.map(card => {
      const childCards = card?.relationships?.nested_tips?.data;
      if (childCards[0]?.type == 'groupby') {
        return allCardsFromChildGroupby(childCards);
      } else {
        return childCards;
      }
    });
    return flatten(allCards);
  };

  if (cardType == 'groupby' && childCards[0]?.type == 'groupby') {
    selectedGroupby = Object.keys(childCards[0]?.groupByPath)[level + 1];
    const selectedGroupbyOptions = selectedOptions.map(option => option.value);
    selectGroupby = childCards.filter(childCard =>
      selectedGroupbyOptions.includes(childCard.groupByPath[selectedGroupby])
    );
    subchildCards =
      selectedOptions.length < 1 && allCardsFromChildGroupby(childCards);
  }

  const expandCardsSection = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="timeline-section">
      <div
        className="timeline__groupby-title"
        style={{ ...card.attributes.view, marginLeft, borderRadius: '12px' }}
      >
        <IconButton
          fontAwesome
          icon={expanded ? 'caret-down' : 'caret-right'}
          onClick={() => expandCardsSection()}
          containerStyle={{
            width: 'initial',
            marginRight: '5px'
          }}
          center={false}
          color="#fff"
        />
        <span>{card.attributes.title}</span>
      </div>
      <div
        className={expanded ? 'timeline-cards__show' : 'timeline-cards__hide'}
      >
        {cardType == 'groupby' && childCards[0]?.type == 'groupby' ? (
          <Fragment>
            {selectedOptions.length > 0 ? (
              selectGroupby.map(card => (
                <TimelineSection
                  key={card.id}
                  card={card}
                  className="timeline-grid__card"
                  columns={columns}
                  columnWidth={columnWidth}
                  topicId={props.topicId}
                  onDropOverCard={props.onDropOverCard}
                  onFilterCard={onFilterCard}
                  getReselectCustomStyles={getReselectCustomStyles}
                  level={level + 1}
                />
              ))
            ) : (
              <div
                className="mx20 my10"
                style={{ marginLeft: marginLeft }}
              >{`Please select a ${selectedGroupby.replace(/_/g, ' ')}`}</div>
            )}
            <Select
              value={selectedOptions}
              isMulti
              defaultValue={[options[0]]}
              onChange={selectedOptions => setSelectedOptions(selectedOptions)}
              options={options}
              style={{ ...card.attributes.view, marginLeft }}
              styles={getReselectCustomStyles(level, selectorColor)}
              placeholder={`Select a ${selectedGroupby.replace(/_/g, ' ')}`}
            />
          </Fragment>
        ) : (
          childCards.map(card => {
            return (
              <TimelineCard
                key={card.id}
                card={card}
                className="timeline-grid__card"
                column={columns}
                columnWidth={columnWidth}
                topicId={props.topicId}
                onDropOverCard={props.handleDropOverCard}
                level={level + 1}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TimelineSection;
