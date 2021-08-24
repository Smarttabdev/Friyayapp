import React, { Fragment } from 'react';
import LoadMore from 'Components/shared/LoadMore';
import StarterItem from './StarterItem';
import StarterPlaceholder from './StarterPlaceholder';

const ItemList = ({ items, paginationRelay, fontColor }) => {
  //   this function determines how the card is displayed based on the item type
  const handleType = itemType => {
    switch (itemType) {
      case 'CHAT_CARD':
        return 'CHAT';
      case 'VIDEO_CHAT_CARD':
        return 'VIDEO_CHAT';
      case 'PROJECT_BOARD':
        return 'PROJECT';
      case 'GOAL_BOARD':
        return 'GOAL';
      case 'FILE_CARD':
        return 'FILE';
      default:
        return itemType;
    }
  };

  return (
    <Fragment>
      <div className="mt10">
        {items?.length > 0 ? (
          items
            .filter(item => item.label !== '')
            .map(item => (
              <StarterItem
                key={item.id}
                item={item}
                title={item.itemType === 'file' ? item.tip.title : item.title}
                slug={item.itemType === 'file' ? item.tip.slug : item.slug}
                type={handleType(item.itemType)}
                baseType={item.baseType}
                completionPercent={item.completion}
                speed={item.speed}
                id={item.itemId}
                fontColor={fontColor}
                tip={item.tip}
                topic={item.topic}
              />
            ))
        ) : (
          <StarterPlaceholder fontColor={fontColor} />
        )}
      </div>
      <LoadMore relay={paginationRelay} count={15} />
    </Fragment>
  );
};

export default createFragmentContainer(ItemList, {
  items: graphql`
    fragment ItemList_items on Item @relay(plural: true) {
      id
      itemId
      title
      slug
      baseType
      itemType
      createdAt
      updatedAt
      completedAt
      meta
      speed
      completion
      tip {
        id
        parent {
          id
          title
        }
        topic {
          id
          title
        }
      }
      topic {
        id
        parent {
          id
          title
        }
      }
    }
  `
});
