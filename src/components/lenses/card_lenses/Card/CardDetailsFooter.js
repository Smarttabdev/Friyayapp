import React, { Component, useState, useRef } from 'react';
import { object } from 'prop-types';
import IconButton from 'Components/shared/buttons/IconButton';
import Icon from 'Components/shared/Icon';
import Tooltip from 'Components/shared/Tooltip';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import { connect } from 'react-redux';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import Ability from 'Lib/ability';
import { useOutsideAlerter } from 'Src/lib/hooks';
import { PulseComponent } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/pulse';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import GetHelp from 'src/components/shared/GetHelp';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';

const EditButton = ({
  inEditMode,
  card,
  cardFontColor,
  onEditClick,
  onSaveClick
}) => {
  const forId = Math.ceil(Math.random() * 100000, 6);
  return (
    <div data-tip={inEditMode ? 'Save' : 'Edit'} data-for={forId}>
      {Ability.can('update', 'self', card) && (
        <IconButton
          additionalClasses="yellow-hover-link"
          style={{ color: '#58cbf2', fontSize: '28px' }}
          icon={inEditMode ? 'save' : 'edit'}
          onClick={inEditMode ? onSaveClick : onEditClick}
        />
      )}
      <Tooltip {...{ place: 'bottom' }} id={forId} />
    </div>
  );
};

const RenderDots = ({
  card,
  cardFontColor,
  onAddCard,
  handleShowHide,
  showIcons,
  inEditMode,
  filterOptions
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setDropdownIsOpen(false));
  const forId = Math.ceil(Math.random() * 100000, 6);

  return !card ? null : (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <div
        data-tip={'Settings'}
        data-for={forId}
        className="dots-container"
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
      >
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
        <Tooltip {...{ place: 'bottom' }} id={forId} />
      </div>
      <CardActionsDropdown
        card={card}
        parentStyle={{
          top: '0',
          zIndex: '9999',
          position: 'absolute',
          width: '100%'
        }}
        extraMenuStyle={{ top: filterOptions ? '-1040%' : '-1620%' }}
        style={{ color: cardFontColor, visibility: 'hidden' }}
        onAddCard={onAddCard}
        additionalClasses="medium yellow-hover-link"
        filterOptions={filterOptions}
      >
        {card && (
          <a className="dropdown-option-item" onClick={() => window.print()}>
            Print
          </a>
        )}
        {!inEditMode && (
          <a className="dropdown-option-item" onClick={handleShowHide}>
            {showIcons ? 'Hide Icons' : 'Show Icons'}
          </a>
        )}
      </CardActionsDropdown>
    </div>
  );
};

const MoreOptions = connect(undefined, { setEditCardModalOpen })(
  ({ setEditCardModalOpen, cardId, onAddCard, onUploadFile }) => {
    const [options, setOptions] = useState([
      {
        title: 'Upload a file',
        onClick:
          onUploadFile ??
          (() =>
            setEditCardModalOpen({
              cardId,
              tab: 'Edit',
              openFileUploader: true
            }))
      },
      { title: 'Add a nested Card', onClick: onAddCard }
    ]);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const forId = Math.ceil(Math.random() * 100000, 6);
    useOutsideAlerter(wrapperRef, () => setDropdownIsOpen(false));

    return (
      <div ref={wrapperRef} style={{ position: 'relative' }}>
        <a
          className="dropdown-toggle add-card-or-subtopic_button add_button"
          onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
          data-tip={'More Options'}
          data-for={forId}
        >
          <Icon
            color="#6FCF97"
            icon="add_circle"
            additionalClasses="plus-icon"
          />
          <Tooltip {...{ place: 'bottom' }} id={forId} />
        </a>
        {dropdownIsOpen && (
          <div
            className="dropdown-menu"
            style={{
              display: dropdownIsOpen ? 'block' : 'none',
              minWidth: 'initial',
              left: !cardId ? '-400%' : '-570%',
              top: !cardId ? '-270%' : '-375%'
            }}
          >
            {options
              .filter((val, i) => (!cardId ? i == 0 : true))
              .map((option, i) => (
                <a key={i} onClick={option.onClick}>
                  <div className="dropdown-option-item">{option.title}</div>
                </a>
              ))}
          </div>
        )}
      </div>
    );
  }
);

class CardDetailsFooter extends Component {
  renderDots = () => {
    return (
      <RenderDots
        card={this.props.card}
        cardFontColor={this.props.cardFontColor}
        onAddCard={this.props.onAddCard}
        handleShowHide={this.props.handleShowHide}
        showIcons={this.props.showIcons}
        filterOptions={this.props.filterOptions}
        inEditMode={this.props.inEditMode}
      />
    );
  };

