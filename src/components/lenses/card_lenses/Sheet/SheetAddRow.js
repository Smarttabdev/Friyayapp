import React, { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import IconButton from 'Components/shared/buttons/IconButton';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { getParsedColumn } from 'Lib/utilities';
import { sheetConfig } from './sheetConfig/index';
import { useClickOutside } from 'Lib/hooks';
import Dropdown from 'Components/shared/Dropdown';
import {
  cardTypes,
  boardTypes,
  getCardTypeAndIndex
} from 'src/components/shared/CardAndBoardTypes';
import cardLenses from 'Lib/config/lenses/cards';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import TypeDropdownList from '../TypeDropdownList';
import { stateMappings } from 'Src/newRedux/stateMappings';

const SheetAddRow = props => {
  const {
    type,
    cardTitle,
    boardTitle,
    onChangeTitle,
    onAdd,
    onFooterTopicSelected,
    columns,
    configureColumns,
    parentTopic,
    onClose,
    autoFocus,
    placeholder,
    noPlus,
    noTopicSelector,
    showTopicsSelector,
    mustSelectTopics,
    topicsListDropdownProps,
    style,
    customFields,
    tips,
    viewKey,
    initialCardType,
    sheetBorderStyle,
    activeFontColor,
    linkingBoards,
    allTopics,
    user, //it is a user or board
    linkedBoardsConfig
  } = props;
  const [addProcessing, setAddProcessing] = useState();
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedLinkBoards, setSelectedLinkBoards] = useState([]);
  const [showTopicDropdown, setShowTopicDropdown] = useState();
  const [hideTopicSelector, setHideTopicSelector] = useState(!mustSelectTopics);
  const [showCardTypes, setShowCardTypes] = useState(false);
  const [showBoardTypes, setShowBoardTypes] = useState(false);
  const [boardType, setBoardType] = useState({ type: null, index: 0 });
  const [cardType, setCardType] = useState(
    getCardTypeAndIndex(initialCardType)
  );
  const [showPickTopic, setShowPickTopic] = useState();
  const [showLinkingBoardPickTopic, setShowLinkingBoardPickTopic] = useState();
  const ref = useRef();

  const title = type == 'card' ? cardTitle : boardTitle;
  const canAdd =
    title && !addProcessing && (!mustSelectTopics || !!selectedTopics.length);

  useClickOutside(ref, () => {
    showTopicDropdown && setShowTopicDropdown(false);
    setShowCardTypes(false);
    setShowBoardTypes(false);
    setShowPickTopic(false);
    setShowLinkingBoardPickTopic(false);
    onClose && onClose();
  });

  useEffect(() => {
    if (initialCardType) return;
    const lensConfig = cardLenses[viewKey];
    if (!lensConfig) return;
    if (type == 'card') {
      cardTypes.find((item, i) => {
        if (item.type == (lensConfig.cardType || 'CARD')) {
          setCardType({ type: item.type, index: i });
          return true;
        }
      });
    } else {
      boardTypes.find((item, i) => {
        if (item.type == (lensConfig.boardType || null)) {
          setBoardType({ type: item.type, index: i });
          return true;
        }
      });
    }
  }, [type, viewKey]);

  useEffect(() => {
    if (!showTopicDropdown) {
      setSelectedTopics([]);
      onFooterTopicSelected && onFooterTopicSelected([]);
    }
  }, [showTopicDropdown]);

  useEffect(() => {
    const { getLinkedBoards = () => {} } = props;
    setSelectedLinkBoards(linkedBoardsConfig?.value || []);
    getLinkedBoards(linkedBoardsConfig?.value || []);
  }, [linkedBoardsConfig]);

  const handleAdd = async () => {
    if (!canAdd) return;
    setAddProcessing(true);
    await onAdd(type);
    setAddProcessing(false);
    if (type == 'card') {
      setSelectedTopics([]);
      setShowTopicDropdown(false);
      setHideTopicSelector(!mustSelectTopics);
    }
    onClose && onClose();
  };

  const handleKeyPress = async e => {
    e.persist();
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleAdd();
    }
  };

  const handleTitleKeyUp = e => {
    if (e.key === 'Escape') {
      onClose && onClose();
    }
  };

  const handleTitleFocus = () => {
    mustSelectTopics && setShowTopicDropdown(true);
  };

  const onInputBlur = () => {
    !mustSelectTopics &&
      setTimeout(() => {
        if (selectedTopics.length == 0) {
          setHideTopicSelector(true);
        }
      });
  };

  const onInputFocus = () => {
    setTimeout(() => {
      setHideTopicSelector(false);
    });
  };

  const handleTopicSelected = topics => {
    const list = topics.map(topic => ({ value: topic.id, label: topic.title }));
    onFooterTopicSelected && onFooterTopicSelected(list);
    setSelectedTopics(list);
  };

  const handleTopicsLinked = topics => {
    const list = topics.map(topic => ({ value: topic.id, label: topic.title }));
    mutations.setConfig({
      owner: toGid('Topic', user.value || 0),
      config: 'linked_boards',
      value: list
    });
  };

  const toggleSelectView = () => {
    setShowTopicDropdown(!showTopicDropdown);
    setHideTopicSelector(false);
  };

  const DropdownList = () => {
    return (
      <TypeDropdownList
        type={type}
        onCardClick={(cardType, i) => setCardType({ type: cardType, index: i })}
        onBoardClick={(boardType, i) =>
          setBoardType({ type: boardType, index: i })
        }
      />
    );
  };

  return (
    <div className="sheet-view__card sheet-view__add-row" ref={ref}>
      <div
        className="sheet-view__cell sheet-view__cell--title flex-r-center"
        style={{ ...style, ...sheetBorderStyle }}
      >
        {!noPlus && (
          <i
            className="input-plus-icon material-icons pt3"
            style={{
              cursor: canAdd ? 'pointer' : 'default',
              fontSize: '16px'
            }}
            onClick={canAdd ? handleAdd : undefined}
          >
            add
          </i>
        )}
        {type === 'card' && (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <IconButton
              outlined={cardTypes[cardType.index].outlined}
              icon={cardTypes[cardType.index].iconType}
              color={cardTypes[cardType.index].color}
              tooltip={cardTypes[cardType.index].label}
              tooltipOptions={{ place: 'bottom' }}
            />
            <Dropdown
              trigger={
                <IconButton
                  additionalClasses="dark-grey-icon-button"
                  fontSize={12}
                  fontAwesome
                  icon={!showCardTypes ? 'caret-down' : 'caret-up'}
                  onClick={() => setShowCardTypes(!showCardTypes)}
                />
              }
            >
              <DropdownList />
            </Dropdown>
          </span>
        )}

        {type === 'board' && (
          <span
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <IconButton
              outlined={boardTypes[boardType.index]?.outlined}
              fontAwesome={boardTypes[boardType.index]?.fontAwesome}
              icon={boardTypes[boardType.index].iconType}
              color={boardTypes[boardType.index].color}
              tooltip={boardTypes[boardType.index].label}
              tooltipOptions={{ place: 'bottom' }}
              fontSize={boardTypes[boardType.index]?.fontSize}
            />
            <Dropdown
              trigger={
                <IconButton
                  additionalClasses="dark-grey-icon-button"
                  fontSize={12}
                  fontAwesome
                  icon={!showBoardTypes ? 'caret-down' : 'caret-up'}
                  onClick={() => setShowBoardTypes(!showBoardTypes)}
                />
              }
            >
              <DropdownList />
            </Dropdown>
          </span>
        )}
        {viewKey == 'SHEET' && (
          <style
            dangerouslySetInnerHTML={{
              __html: `#boardCardInput::placeholder { color: ${activeFontColor} !important; }`
            }}
          />
        )}
        <input
          type="text"
          placeholder={placeholder || `Type ${type} title and hit enter`}
          onChange={({ target }) =>
            onChangeTitle(
              target.value,
              type === 'card' ? cardType.type : boardType.type
            )
          }
          value={title}
          onKeyPress={handleKeyPress}
          onKeyUp={handleTitleKeyUp}
          onFocus={handleTitleFocus}
          className="add-subtopic-input sheet-board-add-card-input"
          disabled={addProcessing}
          autoFocus={autoFocus}
          id={'boardCardInput'}
        />
        {canAdd && (
          <i className="input-add-icon material-icons mr20" onClick={handleAdd}>
            check
          </i>
        )}
        {addProcessing && <i className="fa fa-spinner fa-pulse mt6" />}
        {type == 'card' &&
          (parentTopic == undefined ||
            parentTopic == null ||
            showTopicsSelector) &&
          !noTopicSelector &&
          (!showTopicDropdown ? (
            <div
              onClick={toggleSelectView}
              style={{
                cursor: 'pointer',
                color: '#b8b8b8'
              }}
              className="select-board"
            >
              Select Board
            </div>
          ) : (
            <TopicsListDropdown
              additionalClasses="invite-form-dropdown-menu"
              actionButtonLabel="Share selected Boards"
              actionButtonHandler={handleTopicSelected}
              actionButtonClass="btn-primary"
              path={null}
              startAt={null}
              hideHeader
              inputMode="list"
              disallowCreate
              multiple
              hideAddTopicLink
              hideTopicSelector={hideTopicSelector}
              skipConfirmation
              onInputBlur={onInputBlur}
              onInputFocus={onInputFocus}
              domain={window.currentDomain}
              onSelectTopic={() => {}}
              selectedTopics={selectedTopics}
              showAddBoard
              {...topicsListDropdownProps}
            />
          ))}
        {type != 'card' && (
          <Fragment>
            <div
              onClick={() => setShowPickTopic(!showPickTopic)}
              style={{
                cursor: 'pointer',
                color: '#b8b8b8',
                fontSize: '12px'
              }}
              className="select-board no-wrap"
            >
              Pick a board
            </div>
            {showPickTopic && (
              <TopicsListDropdown
                additionalClasses="invite-form-dropdown-menu"
                actionButtonLabel="Share selected Boards"
                actionButtonHandler={() => {}}
                actionButtonClass="btn-primary"
                path={parentTopic?.attributes?.path?.concat({ id: 0 })}
                startAt={parentTopic?.attributes?.path && 0}
                hideHeader
                inputMode="list"
                disallowCreate
                multiple
                hideAddTopicLink
                skipConfirmation
                domain={window.currentDomain}
                onSelectTopic={() => {}}
                showAddBoard
                topicsSelectMenuProps={{ pickYourBoard: true }}
                extraStyle={{ top: 38, left: '75%' }}
                {...topicsListDropdownProps}
              />
            )}
            {linkingBoards && (
              <>
                <div
                  onClick={() =>
                    setShowLinkingBoardPickTopic(!showLinkingBoardPickTopic)
                  }
                  style={{
                    cursor: 'pointer',
                    color: '#b8b8b8',
                    fontSize: '12px',
                    marginLeft: 50
                  }}
                  className="select-board no-wrap ml5"
                >
                  Link a board
                </div>
                {showLinkingBoardPickTopic && (
                  <TopicsListDropdown
                    additionalClasses="invite-form-dropdown-menu"
                    actionButtonLabel="Share selected Boards"
                    actionButtonHandler={handleTopicsLinked}
                    selectedTopics={selectedLinkBoards}
                    actionButtonClass="btn-primary"
                    path={parentTopic?.attributes?.path?.concat({ id: 0 })}
                    startAt={parentTopic?.attributes?.path && 0}
                    hideHeader
                    inputMode="list"
                    disallowCreate
                    multiple
                    hideAddTopicLink
                    skipConfirmation
                    domain={window.currentDomain}
                    onSelectTopic={() => {}}
                    showAddBoard
                    extraStyle={{ top: 38, left: '90%' }}
                    {...topicsListDropdownProps}
                  />
                )}
              </>
            )}
          </Fragment>
        )}
      </div>
      {parentTopic != undefined &&
        parentTopic != null &&
        columns &&
        columns.map(column => {
          const parsedColumn = getParsedColumn(column, { customFields, tips });
          const cssModifier = parsedColumn.getValue('cssModifier');
          const cellClassNames = classNames('sheet-view__cell', {
            [`sheet-view__cell--${cssModifier}`]: cssModifier
          });

          return (
            <div
              key={column}
              className={cellClassNames}
              style={sheetBorderStyle}
            />
          );
        })}
      {parentTopic != undefined && parentTopic != null && configureColumns && (
        <div
          className="sheet-view__cell sheet-view__cell--add"
          style={sheetBorderStyle}
        />
      )}
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design },
    topics: allTopics
  } = sm;
  return {
    viewKey: getRelevantViewForPage(state),
    activeFontColor: active_design.card_font_color,
    allTopics
  };
};

export default connect(mapState)(
  QueryRenderer(SheetAddRow, {
    query: graphql`
      query SheetAddRowQuery($ownerId: ID!, $hasUser: Boolean!) {
        linkedBoardsConfig: config(owner: $ownerId, config: "linked_boards")
          @include(if: $hasUser) {
          value
        }
      }
    `,
    vars: ({ user }) => ({
      ownerId: toGid('Topic', user?.value || 0),
      hasUser: !!user
    })
  })
);
