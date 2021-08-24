/* eslint-disable complexity */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { bool, func, object, string } from 'prop-types';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import FormInput from 'Components/shared/forms/FormInput';
import {
  createCard,
  mapRelationships
} from 'Src/newRedux/database/cards/thunks';
import GridCardAttachmentDropOptions from 'Components/lenses/card_lenses/Grid/GridCardAttachmentDropOptions';
import DocumentCardAttachmentDropOptions from 'Components/lenses/card_lenses/Grid/GridCardAttachmentDropOptions';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { addGoogleFileToCard } from 'Src/newRedux/integrationFiles/google-drive/thunks';
import { addDropboxFileToCard } from 'Src/newRedux/integrationFiles/dropbox/thunks';
import { addBoxFileToCard } from 'Src/newRedux/integrationFiles/box/thunks';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import { setShowAddCardBottomOverlay } from 'Src/newRedux/interface/modals/actions';
import Icon from 'Components/shared/Icon';
import { failure } from 'Utils/toast';
import Dropdown from 'Components/shared/Dropdown';
import { cardTypes } from 'src/components/shared/CardAndBoardTypes';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import cardLenses from 'Lib/config/lenses/cards';
import AddAssignee from 'src/components/shared/cards/AddAssignee';
import { getCoordiantesInfo, toId } from 'Lib/utilities';
import { AddCardButton } from 'Components/shared/buttons/index';
import { stateMappings } from 'Src/newRedux/stateMappings';

class AddCardCard extends PureComponent {
  static defaultProps = {
    fullHeight: true,
    placeholder: 'Card title',
    defaultCardTitle: ''
  };
  static propTypes = {
    createCard: func.isRequired,
    inInputMode: bool,
    newCardAttributes: object,
    newCardRelationships: object,
    topic: object,
    addFileToCard: func,
    board: string,
    setEditCardModalOpen: func,
    placeholder: string,
    defaultCardTitle: string,
    uploadFileForm: bool
  };

  constructor(props) {
    super(props);

    const lensConfig = cardLenses[props.viewKey];

    const cardTypeIndex =
      lensConfig &&
      cardTypes.findIndex(item => {
        return item.type == (lensConfig.cardType || 'CARD');
      });

    const cardType = cardTypeIndex >= 0 && {
      type: cardTypes[cardTypeIndex].type,
      index: cardTypeIndex
    };

    this.state = {
      cardTitle: '',
      inInputMode: props.inInputMode,
      isSaving: false,
      isAttachmentHoveringOnCard: false,
      attachmentLink: null,
      showCardTypes: false,
      cardType: this.props.selectedCardType
        ? this.props.selectedCardType
        : cardType,
      assignees: [],
      dueDate: null,
      labels: null,
      selectedTopicIds: [],
      initialLocation: null
    };
    // https://github.com/babel/babel/issues/6806#issuecomment-372953787
    this.handleCreateCard = this.handleCreateCard.bind(this);
  }

  componentDidMount() {
    this.props.getHandleToggle &&
      this.props.getHandleToggle(this.handleToggleInputMode);
    if (this.props.inInputMode) {
      window.addEventListener('keydown', this.handleKeyDown, true);
      this.scrollToShow();
    }
    if (this.props.location) {
      this.getLocationInfo();
    }
  }

  componentDidUpdate(prevProps) {
    const { inInputMode } = this.props;
    if (inInputMode !== prevProps.inInputMode) {
      this.setState({ inInputMode });
      inInputMode === true && this.scrollToShow();
    }
  }

  getLocationInfo = async () => {
    const {
      location: { address, latitude, longitude }
    } = this.props;
    let info;
    if (!address) info = await getCoordiantesInfo({ latitude, longitude });

    if (address || info) {
      this.setState({
        initialLocation: {
          address: address ?? info.address,
          longitude,
          latitude
        }
      });
    }
  };

