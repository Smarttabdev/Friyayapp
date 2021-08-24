import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ColorBlock from 'Components/shared/color_block';
import { createLabel } from 'Src/newRedux/database/labels/thunks';
import { inc } from 'ramda';
import RightDesignColorPicker from 'Components/menus/right/right_submenus/design/RightDesignColorPicker.js';

class AddLabelForm extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    switchView: PropTypes.func.isRequired,
    labelType: PropTypes.string.isRequired
  };

  state = {
    savingLabel: false,
    name: '',
    kind: '',
    color: '#333333'
  };

  handleColorSelect = color => {
    this.setState(state => ({ ...state, color }));
  };

  handleLabelFormSubmit = async e => {
    e.preventDefault();
    const {
      props: { onCreateLabel, switchView, save, labelType: kind },
      state: { name, color }
    } = this;
    this.setState({ savingLabel: true });
    const newLabel = await save({ attributes: { name, kind, color } });
    this.setState({ savingLabel: false });
    onCreateLabel && onCreateLabel(newLabel.data.data);
    switchView('label_list');
  };

  handleLabelNameChange = ({ target: { value } }) =>
    this.setState(state => ({ ...state, name: value }));

  render() {
    const {
      props: { switchView, labelType },
      state: { name, color }
    } = this;

    return (
      <div className="add-form-label">
        <div className="flex-r-center-spacebetween mb10">
          <label>Add {labelType} Label</label>
          <a href="javascript:void(0)" onClick={() => switchView('label_list')}>
            <i className="fa fa-lg fa-close" />
          </a>
        </div>
        <form
          className="label-form label-tab-form"
          onSubmit={this.handleLabelFormSubmit}
        >
          <div className="panel-body p0">
            <div className="form-group row">
              <div className="col-sm-10">
                <input
                  type="text"
                  value={name}
                  onChange={this.handleLabelNameChange}
                  className="form-control full-border"
                  placeholder="Type label name"
                  required
                  autoFocus
                />
              </div>
              <RightDesignColorPicker
                onChange={this.handleColorSelect}
                value={color}
              />
            </div>
          </div>
          <div className="panel-footer flex-r-center-end pt10 pr0 mt10">
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = { save: createLabel };

export default connect(undefined, mapDispatch)(AddLabelForm);
