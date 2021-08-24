import React, { Component } from 'react';
import { handleType } from '../../utils';
import ListItem from './ListItem';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import LoadMore from 'Components/shared/LoadMore';

class ListLayout extends Component {
  render() {
    const {
      id,
      items,
      tips,
      handleClickTitle,
      card_font_color,
      paginationRelay
    } = this.props;
    return (
      <div className="list_layout">
        {/* {!items && !tips && <div className="empty_list">Loading</div>}
        {((items && items.length == 0) || (tips && tips.length == 0)) && (
          <div className="empty_list">No items to display</div>
        )} */}
        {(items ?? tips).map((item, i) => {
          const id = toId(item[items ? 'itemId' : 'id']);
          const type = handleType(item[items ? 'itemType' : 'cardType']);
          return (
            <ListItem
              key={i}
              id={id}
              type={type}
              baseType={item?.baseType ?? 'Tip'}
              item={item}
              handleClickTitle={handleClickTitle}
              card_font_color={card_font_color}
            />
          );
        })}

        {paginationRelay.hasMore() && (
          <div className="item">
            <div
              className="item_parent"
              style={{ borderColor: card_font_color }}
            >
              <LoadMore relay={paginationRelay} />
            </div>
          </div>
        )}

        {items && (
          <div className="item">
            <div
              className="item_parent"
              style={{ borderColor: card_font_color }}
            >
              <AddCardCard
                inInputMode
                topicId={id}
                addCardUI=" "
                fullHeight={false}
                placeholder="Add Card"
                containerClassName="add-card-list-container"
                newDesign
                lessDesign
                // hideItemTypeDropdown={isFilesTool}
                // uploadFileForm={isFilesTool}
                transparent
              />
            </div>

            <div
              className="item_parent"
              style={{ borderColor: card_font_color }}
            >
              <AddSubtopicCard
                inInputMode
                parentTopicId={id}
                containerClassName="add-topic-form-container"
                newDesign
                lessDesign
                formPlaceholder="Add Board"
                // tag={cardLenses[this.props.cardView].boardType}
                // hideItemTypeDropdown={isFilesTool}
                // isFilesTool={isFilesTool}
                // card_font_color={card_font_color}
                transparent
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ListLayout;
