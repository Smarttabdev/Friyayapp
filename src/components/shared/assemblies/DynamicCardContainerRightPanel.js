/* eslint-disable no-constant-condition */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardDetails from 'Src/components/lenses/card_lenses/Card/CardDetails';
import { toggleCardsSplitScreen } from 'Src/newRedux/interface/menus/actions.js';
import cx from 'classnames';
import { getCard } from 'Src/newRedux/database/cards/thunks';
import Loader from '../Loader';

class DynamicCardContainerRightPanel extends PureComponent {
  state = {};
  /**
   * On editor scrolling event handler.
   *
   * @param {Event} e
   * @param {Node}  toolbarEl
   * @return  {Void}
   */
  handleEditorScroll = (e, toolbarEl) => {
    if (e.currentTarget.scrollTop >= 191) {
      // 191px is when the first line of text gone from viewport while scrolling
      if (toolbarEl && !toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.add('fixed');
      }
    } else {
      if (toolbarEl && toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.remove('fixed');
      }
    }
  };

  componentDidMount() {
    if (this.props.selectedCardId && !this.props.card) {
      this.loadCard();
    }
  }

  componentDidUpdate() {
    if (this.props.selectedCardId && !this.props.card) {
      this.loadCard();
    }
  }

  loadCard = () => {
    this.setState({ isLoadingCard: true }, async () => {
      await this.props.getCard(this.props.selectedCardId);
      this.setState({ isLoadingCard: false });
    });
  };

  render() {
    const {
      card,
      toggleLeftPane,
      isLeftPaneOpen,
      toggleCardsSplitScreen
    } = this.props;

    const { isLoadingCard } = this.state;

    return (
      <Fragment>
        {card ? (
          <div
            className={cx('height-100pc', {
              'mx-12pc pt10': !isLeftPaneOpen
            })}
          >
            <CardDetails
              cardId={card.id}
              onEditorScroll={this.handleEditorScroll}
              rootContainerClass="card-board"
              showMinMax
              isSplitScreen
              onSplitScreenClose={toggleCardsSplitScreen}
            />
          </div>
        ) : isLoadingCard ? (
          <div
            style={{
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <Loader isLoading />
          </div>
        ) : (
          <h4 className="card-container__card-placeholder text-center pt50 mt0">
            Please select a card from left section.
          </h4>
        )}
      </Fragment>
    );
  }
}

const mapState = (state, props) => {
  const { cards, user } = stateMappings(state);
  const selectedCardId = user.attributes.ui_settings.selectedCardId;

  return {
    card: cards[selectedCardId] || null,
    selectedCardId
  };
};

const mapDispatch = {
  toggleCardsSplitScreen,
  getCard
};

export default connect(mapState, mapDispatch)(DynamicCardContainerRightPanel);
