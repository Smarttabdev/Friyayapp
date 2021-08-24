import React from 'react';
import IndexView from 'Src/components/views/card_views/Index/IndexView';
import withDataManager from 'Src/dataManager/components/withDataManager';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';

function NoteBoardsLens(props) {
  const { cards, subtopics, topic } = props;
  return (
    <div>
      <ActiveFiltersPanel additionalContainerClass={'ml35'} />
      <IndexView
        isTaskBoardsLens //takes task boards lens design as a base style
        projectLens
        isNoteBoardsLens
        cards={cards}
        subtopics={subtopics}
        topic={topic}
      />
    </div>
  );
}

const dataRequirements = ({ user, cardRequirements }) => ({
  cardsWithAttributes: {
    attributes: {
      ...cardRequirements,
      personId: user && user.id
    }
  }
});

export default withDataManager(dataRequirements, undefined, undefined, {
  dontShowLoadingIndicator: true
})(NoteBoardsLens);
