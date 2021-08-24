import React from 'react';

const GidbfGuide1 = ({ history }) => {
  const handleClickNext = () => history.push('/introduction/gidbf_guide_2');

  const handleClickPrev = () => history.push('/introduction/create_cards');

  return (
    <div className="initial-setup gidbf-guide row">
      <img className="intro-logo" src="/images/friyay-logo-black.png" />
      <div className="initial-setup__content col-xs-12 col-md-6">
        <div className="gidbf-guide__content m-x-auto">
          <h1>
            Good job! Each team member sets their weekly goals in My Plan.
          </h1>
          <div className="overflow-auto">
            <div
              className="gidbf-guide__box"
              style={{ height: 383, padding: 45 }}
            >
              <h4>My Plan</h4>
              <div style={{ marginTop: 23 }}>
                <p>Card</p>
                <p>Card</p>
                <p>Card</p>
              </div>

              <div style={{ top: 45, left: 145, position: 'absolute' }}>
                <svg
                  width="238"
                  height="42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.507 4.133A11.5 11.5 0 0120.895.5H226c6.351 0 11.5 5.149 11.5 11.5v18c0 6.351-5.149 11.5-11.5 11.5H20.895a11.5 11.5 0 01-8.388-3.633l-8.442-9a11.5 11.5 0 010-15.735l8.442-9z"
                    stroke="#000"
                    style={{ stroke: 'black', fill: 'none' }}
                  />
                </svg>

                <span style={{ position: 'absolute', top: '25%', right: '5%' }}>
                  Your weekly goals and activities.
                </span>
              </div>

              <div style={{ top: 139, left: 110, position: 'absolute' }}>
                <svg
                  width="326"
                  height="42"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.166 2.91A11.5 11.5 0 0124.21.5H314c6.351 0 11.5 5.149 11.5 11.5v18c0 6.351-5.149 11.5-11.5 11.5H24.21a11.5 11.5 0 01-7.044-2.41l-11.616-9c-5.942-4.603-5.942-13.577 0-18.18l11.616-9z"
                    fill="none"
                    stroke="#000"
                    style={{ stroke: 'black', fill: 'none' }}
                  />
                </svg>

                <span style={{ position: 'absolute', top: '25%', right: '3%' }}>
                  Each Card is a goal or activity assigned to you.
                </span>
              </div>

              {/* <div
                className="text-bubble has-bg-red has-text-white"
                style={{ bottom: 28, width: 438 }}
              >
                My Plan keeps you focussed!
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
            <span className="guide_step_text">1 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GidbfGuide1;