  addFileToCard = attachmentLink => {
    const {
      addGoogleFileToCard,
      addDropboxFileToCard,
      addBoxFileToCard
    } = this.props;
    const methodMap = {
      google: addGoogleFileToCard,
      dropbox: addDropboxFileToCard,
      box: addBoxFileToCard
    };
    methodMap[attachmentLink.draggedItemProps.item.provider](attachmentLink);
  };
  async handleCreateCard() {
    const {
      state: {
        cardTitle,
        attachmentLink,
        cardType,
        assignees,
        labels,
        dueDate,
        selectedTopicIds,
        selectedLocation,
        initialLocation
      },
      props: {
        newCardAttributes,
        createCard,
        topic,
        topicHeader,
        newCardRelationships,
        multipleTopicsId,
        defaultCardTitle = '',
        selectedTopicId,
        location
      }
    } = this;

    const topicId = topicHeader
      ? this.props.topicId || topic?.id
      : topic?.id || this.props.topicId;

    const relatedTopicId =
      !multipleTopicsId || !selectedTopicIds ? topicId : {};
    this.setState({ isSaving: true });
    if (
      Object.keys(relatedTopicId).length != 0 ||
      multipleTopicsId.length != 0 ||
      selectedTopicIds.length != 0
    ) {
      const attributes = {
        ...newCardAttributes,
        title: cardTitle ? cardTitle : defaultCardTitle,
        card_type: cardType.type,
        due_date: dueDate || newCardAttributes?.due_date,
        address: selectedLocation?.address ?? initialLocation?.address,
        longitude: selectedLocation?.longitude ?? initialLocation?.longitude,
        latitude: selectedLocation?.latitude ?? initialLocation?.latitude
      };
      let relationships = {
        ...newCardRelationships,
        labels: {
          data:
            labels?.length > 0
              ? labels.map(l => toId(l.id))
              : newCardRelationships?.labels?.data
              ? newCardRelationships.labels.data.map(i => toId(i))
              : []
        },
        tip_assignments: {
          data:
            assignees?.length > 0
              ? assignees.map(a => ({
                  assignment_type: 'User',
                  assignment_id: toId(a.id)
                }))
              : newCardRelationships?.tip_assignments?.data
              ? newCardRelationships.tip_assignments.data.map(a => ({
                  assignment_type: 'User',
                  assignment_id: toId(a)
                }))
              : []
        }
      };
      if (multipleTopicsId || selectedTopicIds.length > 0) {
        relationships = {
          ...relationships,
          topics: { data: multipleTopicsId || selectedTopicIds }
        };
      } else {
        relationships = {
          ...relationships,
          topics: { data: [selectedTopicId || relatedTopicId] }
        };
      }
      let {
        data: { data: newCard, included }
      } = await createCard({ attributes, relationships });
      newCard = mapRelationships(included)(newCard);
      if (attachmentLink) {
        attachmentLink.dropZoneProps.card = { ...newCard };
        this.addFileToCard(attachmentLink);
      }
      this.setState({ cardTitle: '', isSaving: false, attachmentLink: null });
      this.handleToggleInputMode();
      this.props.afterCardCreated && this.props.afterCardCreated(newCard.id);
      this.props.onDismiss && this.props.onDismiss();
      this.props.setShowAddCardBottomOverlay(false);
    } else {
      this.setState({ cardTitle: '', isSaving: false, attachmentLink: null });
      failure('Select a Board');
    }
  }

  handleSetCardTitle = cardTitle => {
    this.setState({ cardTitle });
  };

  handleSetOtherDetails = ({
    assignees,
    dueDate,
    labels,
    selectedTopicIds,
    selectedLocation
  }) => {
    this.setState({
      assignees,
      dueDate,
      labels,
      selectedTopicIds,
      selectedLocation
    });
  };

  scrollToShow = () => {
    // scrolls the add card element to the center, commenting it because it causes the screen to scroll and gives a bad UX
    // const elem = $('.add-card-card_section')[0];
    // if (elem) {
    //   elem.scrollIntoView({ block: 'center', behavior: 'smooth' });
    // }
  };

  handleToggleInputMode = () => {
    this.state.inInputMode
      ? window.removeEventListener('keydown', this.handleKeyDown, true)
      : window.addEventListener('keydown', this.handleKeyDown, true);
    this.setState(state => ({ inInputMode: !state.inInputMode }));
    this.state.inInputMode && this.scrollToShow();
  };

  handleKeyDown = e => {
    if (e.key == 'Escape' || e.keyCode == 27) {
      this.handleToggleInputMode();
      this.props.onDismiss && this.props.onDismiss();
      this.props.setShowAddCardBottomOverlay(false);
    }
  };

