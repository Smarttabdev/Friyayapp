import React, { useState } from 'react';
import { connect } from 'react-redux';

import Modal from 'Components/shared/Modal';
import { updateUserUiSettings } from 'Src/newRedux/database/user/thunks';
import { getRootTopic } from 'Src/newRedux/database/topics/selectors';
import { toolConfig, updateCardTypesInStore } from './BulkChangesModal';

const CardTypesReleaseNotice = ({
  open,
  onClose,
  rootTopicId,
  updateUserUiSettings
}) => {
  const [loading, setLoading] = useState();

  const onRequestClose = () => {
    !loading && onClose();
  };

  const handleHide = async () => {
    if (loading) return;
    await updateUserUiSettings({
      newSettings: {
        hide_card_types_release_notice: true
      }
    });
  };

  const handleReset = async () => {
    if (loading) return;
    setLoading(true);
    await mutations.updateCardTypes({
      topicId: rootTopicId,
      config: {},
      toolConfig
    });
    updateCardTypesInStore({ topicId: rootTopicId, config: {} });
    await handleHide();
    setLoading(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onRequestClose}
      disabled={loading}
      styles={{
        content: {
          width: 640,
          height: 621,
          transform: 'translate(-50%, -53%)',
          padding: '66px 36px 64px 58px'
        }
      }}
    >
      <p className="font-size-16 bold mb15">
        We have made changes to Friyay that requires an update of settings.
      </p>
      <p className="font-size-16 mb15">
        Friyay now has Board and Card Types to better organize your workspace.
      </p>
      <p className="font-size-16 mb38">
        Please reset your workspace to the default settings.
      </p>

      <span
        role="button"
        className="inline-flex flex-r-center h40 bg-green color-white br6 ph12"
        onClick={handleReset}
      >
        Reset to default settings
        {loading && <i className="fa fa-spinner fa-pulse ml8" />}
      </span>
      <span
        role="button"
        className="inline-flex flex-r-center h40 border1 border-black br6 ph12 ml22 mb35"
        onClick={handleHide}
      >
        Don't show this message again.
      </span>

      <p className="color-93 mb10">
        Reset to default settings will match your Board and Card Type with the
        Tools you are currently using.
      </p>
      <p className="color-93">
        You can always change this again with the ‘Turn Cards into’ feature in
        the settings menu of your Boards.
      </p>

      <p className="color-93 bold mt35">What are Card and Board Types?</p>
      <p className="color-93 mt22">
        Card Types are: Card, Note Card, Task Card and Data Card.
      </p>
      <p className="color-93 mt22">
        Board Types are: Board, Task Board, Project Board, Knowledge Board, File
        Board, Data Board, Goal Board and Note Board.
      </p>
      <p className="color-93 mt22">
        This gives you additional options to keep your workspace organized.
      </p>
    </Modal>
  );
};

const mapState = state => {
  const rootTopic = getRootTopic(state);
  return {
    rootTopicId: rootTopic.id
  };
};

const mapDispatch = {
  updateUserUiSettings
};

export default connect(mapState, mapDispatch)(CardTypesReleaseNotice);
