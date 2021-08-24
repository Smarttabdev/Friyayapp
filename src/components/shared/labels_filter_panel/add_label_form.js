import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveLabel } from '../../../actions/labels';
import { inc } from 'ramda';
import RightDesignColorPicker from 'Components/menus/right/right_submenus/design/RightDesignColorPicker.js';

class AddLabelForm extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    switchView: PropTypes.func.isRequired,
    labelType: PropTypes.string.isRequired
  };

  state = {
    name: '',
    kind: '',
    color: 1
  };

  handleColorSelect = color => this.setState(state => ({ ...state, color }));

  handleLabelFormSubmit = async e => {
    e.preventDefault();
    const {
      props: { switchView, save, labelType: kind },
      state: { name, color }
    } = this;

    save({ name, kind, color });
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
            <div className="form-group">
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

const mapState = () => ({});
const mapDispatch = { save: saveLabel };

export default connect(
  mapState,
  mapDispatch
)(AddLabelForm);