  toggleAttachmentHoveringOnCard = status => {
    this.setState(prevState => ({
      ...prevState,
      isAttachmentHoveringOnCard: status
    }));
  };

  addToNewFile = attachment => {
    this.setState(prevState => ({
      ...prevState,
      attachmentLink: attachment
    }));
    this.props.setShowAddCardBottomOverlay(true);
    this.handleToggleInputMode();
  };

  handleEditButtonClick = () => {
    this.props.setEditCardModalOpen({
      cardId: null,
      defaultAttributes: {
        title: this.state.cardTitle,
        ...this.props.newCardAttributes
      },
      defaultRelationships: this.props.newCardRelationships
    });

    this.setState({ inInputMode: false });
  };

  handleOpenCard = async tab => {
    const {
      state: { cardTitle, attachmentLink, cardType, selectedTopicIds },
      props: {
        newCardAttributes,
        createCard,
        topic,
        topicId,
        newCardRelationships,
        multipleTopicsId
      }
    } = this;

    const relatedTopicId =
      !multipleTopicsId || selectedTopicIds ? topicId || topic.id : {};
    this.setState({ isSaving: true });
    const attributes = {
      ...newCardAttributes,
      title: cardTitle,
      card_type: cardType.type
    };
    let relationships;
    if (multipleTopicsId || selectedTopicIds) {
      relationships = {
        ...newCardRelationships,
        topics: { data: multipleTopicsId || selectedTopicIds }
      };
    } else {
      relationships = {
        ...newCardRelationships,
        topics: { data: [relatedTopicId] }
      };
    }
    let {
      data: { data: newCard, included }
    } = await createCard({ attributes, relationships });
    newCard = mapRelationships(included)(newCard);
    if (attachmentLink) {
      attachmentLink.dropZoneProps.card = { ...newCard };
      this.addFileToCard(attachmentLink);
    }
    this.setState({ cardTitle: '', isSaving: false, attachmentLink: null });
    this.handleToggleInputMode();
    this.props.setEditCardModalOpen({ cardId: newCard.id, tab });
    this.props.afterCardCreated && this.props.afterCardCreated(newCard.id);
    this.props.onDismiss && this.props.onDismiss();
    this.props.setShowAddCardBottomOverlay(false);
  };

  DropdownList = () => (
    <Fragment>
      {cardTypes.map((x, i) => (
        <div
          key={i}
          className="add-card-form-new-design-container-dropdown"
          onClick={() =>
            this.setState({
              cardType: { type: x.type, index: i }
            })
          }
        >
          <Icon
            additionalClasses="font-size-16 mr5"
            icon={x?.iconType}
            outlined={x?.outlined}
            color={x?.color}
          />
          <span>{x.label}</span>
        </div>
      ))}
    </Fragment>
  );

