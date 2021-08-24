import React, { Component, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import CardDetailsHeader from './CardDetailsHeader';
import CardDocuments from 'Components/pages/item_page/item_content_documents';
import CardNestedCards from './CardNestedCards';
import CardImages from 'Components/pages/item_page/item_content_images';
import CardSlackLinks from 'Components/pages/item_page/item_content_slacklinks';
import CardTipLinks from 'Components/pages/item_page/item_content_tip_links';
import StringHelper from 'Src/helpers/string_helper';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import { getCardTypeIconAttribute } from 'Src/utils/icons';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { useOutsideAlerter } from 'Src/lib/hooks';
import IconButton from 'Src/components/shared/buttons/IconButton';
import { fetchQuery } from 'Lib/relay';
import { getLinkItemTypes } from 'src/lib/utilities';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';

const RenderAddCard = ({
  onClose,
  topicId,
  cardId,
  afterCardCreated,
  onDismiss
}) => {
  const thisRef = useRef(null);
  useOutsideAlerter(thisRef, onClose);
  return (
    <div className="dropdown-menu menuAddCard" ref={thisRef}>
      <Fragment>
        <p className="dropdown-menu-title">Create Card</p>
        <AddCardCard
          topicId={topicId}
          afterCardCreated={afterCardCreated}
          inInputMode
          onDismiss={onDismiss}
          newCardRelationships={{ follows_tip: { data: cardId } }}
          topMenu
          defaultClassName={false}
        />
      </Fragment>
    </div>
  );
};

class CardDetailsPreview extends Component {
  constructor(props) {
    super(props);
    this.titleIconRef = React.createRef();
    this.titleContainer = React.createRef();
    this.titleIconWidth = 0;
    this.state = {
      addCard: false,
      isSaving: false,
      linkItemTypes: []
    };
  }

  async componentDidMount() {
    this.setState({
      titleContainerHeight: this.titleContainer?.current?.clientHeight ?? 0
    });
    this.titleIconWidth = this.titleIconRef?.current?.clientWidth ?? 0;
    const {
      attributes: { attachments_json = {} }
    } = this.props.card;
    const { tip_links } = attachments_json;

    const results = await getLinkItemTypes(tip_links, this.getType);
    this.setState({ linkItemTypes: results });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.card !== this.props.card) {
      const {
        attributes: { attachments_json = {} }
      } = this.props.card;
      const { tip_links } = attachments_json;

      const results = await getLinkItemTypes(tip_links, this.getType);
      this.setState({ linkItemTypes: results });
    }
  }

  handleDismiss = () => {
    this.setState({
      addCard: false
    });
  };

  afterCardCreated = () => {
    this.handleDismiss();
    this.forceUpdate();
  };

  onAddCard = () => {
    this.setState(prevState => {
      return {
        addCard: !prevState.addCard
      };
    });
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

  getType = ({ isBoard, isCard, id }) => {
    let result = {};
    if (isBoard) {
      result = fetchQuery(
        graphql`
          query CardDetailsPreviewQuery($topicIds: [ID!]) {
            topics(ids: $topicIds) {
              edges {
                node {
                  id
                  title
                  tagList
                }
              }
            }
          }
        `,
        {
          topicIds: [toId(id)]
        }
      );
    } else if (isCard) {
      result = fetchQuery(
        graphql`
          query CardDetailsPreviewGetTypeQuery($tipIds: [ID!]) {
            tips(ids: $tipIds) {
              edges {
                node {
                  id
                  title
                  cardType
                }
              }
            }
          }
        `,
        {
          tipIds: [toId(id)]
        }
      );
    }

    return result;
  };

  render() {
    const {
      card,
      onDoubleClick,
      showMinMax,
      showIcons,
      showTitle,
      handleShowHide,
      showDots,
      topicId,
      cardFontColor,
      isSplitScreen,
      onSplitScreenClose,
      hideCardLinks,
      hideCardIcon
    } = this.props;
    const {
      addCard,
      isSaving,
      titleContainerHeight,
      linkItemTypes
    } = this.state;
    const {
      attributes: { attachments_json = {}, body, title },
      relationships: { attachments }
    } = card;
    const { data: documents } = attachments || {};
    const { tip_links, slack_links, images } = attachments_json;
    return (
      <Fragment>
        <CardDetailsHeader
          card={card}
          onEditClick={onDoubleClick}
          showMinMax={showMinMax}
          handleShowHide={handleShowHide}
          showIcons={showIcons}
          showDots={showDots}
          onAddCard={this.onAddCard}
        />
        <div className="card-details-preview-parent">
          {showTitle && (
            <div
              ref={this.titleIconRef}
              style={{ height: `${titleContainerHeight}px` }}
              className="card_details_preview_title_icon"
            >
              {/* <Icon
                // color={
                  // getCardTypeIconAttribute(card?.attributes?.card_type)
                    // .defaultColor || '#56CCF2'
                // }
                // icon={
                  // getCardTypeIconAttribute(card?.attributes?.card_type).icon ||
                  // 'featured_play_list'
                // }
                // outlined
                // containerClasses="mr15"
                // fontSize={cardTypeIconSize}
              /> */}
              {/* {console.log(card)} */}
              {!hideCardIcon && (
                <BoardAndCardTypeListDropdown
                  itemType={card?.attributes?.card_type}
                  listType="card"
                  setItemType={cardSelectedType =>
                    this.handleUpdateCardType(cardSelectedType)
                  }
                  containerStyle={{ marginTop: '-7.5px' }}
                  smallModal
                  triggerIcon
                  containerClasses="mr15"
                />
              )}
            </div>
          )}
          <div className="card-details-preview">
            <div
              className="card-details-preview_content"
              onDoubleClick={onDoubleClick}
            >
              <div className="flex-r-center-spacebetween">
                {showTitle && (
                  <h2
                    ref={this.titleContainer}
                    className="card-details-preview_title"
                  >
                    {/* <p> */}
                    {title || (
                      <span className="text-muted">
                        Double click to edit <br /> Ctrl + E / Cmd + E to open
                        inline toolbar
                      </span>
                    )}
                    {/* </p> */}
                  </h2>
                  // <h2
                  //   className="card-details-preview_title pt10"
                  //   dangerouslySetInnerHTML={{
                  //     __html: StringHelper.simpleFormat(
                  //       title ||
                  //         '<span class="text-muted">Double click to edit</span>'
                  //     )
                  //   }}
                  // />
                )}
                {isSplitScreen && (
                  <IconButton
                    icon="close"
                    additionalClasses="card-container__card-panel-toggle"
                    onClick={onSplitScreenClose}
                  />
                )}
              </div>
              <div
                className="item-text fr-view"
                dangerouslySetInnerHTML={{
                  __html: StringHelper.simpleFormat(
                    body ||
                      '<span class="text-muted card-details-preview_placeholder-text">Double click to edit <br /> Ctrl + E / Cmd + E to open inline toolbar</span>',
                    linkItemTypes
                  )
                }}
                style={{ color: cardFontColor }}
              />
            </div>
            <CardNestedCards card={card} />
            {!hideCardLinks && tip_links && tip_links.length > 0 && (
              <CardTipLinks item={card} tipLinks={tip_links} showDescription />
            )}
            {documents && documents.length > 0 && (
              <CardDocuments item={card} documents={documents} />
            )}
            {images && images.length > 0 && (
              <div className="form-group">
                <CardImages item={card} images={images} autoscroll={false} />
              </div>
            )}
            {slack_links && slack_links.length > 0 && (
              <div className="form-group">
                <CardSlackLinks item={card} slacklinks={slack_links} />
              </div>
            )}
          </div>
        </div>
        {addCard && (
          <RenderAddCard
            onClose={() => this.setState({ addCard: false })}
            topicId={topicId}
            afterCardCreated={this.afterCardCreated}
            onDismiss={this.handleDismiss}
            cardId={card.id}
          />
        )}
      </Fragment>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);

  return {
    topicId: sm.page.topicId
  };
};

export default connect(mapState, { updateCard }, undefined, {
  withRef: true
})(CardDetailsPreview);
