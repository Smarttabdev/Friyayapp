import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import Icon from 'Components/shared/Icon';
import { getCardTypeIconAttribute } from 'Src/utils/icons';
import Dropdown from 'Components/shared/Dropdown';
import Tooltip from 'Components/shared/Tooltip';

const DayColumnCell = ({
  addOnClick,
  hour,
  day,
  topicId,
  onClickAddCard,
  createHandleCellClick,
  i,
  filteredCards,
  handleDropCard,
  loadingCells
}) => {
  const [showFilteredCards, setShowFilteredCards] = useState(false);
  const dayColumnRef = useRef({});
  const [isShown, setIsShown] = useState(false);
  const forId = Math.ceil(Math.random() * 100000, 6);
  const [dropdownDimensions, setDropdownDimensions] = useState({});
  const [windowDimensions, setWindowDimensions] = useState({});

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setWindowDimensions({ width, height });
  }, []);

  const handleAddNewCard = cardId => {
    onClickAddCard(cardId, day, hour.startMinute);
    setShowFilteredCards(false);
  };

  const handleClick = () => {
    const dimensions = dayColumnRef.current
      ? dayColumnRef.current.getBoundingClientRect()
      : {};
    const x =
      dimensions.x + 300 > windowDimensions.width
        ? dimensions.x + (dimensions.width - 40) - 300
        : dimensions.x + (dimensions.width - 40);
    const y =
      dimensions.y + 300 > windowDimensions.height
        ? dimensions.y - 300
        : dimensions.y;
    setDropdownDimensions({ x: x, y: y });
    setShowFilteredCards(!showFilteredCards);
  };

  const renderNothing = () => null;
  return (
    <div
      className={cn('day-column-cell', addOnClick && 'day-column-cell--add')}
      ref={dayColumnRef}
      key={hour.text}
      onClick={
        addOnClick &&
        createHandleCellClick({
          day: day,
          startMinute: hour.startMinute,
          cellId: i
        })
      }
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {isShown && !addOnClick && (
        <Dropdown
          trigger={
            <div
              className={'day-column__trigger'}
              data-tip={'Add Card'}
              data-for={forId}
            >
              <Icon
                color={'#6FCF97'}
                icon={'add_circle'}
                additionalClasses="plus-icon"
                onClick={handleClick}
              />
              <Tooltip {...{ place: 'bottom' }} id={forId} />
            </div>
          }
          closeOnClick={false}
          open={showFilteredCards}
          onOpen={() => setShowFilteredCards(true)}
          onClose={() => setShowFilteredCards(false)}
          className="day-column-dropdown"
          MenuComponent="div"
          menuStyle={{
            position: 'fixed',
            left: dropdownDimensions.x,
            top: dropdownDimensions.y,
            overflow: 'auto',
            width: 300,
            height: 320
          }}
        >
          <h3 className={'day-column-dropdown__header'}>Available cards </h3>
          <AddCardCard
            containerStyle={{
              display: 'inline-block',
              marginLeft: 0,
              marginBottom: '5px'
            }}
            topicId={topicId}
            afterCardCreated={handleAddNewCard}
            topMenu
          />
          <li role="separator" className="menu-divider" />
          {filteredCards.map(card => (
            <Fragment key={card.id}>
              <li
                className="popup-card"
                onClick={() => handleAddNewCard(card.id)}
              >
                <Icon
                  color={
                    getCardTypeIconAttribute(card?.attributes?.card_type)
                      .defaultColor || '#56CCF2'
                  }
                  icon={
                    getCardTypeIconAttribute(card?.attributes?.card_type)
                      .icon || 'featured_play_list'
                  }
                  outlined
                  containerClasses="mr5"
                />
                <div className="popup-card__title">{card.attributes.title}</div>
              </li>
              <li role="separator" className="menu-divider" />
            </Fragment>
          ))}
        </Dropdown>
      )}
      {loadingCells.includes(i) && (
        <i className="planning-grid__cell-spinner fa fa-spinner fa-pulse" />
      )}
      <GenericDragDropListing
        dragClassName=""
        dropClassName="planning-grid__drop-zone"
        dropZoneProps={{ day: day, startMinute: hour.startMinute }}
        draggedItemProps={{}}
        itemContainerClassName=""
        itemList={[]}
        renderItem={renderNothing}
        itemType={dragItemTypes.CARD}
        onDropItem={handleDropCard}
      ></GenericDragDropListing>
    </div>
  );
};

export default DayColumnCell;
