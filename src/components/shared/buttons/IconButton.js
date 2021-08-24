import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { func, string, object } from 'prop-types';
import Icon from 'Components/shared/Icon';
import Tooltip from 'Components/shared/Tooltip';

const IconButton = ({
  style,
  wrapperClasses,
  containerClasses,
  additionalClasses = '',
  additionalIconClasses = '',
  color,
  fontAwesome,
  icon,
  onClick,
  tooltip = null,
  showBadge = false,
  tooltipOptions,
  fontSize,
  outlined,
  teamIcon,
  projectIcon,
  height,
  lineHeight,
  info,
  center = true,
  containerStyle
}) => {
  const idRef = useRef(Math.ceil(Math.random() * 100000, 6));
  return (
    <a
      style={style}
      data-tip={tooltip}
      data-for={idRef.current}
      className={`${additionalClasses} ${wrapperClasses}`}
      onClick={onClick}
    >
      {icon === 'android' && showBadge && (
        <span className="badge-indicator-bot badge">&nbsp;</span>
      )}
      <div style={center ? { display: 'flex', alignItems: 'center' } : {}}>
        <Icon
          containerClasses={containerClasses}
          additionalClasses={additionalClasses}
          additionalIconClasses={additionalIconClasses}
          color={color}
          fontAwesome={fontAwesome}
          icon={icon}
          fontSize={fontSize}
          outlined={outlined}
          height={height}
          lineHeight={lineHeight}
          teamIcon={teamIcon}
          projectIcon={projectIcon}
          containerStyle={containerStyle}
        />
        {info ? (
          <div style={{ fontSize: '10px', marginLeft: '5px' }}>{info}</div>
        ) : null}
      </div>
      <Tooltip {...tooltipOptions} id={idRef.current} />
    </a>
  );
};

IconButton.propTypes = {
  style: PropTypes.object,
  additionalClasses: PropTypes.string,
  additionalIconClasses: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default IconButton;
