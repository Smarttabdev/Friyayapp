import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { func, string, object, number, bool } from 'prop-types';
import get from 'lodash/get';
import cx from 'classnames';
import FormInput from 'Components/shared/forms/FormInput';
import { updateSelectedCard } from 'Src/newRedux/database/user/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateCard, viewCard } from 'Src/newRedux/database/cards/thunks';
import ActivityIndicator from 'Components/shared/cards/elements/assemblies/ActivityIndicator';
import lineClamp from 'Src/helpers/lineClamp';
import { setShowChatModal } from 'Src/newRedux/interface/modals/actions';
import { setShowVideoRoomModal } from 'Src/newRedux/interface/modals/actions';
import Tooltip from 'Components/shared/Tooltip';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { convertTypeIntoNormalString } from 'Lib/utilities';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';

const forId = Math.ceil(Math.random() * 100000, 6);

class CardTitleLink extends Component {
  static propTypes = {
    size: string,
    card: object.isRequired,
    viewCard: func.isRequired,
    updateCard: func.isRequired,
    style: object,
    maxLines: number,
    showCardTypeIcon: bool,
    cardTypeIconSize: number
  };

  state = {
    cardTitle:
      this.props.card.title || this.props.card?.attributes?.title || '',
    inEditMode: false,
    timeoutID: null
  };

  componentDidMount = () => {
    const { maxLines = 1 } = this.props;
    this.title && lineClamp(this.title, { lineCount: maxLines });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.inEditMode !== prevProps.inEditMode) {
      this.setState({ inEditMode: this.props.inEditMode });
    }
    if (this.state.inEditMode !== prevState.inEditMode) {
      this.props.onEditModeChange &&
        this.props.onEditModeChange(this.state.inEditMode);
    }
  }

  handleViewCard = () => {
    const {
      card,
      onClick,
      viewCard,
      cardsSplitScreen,
      updateSelectedCard,
      setShowChatModal,
      setShowVideoRoomModal,
      history
    } = this.props;

    const slug = card.slug || card?.attributes?.slug;

    let isChat = card.isChat || card?.attributes?.is_chat;
    let isVideoRoom = card.isVideoChat || card?.attributes?.is_video_chat;

    if (onClick) {
      onClick();
    } else if (cardsSplitScreen) {
      updateSelectedCard(slug);
    } else if (isChat) {
      setShowChatModal({ isOpen: true, chatId: card.id });
    } else if (isVideoRoom) {
      setShowVideoRoomModal({ isOpen: true, videoRoomId: card.id });
    } else {
      viewCard({ cardSlug: slug, history });
    }
  };

  handleTitleChange = cardTitle => {
    this.setState({ cardTitle });
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  handleSaveTitleChange = () => {
    this.handleToggleEditMode();
    const { card, updateCard } = this.props;
    const attributes = {
      title: this.state.cardTitle
    };
    updateCard({ id: card.id, attributes });
  };

  handleKeyDown = e => {
    if (e.key == 'Escape' || e.keyCode == 27) {
      this.setState({ inEditMode: false });
    }
  };

  handleToggleEditMode = () => {
    const inEditMode = this.state.inEditMode;
    this.setState({ inEditMode: !inEditMode });
    inEditMode
      ? window.removeEventListener('keydown', this.handleKeyDown, true)
      : window.addEventListener('keydown', this.handleKeyDown, true);
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
      this.handleToggleEditMode();
    }
  };

  handleUpdateCardType = cardType => {
    const {
      updateCard,
      card: { id }
    } = this.props;

    const attributes = {
      card_type: cardType
    };

    updateCard({ id, attributes });
  };

  render() {
    const {
      card,
      additionalClasses = '',
      size = '',
      truncate,
      color,
      style = {},
      viewKey,
      showCardTypeIcon = false,
      cardTypeIconSize = 20,
      additionalCardTitleStyle
    } = this.props;

    const isHelperCard =
      card?.attributes?.tag_list?.length ||
      card?.attributes?.helper_for ||
      null;
    const slug = card.slug || card?.attributes?.slug;
    const cardTitle = card.title || card?.attributes?.title;
    const { inEditMode } = this.state;
    const truncateStyle = truncate
      ? { display: 'flex', flexGrow: 1, wordBreak: 'break-all' }
      : {};

    return (
      <div style={{ display: 'flex', alignItems: 'center', ...truncateStyle }}>
        {showCardTypeIcon && (
          <div
            data-tip={convertTypeIntoNormalString(
              card?.attributes?.card_type,
              'card'
            )}
            data-for={card.id}
          >
            <BoardAndCardTypeListDropdown
              itemType={card?.attributes?.card_type}
              listType="card"
              setItemType={cardSelectedType =>
                this.handleUpdateCardType(cardSelectedType)
              }
              containerStyle={{ margin: '-7.5px 5px 0 0' }}
              smallModal
              triggerIcon
              typeIconSize={19}
            />
            {viewKey === 'TASK' && <Tooltip place="bottom" id={card.id} />}
          </div>
        )}
        {inEditMode || this.props.inEditMode ? (
          <FormInput
            defaultValue={cardTitle}
            onChange={this.handleTitleChange}
            onSubmit={this.handleSaveTitleChange}
            autoFocus
            color={color}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <a
              className={cx(
                'card-title',
                size,
                additionalClasses,
                `c${slug ? slug.substring(0, slug.indexOf('-')) : ''}`
              )}
              onClick={this.getClickHandler}
              style={{
                color,
                marginRight: '5px',
                ...truncateStyle,
                ...style
              }}
            >
              {truncate ? (
                <span className="line-clamp" ref={span => (this.title = span)}>
                  {cardTitle}
                  <ActivityIndicator
                    updatedAt={get(
                      card,
                      'attributes.updated_at',
                      card.updatedAt
                    )}
                  />
                </span>
              ) : (
                <Fragment>
                  <div style={additionalCardTitleStyle}>
                    {cardTitle}
                    <ActivityIndicator
                      updatedAt={get(
                        card,
                        'attributes.updated_at',
                        card.updatedAt
                      )}
                    />
                  </div>
                </Fragment>
              )}
            </a>
            {isHelperCard && (
              <span
                style={{
                  fontSize: '12px'
                }}
                data-tip="Your help is needed"
                data-for={forId}
              >
                ✋
                <Tooltip {...{ place: 'bottom' }} id={forId} />
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const { menus } = stateMappings(state);
  const cardsSplitScreen = menus.cardsSplitScreen;

  return {
    cardsSplitScreen,
    viewKey: getRelevantViewForPage(state)
  };
};

const mapDispatch = {
  viewCard,
  updateCard,
  updateSelectedCard,
  setShowChatModal,
  setShowVideoRoomModal
};

export default connect(mapState, mapDispatch)(withRouter(CardTitleLink));
