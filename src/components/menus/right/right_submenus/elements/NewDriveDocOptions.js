import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';

const NewDriveDocOptions = ({ dropdownLeft }) => {
  const getGoogleDocIcon = kind => {
    const iconClass =
      { document: 'docs', spreadsheets: 'sheets', presentation: 'slides' }[
        kind
      ] || 'docs';
    return (
      <img
        alt=""
        aria-hidden="true"
        src={`https://www.gstatic.com/images/branding/product/1x/${iconClass}_48dp.png`}
        srcSet={`https://www.gstatic.com/images/branding/product/1x/${iconClass}_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/${iconClass}_48dp.png 2x `}
        width="18px"
        height="20px"
      />
    );
  };

  const addGoogleNewOptions = (
    <Fragment>
      <div className="dropdown-option-item google-add-new-dropdown-option">
        {getGoogleDocIcon('document')}
        <a
          className="text-muted"
          key="google-option-doc"
          href="https://docs.google.com/document/create"
          target="_blank"
          rel="noopener noreferrer"
        >
          New Document
        </a>
      </div>
      <div className="dropdown-option-item text-muted google-add-new-dropdown-option">
        {getGoogleDocIcon('presentation')}
        <a
          className="text-muted"
          key="google-option-ppt"
          href="https://docs.google.com/presentation/create"
          target="_blank"
          rel="noopener noreferrer"
        >
          New Presentation
        </a>
      </div>
      <div className="dropdown-option-item text-muted google-add-new-dropdown-option">
        {getGoogleDocIcon('spreadsheets')}
        <a
          className="text-muted"
          key="google-option-sheet"
          href="https://docs.google.com/spreadsheets/create"
          target="_blank"
          rel="noopener noreferrer"
        >
          New Spreadsheet
        </a>
      </div>
    </Fragment>
  );

  return (
    <OptionsDropdownButton
      icon="add"
      color="#515050"
      dropdownLeft={dropdownLeft}
    >
      {addGoogleNewOptions}
    </OptionsDropdownButton>
  );
};

NewDriveDocOptions.propTypes = { dropdownLeft: PropTypes.bool };

export default NewDriveDocOptions;
