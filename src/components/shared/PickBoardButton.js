import React from 'react';
import Dropdown from 'Components/shared/Dropdown';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';

export const PickBoardPanel = ({
  parentTopic,
  topicsSelectMenuProps,
  ...props
}) => {
  return (
    <TopicsListDropdown
      additionalClasses="invite-form-dropdown-menu static max-h-unset d-block"
      actionButtonLabel="Share selected Boards"
      actionButtonHandler={() => {}}
      actionButtonClass="btn-primary"
      path={parentTopic?.attributes?.path?.concat({ id: 0 })}
      startAt={parentTopic?.attributes?.path && 0}
      hideHeader
      inputMode="list"
      disallowCreate
      multiple
      hideAddTopicLink
      skipConfirmation
      domain={window.currentDomain}
      onSelectTopic={() => {}}
      showAddBoard
      topicsSelectMenuProps={{
        ...topicsSelectMenuProps,
        pickYourBoard: true
      }}
      {...props}
    />
  );
};

export const PickBoardDropdown = ({ parentTopic, panelProps, ...props }) => {
  return (
    <Dropdown MenuComponent="div" menuClassName="p-a-0 max-h-unset" {...props}>
      <PickBoardPanel parentTopic={parentTopic} {...panelProps} />
    </Dropdown>
  );
};

const PickBoardButton = ({ className, parentTopic }) => {
  return (
    <Dropdown
      trigger={
        <span className={cn('color-b8 font-size-12', className)}>
          Pick a board
        </span>
      }
      MenuComponent="div"
      menuClassName="p-a-0 max-h-unset"
    >
      <PickBoardPanel parentTopic={parentTopic} />
    </Dropdown>
  );
};

export default PickBoardButton;