  renderEditButton = () => (
    <EditButton
      onEditClick={this.props.onEditClick}
      onSaveClick={this.props.onSaveClick}
      inEditMode={this.props.inEditMode}
      card={this.props.card}
      cardFontColor={this.props.cardFontColor}
    />
  );

  renderMoreOptions = () => (
    <MoreOptions
      cardId={this.props.card?.id}
      onAddCard={this.props.onAddCard}
      onUploadFile={this.props.onUploadFile}
    />
  );

  handleValueUpdate = updates => {
    this.props.updateCard({ id: this.props.card.id, ...updates });
  };

  render() {
    const { card, hideComments } = this.props;
    return [
      <div
        key="for-full-screen" //FOR FULL SCREEN
        className="card-details-footer hide-for-split-screen-board"
      >
        {/* {card && ( */}
        <h4
          onClick={() => this.props.toggleComments()}
          className="comments-list_title"
        >
          <IconButton
            additionalClasses="caret-down"
            fontAwesome={true}
            icon={hideComments === true ? 'caret-down' : 'caret-up'}
          />
          Comments
        </h4>
        {/* )} */}

        <div className="card-details-footer__gutter" />

        <div className="flex-r-center card-details-footer__actions card-footer_flex-container flexEnd">
          {/* <span className="">
            {moment(card.attributes.created_at).format('DD MMM YY')}
          </span>
          <CardAssigneeLabel
            card={card}
            className="card-footer_assignee"
            showTooltip
            tooltipStyle={{ marginTop: '25px' }}
          />
          <CardLabels card={card} expandDirection="up" />
          <CardWorkEstimationLabel
            card={card}
            className="timeline-card__plan-label"
            showTooltip
          />
          <CardDueDateLabel
            card={card}
            className="timeline-card__plan-label"
            showTooltip
          />
          <LikeButton card={card} />
          <StarButton card={card} /> */}
          {card && (
            <div className="card-details-header_title-container">
              <UserAvatar user={card.attributes.creator} />
            </div>
          )}
          <div style={{ color: '#999999' }}>
            {card && new Date(card.attributes.created_at).toDateString()}
          </div>
          {card && (
            <GetHelp
              style={{ margin: '0 10px 0 20px' }}
              card={card}
              menuStyle={{ left: 'unset', right: '15px', top: '-280px' }}
            />
          )}
          <PulseComponent
            style={{ color: '#999999', fontSize: '24px' }}
            containerStyle={{ margin: '0 10px 0 10px' }}
            dropdownStyle={{ top: '-330px', left: '-520px' }}
            card={card}
            handleValueUpdate={this.handleValueUpdate}
          />
          {this.renderMoreOptions()}
          {this.renderEditButton()}
          {this.renderDots()}
        </div>
      </div>,

      <div
        key="for-split-screen" //FOR SPLIT SCREEN
        className="card-details-footer hide-for-full-screen-board"
      >
        {card && (
          <h4
            onClick={() => this.props.toggleComments()}
            className="comments-list_title"
          >
            <IconButton
              additionalClasses="caret-down"
              fontAwesome={true}
              icon={hideComments === false ? 'caret-up' : 'caret-down'}
            />
            Comments
          </h4>
        )}

        {/* {card && (
          <div className="card-details-header_title-container">
            <UserAvatar user={card.attributes.creator} />
            <span className="">
              {moment(card.attributes.created_at).format('DD MMM YY')}
            </span>
          </div>
        )} */}

        <div className="card-details-footer__gutter" />

        <div className="flex-r-center card-details-footer__actions card-footer_flex-container flexEnd">
          {/* <CardLabels card={card} expandDirection="up" />
          <CardAssigneeLabel
            card={card}
            className="card-footer_assignee"
            showTooltip
            tooltipStyle={{ marginTop: '25px' }}
          />
          <CardWorkEstimationLabel
            card={card}
            className="timeline-card__plan-label"
            showTooltip
          />
          <CardDueDateLabel
            card={card}
            className="timeline-card__plan-label"
            showTooltip
          />
          <LikeButton card={card} />
          <StarButton card={card} /> */}
          {/*<GetHelp
            style={{ margin: '' }}
            card={card}
            menuStyle={{
              left: 'unset',
              right: '15px',
              top: '-280px'
            }}
          /> */}
          {this.renderEditButton()}
          {this.renderMoreOptions()}
          {this.renderDots()}
        </div>
      </div>
    ];
  }
}

CardDetailsFooter.propTypes = {
  card: object.isRequired
};

export default connect(undefined, { updateCard })(CardDetailsFooter);
