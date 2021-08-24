import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import IconButton from 'Components/shared/buttons/IconButton';
import CardDetailsEditor from 'Components/lenses/card_lenses/Card/CardDetailsEditor';
// import TextEditor from 'Components/shared/text_editor';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { getTopicArray } from 'Src/newRedux/database/topics/selectors';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardDetailsFooter from '../Card/CardDetailsFooter';
import AddAssignee from 'src/components/shared/cards/AddAssignee';

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      selectedTopicId: props?.parentTopic?.id ?? props.topicId,
      assigneeIds: [],
      labelIds: [],
      isFocus: false,
      hideTopicSelector: true
    };
  }

  componentDidMount() {
    this.setTopic();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.parentTopic != this.props.parentTopic) {
      this.setTopic();
    }
  }

  setTopic = () => {
    const { parentTopic } = this.props;
    if (parentTopic) this.setState({ selectedTopicId: parentTopic.id });
  };

  handleClose = () => {
    if (this.props.topic) this.setTopic();
    this.setState({ isFocus: false });
  };

  onUploadFile = () =>
    this.editorRef?.current?.getWrappedInstance()?.onUploadFile();

  handleSetOtherDetails = ({ assignees, dueDate, labels, selectedTopic }) => {
    assignees && (assignees = assignees.map(val => val.id));
    labels && (labels = labels.map(val => val.id));

    //ASSIGNEES
    let updatedAssigneeIds = [];
    if (assignees) {
      assignees.forEach(val => {
        const splitString = val.split(':');
        updatedAssigneeIds.push(splitString.length > 1 ? splitString[1] : val);
      });
      this.setState({ assigneeIds: updatedAssigneeIds });
    }

    //DUE DATE
    dueDate && this.setState({ dueDate });

    //LABELS
    let updatedLabelIds = [];
    if (labels) {
      labels.forEach(val => {
        const splitString = val.split(':');
        updatedLabelIds.push(splitString.length > 1 ? splitString[1] : val);
      });
      this.setState({ labelIds: updatedLabelIds });
    }

    //TOPIC
    selectedTopic && this.setState({ selectedTopicId: selectedTopic?.id });
  };

  render() {
    const {
      isFocus,
      selectedTopicId,
      assigneeIds,
      labelIds,
      dueDate
    } = this.state;
    const { topicId, parentTopic } = this.props;

    const newCardRelationships = {
      topics: { data: [selectedTopicId] },
      tip_assignments: { data: assigneeIds },
      labels: { data: labelIds }
    };
    const newCardAttributes = { due_date: dueDate };

    return !isFocus ? (
      <div
        onClick={() => this.setState({ isFocus: true })}
        className="card-wrapper new-card-wrapper"
      >
        <div className="nc-title">Type</div>
      </div>
    ) : (
      <div className="card-wrapper  new-card-wrapper focused">
        <CardDetailsEditor
          ref={this.editorRef}
          newCardRelationships={newCardRelationships}
          newCardAttributes={newCardAttributes}
          afterCardCreated={this.handleClose}
          hideCancel
          canCancel
          onCancel={this.handleClose}
          hideFileButtons
        />

        <AddAssignee
          getDetails={this.handleSetOtherDetails}
          topicId={parentTopic?.id ?? topicId}
        />

        <CardDetailsFooter
          inEditMode
          onSaveClick={
            this.editorRef?.current?.getWrappedInstance().handleClickCreate ??
            (() => {})
          }
          onUploadFile={this.onUploadFile}
        />
      </div>
    );
  }
}

// const NewCard = ({ parentTopic, createCard, topic, allTopics }) => {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [topics, setTopics] = useState([]);
//   const [isFocus, setIsFocus] = useState(false);
//   const [hideTopicSelector, setHideTopicSelector] = useState(true);

//   useEffect(() => {
//     if (parentTopic) {
//       setTopics([
//         {
//           id: parentTopic.id,
//           title: parentTopic.attributes.title,
//           slug: parentTopic.attributes.slug,
//           kind: parentTopic.attributes.kind,
//           value: parentTopic.id,
//           label: parentTopic.attributes.title
//         }
//       ]);
//     }
//   }, [parentTopic]);

//   const handleClose = () => {
//     setTitle('');
//     setBody('');
//     if (topic) {
//       setTopics([
//         {
//           value: parentTopic.id,
//           label: parentTopic.attributes.title
//         }
//       ]);
//     }
//     setIsFocus(false);
//   };

//   const onInputFocus = () => {
//     setHideTopicSelector(false);
//   };

//   const onInputBlur = () => {
//     setHideTopicSelector(true);
//   };

//   if (!isFocus) {
//     return (
//       <div
//         onClick={() => setIsFocus(true)}
//         className="card-wrapper new-card-wrapper"
//       >
//         <div className="nc-title">Type</div>
//       </div>
//     );
//   }

//   return (
//     <div className="card-wrapper  new-card-wrapper focused">
//       <CardDetailsEditor
//         newCardRelationships={{
//           topics: {
//             data: topics.filter(t => t.value != undefined).map(t => t.value)
//           }
//         }}
//         // customCreateIcons={onCreate => (
//         //   <div className="nc-actions">
//         //     <IconButton icon="save" onClick={onCreate} />
//         //     <IconButton icon="close" onClick={handleClose} />
//         //   </div>
//         // )}
//         afterCardCreated={handleClose}
//         hideCancel
//         hideFileButtons
//       />

//       <CardDetailsFooter
//         cardFontColor={cardFontColor}
//         showIcons={showIcons}
//         onSaveClick={
//           this.editorRef?.current?.getWrappedInstance().handleClickSave ??
//           (() => {})
//         }
//         inEditMode={inEditMode}
//         onUploadFile={this.onUploadFile}
//         filterOptions={filterOptions}
//       />

//       {/* <span className="select-board-header">Select Board</span>
//       <div className="nc-topics-wrapper">
//         <TopicsListDropdown
//           additionalClasses="invite-form-dropdown-menu"
//           actionButtonLabel="Share selected Boards"
//           actionButtonHandler={() => {
//             return false;
//           }}
//           actionButtonClass="btn-primary"
//           path={null}
//           startAt={null}
//           hideHeader
//           inputMode="list"
//           disallowCreate
//           multiple={true}
//           hideAddTopicLink
//           hideTopicSelector={hideTopicSelector}
//           skipConfirmation
//           onInputBlur={onInputBlur}
//           onInputFocus={onInputFocus}
//           domain={window.currentDomain}
//           onSelectTopic={list => {
//             setTopics(list);
//           }}
//           selectedTopics={topics}
//         />
//       </div> */}
//     </div>
//   );
// };

const mapState = state => {
  const sm = stateMappings(state);
  const {
    topics,
    page: { topicId }
  } = sm;

  const topic = topics[topicId];

  return {
    allTopics: getTopicArray(state) || [],
    topic: topic,
    topicId
  };
};

const mapDispatch = {
  createCard
};

NewCard.propTypes = {
  parentTopic: PropTypes.object,
  allTopics: PropTypes.array
};

export default connect(mapState, mapDispatch)(NewCard);
// export default NewView;
