import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import PurposeDetail from './purpose_detail';
import { Boards, cardSample } from './card_idea';
import './purpose.scss';

const Purpose = ({ parentTopic }) => {
  const [currentView, setCurrentView] = useState(Boards.GeneralPurpose);
  const [sampleCard, setSampleCard] = useState(
    cardSample[Boards.GeneralPurpose]
  );
  return (
    <Fragment>
      <div className="info-text">
        What will you be using this Board for? <a>Learn More</a>
      </div>
      <div className="purpose-body">
        <div className="boards-list">
          {Object.keys(Boards).map(board => (
            <div
              key={board}
              className={`board-item ${currentView === Boards[board] &&
                'selected'}`}
              onClick={() => {
                setSampleCard(cardSample[Boards[board]]);
                setCurrentView(Boards[board]);
              }}
            >
              {Boards[board]}
            </div>
          ))}
        </div>
        <PurposeDetail
          cardSample={sampleCard}
          selectedView={currentView}
          parentTopic={parentTopic}
        />
      </div>
    </Fragment>
  );
};

Purpose.propTypes = {
  parentTopic: PropTypes.object
};

export default Purpose;
