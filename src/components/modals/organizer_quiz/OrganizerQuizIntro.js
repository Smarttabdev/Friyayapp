import React, { Fragment } from 'react';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const OrganizerQuizIntro = ({ start }) => {
  return (
    <Fragment>
      <div className="organizer-quiz__intro">
        <h3>The Organizer Quiz</h3>
        <p>Friyay learns what your favorite tools and configurations are.</p>
        <p> Answer a few questions to get started</p>
        <button onClick={start}>Start</button>
      </div>
      <OrganizerQuizFooter content="You can always open the Organizer Quiz from the Tool Explorer menu" />
    </Fragment>
  );
};

export default OrganizerQuizIntro;
