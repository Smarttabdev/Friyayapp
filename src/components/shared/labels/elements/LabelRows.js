import React from 'react';
import PropTypes from 'prop-types';
import LabelRow from './LabelRow';
import tiphive from 'Lib/tiphive';

const LabelRows = ({
  canAddOrEdit,
  labelType,
  labels,
  onAddLabelClick,
  onLabelSelect,
  onLabelDelete,
  selectedLabelIds,
  isEditingSelected,
  closeDropdown = []
}) => {
  return (
    <div className="labels-list-section">
      <label>{labelType} LABELS</label>
      <div className="labels-list mt10">
        {labels.map(label => (
          <LabelRow
            canAddOrEdit={canAddOrEdit}
            isGuest={tiphive.userIsGuest()}
            labelType={labelType}
            key={label.id}
            isSelected={selectedLabelIds.includes(label.id)}
            label={label}
            onLabelSelect={onLabelSelect}
            onLabelDelete={onLabelDelete}
            isEditingSelected={isEditingSelected}
            closeDropdown={closeDropdown}
          />
        ))}
      </div>

      {!tiphive.userIsGuest() && canAddOrEdit && labelType !== 'system' && (
        <a onClick={onAddLabelClick}>+ Add {labelType} label</a>
      )}
    </div>
  );
};

LabelRows.propTypes = {
  labelType: PropTypes.string.isRequired,
  labels: PropTypes.array,
  onAddLabelClick: PropTypes.func.isRequired,
  onLabelSelect: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
  selectedLabelIds: PropTypes.array,
  isEditingSelected: PropTypes.number,
  closeDropdown: PropTypes.func
};

LabelRows.defaultProps = {
  labels: []
};

export default LabelRows;
