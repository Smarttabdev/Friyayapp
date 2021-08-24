import React, { PureComponent } from 'react';
import CardDetailsFooter from 'Src/components/lenses/card_lenses/Card/CardDetailsFooter';
import AddAssignee from 'src/components/shared/cards/AddAssignee';
import CommentsList from 'Components/shared/comments/CommentsList';

const filterOptions = [
  'Plan',
  'Label',
  'Share',
  'Organize',
  'Edit',
  'Upload file',
  'Fields'
];

class TipTabContentFooter extends PureComponent {
  state = { hideComments: true, pendingComments: [] };

  handleSetOtherDetails = async ({
    assignees,
    dueDate,
    labels,
    selectedTopic
  }) => {
    const { card } = this.props;
    assignees = assignees.map(val => val.id);
    labels = labels.map(val => val.id);

    //LABELS
    this.props.onChangeLabel(
      'fromFooter',
      labels.map(val => (val.split(':').length > 1 ? val.split(':')[1] : val))
    );

    //ASSIGNEES
    let assigneesReturn = [{ onlyId: true }];
    assignees.forEach(val => {
      assigneesReturn.push({
        id: val.split(':').length > 1 ? val.split(':')[1] : val
      });
    });
    this.props.onSelectAssignee(assigneesReturn);

    //TOPIC
    this.props.onChangeTopic({
      id: selectedTopic?.id,
      title: selectedTopic?.attributes?.title
    });

    //DUE DATE
    this.props.onChangeDueDate(dueDate);
  };

  toggleComments = () =>
    this.setState(prevState => ({ hideComments: !prevState.hideComments }));

  handleAddPendingComment = commentData => {
    this.setState({
      pendingComments: [...this.state.pendingComments, commentData]
    });
  };

  updatePendingComment = (id, body) => {
    let { pendingComments } = this.state;
    let indexOfCommentForUpdate = pendingComments.findIndex(c => c.id == id);
    if (indexOfCommentForUpdate > -1) {
      pendingComments[indexOfCommentForUpdate].attributes.body = body;
      this.setState({ pendingComments });
    }
  };

  render() {
    const {
      card,
      topicId,
      onSaveClick,
      onUploadFile,
      hideDetailsSelection,
      initialLabelIds,
      onAddCard
    } = this.props;
    const { hideComments, pendingComments } = this.state;

    return (
      <div className="tip_tab_content_footer">
        {!hideDetailsSelection && (
          <AddAssignee
            // getDetails={this.handleSetOtherDetails}
            getDetails={this.handleSetOtherDetails}
            taskCard={card?.attributes?.card_type == 'TASK' ? true : false}
            topicId={topicId}
            initialDueDate={card?.attributes?.due_date}
            initialLabelIds={
              card?.relationships?.labels?.data ?? initialLabelIds ?? []
            }
            initialAssignments={
              card?.relationships?.tip_assignments?.data ?? []
            }
          />
        )}
        <CardDetailsFooter
          card={card}
          toggleComments={this.toggleComments}
          hideComments={this.state.hideComments}
          onAddCard={onAddCard}
          onSaveClick={() => onSaveClick(pendingComments)}
          inEditMode
          filterOptions={filterOptions}
          onUploadFile={onUploadFile}
        />
        {/* {card && !hideComments && ( */}
        {!hideComments && (
          <CommentsList
            cardId={card?.id}
            hideComments={this.state.hideComments}
            handleAddPendingComment={this.handleAddPendingComment}
            updatePendingComment={this.updatePendingComment}
            pendingComments={pendingComments}
          />
        )}
        {/* )} */}
      </div>
    );
  }
}

export default TipTabContentFooter;
