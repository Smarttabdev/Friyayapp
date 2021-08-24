import React, { useState, Fragment } from 'react';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';
import {
  deleteLens,
  updateLens,
  selectCustomLens
} from 'Src/newRedux/database/lenses/thunks';
import FormInput from 'Components/shared/forms/FormInput';
import Icon from 'Components/shared/Icon';
import { getUiSettings } from 'Src/helpers/user_config';

const CustomLensMenuRow = props => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(props.attributes.title);

  const selectLens = payload => () => {
    props.selectCustomLens(payload);
  };

  const deleteCustomLens = () => {
    props.deleteLens(props.id);
    Number(props.customLensId) === Number(props.id) &&
      selectLens({
        id: props.userConfigurationId,
        current_active_lens_id: null
      })();
  };

  const renameCustomLens = () => {
    props.updateLens(props.id, { title });
    setEdit(false);
  };

  const renderCreateLens = () => (
    <div className="custom-tool-rename">
      <FormInput
        autoFocus
        defaultValue={title}
        onChange={setTitle}
        onSubmit={renameCustomLens}
        placeholder="Tool Title"
      />
      <div className="add-card-input-footer">
        <p>hit enter to update</p>
      </div>
    </div>
  );

  const renderLens = () => (
    <Fragment>
      <Icon
        fontAwesome={get(props, 'board.fontAwesomeIcon')}
        icon={get(props, 'board.icon')}
      />
      <span>{props.attributes.title}</span>
    </Fragment>
  );

  const togglePinLens = () => {
    const { setUserLensPinSettings, id, pinedLenses, query } = props;
    const board = `${id}`;
    if (query?.activePinnedLensesOrder) {
      const order = query.activePinnedLensesOrder.order.includes(board)
        ? query.activePinnedLensesOrder.order.filter(x => x != board)
        : query.activePinnedLensesOrder.order.concat(board);

      return mutations.confirmUpdatePinnedLensesOrder({
        topicId: props.topicId || 0,
        pinnedLensesOrder: query.activePinnedLensesOrder,
        order
      });
    }
    const payload = {
      ui_settings: {
        pinned_lenses: pinedLenses.includes(board)
          ? pinedLenses.filter(x => x !== board)
          : [...pinedLenses, board]
      },
      action: pinedLenses.includes(board) ? 'remove' : 'add',
      view: board
    };
    return setUserLensPinSettings(payload);
  };

  const selected = Number(props.customLensId) === Number(props.id);

  return (
    <div className="right-submenu_item option">
      <div
        className={`darker-grey-link ${selected ? 'active' : ''}`}
        onClick={selectLens({
          id: props.userConfigurationId,
          current_active_lens_id: props.id
        })}
      >
        {isEdit ? renderCreateLens() : renderLens()}
      </div>
      <OptionsDropdownButton>
        <a className="dropdown-option-item" onClick={togglePinLens}>
          {props.pinedLenses.includes(`${props.id}`)
            ? 'Unpin Tool'
            : 'Pin Tool'}
        </a>
        {Number(props.attributes.user_id) === Number(props.userId) &&
        !isEdit ? (
          <Fragment>
            <a onClick={deleteCustomLens} className="dropdown-option-item">
              Delete
            </a>
            <a onClick={() => setEdit(true)} className="dropdown-option-item">
              Rename
            </a>
          </Fragment>
        ) : null}
      </OptionsDropdownButton>
    </div>
  );
};

const mapState = (state, props) => {
  const uiSettings = getUiSettings(state);
  return {
    pinedLenses: props.pinedLenses || uiSettings.pinned_lenses || []
  };
};

export default connect(mapState, {
  selectCustomLens,
  deleteLens,
  updateLens,
  setUserLensPinSettings
})(CustomLensMenuRow);
