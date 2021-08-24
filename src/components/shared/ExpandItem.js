import React from 'react';
import cn from 'classnames';

import Icon from 'Components/shared/Icon';

const ExpandItem = ({
  expand,
  canExpand,
  onExpandClick,
  className = 'mb10',
  iconClass = 'mr10',
  style,
  children
}) => {
  return (
    <div className={cn('flex flex-r-center', className)} style={style}>
      <Icon
        icon={expand ? 'caret-down' : 'caret-right'}
        color={canExpand ? '#a2a2a2' : '#dddddd'}
        fontAwesome
        containerClasses={cn(
          canExpand && 'pointer',
          !canExpand && 'pe-none',
          iconClass
        )}
        onClick={onExpandClick}
      />
      {children}
    </div>
  );
};

export default ExpandItem;
