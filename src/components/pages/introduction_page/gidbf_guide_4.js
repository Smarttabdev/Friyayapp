import React from 'react';

const GidbfGuide4 = ({ history }) => {
  const handleClickNext = () => history.push('/introduction/gidbf_guide_5');

  const handleClickPrev = () => history.push('/introduction/gidbf_guide_3');

  const renderLane = ({ title, desc, body }) => (
    <div className="gidbf-guide__lane">
      <h5>{title}</h5>
      <p>{desc}</p>
      <div className="gidbf-guide__lane-box">{body}</div>
    </div>
  );

  const renderDownArrow = (x, y, w, h) => (
    <path d={`M${x} ${y} L${x + w / 2} ${y - h} L${x - w / 2} ${y - h} Z`} />
  );

  return (
    <div className="initial-setup gidbf-guide row">
      <img className="intro-logo" src="/images/friyay-logo-black.png" />
      <div className="initial-setup__content col-xs-12 col-md-6">
        <div className="gidbf-guide__content m-x-auto">
          <h1>So to summarize:</h1>
          <div className="overflow-auto">
            <div
              className="gidbf-guide__box"
              style={{ marginTop: 30, marginBottom: 0 }}
            >
              <h4>Card = Goal or activity</h4>
            </div>
            <svg style={{ display: 'block', height: 60, minWidth: 600 }}>
              <line
                x1="81"
                y1="28"
                x2="81"
                y2="60"
                shapeRendering="crispEdges"
              />
              <line
                x1="270"
                y1="0"
                x2="270"
                y2="60"
                shapeRendering="crispEdges"
              />
              <line
                x1="466"
                y1="28"
                x2="466"
                y2="60"
                shapeRendering="crispEdges"
              />
              <line
                x1="81"
                y1="28"
                x2="466"
                y2="28"
                shapeRendering="crispEdges"
              />
              {renderDownArrow(81, 60, 12, 6)}
              {renderDownArrow(270, 60, 12, 6)}
              {renderDownArrow(466, 60, 12, 6)}
            </svg>
            <div className="m-b-3" style={{ display: 'flex', height: 308 }}>
              {renderLane({
                title: 'My Plan',
                desc: 'Your goals and activities.',
                body: (
                  <span>
                    Make your own
                    <br /> plan and Get It Done By Friday!
                  </span>
                )
              })}
              {renderLane({
                title: 'Team Plan',
                desc: 'Goals and activities per team member.',
                body: (
                  <span>
                    Also a simple and quick way to assign activities to team
                    members.
                  </span>
                )
              })}
              {renderLane({
                title: 'Project Plan',
                desc: 'Goals and activities per Project.',
                body: (
                  <span>
                    Use it if you want
                    <br /> to organize the work by projects.
                  </span>
                )
              })}
            </div>
          </div>
          <div className="done_section">
            <button className="large-btn" onClick={handleClickNext}>
              Next
            </button>
            <span className="guide__text-btn" onClick={handleClickPrev}>
              Go back
            </span>
            <span className="guide_step_text">4 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GidbfGuide4;
