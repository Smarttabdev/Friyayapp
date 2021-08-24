import React from 'react';

const OrganizerQuizHeader = ({ slideNumber, next, prev }) => {
  return (
    <div className="organizer-quiz__header">
      <p>Organizer Quiz</p>
      <div className="organizer-quiz__header-direction">
        {slideNumber > 1 && (
          <span
            onClick={prev}
            className="material-icons  organizer-quiz__header-direction__prev-button"
          >
            arrow_backward
          </span>
        )}
        <button
          disabled={slideNumber >= 9 ? true : false}
          onClick={next}
          className="organizer-quiz__header-direction__next-button"
        >
          <span>Next</span>
          {slideNumber < 9 && (
            <span
              style={{ fontSize: '14px' }}
              className="material-icons ml10 mt3"
            >
              arrow_forward
            </span>
          )}
        </button>
        <span className="organizer-quiz__header-direction__counter ml20">
          {slideNumber} / 9
        </span>
      </div>
    </div>
  );
};

export default OrganizerQuizHeader;
