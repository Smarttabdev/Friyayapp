import React, { Fragment, useState } from 'react';
import ReactModal from 'react-modal';
import IconButton from 'Components/shared/buttons/IconButton';
import ScorecardWrapper from './ScorecardWrapper';

import './Scorecard.scss';

const Scorecard = props => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const { enableCustomComponent } = props;
  return (
    <Fragment>
      {enableCustomComponent ? (
        <span style={{ width: '100%' }} onClick={toggleModal}>
          Score card
        </span>
      ) : (
        <img
          src="/images/dart.svg"
          className="top-dart-icon"
          alt="dart"
          onClick={toggleModal}
        />
      )}
      <ReactModal
        onRequestClose={toggleModal}
        isOpen={isModalOpen}
        className="modal-content"
        overlayClassName="react-modal-overlay"
      >
        <IconButton
          additionalClasses="dark-grey-icon-button close-icon"
          icon="close"
          onClick={toggleModal}
        />
        <ScorecardWrapper />
      </ReactModal>
    </Fragment>
  );
};

export default Scorecard;
