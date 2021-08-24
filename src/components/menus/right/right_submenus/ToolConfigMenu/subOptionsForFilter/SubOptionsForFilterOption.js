import React, { useRef } from 'react';
import CardAndBoardTypeOptions from './CardAndBoardTypeOptions';
import LabelOptions from './LabelOptions';
import StatusOptions from './StatusOptions';
import { useOutsideAlerter } from 'Src/lib/hooks';
import BoardOptions from './BoardOptions';
import CreatedByAndAssignedToOptions from './CreatedByAndAssignedToOptions';
import DateOptions from './DateOptions';
import PriorityOptions from './PriorityOptions';

const SubOptionsForFilterOption = ({
  optionValue,
  onSelectOption,
  closeDropdown
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => closeDropdown());

  const dateOptions = [
    'created_date',
    'start_date',
    'due_date',
    'completed_date'
  ];

  const renderSubOptions = () => {
    let SubOptionComponent;
    let type;
    if (optionValue == 'card_and_board')
      SubOptionComponent = CardAndBoardTypeOptions;
    if (optionValue == 'board') SubOptionComponent = BoardOptions;
    if (optionValue == 'status') SubOptionComponent = StatusOptions;
    if (optionValue == 'labels') SubOptionComponent = LabelOptions;
    if (optionValue == 'created_by') {
      type = 'creator';
      SubOptionComponent = CreatedByAndAssignedToOptions;
    }
    if (optionValue == 'assigned_to') {
      type = 'assigned';
      SubOptionComponent = CreatedByAndAssignedToOptions;
    }
    if (optionValue == 'created_date') {
      type = 'created';
      SubOptionComponent = DateOptions;
    }
    if (optionValue == 'start_date') {
      type = 'start';
      SubOptionComponent = DateOptions;
    }
    if (optionValue == 'due_date') {
      type = 'due';
      SubOptionComponent = DateOptions;
    }
    if (optionValue == 'completed_date') {
      type = 'completed';
      SubOptionComponent = DateOptions;
    }
    if (optionValue == 'priority_level') SubOptionComponent = PriorityOptions;

    return <SubOptionComponent type={type} />;
  };

  return (
    <div
      ref={wrapperRef}
      className={`sub_options_dropdown dropdown-menu ${dateOptions.includes(
        optionValue
      ) && 'isDateComponent'}`}
    >
      {renderSubOptions()}
    </div>
  );
};

export default SubOptionsForFilterOption;
