import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
// import CardDetailsFooter from './item_content/item_content_footer';
import Ability from 'Lib/ability';

import { stateMappings } from 'Src/newRedux/stateMappings';
import CommentsList from 'Components/shared/comments/CommentsList';
import CardDetailsEditor from './CardDetailsEditor';
import CardDetailsPreview from './CardDetailsPreview';
import CardPrintLayout from './CardPrintLayout';
import AddAssignee from 'src/components/shared/cards/AddAssignee';
import CardDetailsFooter from './CardDetailsFooter';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { failure, success } from 'Utils/toast';

const filterOptions = ['Add card', 'Upload file'];

class CardDetails extends Component {
  static propTypes = {
    onEditorScroll: PropTypes.func,
    rootContainerClass: PropTypes.string,
    autoSaveOnClose: PropTypes.bool,
    setShowSaveinBack: PropTypes.func,
    editorConfig: PropTypes.object
  };

  static defaultProps = {
    inEditMode: false,
    showIcons: true,
    showTitle: true,
    initialCard: false,
    editorConfig: {}
  };

  constructor(props) {
    super(props);
    const { inEditMode, showIcons, showTitle, initialCard } = props;
    this.editorRef = React.createRef();
    this.previewRef = React.createRef();
    this.state = {
      inEditMode,
      onlyForUpload: false,
      showIcons,
      showTitle,
      initialCard,
      hideComments: true
    };

    this.onEditorScroll = props.onEditorScroll;
    this.onAddCardFromFooter = this.onAddCardFromFooter.bind(this);
  }

  onAddCardFromFooter() {
    this.previewRef?.current?.getWrappedInstance()?.onAddCard &&
      this.previewRef?.current?.getWrappedInstance()?.onAddCard();
  }

