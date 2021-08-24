import React from 'react';
import Icon from 'Components/shared/Icon';

const TopicIcon = ({ topic, className, color }) => {
  const tags = topic?.attributes?.tag_list || topic?.tag_list;
  const iconProps = tags.includes('goal')
    ? {
        icon: 'flag',
        outlined: true,
        color: '#56CCF2',
        containerClasses: className || 'mr5',
        style: { fontSize: 19 }
      }
    : tags.includes('project')
    ? {
        icon: 'category',
        outlined: true,
        color: '#EB5757',
        containerClasses: className || 'mr5',
        style: { fontSize: 20 }
      }
    : {
        icon: 'hashtag',
        color: color == '' ? '#9B51E0' : color,
        size: 'small'
      };

  return <Icon {...iconProps} />;
};

export default TopicIcon;
