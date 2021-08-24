import React from 'react';

const GidbfGuide6 = ({ history }) => {
  const handleClickNext = () => history.push('/introduction/choose_design');

  const handleClickPrev = () => history.push('/introduction/gidbf_guide_5');

  const renderRow = (index, title, text) => (
    <div className="gidbf-guide__bullet-point">
      <span>{index}</span>
      <div>
        <strong className="gidbf-guide__row-title">{title}</strong>: {text}
      </div>
    </div>
  );

  return (
    <div className="initial-setup gidbf-guide row">
      <img className="intro-logo" src="/images/friyay-logo-black.png" />
      <div className="initial-setup__content col-xs-12 col-md-6">
        <div className="gidbf-guide__content m-x-auto">
          <h1>How to get started.</h1>
          <div className="overflow-auto">
            <div
              className="gidbf-guide__box"
              style={{
                height: 413,
                marginTop: 30,
                marginBottom: 25,
                paddingTop: 40
              }}
            >
              {renderRow(1, 'My Plan', 'let team members make their plan.')}
              {renderRow(
                2,
                'Team Plan',
                'review and assign goals and activities for each team member.'
              )}
              {renderRow(3, 'Project Plan', 'add projects if you have any.')}
            </div>
          </div>
          <div className="done_section">
            <button className="large-btn" onClick={handleClickNext}>
              Next
            </button>
            <span className="guide__text-btn" onClick={handleClickPrev}>
              Go back
            </span>
            <span className="guide_step_text">6 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GidbfGuide6;
