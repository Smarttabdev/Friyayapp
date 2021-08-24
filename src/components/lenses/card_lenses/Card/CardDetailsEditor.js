import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FileUploadBox from 'Components/shared/file_upload_box';
import CardDetailsHeader from './CardDetailsHeader';
import { createCard, updateCard } from 'Src/newRedux/database/cards/thunks';
import { parseAttachmentsJson } from 'Lib/utilities';
import { success, failure } from 'Utils/toast';
import get from 'lodash/get';
import IconButton from 'Components/shared/buttons/IconButton';
import Dropdown from 'Components/shared/Dropdown';
import {
  cardTypes,
  getCardTypeAndIndex
} from 'src/components/shared/CardAndBoardTypes';
import TypeDropdownList from '../TypeDropdownList';
import Icon from 'Components/shared/Icon';
import ControllableTextEditor from 'src/components/shared/ControllableTextEditor';
import CardNestedCards from './CardNestedCards';

class CardDetailsEditor extends Component {
  textEditorRef = React.createRef();
  static propTypes = {
    card: PropTypes.shape({
      attributes: PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        attachments_json: PropTypes.object
      }),
      relationships: PropTypes.shape({
        attachments: PropTypes.object
      })
    }),
    autoSaveOnClose: PropTypes.bool,
    newCardRelationships: PropTypes.object,
    editorConfig: PropTypes.object
  };

  static defaultProps = {
    setShowSaveinBack: () => {},
    newCardRelationships: {},
    initialCard: false,
    editorConfig: {}
  };

  constructor(props) {
    super(props);

    this.titleIconRef = React.createRef();
    // this.titleContainer = React.createRef();
    this.EditorRef = React.createRef();
    this.FileUploadRef = React.createRef();

    this.state = {
      itemTitle: get(props, 'card.attributes.title', ''),
      itemBody: get(props, 'card.attributes.body', ''),
      attachmentsJson: {
        tip_links: get(
          props,
          'card?.attributes?.attachments_json?.tip_links',
          []
        ),
        documents: get(props, 'card.relationships.attachments.data', [])
      },
      saving: false,
      isDirty: false,
      autoSaveOnClose: props.autoSaveOnClose,
      autoSaveCard: true
      // titleContainerHeight: 0
    };

    this.onToggleEditMode = props.onToggleEditMode;
    this.titleIconWidth = 0;
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload);
    this.titleIconWidth = this.titleIconRef?.current?.clientWidth ?? 0;
    // this.setState({
    //   titleContainerHeight: this.titleContainer?.current?.clientHeight ?? 0
    // });

    document.addEventListener('click', this.handleClickOutside);

    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('beforeunload', this.onUnload);
    clearInterval(this.interval);
    document.removeEventListener('click', this.handleClickOutside);

    const { card } = this.props;
    const { isDirty, autoSaveCard } = this.state;

    if (isDirty && autoSaveCard) {
      this.save(card);
    }

    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const lastCard = prevProps.card && { ...prevProps.card };
    const { card } = this.props;

    if (this.state.isDirty && lastCard && lastCard.id !== card.id) {
      this.saveBeforeUnmount(lastCard);
    }

    if (!prevState.updatedCardType && this.state.updatedCardType) {
      this.setState({ isDirty: true });
      this.props.setShowSaveinBack(true);
    }

    if (this.props.autoSave) {
      //auto save every 1minute after card body changed
      this.interval = setInterval(() => this.handleSave(), 60000);
    }
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props !== nextProps) {
      this.setState({
        autoSaveCard: false
      });
    }
  };

  onUnload = e => {
    e.preventDefault();

    const { card } = this.props;
    const { isDirty, autoSaveCard } = this.state;

    if (isDirty && autoSaveCard) {
      this.save(card);
      return (e.returnValue = 'Are you sure you want to close?');
    }
  };

  handleAddUploadedFile = ({ response: { data } }) => {
    const { attachmentsJson } = this.state;
    const file = { ...data.attributes, id: data.id };
    const revisedAttachmentsJson =
      data.type == 'images'
        ? {
            ...attachmentsJson,
            images: [...(attachmentsJson.images || []), file]
          }
        : {
            ...attachmentsJson,
            documents: [...(attachmentsJson.documents || []), file]
          };

    this.setState({ attachmentsJson: revisedAttachmentsJson, isDirty: true });
    !this.props.autoSaveUploadedFiles && this.props.setShowSaveinBack(true);
    if (this.props.autoSaveUploadedFiles) {
      this.save(this.props.card);
      this.props.afterAutoSaveUpload();
    }
  };

  handleRemoveUploadedFile = attachmentId => {
    const { attachmentsJson } = this.state;
    let attachments = {};

    for (let type of Object.keys(attachmentsJson)) {
      attachments = {
        ...attachments,
        [type]: attachmentsJson[type]
          ? attachmentsJson[type].filter(
              attachment => attachment.id !== attachmentId
            )
          : []
      };
    }

    this.setState({ attachmentsJson: attachments, isDirty: true });
    this.props.setShowSaveinBack(true);
  };

  handleItemTitleChange = e => {
    this.setState({ itemTitle: e.target.value, isDirty: true });
    this.props.setShowSaveinBack(true);
  };

  handleItemBodyChange = body => {
    this.setState({ itemBody: body, isDirty: true });
    this.props.setShowSaveinBack(true);
  };

  handleClickOutside = e => {
    //check froala toolbar/inline element
    const isClickInsideFroalaInlineElement =
      document.getElementsByClassName('fr-toolbar')[0]?.contains(e.target) ||
      //get active popup element
      document
        .getElementsByClassName('fr-popup fr-active')[0]
        ?.contains(e.target);

    const isClickCardActionDropdown = document
      .getElementsByClassName('card-option-action-dropdown')[0]
      ?.contains(e.target);

    //somehow after clicking on tribute element, target would return body element
    const isClickTributeElement = e.target.tagName === 'BODY';

    if (
      this.props.autoSave &&
      !isClickInsideFroalaInlineElement &&
      !isClickCardActionDropdown &&
      !isClickTributeElement &&
      this.textEditorRef.current &&
      !this.textEditorRef.current.contains(e.target)
    ) {
      this.handleClickSave();
    }
  };

  /**
   * On click save event handler.
   *
   * @param {Event} e
   * @return  {Void}
   */

  handleSave = e => {
    e && e.preventDefault();
    const { isDirty } = this.state;
    const { card } = this.props;
    if (isDirty) {
      this.save(card);
    }
  };

  handleClickSave = e => {
    e && e.preventDefault();
    const { isDirty } = this.state;
    const { card } = this.props;

    if (isDirty) {
      this.save(card);
    }
    this.setState(
      {
        autoSaveOnClose: false
      },
      this.onToggleEditMode
    );
  };

  /**
   * Create new card
   *
   * @param {Event} e
   * @return {Void}
   */
  handleClickCreate = async e => {
    e && e.preventDefault();
    const {
      itemBody: body,
      itemTitle: title,
      attachmentsJson: { images = [], documents = [] },
      updatedCardType
    } = this.state;
    const {
      createCard,
      setShowSaveinBack,
      newCardRelationships,
      newCardAttributes,
      domain
    } = this.props;

    let attributes = { title, body, ...newCardAttributes };
    if (updatedCardType) attributes.card_type = updatedCardType;

    const relationships = {
      ...newCardRelationships,
      attachments: {
        data: [...images.map(({ id }) => id), ...documents.map(({ id }) => id)]
      }
    };

    try {
      setShowSaveinBack(false);
      if (newCardRelationships.topics.data.length == 0) {
        return failure('Select a Board to save card into');
      }
      const {
        data: { data: newCard }
      } = await createCard({ attributes, relationships, domain });
      if (this.props.afterCardCreated) {
        this.props.afterCardCreated(newCard.id);
      }
      this.setState({ isDirty: false }, this.onToggleEditMode);
    } catch (ex) {
      failure('Unable to create card, please try again later!');
      console.error(ex);
    }
  };

  /**
   * Save before unmount, use previous card props instead of current props.
   *
   * @param {Object}  lastCard
   * @return {Void}
   */
  saveBeforeUnmount = lastCard => {
    this.save(lastCard);
  };

  handleKeyUp = ({ keyCode }) => {
    if (keyCode === 13) {
      this.editor.getWrappedInstance().focus();
    }
  };

  /**
   * Persist card update.
   *
   * @param {Object}  card
   * @return {Void}
   */
  async save(card) {
    const { updateCard, updateDefaultTip, onUpdateComplete } = this.props;
    const {
      itemBody,
      itemTitle,
      attachmentsJson,
      updatedCardType
    } = this.state;

    const images = attachmentsJson.images || [];
    const documents = attachmentsJson.documents || [];

    let attributes = {
      title: itemTitle,
      body: itemBody
    };
    if (updatedCardType) attributes.card_type = updatedCardType;

    const relationships = {
      attachments: {
        data: [...images.map(att => att.id), ...documents.map(att => att.id)]
      }
    };

    const modifiedCard = { id: card.id, attributes, relationships };
    if (updateDefaultTip) updateDefaultTip(modifiedCard);

    try {
      this.setState({ isDirty: false });
      this.props.setShowSaveinBack(false);
      const updatedCard = await updateCard(modifiedCard);
      if (updatedCard) {
        success('Card Updated');
      }
    } catch (ex) {
      failure('Unable to update card, please try again later!');
      console.error(ex);
    }

    this.setState({
      autoSaveCard: true
    });
  }

  setEditorRef = ref => (this.editor = ref);

  toggleToolbar = () => this.EditorRef.current.toggleToolbar();

  onUploadFile = () => {
    this.FileUploadRef?.current?.getWrappedInstance()?.handleFilePicker();
  };

  render() {
    const {
      card,
      onToggleEditMode,
      showMinMax,
      initialCard,
      hideUploader,
      hideLinker,
      hideCancel,
      hideTitle,
      showDots,
      customCreateIcons,
      cardFontColor,
      isSplitScreen,
      onSplitScreenClose,
      hideFileButtons,
      canCancel,
      onCancel,
      hideCardIcon
    } = this.props;
    const {
      attachmentsJson,
      itemBody,
      itemTitle,
      updatedCardType
      // titleContainerHeight
    } = this.state;

    const uploadedFiles = parseAttachmentsJson(attachmentsJson);
    const isCreatingNewCard = !card;

    const cardType = getCardTypeAndIndex(
      updatedCardType ?? card?.attributes?.card_type
    );

    return (
      <Fragment>
        {!isCreatingNewCard && !isSplitScreen && (
          <CardDetailsHeader
            card={card}
            inEditMode
            onSaveClick={this.handleClickSave}
            showMinMax={showMinMax}
            showDots={showDots}
            cardFontColor={cardFontColor}
            hideTitle={hideTitle}
          />
        )}
        {isCreatingNewCard &&
          customCreateIcons &&
          customCreateIcons(this.handleClickCreate)}

        {/* <div className="card-details-editor-parent"> */}
        <div
          className="card-details-editor"
          style={{ color: cardFontColor, flex: 1 }}
        >
          <div
            className="item-update-form"
            style={{ flexGrow: 1 }}
            ref={this.textEditorRef}
          >
            {!hideTitle && (
              // <div ref={this.titleContainer} className="titleContainer">
              <div className="titleContainer">
                {!hideCardIcon && (
                  <span
                    ref={this.titleIconRef}
                    // style={{ height: `${titleContainerHeight}px` }}
                    className="card_details_editor_title_icon"
                  >
                    <Dropdown
                      trigger={
                        <div
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
                          <IconButton
                            additionalClasses="dark-grey-icon-button"
                            fontSize={12}
                            fontAwesome
                            icon="caret-down"
                          />
                        </div>
                      }
                    >
                      <TypeDropdownList
                        type="card"
                        onCardClick={cardType => {
                          this.setState({ updatedCardType: cardType });
                        }}
                      />
                    </Dropdown>
                  </span>
                )}
                <input
                  type="text"
                  name="item[title]"
                  className="card-details-editor_title-input"
                  placeholder="Type title"
                  autoComplete="off"
                  tabIndex={0}
                  value={itemTitle}
                  ref={r => (this.titleEditor = r)}
                  onChange={this.handleItemTitleChange}
                  onKeyUp={this.handleKeyUp}
                  required
                />
                <div onClick={this.toggleToolbar} className="hideToolbar">
                  <Icon icon={'keyboard_hide'} fontSize={24} />
                </div>
                {(isSplitScreen || canCancel) && (
                  <div style={{ marginLeft: '10px', color: '#757575' }}>
                    <IconButton
                      icon="close"
                      additionalClasses="card-container__card-panel-toggle"
                      onClick={onSplitScreenClose || onCancel}
                    />
                  </div>
                )}
              </div>
            )}
            <div className="form-group item-text-attachments">
              <div className="form-group item-text-editor-container">
                <ControllableTextEditor
                  ref={this.EditorRef}
                  itemBody={itemBody}
                  cardFontColor={cardFontColor}
                  card={card}
                  setEditorRef={this.setEditorRef}
                  editorConfig={this.props.editorConfig}
                  handleItemBodyChange={this.handleItemBodyChange}
                />
              </div>
            </div>
          </div>
          {card && <CardNestedCards card={card} />}
          <div
            className="bottom-btns"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexShrink: 0,
              marginLeft: '-3px'
            }}
          >
            {!hideUploader && (
              <FileUploadBox
                ref={this.FileUploadRef}
                objectType="tip"
                uploadedFiles={uploadedFiles}
                tabIndex={2}
                removeUploadedFile={this.handleRemoveUploadedFile}
                addUploadedFile={this.handleAddUploadedFile}
                hideButtons={hideFileButtons}
              />
            )}
            {!hideCancel && (
              <div className="save-button">
                {isCreatingNewCard ? (
                  <button
                    type="button"
                    className="btn btn-default mr25 button"
                    onClick={this.handleClickCreate}
                    disabled={!itemTitle}
                  >
                    Create
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn mr25 button"
                    onClick={this.onToggleEditMode}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {/* </div> */}
      </Fragment>
    );
  }
}

const mapDispatch = {
  updateCard,
  createCard
};

export default connect(undefined, mapDispatch, undefined, { withRef: true })(
  CardDetailsEditor
);
