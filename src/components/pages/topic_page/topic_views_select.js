import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toPairs, sortBy, prop, compose, identity } from 'ramda';
import toSafeInteger from 'lodash/toSafeInteger';
const comingSoonViews = ['sheet', 'kanban', 'magazine'];
const cardReorder = {
  grid: 0,
  list: 1,
  card: 2,
  task: 3,
  wiki: 4,
  sheet: 5,
  kanban: 6,
  magazine: 7
};

const cardsPageViewsReorder = {
  grid: 0,
  list: 1,
  card: 2
};

const getSorted = compose(sortBy(prop(1)), toPairs);

const TopicViewsSelect = ({
  handleTopicViewSelect,
  boards = [],
  isCardViews
}) => {
  let updatedViews = null;
  if (isCardViews) {
    updatedViews = getSorted(cardsPageViewsReorder)
      .map(([key]) => boards.find(({ attributes: { name } }) => name === key))
      .filter(identity);
  } else {
    updatedViews = getSorted(cardReorder)
      .map(([key]) => boards.find(({ attributes: { name } }) => name === key))
      .filter(identity);
  }
  const customViews = updatedViews.map(board => {
    const name = board.attributes.name;
    const data = {
      id: board.id,
      name,
      imageUrl: `/images/views/${name}.png`
    };
    switch (name) {
      case 'grid':
        data.details = `For quick notes, link sharing and information gathering.`;
        break;
      case 'list':
        data.details = `Easy list to scan and reorder. All Cards in Boards are
                        also shown on parent Board.`;
        break;
      case 'card':
        data.details = `For documenting and writing.`;
        break;
      case 'wiki':
        data.details = `For a knowledge base.`;
        break;
      case 'sheet':
        data.details = `Quickly create Cards as rows and Boards as headers. Great for
                          planning or a database.`;
        break;
      case 'kanban':
        data.details =
          'Lanes with Labels to show status of Cards in a workflow.';
        break;
      case 'task':
        data.details = `Card list organized with Boards as headers that
                          you can expand/collapse.`;
        break;
      case 'calendar':
        data.details = `View your Cards in a calendar based
                          on due dates.`;
        break;
      case 'magazine':
        data.details = 'Layout for heavy reading.';
        break;
    }
    return data;
  });

  const viewsList = [
    ...customViews.map(board => {
      const isComingSoon = comingSoonViews.includes(board.name);
      return (
        <div
          key={`topic-board${board.id}`}
          className={classNames({
            'topic-board': true,
            'board-coming-soon': isComingSoon
          })}
          onClick={() =>
            !isComingSoon && handleTopicViewSelect(toSafeInteger(board.id))
          }
        >
          <h4 className="text-center mb15">{board.name}</h4>
          <div className="flex-r-center-center">
            <img src={board.imageUrl} className="board-placeholder-image" />
          </div>
          <p className="mt15 ml15 mr15">{board.details}</p>
          {isComingSoon && (
            <div className="comingsoon-placeholder">
              <h4>Coming soon</h4>
            </div>
          )}
        </div>
      );
    }),
    <div key="empty-topic-board-1" className="empty-topic-board" />,
    <div key="empty-topic-board-2" className="empty-topic-board" />
  ];

  let header = null;
  if (isCardViews) {
    header = <h4 className="text-center">Select Home view</h4>;
  } else {
    header = <h4 className="text-center">Select Board view</h4>;
  }

  return (
    <div className="topic-boards-select pb50">
      <div className="pb20 pt20">
        {header}
        <p className="text-center">
          You can change boards any time in the right menu bar
        </p>
      </div>
      <div className="topic-boards">{viewsList}</div>
    </div>
  );
};

TopicViewsSelect.propTypes = {
  boards: PropTypes.array,
  handleTopicViewSelect: PropTypes.func,
  isCardViews: PropTypes.bool
};

const mapState = ({ tipsView: { boards, allTopics } }) => ({
  boards,
  allTopics
});

export default connect(mapState)(TopicViewsSelect);
