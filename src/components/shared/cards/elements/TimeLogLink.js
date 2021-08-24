import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string, object, number } from 'prop-types';
import cx from 'classnames';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';

class TimeLogLink extends Component {
  static propTypes = {
    size: string,
    card: object.isRequired,
    viewCard: func.isRequired,
    setEditCardModalOpen: func.isRequired,
    style: object,
    maxLines: number
  };

  state = {
    timeoutID: null
  };

  handleViewCard = () => {
    const { card, viewCard, setEditCardModalOpen } = this.props;

    const slug = card.attributes.slug;
    viewCard({ cardSlug: slug });
    const modalOptions = { cardId: card.id, tab: 'Plan' };
    setEditCardModalOpen(modalOptions);
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  getClickHandler = () => {
    const { timeoutID } = this.state;
    const delay = 250;
    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          this.handleViewCard();
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
    }
  };

  render() {
    const {
      card,
      additionalClasses = '',
      size = '',
      truncate,
      color,
      style = {},
      displayValue
    } = this.props;

    const slug = card.attributes.slug;

    return (
      <div>
        {
          <a
            className={cx(
              'time-log-details',
              size,
              additionalClasses,
              `c${slug ? slug.substring(0, slug.indexOf('-')) : ''}`
            )}
            onClick={this.getClickHandler}
            style={{ color, ...style }}
          >
            {displayValue}
          </a>
        }
      </div>
    );
  }
}

const mapState = state => {
  const { menus } = stateMappings(state);
  const cardsSplitScreen = menus.cardsSplitScreen;

  return { cardsSplitScreen };
};

const mapDispatch = {
  viewCard,
  setEditCardModalOpen
};

export default connect(mapState, mapDispatch)(TimeLogLink);
