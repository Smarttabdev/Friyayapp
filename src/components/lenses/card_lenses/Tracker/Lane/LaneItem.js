import React, { useState } from 'react';
import classNames from 'classnames';

import CompletionSlider from 'Components/shared/CompletionSlider';
import IconButton from 'Src/components/shared/buttons/IconButton';

const TrailIconPlaceHolder = () => {
  return (
    <div
      style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}
    ></div>
  );
};

const LaneItem = ({
  title = 'My Card',
  bgColor = '#fff',
  activeBgColor,
  trailBgColor,
  active,
  id,
  icon = <TrailIconPlaceHolder />,
  completionLevel = 0,
  subTitle = null,
  menuItemsConfig = [],
  onClick,
  styles = {}
}) => {
  const [showIcon, _setShowIcon] = useState(false);

  const expandablePanelClass = classNames('flex-r-center', 'expandable-panel', {
    opened: showIcon
  });

  const _renderDots = () => {
    return (
      <div
        className="dots-container expandable-area-wrap"
        onMouseLeave={() => _setShowIcon(false)}
      >
        <span className="dots"></span>
        <span className="dots"></span>
        <span className="dots"></span>
      </div>
    );
  };

  return (
    <div
      key={id}
      onClick={onClick}
      className="tracker__lane-item"
      style={{ ...styles }}
    >
      <div
        style={{ backgroundColor: trailBgColor }}
        className="tracker__lane-item__trail"
      >
        <div className="tracker__lane-item__trail__avatar">{icon}</div>
      </div>
      <div
        style={
          active === id && active
            ? { backgroundColor: activeBgColor, color: '#fff' }
            : {
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '0 12px 12px 0'
              }
        }
        className="tracker__lane-item__main"
      >
        <h4>{title}</h4>

        <div className="tracker__lane-item__completion-slider__container">
          <CompletionSlider value={completionLevel} />
        </div>

        {subTitle ? <p>{subTitle}</p> : null}

        {menuItemsConfig?.length ? (
          <div className="flex-r-center tracker__lane-item__menu">
            <div className="tracker__lane-item__menu-button-container">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <div
                  className="semicircle"
                  onMouseEnter={() => _setShowIcon(true)}
                ></div>
                <div className={expandablePanelClass}>
                  {_renderDots()}
                  {menuItemsConfig.map((itemCfg, i) => (
                    <IconButton
                      key={i}
                      onClick={itemCfg.action}
                      icon={itemCfg.icon}
                      color={itemCfg.color}
                      outlined
                      fontSize={14}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div
          style={
            active === id && active
              ? { color: activeBgColor, borderLeftColor: activeBgColor }
              : { opacity: 0 }
          }
          className="triangle"
        ></div>
      </div>
    </div>
  );
};

export default LaneItem;
