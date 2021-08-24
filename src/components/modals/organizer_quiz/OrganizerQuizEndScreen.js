import React, { Fragment } from 'react';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const OrganizerQuizEndScreen = () => {
  return (
    <Fragment>
      <div className="organizer-quiz__intro">
        <h3 className="mt50">Done!</h3>
        <p>We have added Tools to your Favorite Tools list.</p>
        <p>Add Tools as you go in the Tools menu on the left.</p>
        <p>Tools let you organize your Boards in different ways.</p>
        <p>
          For instance to organize your Board as a task list, timeline, file
          list, chat channel, knowledge base and more.
        </p>
      </div>
      <OrganizerQuizFooter content="You can open the Organizer Quiz at any time from the Tool Explorer in the Tools menu on the left." />
    </Fragment>
  );
};

export default OrganizerQuizEndScreen;