  componentDidMount() {
    this.onAddCardFromFooter =
      this.previewRef?.current?.getWrappedInstance()?.onAddCard ?? (() => {});
    this.setState({
      previewTitleIconwidth:
        this.previewRef?.current?.getWrappedInstance()?.titleIconWidth ?? 0
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { card, rootContainerClass } = this.props;
    const { inEditMode } = this.state;

    // const {
    //   attachments_json: { tip_links }
    // } = card.attributes || {};

    const tip_links = card?.attributes?.attachments_json?.tip_links || [];

    try {
      [...document.getElementsByClassName('froala_banner_link_style')].map(
        (elem, index) => {
          const notFileUrl =
            Object.values(elem.classList).indexOf('fr-file') < 0;
          if (notFileUrl && tip_links[index].processed)
            elem.innerHTML = `<div class="avatar_url" style="background: url(${tip_links[index].avatar_url})"></div><p><span>${tip_links[index].title}</span><br />${tip_links[index].description}</p>`;
        }
      );
    } catch (error) {
      console.error(error);
    }

    if (inEditMode) {
      // Performance reason, don't query the DOM if `this.toolbarEl` already defined.
      this.toolbarEl =
        this.toolbarEl ||
        document.querySelector(
          `.${rootContainerClass} .card-details .card-details-editor .fr-toolbar`
        );
    } else {
      this.toolbarEl = null;
    }

    // If selected card changed
    if (card && card.id !== prevProps.cardId) {
      // Scroll card details to the top
      const cardDetailRootEl = document.getElementsByClassName(
        'card-details'
      )[0];
      cardDetailRootEl.scroll({
        top: 0,
        behavior: 'smooth'
      });

      this.setState({
        inEditMode: false
      });
    }

    if (!prevState.inEditMode && this.state.inEditMode) {
      this.setState({
        editorTitleIconWidth:
          this.editorRef?.current?.getWrappedInstance()?.titleIconWidth ?? 0
      });
    }
  };

  /**
   * On scroll event handler.
   *
   * @param {Event} e
   * @return  {Void}
   */
  handleScroll = e => {
    const { inEditMode } = this.state;
    const { rootContainerClass } = this.props;
    const toolbarEl = this.toolbarEl;

    if (!inEditMode || !rootContainerClass) {
      return;
    }

    // Don't execute default scroll event handler if handler props already defined
    if (this.onEditorScroll) {
      this.onEditorScroll(e, this.toolbarEl);
      return; // halt!
    }

    // Default scroll event handler
    if (e.currentTarget.scrollTop >= 199) {
      if (toolbarEl && !toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.add('fixed');
      }
    } else {
      if (toolbarEl && toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.remove('fixed');
      }
    }
  };

  handleToggleEditMode = () => {
    const { readOnly, originalTip, updateCardVersion } = this.props;
    if (readOnly) return;
    this.setState(state => ({ inEditMode: !state.inEditMode }));
    if (!this.state.inEditMode && originalTip) {
      updateCardVersion(originalTip);
    }
  };

  handleShowHide = () => {
    const { showIcons: showIconState, showTitle: showTitleState } = this.state;
    const hideComments =
      showIconState === true ? true : this.state.hideComments;
    this.setState({
      showIcons: !showIconState,
      showTitle: !showTitleState,
      hideComments
    });
  };

  setShowSaveinBack = show => {
    if (this.props.setShowSaveinBack) {
      if (show === true) {
        if (this.props.autoSaveOnClose === true) {
          this.props.setShowSaveinBack(show);
        }
      } else {
        this.props.setShowSaveinBack(show);
      }
    }
  };

  cloneTip = (card, originalTip) => {
    let deepClonedTip;
    if (card) deepClonedTip = cloneDeep(card);
    if (deepClonedTip && deepClonedTip.attributes && originalTip) {
      deepClonedTip.attributes.body = originalTip.body;
      deepClonedTip.attributes.title = originalTip.title;
      return deepClonedTip;
    }
  };

  toggleComments = () => {
    this.setState(({ hideComments }) => ({ hideComments: !hideComments }));
  };

  handleSetOtherDetails = async ({
    assignees = [],
    dueDate,
    labels = [],
    selectedTopicIds = [],
    selectedLocation
  }) => {
    assignees = assignees.map(val => val.id);
    labels = labels.map(val => val.id);

    const { card, updateCard } = this.props;
    let attributes = {};
    let relationships = {};

    const willUpdateDueDate = dueDate != card?.attributes?.due_date;
    if (willUpdateDueDate) attributes.due_date = dueDate;

    const willUpdateTopic =
      card?.relationships?.topics?.data?.join(',') !==
      selectedTopicIds.join(',');
    if (willUpdateTopic) relationships.topics = { data: selectedTopicIds };

    const willUpdateAssignments =
      assignees.sort().join(',') !==
      (card?.relationships?.tip_assignments?.data).sort().join(',');
    if (willUpdateAssignments) {
      let updatedAssigneeIds = [];
      assignees.forEach(val => {
        const splitString = val.split(':');
        updatedAssigneeIds.push(splitString.length > 1 ? splitString[1] : val);
      });
      relationships.tip_assignments = { data: updatedAssigneeIds };
    }

    const willUpdateLabels =
      labels
        .map(val => val.split(':')[val.split(':').length - 1])
        .sort()
        .join(',') !== (card?.relationships?.labels?.data).sort().join(',');
    if (willUpdateLabels) {
      let updatedLabelIds = [];
      labels.forEach(val => {
        const splitString = val.split(':');
        updatedLabelIds.push(splitString.length > 1 ? splitString[1] : val);
      });
      relationships.labels = { data: updatedLabelIds };
    }

    // LOCATION UPDATE
    const willUpdateLocation =
      selectedLocation?.address &&
      card?.attributes?.address != selectedLocation?.address;
    if (willUpdateLocation) {
      const { address, latitude, longitude } = selectedLocation;
      if (address) {
        attributes.address = address;
        attributes.latitude = latitude;
        attributes.longitude = longitude;
      }
    }

    if (
      willUpdateDueDate ||
      willUpdateTopic ||
      willUpdateAssignments ||
      willUpdateLabels ||
      willUpdateLocation
    ) {
      const updatedCard = await updateCard({
        id: card.id,
        attributes,
        relationships
      });

      if (updatedCard) {
        success('Card updated');
      } else failure('Card not updated');
    }
  };

  onUploadFile = () => {
    this.setState({ onlyForUpload: !this.state.inEditMode }, () => {
      setTimeout(() => {
        this.editorRef?.current?.getWrappedInstance()?.onUploadFile();
      });
    });
  };

  afterAutoSaveUpload = () => {
    this.setState({ onlyForUpload: false });
  };

  renderCardDetailsEditor = () => {
    const { card, hideCardIcon } = this.props;
    let deepClonedTip = this.cloneTip(card, this.props.originalTip);
    if (!deepClonedTip) deepClonedTip = card;
    return (
      <CardDetailsEditor
        ref={this.editorRef}
        card={deepClonedTip}
        onToggleEditMode={this.handleToggleEditMode}
        showMinMax={this.props.showMinMax}
        autoSaveOnClose={this.props.autoSaveOnClose}
        initialCard={this.state.initialCard}
        setShowSaveinBack={this.setShowSaveinBack}
        updateDefaultTip={this.props.updateDefaultTip}
        hideUploader={this.props.hideUploader}
        hideLinker
        hideCancel
        hideTitle={!this.state.showTitle}
        showDots={this.props.showDots}
        editorConfig={this.props.editorConfig}
        cardFontColor={this.props.cardFontColor}
        isSplitScreen={this.props.isSplitScreen}
        onSplitScreenClose={this.props.onSplitScreenClose}
        hideFileButtons={true}
        autoSaveUploadedFiles={this.state.onlyForUpload}
        afterAutoSaveUpload={this.afterAutoSaveUpload}
        autoSave={this.props.autoSave}
        hideCardIcon={hideCardIcon}
      />
    );
  };

  render() {
    const {
      card,
      readOnly,
      showMinMax,
      showDots,
      cardFontColor,
      topicId,
      isSplitScreen,
      onSplitScreenClose,
      hideCardLinks,
      hideCardIcon
    } = this.props;
    const {
      inEditMode,
      hideComments,
      showIcons,
      showTitle,
      editorTitleIconWidth,
      previewTitleIconwidth,
      onlyForUpload
    } = this.state;

    if (!card) return null;

    const { address, latitude, longitude } = card.attributes;

    const initialLocation = address ? { address, latitude, longitude } : null;

    return card ? (
      <div
        className="card-details"
        style={{
          flexDirection: 'row'
          // overflowX: isSplitScreen ? 'visible' : 'hidden',
          // overflowY: isSplitScreen ? 'scroll' : 'hidden'
        }}
      >
        <div
          className="card-details"
          onScroll={this.handleScroll}
          style={{
            margin: 0,
            padding: 0,
            height: 'initial',
            flex: 1,
            borderRadius: 0
            // overflow: isSplitScreen ? 'visible' : 'hidden',
            // overflowY: isSplitScreen ? 'scroll' : 'hidden'
          }}
        >
          {(inEditMode || onlyForUpload) &&
            (inEditMode ? (
              this.renderCardDetailsEditor()
            ) : (
              <div style={{ display: 'none' }}>
                {this.renderCardDetailsEditor()}
              </div>
            ))}

          {(readOnly || !inEditMode) && (
            <CardDetailsPreview
              ref={this.previewRef}
              card={card}
              onDoubleClick={this.handleToggleEditMode}
              showMinMax={showMinMax}
              showTitle={showTitle}
              showIcons={showIcons}
              handleShowHide={this.handleShowHide}
              toggleComments={this.toggleComments}
              hideComments={this.state.hideComments}
              showDots={showDots}
              cardFontColor={cardFontColor}
              isSplitScreen={isSplitScreen}
              onSplitScreenClose={onSplitScreenClose}
              hideCardLinks={hideCardLinks}
              hideCardIcon={hideCardIcon}
            />
          )}
          {showIcons && (
            <div
              style={{
                paddingLeft: inEditMode
                  ? // ? editorTitleIconWidth + 'px'
                    '6px'
                  : previewTitleIconwidth + 'px'
              }}
              className={`card_details_foot ${
                inEditMode ? 'isEdit' : 'isPreview'
              }`}
            >
              {!readOnly && (
                <>
                  <AddAssignee
                    getDetails={this.handleSetOtherDetails}
                    taskCard={
                      card?.attributes?.card_type == 'TASK' ? true : false
                    }
                    topicId={card?.relationships?.topics?.data[0] ?? topicId}
                    initialDueDate={card?.attributes?.due_date}
                    initialLabelIds={card?.relationships?.labels?.data}
                    initialAssignments={
                      card?.relationships?.tip_assignments?.data
                    }
                    initialTopicIds={card?.relationships?.topics?.data}
                    mustSelect
                    initialLocation={initialLocation}
                  />
                  <CardDetailsFooter
                    card={card}
                    toggleComments={this.toggleComments}
                    hideComments={this.state.hideComments}
                    onAddCard={this.onAddCardFromFooter}
                    cardFontColor={cardFontColor}
                    handleShowHide={this.handleShowHide}
                    showIcons={showIcons}
                    onEditClick={this.handleToggleEditMode}
                    onSaveClick={
                      this.editorRef?.current?.getWrappedInstance()
                        .handleClickSave ?? (() => {})
                    }
                    inEditMode={inEditMode}
                    onUploadFile={this.onUploadFile}
                    filterOptions={filterOptions}
                  />
                </>
              )}
              {!hideComments && (
                <CommentsList
                  cardId={card.id}
                  hideComments={this.state.hideComments}
                />
              )}
            </div>
          )}
          <CardPrintLayout card={card} />
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const card = sm.cards[props.cardId];
  const readOnly = !card?.attributes?.abilities?.self?.can_update;
  return {
    card,
    readOnly,
    inEditMode: sm.page.cardEditMode,
    cardFontColor:
      props.useDesignColor &&
      get(sm, 'utilities.active_design.card_font_color'),
    topicId: sm.page.topicId
  };
};

export default connect(mapState, { updateCard })(CardDetails);
