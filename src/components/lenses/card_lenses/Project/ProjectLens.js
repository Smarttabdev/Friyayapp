import React, { Component } from 'react';
import IndexView from 'Src/components/views/card_views/Index/IndexView';
import withDataManager from 'Src/dataManager/components/withDataManager';
import PropTypes from 'prop-types';

class ProjectLens extends Component {
  static propTypes = {
    cards: PropTypes.array,
    subtopics: PropTypes.array
  };

  render() {
    const { cards, subtopics, topic } = this.props;
    return (
      <div>
        <IndexView
          projectLens
          cards={cards}
          subtopics={subtopics}
          topic={topic}
        />
      </div>
    );
  }
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
})(ProjectLens);
