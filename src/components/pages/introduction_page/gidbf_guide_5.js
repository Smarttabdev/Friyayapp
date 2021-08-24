import React from 'react';

const GidbfGuide5 = ({ history }) => {
  const handleClickNext = () => history.push('/introduction/gidbf_guide_6');

  const handleClickPrev = () => history.push('/introduction/gidbf_guide_4');

  const renderBox = (left, top, text) => (
    <div
      className="gidbf-guide__box"
      style={{
        position: 'absolute',
        top,
        left,
        padding: '40px 0',
        fontSize: 15,
        fontWeight: 'bold',
        width: 210,
        textAlign: 'center'
      }}
    >
      {text}
    </div>
  );

  const renderDownArrow = (x, y, w, h, rotate) => (
    <g transform={rotate && `rotate(${rotate}, ${x}, ${y})`}>
      <path d={`M${x} ${y} L${x + w / 2} ${y - h} L${x - w / 2} ${y - h} Z`} />
    </g>
  );

  const renderLeftArrow = (x, y, w, h) => renderDownArrow(x, y, w, h, 90);

  const renderUpArrow = (x, y, w, h) => renderDownArrow(x, y, w, h, 180);

  const renderRightArrow = (x, y, w, h) => renderDownArrow(x, y, w, h, 270);

  return (
    <div className="initial-setup gidbf-guide row">
      <img className="intro-logo" src="/images/friyay-logo-black.png" />
      <div className="initial-setup__content col-xs-12 col-md-6">
        <div className="gidbf-guide__content m-x-auto">
          <h1>Now, lets Get It Done By Friday!</h1>
          <div className="overflow-auto">
            <div className="relative" style={{ height: 525, marginTop: -30 }}>
              <svg
                style={{
                  height: 450,
                  minWidth: 600,
                  position: 'absolute',
                  top: 60
                }}
              >
                <line
                  x1="365"
                  y1="82"
                  x2="400"
                  y2="82"
                  shapeRendering="crispEdges"
                />
                <line
                  x1="400"
                  y1="82"
                  x2="400"
                  y2="174"
                  shapeRendering="crispEdges"
                />
                <line
                  x1="400"
                  y1="276"
                  x2="400"
                  y2="375"
                  shapeRendering="crispEdges"
                />
                <line
                  x1="365"
                  y1="375"
                  x2="400"
                  y2="375"
                  shapeRendering="crispEdges"
                />
                <line
                  x1="120"
                  y1="375"
                  x2="156"
                  y2="375"
                  shapeRendering="crispEdges"
                />
                <line
                  x1="120"
                  y1="276"
                  x2="120"
                  y2="375"
                  shapeRendering="crispEdges"
                />
                <line
                  x1="120"
                  y1="82"
                  x2="120"
                  y2="174"
                  shapeRendering="crispEdges"
                />
                <line
                  x1="120"
                  y1="82"
                  x2="156"
                  y2="82"
                  shapeRendering="crispEdges"
                />
                {renderDownArrow(400, 174, 12, 6)}
                {renderLeftArrow(365, 375, 12, 6)}
                {renderUpArrow(120, 277, 12, 6)}
                {renderRightArrow(156, 82, 12, 6)}
              </svg>
              {renderBox(155, 73, 'Focus on weekly goals')}
              {renderBox(10, 220, 'Get rewarded')}
              {renderBox(295, 220, 'See daily progress')}
              {renderBox(155, 367, 'See the results on Friday')}
            </div>
          </div>
          <div className="done_section">
            <button className="large-btn" onClick={handleClickNext}>
              Next
            </button>
            <span className="guide__text-btn" onClick={handleClickPrev}>
              Go back
            </span>
            <span className="guide_step_text">5 of 6</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GidbfGuide5;
