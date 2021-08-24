import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tooltip from 'Components/shared/Tooltip';

const Icon = ({
  additionalClasses = '',
  addClasses,
  containerClasses = '',
  color,
  backgroundColor,
  fontAwesome,
  icon,
  size = '',
  fontSize,
  outlined,
  height,
  lineHeight = 'initial',
  marginBottom,
  teamIcon,
  projectIcon,
  subIcon,
  containerStyle = {},
  style = {},
  innerRef,
  onDrag,
  onClick,
  tooltip,
  tooltipOptions,
  button
}) => {
  if (teamIcon || projectIcon) {
    return (
      <div
        className={cx('icon-container', size, containerClasses)}
        style={{ position: 'relative', ...containerStyle }}
      >
        <i
          style={{ color, fontSize, height, lineHeight, marginBottom }}
          className={cx(
            additionalClasses,
            size,
            `tiphive-icon material-icons${outlined ? '-outlined' : ''}`
          )}
        >
          {icon}
        </i>
        <i
          style={{
            color,
            fontSize: '12px',
            position: 'absolute',
            bottom: '-3px',
            right: '-5px'
          }}
          className={cx(
            additionalClasses,
            `tiphive-icon material-icons${outlined ? '-outlined' : ''}`
          )}
        >
          {teamIcon ? 'person' : 'timer'}
        </i>
      </div>
    );
  }
  const forId = Math.ceil(Math.random() * 100000, 6);
  return (
    <div
      className={cx(
        'icon-container',
        button && 'pointer',
        size,
        containerClasses
      )}
      style={{ position: 'relative', ...containerStyle }}
      onDrag={onDrag}
      onClick={onClick}
      data-tip={tooltip}
      data-for={forId}
      ref={innerRef}
    >
      {icon == 'bubble_chart' && (
        <i
          style={{ color, ...style }}
          className={cx(
            additionalClasses,
            size,
            `tiphive-icon material-icons${outlined ? '-outlined' : ''}`
          )}
        >
          bubble_chart
        </i>
      )}

      {icon == 'hashtag' && (
        <i
          style={{ color, ...style }}
          className={cx(
            additionalClasses,
            size,
            'tiphive-icon material-icons icon-fa'
          )}
        >
          <span className="fa fa-hashtag" />
        </i>
      )}

      {icon === 'category' && (
        <i
          style={{ color, ...style }}
          className={cx(additionalClasses, size, 'material-icons-outlined')}
        >
          {icon}
        </i>
      )}

      {icon === 'outlined_flag' && (
        <i
          style={{ color, ...style }}
          className={cx(additionalClasses, size, 'material-icons-outlined')}
        >
          {icon}
        </i>
      )}

      {icon == 'topic' && (
        <div
          style={{ color, backgroundColor, ...style }}
          className={
            addClasses
              ? addClasses
              : cx('revolving-toggle-button', additionalClasses)
          }
        />
      )}

      {icon != 'topic' &&
        icon != 'bubble_chart' &&
        icon != 'hashtag' &&
        icon != 'category' &&
        icon != 'outlined_flag' &&
        fontAwesome && (
          <i
            style={{ color, ...style }}
            className={cx(additionalClasses, size, 'material-icons icon-fa')}
          >
            <span className={cx('fa', `fa-${icon}`)} />
          </i>
        )}

      {icon != 'topic' &&
        icon != 'bubble_chart' &&
        icon != 'hashtag' &&
        icon != 'category' &&
        icon != 'outlined_flag' &&
        !fontAwesome && (
          <i
            style={{
              color,
              fontSize,
              height,
              lineHeight,
              marginBottom,
              ...style
            }}
            className={cx(
              additionalClasses,
              size,
              `tiphive-icon material-icons${outlined ? '-outlined' : ''}`
            )}
          >
            {icon}
          </i>
        )}

      {subIcon && (
        <Icon
          {...subIcon}
          containerStyle={{
            position: 'absolute',
            bottom: '-10px',
            right: '-11px'
          }}
          style={{
            color,
            fontSize: '12px'
          }}
        />
      )}
      {tooltip && <Tooltip {...tooltipOptions} id={forId} />}
    </div>
  );
};

Icon.propTypes = {
  additionalClasses: PropTypes.string,
  icon: PropTypes.string.isRequired
};

export default Icon;
