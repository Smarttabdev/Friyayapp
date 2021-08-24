import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { success } from 'Utils/toast';

import Ability from 'Lib/ability';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getThisDomain } from 'Src/lib/utilities';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { stateMappings } from 'Src/newRedux/stateMappings';

import {
  archiveCard,
  removeCard,
  updateCard,
  copyAndOpenCard
} from 'Src/newRedux/database/cards/thunks';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import { withLastLocation } from 'react-router-last-location';
import classNames from 'classnames';

let options = [
  'Start',
  'Complete',
  'Plan',
  'Label',
  'Share',
  'Organize',
  'Edit',
  'Delete',
  'Copy',
  'Archive',
  'Add card',
  'Upload file',
  'Fields'
];

class CardActionsDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTemplateState: props.card?.attributes?.is_template
    };
  }

  handleCompleteCard = () => {
    const { card, updateCard } = this.props;
    const attributes = {
      completion_date: moment().toISOString(),
      completed_percentage: 100
    };
    updateCard({ id: card.id, attributes });
    success('Card Completed!');
  };

  handleUncompleteCard = () => {
    const { card, updateCard } = this.props;
    const attributes = {
      completion_date: null,
      completed_percentage: 0
    };
    updateCard({ id: card.id, attributes });
    success('Card Uncompleted!');
  };

  handleDeleteCard = () => {
    const { card, removeCard, lastLocation } = this.props;
    removeCard(card.id, lastLocation);
  };

  handleArchiveCard = () => {
    const { archiveCard, card, lastLocation } = this.props;
    archiveCard(card, lastLocation);
  };

  handleStartCard = () => {
    const { card, updateCard } = this.props;
    const attributes = {
      start_date: moment().toISOString()
    };
    updateCard({ id: card.id, attributes });
    success('Card Started');
  };

  handleCopyCard = async () => {
    const { card, copyAndOpenCard } = this.props;
    await copyAndOpenCard(card);
  };

  handleClick = action => {
    const {
      props: { card, onAddCard, setEditCardModalOpen }
    } = this;
    if (!card) {
      return false;
    }

    switch (action) {
      case 'Add card':
        onAddCard();
        break;
      case 'Copy':
        this.handleCopyCard();
        break;
      case 'Archive':
        this.handleArchiveCard();
        break;
      case 'Complete':
        this.handleCompleteCard();
        break;
      case 'Uncomplete':
        this.handleUncompleteCard();
        break;
      case 'Delete':
        this.handleDeleteCard();
        break;
      case 'Start':
        this.handleStartCard();
        break;
      case 'Upload file':
        setEditCardModalOpen({
          cardId: card.id,
          tab: 'Edit',
          openFileUploader: true
        });
        break;
      default:
        setEditCardModalOpen({ cardId: card.id, tab: action });
        break;
    }
  };

  handleCreateCardTemplate = () => {
    const { updateCard, card } = this.props;
    const { toggleTemplateState } = this.state;
    setTimeout(() => {
      this.setState(prevState => {
        return {
          toggleTemplateState: !prevState.toggleTemplateState
        };
      });
      updateCard({
        id: card.id,
        attributes: { is_template: !toggleTemplateState }
      });
      success('Card updated');
    });
  };

  getOptions = () => {
    const { card, filterOptions } = this.props;

    return options
      .filter(val => (filterOptions ? !filterOptions.includes(val) : true))
      .map(opt => {
        if (opt === 'Complete') {
          return card?.attributes?.completed_percentage >= 100
            ? 'Uncomplete'
            : 'Complete';
        }
        return opt;
      });
  };

  render() {
    const {
      card,
      cardId,
      children,
      color,
      isSmall,
      dropdownLeft,
      style,
      parentStyle,
      extraMenuStyle,
      additionalClasses,
      icon
    } = this.props;
    const { toggleTemplateState } = this.state;
    const toggleClass = classNames('fa', 'icon', {
      'fa-toggle-on': toggleTemplateState,
      'fa-toggle-off': !toggleTemplateState,
      green: toggleTemplateState
    });

    return Ability.can('update', 'self', card) || cardId ? (
      <OptionsDropdownButton
        color={color}
        style={style}
        parentStyle={parentStyle}
        extraMenuStyle={extraMenuStyle}
        additionalClasses={additionalClasses}
        isSmall
        dropdownLeft={dropdownLeft}
        icon={icon}
      >
        {!card && cardId && (
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: {
                attributes: {
                  filterIDs: [cardId]
                }
              }
            }}
            loaderKey="cardsWithAttributes"
          />
        )}
        {this.getOptions().map(option => (
          <a
            className="dropdown-option-item"
            key={option}
            onClick={() => this.handleClick(option)}
          >
            {option}
          </a>
        ))}
        <span className="dropdown-option-item template_button">
          Save as template
          <a onClick={this.handleCreateCardTemplate}>
            <i className={toggleClass} />
          </a>
        </span>
        {children}
      </OptionsDropdownButton>
    ) : null;
  }
}

CardActionsDropdown.propTypes = {
  card: PropTypes.object.isRequired,
  setEditCardModalOpen: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
  archiveCard: PropTypes.func.isRequired,
  copyCard: PropTypes.func,
  style: PropTypes.object,
  additionalClasses: PropTypes.string
};

const mapState = (state, props) => {
  const { cards } = stateMappings(state);
  const card = props.card || cards[props.cardId];
  return {
    card,
    currentDomain: getThisDomain(getDomains(state))
  };
};

const mapDispatch = {
  archiveCard,
  removeCard,
  setEditCardModalOpen,
  updateCard,
  copyAndOpenCard
};

export default connect(
  mapState,
  mapDispatch
)(withLastLocation(CardActionsDropdown));