  render() {
    const {
      isFileDragged,
      cardClassName,
      cardStyle,
      containerClassName,
      containerStyle,
      topic,
      topicId,
      board = '',
      bottomOverlay,
      addCardUI,
      addCardUIStyle = {},
      topMenu,
      fullHeight,
      placeholder,
      defaultClassName,
      multipleTopicsId,
      newDesign,
      createChatOrVideoRoom,
      getSelectedPeople,
      makeChatPublic,
      handleChecked,
      topicHeader,
      newCardAttributes,
      newCardRelationships,
      hideAddFields,
      transparent = false,
      uploadFileForm,
      projectHubLens,
      card_font_color,
      useCardFontColor,
      defaultIconColor,
      smallCard,
      smallerCard,
      lessDesign
    } = this.props;
    const {
      cardTitle,
      inInputMode,
      isSaving,
      isAttachmentHoveringOnCard,
      showCardTypes,
      cardType,
      selectedTopicIds,
      initialLocation
    } = this.state;

    if (!topic && !topicId && !multipleTopicsId && !selectedTopicIds) {
      return null;
    }

    if (newDesign) {
      return (
        <div
          style={
            projectHubLens
              ? {
                  marginLeft: '-12px',
                  marginTop: '5px',
                  borderTop:
                    transparent &&
                    card_font_color &&
                    `solid 1px ${card_font_color}`
                }
              : {
                  borderTop:
                    transparent &&
                    card_font_color &&
                    !lessDesign &&
                    `solid 1px ${card_font_color}`
                }
          }
          className={`${containerClassName} add-card-form-new-design-container ${this
            .props.topicId == 1 && 'root-board'}`}
        >
          {!projectHubLens && (
            <div className="plus-icon">
              <Icon
                icon="add"
                style={{ fontSize: lessDesign ? '24px' : '16px' }}
                color={
                  (transparent && card_font_color) ||
                  (uploadFileForm && '#6fcf97') ||
                  (lessDesign && '#6FCF97') ||
                  '#ffffff'
                }
              />
            </div>
          )}
          {!isSaving && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                marginLeft: lessDesign ? '0.5rem' : '1.5rem',
                width: '100%'
              }}
            >
              {!createChatOrVideoRoom && (
                <Fragment>
                  {uploadFileForm ? (
                    <Icon
                      outlined
                      icon="insert_drive_file"
                      color={
                        projectHubLens
                          ? '#F2C94C'
                          : (transparent && card_font_color) || '#f2994a'
                      }
                      style={{ fontSize: '18px' }}
                    />
                  ) : (
                    <Icon
                      outlined={cardTypes[cardType.index].outlined}
                      icon={cardTypes[cardType.index].iconType}
                      color={cardTypes[cardType.index].color}
                      style={{ fontSize: lessDesign ? '24px' : '18px' }}
                    />
                  )}
                  {!this.props.hideItemTypeDropdown && (
                    <Dropdown
                      trigger={
                        <Icon
                          additionalClasses="dark-grey-icon-button"
                          fontSize={12}
                          fontAwesome
                          icon={!showCardTypes ? 'caret-down' : 'caret-up'}
                          onClick={() =>
                            this.setState({ showCardTypes: !showCardTypes })
                          }
                        />
                      }
                    >
                      <this.DropdownList />
                    </Dropdown>
                  )}
                </Fragment>
              )}
              {uploadFileForm ? (
                <AddCardButton
                  className="add-file-upload-btn"
                  openFileUploader
                  topicId={topicId}
                  buttonText={'Upload File'}
                  instantUpload
                  projectHubLens={projectHubLens}
                  style={{ color: transparent && card_font_color }}
                />
              ) : (
                <FormInput
                  defaultValue={cardTitle}
                  onChange={this.handleSetCardTitle}
                  onSubmit={this.handleCreateCard}
                  placeholder={placeholder}
                  color={transparent && card_font_color}
                  transparent={transparent}
                  lessDesign={lessDesign}
                />
              )}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          className={cx('add-card-card-container', containerClassName)}
          style={containerStyle}
        >
          <GenericDropZone
            dropClassName="add-card-card_section"
            onDragEnter={() => this.toggleAttachmentHoveringOnCard(true)}
            onDragLeave={() => this.toggleAttachmentHoveringOnCard(false)}
            dropsDisabled
            itemType={dragItemTypes.FILE}
          >
            {uploadFileForm ? (
              <AddCardButton
                className="add-file-upload-btn"
                openFileUploader
                topicId={topicId}
                buttonText={'+ Upload File'}
                instantUpload
                projectHubLens={projectHubLens}
                style={{ color: transparent && card_font_color }}
              />
            ) : (
              <div className={cardClassName} style={cardStyle}>
                <div
                  className={`add-card-card_content ${
                    fullHeight ? 'full-height' : ''
                  }`}
                >
                  {isSaving && (
                    <LoadingIndicator defaultClassName={defaultClassName} />
                  )}

                  {!isSaving && inInputMode && (
                    <div
                      className={`add-card-input-wrapper ${
                        smallerCard ? '' : 'mr10'
                      }`}
                    >
                      <div className="flex-r-center">
                        {!createChatOrVideoRoom && (
                          <Fragment>
                            <Icon
                              outlined={cardTypes[cardType.index].outlined}
                              icon={cardTypes[cardType.index].iconType}
                              color={
                                (transparent &&
                                  !defaultIconColor &&
                                  card_font_color) ||
                                (card_font_color &&
                                  !defaultIconColor &&
                                  card_font_color) ||
                                cardTypes[cardType.index].color
                              }
                              style={{ fontSize: '16px', marginLeft: '-8px' }}
                            />
                            <Dropdown
                              trigger={
                                <Icon
                                  additionalClasses="dark-grey-icon-button"
                                  fontSize={12}
                                  fontAwesome
                                  icon={
                                    !showCardTypes ? 'caret-down' : 'caret-up'
                                  }
                                  onClick={() =>
                                    this.setState({
                                      showCardTypes: !showCardTypes
                                    })
                                  }
                                  color={
                                    useCardFontColor ? card_font_color : ''
                                  }
                                />
                              }
                            >
                              <this.DropdownList />
                            </Dropdown>
                          </Fragment>
                        )}
                        <FormInput
                          autoFocus
                          defaultValue={cardTitle}
                          onChange={this.handleSetCardTitle}
                          onSubmit={this.handleCreateCard}
                          placeholder={placeholder}
                          color={
                            useCardFontColor || transparent
                              ? card_font_color
                              : ''
                          }
                          transparent={transparent}
                        />
                      </div>
                      <AddAssignee
                        transparent={transparent}
                        hideAddFields={hideAddFields}
                        getSelectedPeople={getSelectedPeople}
                        getDetails={this.handleSetOtherDetails}
                        taskCard={cardType.type === 'TASK' ? true : false}
                        createChatOrVideoRoom={createChatOrVideoRoom}
                        makeChatPublic={makeChatPublic}
                        handleChecked={handleChecked}
                        topicHeader={topicHeader}
                        topicId={topic?.id || topicId}
                        initialDueDate={newCardAttributes?.due_date}
                        initialLabelIds={newCardRelationships?.labels?.data}
                        initialAssignments={
                          newCardRelationships?.tip_assignments?.data
                        }
                        initialLocation={initialLocation}
                        smallCard={smallCard}
                      />
                      {topMenu && (
                        <Fragment>
                          <div
                            className="add-card-input-footer"
                            style={{
                              color: useCardFontColor ? card_font_color : ''
                            }}
                          >
                            <div
                              style={{
                                marginLeft: '-15px',
                                fontSize: smallCard
                                  ? '9px'
                                  : smallerCard
                                  ? '7px'
                                  : ''
                              }}
                            >
                              <button onClick={this.handleCreateCard}>
                                Create
                              </button>
                              <button
                                onClick={() => this.handleOpenCard('Share')}
                              >
                                Share
                              </button>
                              {!smallerCard && (
                                <button
                                  onClick={() => this.handleOpenCard('Edit')}
                                >
                                  Edit
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  this.handleToggleInputMode();
                                  this.props.onDismiss &&
                                    this.props.onDismiss();
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  )}
                  {!isSaving &&
                    !inInputMode &&
                    (!isAttachmentHoveringOnCard || bottomOverlay) && (
                      <a
                        style={addCardUIStyle}
                        className="dark-grey-link w400"
                        onClick={this.handleToggleInputMode}
                      >
                        {addCardUI || '+ Add Card'}
                      </a>
                    )}

                  {isAttachmentHoveringOnCard && board.includes('document') && (
                    <DocumentCardAttachmentDropOptions
                      board={board}
                      card={null}
                      addToNewFile={this.addToNewFile}
                    />
                  )}

                  {isAttachmentHoveringOnCard && board.includes('grid') && (
                    <GridCardAttachmentDropOptions
                      board={board}
                      card={null}
                      addToNewFile={this.addToNewFile}
                    />
                  )}

                  {isFileDragged &&
                    board === 'bottom-dropzone-overlay' &&
                    !isSaving &&
                    !inInputMode && (
                      <GridCardAttachmentDropOptions
                        board={board}
                        card={null}
                        addToNewFile={this.addToNewFile}
                      />
                    )}
                </div>
              </div>
            )}
          </GenericDropZone>
        </div>
      );
    }
  }
}

const mapState = state => ({
  isFileDragged: state._newReduxTree.ui.modals.showAddCardBottomOverlay,
  viewKey: getRelevantViewForPage(state),
  card_font_color: stateMappings(state).utilities.active_design.card_font_color
});

const mapDispatch = {
  createCard,
  addGoogleFileToCard,
  addDropboxFileToCard,
  addBoxFileToCard,
  setEditCardModalOpen,
  setShowAddCardBottomOverlay
};

export default connect(mapState, mapDispatch)(AddCardCard);
