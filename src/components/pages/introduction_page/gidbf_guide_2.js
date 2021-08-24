import React from 'react';

const GidbfGuide2 = ({ history }) => {
  const handleClickNext = () => history.push('/introduction/gidbf_guide_3');

  const handleClickPrev = () => history.push('/introduction/gidbf_guide_1');

  const renderTeamLane = () => (
    <div style={{ marginRight: 45 }}>
      <h5 style={{ whiteSpace: 'nowrap' }}>Team member</h5>
      <div>
        <p>Card</p>
        <p>Card</p>
        <p>Card</p>
      </div>
    </div>
  );

  return (
    <div className="initial-setup gidbf-guide row">
      <img className="intro-logo" src="/images/friyay-logo-black.png" />
      <div className="initial-setup__content col-xs-12 col-md-6">
        <div className="gidbf-guide__content m-x-auto">
          <h1>
            Team Plan shows you what
            <br /> everyone is working on.
          </h1>
          <div className="overflow-auto">
            <div
              className="gidbf-guide__box"
              style={{ height: 415, padding: 45 }}
            >
              <h4>Team Plan</h4>
              <div style={{ marginTop: 40, display: 'flex' }}>
                {renderTeamLane()}
                {renderTeamLane()}
                {renderTeamLane()}
              </div>

              <div style={{ position: 'absolute', top: 45, left: 165 }}>
                <svg
                  width="282"
                  height="42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.273 3.448A11.5 11.5 0 0122.961.5H270c6.351 0 11.5 5.149 11.5 11.5v18c0 6.351-5.149 11.5-11.5 11.5H22.961a11.5 11.5 0 01-7.688-2.948l-10.011-9c-5.083-4.569-5.083-12.535 0-17.104l10.011-9z"
                    fill="none"
                    stroke="#000"
                    style={{ stroke: 'black', fill: 'none' }}
                  />
                </svg>
                <span style={{ position: 'absolute', top: '25%', right: '5%' }}>
                  Your team's weekly goals and activities.
                </span>
              </div>

              <div style={{ position: 'absolute', top: 238, left: 46 }}>
                <svg
                  width="341"
                  height="51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs />
                  <path
                    d="M.5 21C.5 14.649 5.65 9.5 12 9.5h125.015c1.744 0 3.468-.365 5.062-1.071l13.956-6.182a11.501 11.501 0 019.801.229l11.409 5.704a12.496 12.496 0 005.59 1.32H329c6.351 0 11.5 5.149 11.5 11.5v18c0 6.351-5.149 11.5-11.5 11.5H12C5.65 50.5.5 45.351.5 39V21z"
                    fill="none"
                    stroke="#000"
                    style={{ stroke: 'black', fill: 'none' }}
                  />
                </svg>

                <span style={{ position: 'absolute', top: '37%', right: '3%' }}>
                  Each goal or activity assigned to this team member.
                </span>
              </div>

              {/* <div
                className="text-bubble has-bg-red has-text-white"
                style={{ bottom: 17, width: 445 }}
              >
                Team Plan is also an easy way to assign goals to team members!
              </div> */}
            </div>
          </div>
          <div className="done_section">
            <button className="large-btn" onClick={handleClickNext}>
              Next
            </button>
            <span className="guide__text-btn" onClick={handleClickPrev}>
              Go back
            </span>
            <span className="guide_step_text">2 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GidbfGuide2;
