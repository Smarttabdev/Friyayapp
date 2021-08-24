/* eslint-disable complexity */
import React, { Component, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextEditor from 'Components/shared/text_editor';
import { connect } from 'react-redux';
import AttachmentActions from 'Actions/attachment_actions';
import AttachmentStore from '../../../stores/attachment_store';
import FileDropStore from '../../../stores/file_drop_store';
import FileUploadBox from 'Components/shared/file_upload_box';
import TopicsSelectMenu from 'Components/shared/topics_select_menu';
import SharingSelectMenu from 'Components/shared/sharing_select_menu';
import LabelTabContent from './tip_tab_content/label_tab_content';
import PlanTabContent from './tip_tab_content/plan_tab_content';
import FieldsTabContent from './tip_tab_content/fields_tab_content';
import { IconButton } from 'Components/shared/buttons';
import Ability from 'Lib/ability';
import tiphive from 'Lib/tiphive';
import moment from 'moment';
import toString from 'lodash/toString';
import { compose, join, map } from 'ramda';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { failure, success } from 'Utils/toast';
import { createCard, updateCard } from 'Src/newRedux/database/cards/thunks';
import { VIEWS_ENUM as BOARDS } from 'Enums';
import { getLabelCategory } from 'Actions/labels_category';
import { saveMainTipContent, clearMainTipContent } from 'Actions/autoSave';
import { getDefaultTopic } from 'Src/newRedux/database/topics/selectors';
import { setEditModalCardType } from 'Src/newRedux/utilities/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import TipTitleEditor from './TipTitleEditor';
import ControllableTextEditor from 'src/components/shared/ControllableTextEditor';
import TipTabContentFooter from './TipTabContentFooter';
import AddCardCard from 'Src/components/shared/cards/AddCardCard';
import { useOutsideAlerter } from 'Src/lib/hooks';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import { createCommentForCard } from 'Src/newRedux/database/comments/thunks';

const RenderAddCard = ({
  onClose,
  topicId,
  tipId,
  afterCardCreated,
  onDismiss
}) => {
  const thisRef = useRef(null);
  useOutsideAlerter(thisRef, onClose);
  return (
    <div className="dropdown-menu menuAddCard" ref={thisRef}>
      <p className="dropdown-menu-title">Create Card</p>
      <AddCardCard
        topicId={topicId}
        afterCardCreated={afterCardCreated}
        inInputMode
        onDismiss={onDismiss}
        newCardRelationships={{ follows_tip: { data: tipId } }}
        topMenu
        defaultClassName={false}
      />
    </div>
  );
};

const getAttachmentIds = compose(
  map(
    ({
      response: {
        data: { id }
      }
    }) => id
  )
);
class TipTabContent extends Component {
  static propTypes = {
    group: PropTypes.object,
    topic: PropTypes.object,
    tip: PropTypes.object,
    dropMethod: PropTypes.string,
    dropFile: PropTypes.string,
    activeTab: PropTypes.string,
    isSaving: PropTypes.bool,
    createCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    // userName: PropTypes.string.isRequired,
    // userId: PropTypes.string.isRequired,
    activeTipView: PropTypes.number,
    saveContent: PropTypes.func.isRequired,
    clearContent: PropTypes.func.isRequired,
    savedContent: PropTypes.object,
    labelsCategory: PropTypes.array,
    getLabelCategories: PropTypes.func.isRequired,
    isLoadingLC: PropTypes.bool,
    showMinMax: PropTypes.bool
  };

  static defaultProps = {
    defaultAttributes: {},
    isSaving: false,
    labelsCategory: [],
    tip: null,
    topic: null,
    isLoadingLC: false,
    showMinMax: false
  };

  isSaved = false;

  constructor(props) {
    super(props);
    this.EditorRef = React.createRef();
    this.FileUploadRef = React.createRef();

    this.state = {
      uploadedFiles: [],
      reloadingUploadedFiles: false,
      tipBody: '',
      tipTitle: '',
      tipAttachmentIds: '',
      selectedLabelIds: [],
      // cardType: props.tip
      //   ? tip?.attributes?.card_type
      //   : props.editCardModalCardType,
      isSaving: false
    };
  }

  onUploadFile = () => {
    this.FileUploadRef?.current?.getWrappedInstance()?.handleFilePicker();
  };

  componentDidMount() {
    this.mounted_ = true;
    AttachmentStore.addEventListener(
      window.ATTACHMENTS_LOAD_EVENT,
      this.onAttachmentsLoad
    );

    const $tipCarousel = $('#carousel-tip-form').carousel({
      interval: false,
      keyboard: false
    });

    $tipCarousel.on('slide.bs.carousel', this.onTipSlide);

    let tipTitle = '';
    let tipBody = '';
    let attachmentIds = [];
    let uploadedFiles = [];
    let labelsIds = [];

    const {
      props: {
        tip,
        defaultAttributes,
        defaultRelationships,
        dropFile,
        savedContent
      }
    } = this;

    if (tip !== null) {
      const {
        attributes: {
          title,
          body,
          attachments_json: { images, documents }
        },
        relationships: {
          labels: { data: labels }
        }
      } = tip;

      tipTitle = title;
      tipBody = body;

      labelsIds = labels; //.map(({ id }) => toString(id)); MH changes as now normalizing label relationships

      uploadedFiles = [
        ...this.uploadedFileParse('images', images),
        ...this.uploadedFileParse('documents', documents)
      ];

      if (documents) {
        attachmentIds = [
          ...attachmentIds,
          ...documents.map(({ id }) => toString(id))
        ];
      }

      if (images) {
        attachmentIds = [
          ...attachmentIds,
          ...images.map(({ id }) => toString(id))
        ];
      }
    } else {
      if (savedContent.tip_title) {
        tipTitle = savedContent.tip_title;
      }

      if (savedContent.tip_body) {
        tipBody = savedContent.tip_body;
      }

      if (
        savedContent.tip_attachment_ids &&
        typeof savedContent.tip_attachment_ids == 'string'
      ) {
        attachmentIds = savedContent.tip_attachment_ids.split(',');
      }

      // Needed when editing card that is being added in kanban lane

      if (get(defaultRelationships, 'labels.data.length')) {
        labelsIds = defaultRelationships.labels.data;
      }
    }

    if (attachmentIds.length > 0) {
      AttachmentActions.loadAttachments(attachmentIds);
      this.setState({ reloadingUploadedFiles: true });
    }

    // we don't have an existing tip but a dropped file as a new tip?
    if (tip === null && dropFile) {
      tipTitle = dropFile.name;
      tipBody = dropFile.url;
    }

    const defaultTitle = defaultAttributes.title || '';

    this.setState(state => ({
      ...state,
      tipBody: tipBody || '',
      tipTitle: tipTitle || defaultTitle,
      tipAttachmentIds: attachmentIds || [],
      selectedLabelIds: labelsIds,
      cardType: this.props.tip
        ? tip?.attributes?.card_type
        : this.props?.editCardModalCardType ?? 'CARD',
      uploadedFiles
    }));

    FileDropStore.clearItemUploadedFile(FileDropStore.getState(), {
      itemType: 'tips',
      itemID: 'new'
    });

    $('#secondary-modal').on('hidden.bs.modal', this.afterModalClose);
  }

  componentWillUnmount() {
    $('#secondary-modal').off('hidden.bs.modal', this.afterModalClose);
    AttachmentStore.removeEventListener(
      window.ATTACHMENTS_LOAD_EVENT,
      this.onAttachmentsLoad
    );
    this.mounted_ = false;
  }

  onAttachmentsLoad = (attachments = []) => {
    let uploadedFiles = attachments.map(item => ({
      response: {
        data: item
      },
      localData: {
        preview: null
      }
    }));

    const {
      props: { tip }
    } = this;

    if (tip !== null) {
      // edit mode
      const { images, documents } = tip.attributes.attachments_json;

      uploadedFiles = [
        ...this.uploadedFileParse('images', images),
        ...this.uploadedFileParse('documents', documents)
      ];
    }

    this.setState({
      reloadingUploadedFiles: false,
      uploadedFiles
    });
  };

  handleAddUploadedFile = uploadedFile => {
    let {
      state: { uploadedFiles },
      props: { tip }
    } = this;

    if (tip) {
      // edit mode
      const { images, documents } = tip.attributes.attachments_json;

      uploadedFiles = [
        ...this.uploadedFileParse('images', images),
        ...this.uploadedFileParse('documents', documents)
      ];
    }

    uploadedFiles = [...uploadedFiles, uploadedFile];

    const tipAttachmentIds = getAttachmentIds(uploadedFiles);

    this.saveOnChange('tip_attachment_ids', tipAttachmentIds);
    this.setState({ uploadedFiles, tipAttachmentIds });

    // scroll to last uploaded file
    const attachmentsEl = document.querySelector('.tip-text-attachments');
    if (attachmentsEl) {
      attachmentsEl.scrollTop = attachmentsEl.scrollHeight;
    }

    if (this.props.instantUpload) {
      const attributes = {
        title: tiphive.baseName(uploadedFile.response.data.attributes.file_url)
      };

      const relationships = {
        attachments: { data: tipAttachmentIds },
        topics: { data: [this.props.topicId || 1] }
      };

      this.props.setEditCardModalOpen(false);

      this.props.createCard({
        attributes: attributes,
        relationships: relationships,
        scrollTo: true,
        domain: this.props.domain
      });
    }
  };

  // handleRemoveUploadedFile = removedFileId => {
  //   const { state: { tipAttachmentIds } } = this;

  //   this.setState(state => ({
  //     ...state,
  //     tipAttachmentIds: tipAttachmentIds
  //       .split(',')
  //       .filter(id => id !== removedFileId)
  //       .join(',')
  //   }));
  // }

  handleTipBodyChange = tipBody => {
    this.setState({ tipBody });
    this.saveOnChange('tip_body', tipBody);
  };

  handleTipTitleChange = e => {
    const { value: tipTitle } = e.target;
    this.setState({ tipTitle });
    this.saveOnChange('tip_title', tipTitle);
  };

  saveOnChange(type, value) {
    if (!this.props.tip) {
      this.props.saveContent({ type, value });
    }
  }

  handleTipFormSubmit = async e => {
    let pendingComments;
    if (Array.isArray(e)) pendingComments = e;
    else e.preventDefault();

    this.props.setEditCardModalOpen(false);
    const serverCard = await this.saveCard(pendingComments);
    // tiphive.hideSecondaryModal();

    if (serverCard) {
      if (pendingComments?.length > 0) {
        for (let i = 0; i < pendingComments.length; i++) {
          await this.props.createCommentForCard({
            newComment: {
              type: 'comments',
              attributes: { body: pendingComments[i].attributes.body }
            },
            cardId: serverCard.data.data.id
          });
        }
      }

      const elem = $('.card-title.c' + serverCard.data.data.id)[0];
      if (elem) {
        elem.scrollIntoView({ block: 'end', behavior: 'smooth' });
        $(elem).animate(
          { color: 'blue', 'font-size': '24px', 'font-weight': '600' },
          'slow',
          () => {
            $(elem).animate({
              color: '#555',
              'font-size': '14px',
              'font-weight': '500'
            });
          }
        );
      }
    }
  };

  handleLabelChange = (id, checked) => {
    if (id == 'fromFooter') {
      const labelIds = checked;
      this.setState({ selectedLabelIds: labelIds });
      return;
    }

    if (checked) {
      this.setState(state => ({
        ...state,
        selectedLabelIds: [...state.selectedLabelIds, id]
      }));
    } else {
      this.setState(state => ({
        ...state,
        selectedLabelIds: state.selectedLabelIds.filter(
          selectedId => selectedId !== id
        )
      }));
    }
  };

  handleFieldsChange = data => {
    this.setState({ cardType: data?.cardType });
  };

  saveCard = async () => {
    const {
      state: { tipTitle, tipBody, tipAttachmentIds, selectedLabelIds },
      props: {
        tip,
        updateCard,
        createCard,
        clearContent,
        defaultAttributes,
        defaultRelationships,
        domain
      }
    } = this;

    const topicIds = $('#main-tip-form #tip_topic_ids').val();
    const sharingItemIds = this.sharingSelector.getSharingItemIds();
    const planData = this.planTabContent.getWrappedInstance().returnState();
    if (isEmpty(tipTitle.trim())) {
      failure('Please input Card Title');
      return false;
    }

    const shareSettings = sharingItemIds.map(id => ({
      sharing_object_id: id.split('-')[1],
      sharing_object_type: id.split('-')[0]
    }));

    const attributes = {
      card_type:
        this.state?.cardType ||
        (this.props.editCardModalCardType &&
          this.props.editCardModalCardType != 'CARD' &&
          this.props.editCardModalCardType),

      title: tipTitle,
      body: tipBody,
      expiredAt: null,
      start_date: moment(planData.startDateValue).toISOString(),
      due_date: moment(planData.dueDateValue).toISOString(),
      completion_date: moment(planData.completionDateValue).toISOString(),
      expected_completion_date: moment(
        planData.expectedCompletionDateValue
      ).toISOString(),
      resource_required: planData.workEstimationValue,
      resource_expended: planData.actualWorkValue,
      points: planData.pointsValue,
      cactii: planData.cactiiValue,
      completed_percentage: planData.completionValue,
      priority_level: planData.priorityValue,
      share_public: shareSettings.some(
        setting => setting.sharing_object_id === 'everyone'
      ),
      private: shareSettings.some(
        setting => setting.sharing_object_id === 'private'
      )
    };

    let newAttributes = attributes;

    if (defaultAttributes) {
      for (let key in attributes) {
        if (!attributes[key] && defaultAttributes[key]) {
          newAttributes[key] = defaultAttributes[key];
        } else {
          newAttributes[key] = attributes[key];
        }
      }
    }

    const relationships = {
      attachments: { data: tipAttachmentIds },
      depends_on: { data: planData.dependencyValues.map(i => i.id) },
      labels: { data: selectedLabelIds },
      share_settings: {
        data: shareSettings
      },
      topics: { data: topicIds },
      tip_assignments: { data: planData.assignedToValues.map(i => i.id) },
      follows_tip: { data: null },
      subtopics: { data: tip ? tip.relationships.subtopics : null }
    };

    let newRelationships = relationships;

    if (defaultRelationships) {
      for (let key in relationships) {
        if (!relationships[key] && defaultRelationships[key]) {
          newRelationships[key] = defaultRelationships[key];
        } else {
          newRelationships[key] = relationships[key];
        }
      }
    }

    this.setState({ isSaving: true });

    const saveSuccess = tip
      ? await updateCard({
          id: tip.id,
          attributes: newAttributes,
          relationships: newRelationships,
          domain
        })
      : await createCard({
          attributes: newAttributes,
          relationships: newRelationships,
          scrollTo: true,
          domain
        });
    saveSuccess && tip && success('Card updated');
    saveSuccess && this.props.setEditModalCardType('');
    this.mounted_ && this.setState({ isSaving: false });
    clearContent();
    return saveSuccess;
  };

  onTipSlide = ({ direction, relatedTarget }) => {
    const {
      state: { tipTitle }
    } = this;
    const $target = $(relatedTarget);
    const slideIndex = $target
      .parent()
      .find('.item')
      .index($target);
    const topicIds = $('#main-tip-form #tip_topic_ids').val();

    if (direction === 'left' && slideIndex === 1 && isEmpty(tipTitle.trim())) {
      failure('Please input Card Title');
      return false;
    }

    if (
      direction === 'left' &&
      slideIndex === 2 &&
      (!topicIds || topicIds.length === 0)
    ) {
      failure('Please select at least one Board');
      return false;
    }
  };

  uploadedFileParse(type, files) {
    if (!files) {
      return [];
    }

    return files.map(file => ({
      response: {
        data: {
          id: file.id,
          type: type,
          attributes: file
        }
      },
      localData: {
        preview: null
      }
    }));
  }

  toggleToolbar = () => this.EditorRef.current.toggleToolbar();

  handleFooterSelectAssignee = val =>
    this.planTabContent?.getWrappedInstance()?.handleAssignedToChange(val);

  handleFooterChangeDueDate = val =>
    this.planTabContent?.getWrappedInstance()?.handleDueDateChange(val);

  handleFooterSelectTopic = val => {
    this.setState({ footerSelectedTopic: val });
  };

  setSelectedTopics = topics => {
    this.setState({ selectedTopics: topics });
  };

  renderTipTabContentFooter = () => {
    return (
      <TipTabContentFooter
        hideDetailsSelection={this.props.activeTab != 'Edit'}
        card={this.props.tip}
        topicId={
          this.state?.selectedTopics?.length > 0
            ? this.state.selectedTopics[0].id
            : this.props.topic?.id
        }
        onSaveClick={this.handleTipFormSubmit}
        onUploadFile={this.onUploadFile}
        onSelectAssignee={this.handleFooterSelectAssignee}
        onChangeDueDate={this.handleFooterChangeDueDate}
        onChangeTopic={this.handleFooterSelectTopic}
        onChangeLabel={this.handleLabelChange}
        initialLabelIds={this.state.selectedLabelIds}
        onAddCard={this.onAddCard}
      />
    );
  };

  onAddCard = () => {
    this.setState(prevState => {
      return {
        addCard: !prevState.addCard
      };
    });
  };

  handleDismiss = () => {
    this.setState({
      addCard: false
    });
  };

  afterCardCreated = () => {
    this.handleDismiss();
    this.forceUpdate();
  };

  handleToggleActiveSharing = sharing => () => {
    if (sharing) {
      mutations.updateSharing({
        id: sharing.id,
        active: !sharing.active
      });
    } else if (this.props.tip?.id) {
      mutations.createSharing({
        id: toGid('Tip', this.props.tip.id),
        updater: store => {
          const sharingRecord = store
            .getRootField('createSharing')
            .getLinkedRecord('sharing');
          const tipId = toGid('Tip', this.props.tip.id);
          const tipRecord = store.get(tipId);
          tipRecord.setLinkedRecord(sharingRecord, 'sharing');
        }
      });
    }
  };

  render() {
    const {
      state: {
        selectedLabelIds,
        reloadingUploadedFiles,
        uploadedFiles,
        tipTitle,
        tipBody,
        isSaving
      },
      props: {
        domainId,
        dropMethod,
        dropFile,
        activeTab,
        tip,
        group,
        topic,
        user,
        labelsCategory,
        defaultTopic,
        editCardModalCardType
      }
    } = this;

    const isChat = get(tip, 'attributes.is_chat', false);
    const isVideoRoom = get(tip, 'attributes.is_video_chat', false);
    const showTabs = {
      create: !isChat && !isVideoRoom,
      organize: true,
      share: true,
      label: !isChat && !isVideoRoom,
      plan: !isChat && !isVideoRoom,
      fields: !isChat && !isVideoRoom
    };

    const activeTabCreate = {
      active: activeTab === 'Edit' || activeTab === undefined,
      hidden: !showTabs.create
    };
    const activeTabOrganize = {
      active: activeTab === 'Organize',
      hidden: !showTabs.organize
    };
    const activeTabShare = {
      active: activeTab === 'Share',
      hidden: !showTabs.share
    };
    const activeTabLabel = {
      active: activeTab === 'Label',
      hidden: !showTabs.label
    };
    const activeTabPlan = {
      active: activeTab === 'Plan',
      hidden: !showTabs.plan
    };
    const activeTabFields = {
      active: activeTab === 'Fields',
      hidden: !showTabs.fields
    };

    const createActiveTabClass = classNames(activeTabCreate);
    const organizeActiveTabClass = classNames(activeTabOrganize);
    const shareActiveTabClass = classNames(activeTabShare);
    const labelActiveTabClass = classNames(activeTabLabel);
    const planActiveTabClass = classNames(activeTabPlan);
    const fieldsActiveTabClass = classNames(activeTabFields);
    const createActiveContentClass = classNames({
      item: true,
      ...activeTabCreate
    });
    const organizeActiveContentClass = classNames({
      item: true,
      ...activeTabOrganize
    });
    const shareActiveContentClass = classNames({
      item: true,
      ...activeTabShare
    });
    const labelActiveContentClass = classNames({
      item: true,
      ...activeTabLabel
    });
    const planActiveContentClass = classNames('item', { ...activeTabPlan });
    const fieldsActiveContentClass = classNames('item', { ...activeTabFields });

    if (dropMethod === 'upload' && dropFile && dropFile.data) {
      uploadedFiles.push({
        response: {
          data: dropFile.data
        },
        localData: {
          preview: null
        }
      });
    }

    let selectedSharingItems = [];
    let selectedTopics = defaultTopic
      ? [{ id: defaultTopic.id, title: defaultTopic.attributes.title }]
      : [];
    let selectedGroup = null;

    if (group) {
      selectedGroup = {
        id: 'groups-' + group.id,
        name: group.attributes.title
      };

      selectedSharingItems = [selectedGroup];
    }

    if (topic) {
      // Reset sharing items to be set to topic default
      selectedTopics = [
        {
          id: topic.id,
          title: topic.attributes.title,
          kind: topic.attributes.kind
        }
      ];

      const {
        relationships: { share_settings }
      } = topic;
      if (share_settings && share_settings.data) {
        selectedSharingItems = share_settings.data
          // .filter(({ id }) => selectedGroup !== null && selectedGroup.id !== `groups-${id}`)
          .map(
            ({
              sharing_object_type,
              sharing_object_id,
              sharing_object_name
            }) => ({
              id: `${sharing_object_type}-${sharing_object_id}`,
              name: sharing_object_name
            })
          );
      }
    }

    if (tip) {
      const {
        relationships: { topics, share_settings }
      } = tip;

      selectedTopics = topics.data.map(topicId => ({
        id: topicId,
        title: this.props.topics[topicId].attributes.title
      }));

      let sharedItems = share_settings || {};
      sharedItems.data = sharedItems.data || [];

      selectedSharingItems = sharedItems.data.map(
        ({ sharing_object_type, sharing_object_id, sharing_object_name }) => ({
          id: `${sharing_object_type}-${sharing_object_id}`,
          name: sharing_object_name
        })
      );

      if (tip.attributes.share_public) {
        selectedSharingItems.push({
          id: 'users-everyone',
          name: 'All Team Workspace members'
        });
      }

      if (tip.attributes.private) {
        selectedSharingItems.push({
          id: 'users-private',
          name: 'Just Me (Private)'
        });
      }

      if (tip.attributes.share_following) {
        selectedSharingItems.push({
          id: 'users-following',
          name: 'People I Follow'
        });
      }
    }

    const saveButton = (
      <input
        type="submit"
        name="submit"
        className="btn btn-save"
        value={isSaving ? 'Saving...' : 'SAVE & CLOSE'}
        disabled={isSaving}
        style={{ marginRight: 10 }}
      />
    );

    let firstTabSaveButton;

    if (topic || tip) {
      firstTabSaveButton = saveButton;
    }

    let fileUploadBox;
    if (reloadingUploadedFiles) {
      fileUploadBox = (
        <p className="text-center" style={{ display: 'none' }}>
          Loading auto saved uploads... <img src="/images/ajax-loader.gif" />
        </p>
      );
    } else {
      fileUploadBox = (
        <div style={{ display: 'none' }}>
          <FileUploadBox
            ref={this.FileUploadRef}
            objectType="tip"
            uploadedFiles={uploadedFiles}
            tabIndex={2}
            addUploadedFile={this.handleAddUploadedFile}
            //if in instant upload mode, auto close modal if upload failure
            autoCloseModal={
              this.props.instantUpload &&
              (() => this.props.setEditCardModalOpen(false))
            }
          />
        </div>
      );
    }

    const canUpdate = Ability.can('update', 'self', tip);

    let newTipTabContent = (
      <form
        className="main-form main-tip-form"
        id="main-tip-form"
        method="post"
        onSubmit={this.handleTipFormSubmit}
      >
        <div
          id="carousel-tip-form"
          className="carousel"
          data-ride="carousel"
          data-interval="false"
          data-keyboard="false"
          style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}
        >
          <ul
            className="slide-indicators nav nav-pills main-form-content-nav"
            style={{ position: 'initial' }}
          >
            {canUpdate && (
              <li
                role="presentation"
                data-target="#carousel-tip-form"
                data-slide-to="0"
                className={createActiveTabClass}
              >
                <a>Edit</a>
              </li>
            )}
            {canUpdate && (
              <li
                role="presentation"
                data-target="#carousel-tip-form"
                data-slide-to="1"
                className={organizeActiveTabClass}
              >
                <a>Organize</a>
              </li>
            )}
            {canUpdate && (
              <li
                role="presentation"
                data-target="#carousel-tip-form"
                data-slide-to="2"
                className={shareActiveTabClass}
              >
                <a>Share</a>
              </li>
            )}
            {!tiphive.userIsGuest() && (
              <li
                role="presentation"
                data-target="#carousel-tip-form"
                data-slide-to="3"
                className={labelActiveTabClass}
              >
                <a>Label</a>
              </li>
            )}
            {canUpdate && (
              <li
                role="presentation"
                data-target="#carousel-tip-form"
                data-slide-to="4"
                className={planActiveTabClass}
              >
                <a>Plan</a>
              </li>
            )}
            {canUpdate && (
              <li
                role="presentation"
                data-target="#carousel-tip-form"
                data-slide-to="5"
                className={fieldsActiveTabClass}
              >
                <a>Fields</a>
              </li>
            )}
            {canUpdate && this.props.showMinMax && (
              <li role="presentation" className="pull-right">
                <div className="flex-r-center p10">
                  <IconButton
                    fontAwesome
                    icon="external-link"
                    additionalClasses="medium grey-link"
                    onClick={this.props.onClickMaximize}
                  />
                  <IconButton
                    fontAwesome
                    icon="minus"
                    additionalClasses="medium grey-link"
                    onClick={this.props.onClickMinimize}
                  />
                </div>
              </li>
            )}
          </ul>

          <div
            className="carousel-inner"
            role="listbox"
            style={{
              height: 'initial',
              flexGrow: 1,
              marginTop: 'initial',
              position: 'initial',
              paddingTop: '0px'
            }}
          >
            <div className={createActiveContentClass}>
              <div className="panel-body item-create-tab">
                <TipTitleEditor
                  tipTitle={tipTitle}
                  onChangeTipTitle={this.handleTipTitleChange}
                  cardType={this.state.cardType}
                  onChangeCardType={cardType => this.setState({ cardType })}
                  onToggleToolbar={this.toggleToolbar}
                />
                <div className="tip-text-attachments">
                  <div className="tip-text-editor-container mb5">
                    <ControllableTextEditor
                      ref={this.EditorRef}
                      itemBody={tipBody}
                      handleItemBodyChange={this.handleTipBodyChange}
                    />
                  </div>
                  <div className="flex-1">{fileUploadBox}</div>
                </div>
              </div>
            </div>

            <div className={organizeActiveContentClass}>
              <div className="panel-body">
                <TopicsSelectMenu
                  selectedTopics={selectedTopics}
                  selectTitle="Add Card to Board"
                  isRequired
                  domain={this.props.domain}
                  footerSelectedTopic={this.state.footerSelectedTopic}
                  setSelectedTopics={this.setSelectedTopics}
                />
              </div>
            </div>

            <div className={shareActiveContentClass}>
              <div className="panel-body">
                <SharingSelectMenu
                  selectedSharingItems={selectedSharingItems}
                  selectTitle="Share Card (give access and notify)"
                  hive={domainId == '0' ? 3 : 1}
                  ref={r => (this.sharingSelector = r)}
                />
                {tip?.id && (
                  <div className="border1 flex flex-r-center p-a-10px">
                    {queryRenderer({
                      query: graphql`
                        query tipTabContentShareLinkQuery($id: ID!) {
                          tip(id: $id) {
                            sharing {
                              id
                              token
                              active
                            }
                          }
                        }
                      `,
                      vars: {
                        id: toGid('Tip', tip.id)
                      },
                      render: ({ props }) => (
                        <>
                          <ToggleSwitch
                            className="mb2 mr10"
                            on={!!props?.tip?.sharing?.active}
                            onClick={this.handleToggleActiveSharing(
                              props?.tip?.sharing
                            )}
                          />
                          Anyone with a Link
                          {props?.tip?.sharing?.active && (
                            <>
                              <input
                                id="share-link"
                                type="text"
                                value={
                                  location.origin +
                                  `/sharing/${props.tip.sharing.token}`
                                }
                                style={{ position: 'fixed', left: -10000 }}
                              />
                              <span
                                className="ml35 pointer"
                                onClick={() => {
                                  const input = document.getElementById(
                                    'share-link'
                                  );
                                  input.select();
                                  document.execCommand('copy');
                                  success('Link copied!');
                                }}
                              >
                                Copy Link
                              </span>
                            </>
                          )}
                        </>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {!tiphive.userIsGuest() && (
              <div className={labelActiveContentClass}>
                <div className="panel-body pl0 pr0 pt0">
                  <LabelTabContent
                    item={tip}
                    selectedLabels={selectedLabelIds}
                    labelsCategory={labelsCategory}
                    handleLabelChange={this.handleLabelChange}
                  />
                </div>
              </div>
            )}

            <div className={planActiveContentClass}>
              <div className="panel-body">
                <PlanTabContent
                  ref={ref => (this.planTabContent = ref)}
                  card={tip}
                />
              </div>
            </div>

            <div className={fieldsActiveContentClass}>
              <div className="panel-body">
                <FieldsTabContent
                  card={tip}
                  topic={topic}
                  cardType={this.state.cardType}
                  handleFieldsChange={this.handleFieldsChange}
                />
              </div>
            </div>
          </div>

          {this.renderTipTabContentFooter()}
          {this.state.addCard && (
            <RenderAddCard
              topicId={
                this.state?.selectedTopics?.length > 0
                  ? this.state.selectedTopics[0].id
                  : this.props.topic?.id
              }
              afterCardCreated={this.afterCardCreated}
              onDismiss={this.handleDismiss}
              tipId={tip.id}
              onClose={() => this.setState({ addCard: false })}
            />
          )}
        </div>
      </form>
    );

    if (
      window.currentDomain &&
      Ability.cannot('create', 'tips', window.currentDomain)
    ) {
      newTipTabContent = (
        <div className="text-center pop-up-banner">
          This Workspace has limited Card creation to administrators.
        </div>
      );
    }

    return (
      <div
        className="tab-pane active tip-tab-content"
        role="tabpanel"
        id="tip-pane"
      >
        {newTipTabContent}
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  return {
    domainId: sm.page.domainId,
    labelsCategory: Object.values(sm.labelCategories),
    savedContent: state.autoSave.mainTip,
    topic: sm.topics[sm.page.topicId],
    topics: sm.topics,
    user: sm.user,
    defaultTopic: getDefaultTopic(state),
    editCardModalCardType: sm.utilities.editCardModalCardType
  };
};

const mapDispatch = {
  createCard,
  updateCard,
  setEditCardModalOpen,
  saveContent: saveMainTipContent,
  clearContent: clearMainTipContent,
  getLabelCategories: getLabelCategory,
  setEditModalCardType,
  createCommentForCard
};

export default connect(mapState, mapDispatch)(TipTabContent);
