import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import CardDetailsEditor from 'Components/lenses/card_lenses/Card/CardDetailsEditor';
import StringHelper from 'Src/helpers/string_helper';
import IconButton from 'Components/shared/buttons/IconButton';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import CardLabels from 'Components/shared/cards/elements/assemblies/CardLabels';
import LikeButton from 'Components/shared/cards/elements/LikeButton';
import StarButton from 'Components/shared/cards/elements/StarButton';
import CardTopicLink from 'Src/components/shared/cards/elements/CardTopicLink';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import CommentsList from 'Components/shared/comments/CommentsList';
import Icon from 'Components/shared/Icon';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';

const MessageBoardCardRow = ({
  card,
  color,
  toggleCardContent,
  shareCard,
  showCardContent
}) => {
  const {
    attributes: { created_at }
  } = card;
  return (
    <div className="flex-r-center">
      <div className="flex-r-baseline">
        <CardTitleLink card={card} color={color} />
        <div className="topicLink-time" style={{ color }}>
          <CardTopicLink card={card} style="lite" inReference={true} />

          <div
            className="message-board__message-time ml15"
            title={moment(created_at).format('MMMM Do YYY, h:mm:ss a')}
          >
            {moment(created_at).fromNow()}
          </div>
        </div>
      </div>

      <div className="message-board__row-actions-right">
        {/* <div className="list-card_label-container">
          <CardLabels card={card} expandDirection="left" />
        </div> */}
        <div className="list-card_actions-container">
          <div
            onClick={shareCard}
            style={{ cursor: 'pointer', marginRight: '30px' }}
          >
            <Icon
              color={color ? color : '#9b51e0'}
              fontSize="16px"
              icon="person_add"
            />
          </div>
          <CardLabels card={card} expandDirection="left" />
          <StarButton color={color} card={card} message={true} />
          <LikeButton color={color} card={card} />
          <div onClick={toggleCardContent} style={{ cursor: 'pointer' }}>
            <Icon
              color={showCardContent ? '#f2ab13' : color ? color : '#d9d9d9'}
              fontSize="16px"
              icon="featured_play_list"
            />
          </div>
          <CardActionsDropdown color={color} card={card} onAddCard={() => {}} />
        </div>
      </div>
    </div>
  );
};

class MessageBoardCard extends PureComponent {
  static propTypes = {
    card: PropTypes.object.isRequired,
    active_design: PropTypes.object
  };

  state = {
    isRowOpen: false,
    isInEditMode: false,
    showCardContent: false,
    unreadComments: false,
    openRowClicked: 0
  };

  handleToggleEditMode = () =>
    this.setState(prev => ({ isInEditMode: !prev.isInEditMode }));

  handleToggleRowOpen = () => {
    this.setState(prev => ({
      isRowOpen: !prev.isRowOpen,
      unreadComments: false,
      openRowClicked: 1
    }));
  };

  toggleCardContent = () => {
    const { isRowOpen, showCardContent } = this.state;
    if (!isRowOpen) {
      this.handleToggleRowOpen();
      this.setState({ showCardContent: true });
    } else {
      this.setState(prevState => ({
        showCardContent: !prevState.showCardContent
      }));
    }
  };

  handleShareCard = () => {
    const { card, setEditCardModalOpen } = this.props;
    setEditCardModalOpen({ cardId: card.id, tab: 'Share' });
  };

  handleUnreadComments = () => {
    const { card } = this.props;
    const {
      attributes: { comments_count }
    } = card;

    const currentCommentsCount = window.localStorage.getItem(
      `commentsCount${card.id}`
    );

    currentCommentsCount != comments_count
      ? this.setState({ unreadComments: true })
      : null;
  };

  componentDidMount() {
    this.handleUnreadComments();
  }

  componentDidUpdate(prevProps, prevState) {
    const { card } = this.props;
    const {
      attributes: { comments_count }
    } = card;

    if (this.state.openRowClicked != prevState.openRowClicked) {
      window.localStorage.setItem(`commentsCount${card.id}`, comments_count);
    }
  }

  render() {
    const {
      props: { card, active_design },
      state: { isRowOpen, isInEditMode, showCardContent, unreadComments }
    } = this;
    const { card_font_color } = active_design || {};

    const {
      attributes: { body, creator, comments_count }
    } = card;

    const textMuted = `<div class="text-muted p-y-1" ${
      card_font_color ? `style="color:${card_font_color}"` : null
    }>Double click to edit</div>`;

    return (
      <div className="message-board__card">
        <div className="flex-r-start">
          <div className="flex-r-center" style={{ height: '30px' }}>
            <IconButton
              additionalClasses="timeline-card__nested-cards-caret"
              additionalIconClasses="large"
              fontAwesome
              icon={isRowOpen ? 'caret-down' : 'caret-right'}
              onClick={this.handleToggleRowOpen}
              color={card_font_color}
            />

            <Icon
              containerClasses="message-board__chat-bubble-icon-container"
              additionalClasses="message-board__chat-bubble-icon"
              icon="chat_bubble"
              color={
                unreadComments && comments_count != 0
                  ? '#EB5757'
                  : card_font_color
                  ? card_font_color
                  : '#56ccf2'
              }
              height="100%"
            />

            <div className="mr14 message-board__card-comments-count">
              {comments_count}
            </div>
          </div>

          {/* <UserAvatar size={24} user={creator} /> */}

          <div className="message-board__card-detail m-l-10px">
            {isRowOpen ? (
              <Fragment>
                {isInEditMode ? (
                  <CardDetailsEditor
                    card={card}
                    onToggleEditMode={this.handleToggleEditMode}
                    autoSaveOnClose={true}
                    cardFontColor={card_font_color}
                  />
                ) : (
                  <Fragment>
                    <MessageBoardCardRow
                      color={card_font_color}
                      card={card}
                      toggleCardContent={this.toggleCardContent}
                      shareCard={this.handleShareCard}
                      showCardContent={showCardContent}
                    />
                    {showCardContent ? (
                      <div
                        className="m-b-20px message-board__card-body"
                        onDoubleClick={this.handleToggleEditMode}
                        dangerouslySetInnerHTML={{
                          __html: StringHelper.simpleFormat(body || textMuted)
                        }}
                      />
                    ) : null}
                    <CommentsList
                      wrapperClass="message-board__comments-list"
                      cardId={card.id}
                      hideComments={false}
                      dateFormatter={comment =>
                        moment(comment.attributes.created_at).fromNow()
                      }
                      card_font_color={card_font_color}
                      toolbarVisibleWithoutSelection={false}
                      toolbarInline={true}
                    />
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <MessageBoardCardRow
                color={card_font_color}
                card={card}
                toggleCardContent={this.toggleCardContent}
                shareCard={this.handleShareCard}
                showCardContent={showCardContent}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;

  return {
    active_design
  };
};

const mapDispatch = {
  setEditCardModalOpen
};

export default connect(mapState, mapDispatch)(MessageBoardCard);
