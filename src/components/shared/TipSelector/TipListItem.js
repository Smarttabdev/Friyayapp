import React from 'react';
import cn from 'classnames';
import Icon from 'Components/shared/Icon';

const TipListItem = ({
  tip,
  iconProps = {
    icon: 'featured_play_list',
    color: '#56CCF2',
    outlined: true
  },
  className,
  style,
  onClick
}) => (
  <div
    className={cn('flex flex-r-center mb5 pointer', className)}
    style={style}
    onClick={onClick}
  >
    <Icon containerClasses="mr10" {...iconProps} />
    {tip.title}
  </div>
);

export default TipListItem;
