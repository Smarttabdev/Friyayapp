import React from 'react';

const OrganizerQuizFooter = ({ content }) => {
  return (
    <div className="organizer-quiz__footer">
      <p>
        {content || 'The Tools you select will be added to your Favorite Tools'}
      </p>
    </div>
  );
};

export default OrganizerQuizFooter;
