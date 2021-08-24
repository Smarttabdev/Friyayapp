import React, { useState } from 'react';
import BoardBox from './BoardBox';
import { connect } from 'react-redux';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import ActiveFilterMessages from 'Components/shared/filters/ActiveFilterMessages';

function ProjectBoardsLens(props) {
  const {
    subtopics,
    topic,
    card_font_color,
    newTopicRelationships,
    myProjects
  } = props;
  const [showAddForm, setshowAddForm] = useState(false);

  return (
    <section className="project-boards-lens">
      <ActiveFiltersPanel additionalContainerClass={'mb10'} />
      <div className="boards-list">
        {subtopics?.map(topic => (
          <BoardBox topic={topic} key={topic.id} />
        ))}
        <div
          className="board-box placeholder-box"
          style={{ color: card_font_color || '#232323' }}
        >
          {showAddForm ? (
            <AddSubtopicCard
              // afterTopicCreated={this.handleTopicWasCreated}
              inInputMode={showAddForm}
              onDismiss={() => setshowAddForm(false)}
              tag={'project'}
              // boardIndex={this.state.boardIndex}
              parentTopicId={topic.id || null}
              boardTypeSmallModal
              transparent={true}
              hideAssignee
              // addPickAnExistingBoard={this.props.addPickAnExistingBoard}
              newTopicRelationships={myProjects && newTopicRelationships}
            />
          ) : (
            <p
              className="add-project-board-button"
              onClick={() => setshowAddForm(true)}
            >
              + Add Project Board
            </p>
          )}
        </div>
      </div>
      <ActiveFilterMessages pickBoard />
    </section>
  );
}

const mapState = state => {
  return {
    card_font_color: stateMappings(state).utilities.active_design
      .card_font_color
  };
};

export default connect(mapState)(ProjectBoardsLens);
