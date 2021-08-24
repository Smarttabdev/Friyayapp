import React from 'react';

const GidbfGuide3 = ({ history }) => {
  const handleClickNext = () => history.push('/introduction/gidbf_guide_4');

  const handleClickPrev = () => history.push('/introduction/gidbf_guide_2');

  const renderProjectLane = () => (
    <div style={{ marginRight: 98 }}>
      <h5 style={{ whiteSpace: 'nowrap' }}>Project</h5>
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
            Project Plan shows you activities
            <br /> for each project.
          </h1>
          <div className="overflow-auto">
            <div
              className="gidbf-guide__box"
              style={{ height: 415, padding: 45 }}
            >
              <h4>Project Plan</h4>
              <div style={{ marginTop: 36, display: 'flex' }}>
                {renderProjectLane()}
                {renderProjectLane()}
                {renderProjectLane()}
              </div>

              <div style={{ position: 'absolute', top: 45, left: 170 }}>
                <svg
                  width="343"
                  height="42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.695 2.734A11.5 11.5 0 0124.505.5H331c6.351 0 11.5 5.149 11.5 11.5v18c0 6.351-5.149 11.5-11.5 11.5H24.506a11.5 11.5 0 01-6.811-2.234l-12.245-9c-6.252-4.595-6.252-13.937 0-18.532l12.245-9z"
                    fill="#fff"
                    stroke="#000"
                    style={{ stroke: 'black', fill: 'none' }}
                  />
                </svg>
                <span style={{ position: 'absolute', top: '24%', right: '5%' }}>
                  List of projects with weekly goals and activities.
                </span>
              </div>

              <div style={{ position: 'absolute', top: 230, left: 87 }}>
                <svg
                  width="260"
                  height="49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.5 19.408c0-6.352 5.149-11.5 11.5-11.5h91.199c2.188 0 4.337-.574 6.233-1.665l7.211-4.149a11.5 11.5 0 0111.998.324l5.349 3.473a12.5 12.5 0 006.808 2.017H248c6.351 0 11.5 5.148 11.5 11.5V37c0 6.351-5.149 11.5-11.5 11.5H12C5.65 48.5.5 43.351.5 37V19.408z"
                    fill="#fff"
                    stroke="#000"
                    style={{ stroke: 'black', fill: 'none' }}
                  />
                </svg>
                <span style={{ position: 'absolute', top: '34%', right: '7%' }}>
                  Each goal or activity for this Project.
                </span>
              </div>

              {/* <div
                className="text-bubble has-bg-red has-text-white"
                style={{ bottom: 17, width: 445 }}
              >
                When a card is assigned to a team member, it is automatically
                added to My Plan and Team Plan.
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
            <span className="guide_step_text">3 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GidbfGuide3;
