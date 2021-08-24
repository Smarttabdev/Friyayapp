import React from 'react';
import { getToolIcon } from 'Src/utils/icons';
import { getIconColor } from 'Src/utils/color';
import Tooltip from 'Components/shared/Tooltip';

export default function StarterFilterTool({
  name,
  toolKey,
  type,
  count = 0,
  isActive,
  onClick,
  fontColor,
  background = ''
}) {
  const forId = Math.ceil(Math.random() * 100000, 6);
  const icon = getToolIcon(toolKey);
  const color = getIconColor(toolKey);

  const borderStyle = fontColor
    ? `1px solid ${fontColor}`
    : '1px solid rgba(0, 0, 0, 0.1)';

  return (
    <div
      data-tip={name}
      data-for={forId}
      className="tool_tab"
      onClick={() => onClick(type)}
      style={
        isActive
          ? { background: color, color: '#fff' }
          : { border: borderStyle, background: background }
      }
    >
      <i
        className="material-icons-outlined"
        style={isActive ? { color: '#fff' } : { color }}
      >
        {icon}
      </i>
      <Tooltip {...{ place: 'bottom' }} id={forId} />
    </div>
  );
}
