import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import { COL_MODE_WEEK } from './constants';

class TimeframeSelector extends Component {
  static propTypes = {
    className: PropTypes.string,
    columnMode: PropTypes.string,
    startDate: PropTypes.object,
    onChange: PropTypes.func,
    color: PropTypes.string,
    dropZones: PropTypes.bool,
    itemType: PropTypes.string
  };

  gotoNextWeek = () => {
    this.props.onChange(this.props.startDate.clone().add(1, 'week'));
  };
  gotoPreviousWeek = () => {
    this.props.onChange(this.props.startDate.clone().subtract(1, 'week'));
  };

  getDateRangeText = () => {
    const { startDate, columnMode } = this.props;
    const startDateClone = startDate.clone();
    if (columnMode === COL_MODE_WEEK) {
      return `${startDateClone.format('YYYY MMMM DD')} - ${startDateClone
        .endOf('week')
        .format('MMMM DD')}`;
    } else {
      return `${startDateClone.format('YYYY MMMM DD')} - ${startDateClone
        .add(4, 'day')
        .format('MMMM DD')}`;
    }
  };

  handleLeftBtnDragEnter = () => {
    clearInterval(this.btnIntervalId);
    this.btnIntervalId = setInterval(this.gotoPreviousWeek, 1000);
    this.gotoPreviousWeek();
  };

  handleRightBtnDragEnter = () => {
    clearInterval(this.btnIntervalId);
    this.btnIntervalId = setInterval(this.gotoNextWeek, 1000);
    this.gotoNextWeek();
  };

  handleBtnDragLeave = () => {
    clearInterval(this.btnIntervalId);
  };

  renderLeftBtn = () => (
    <button
      style={{ color: this.props.color }}
      className="timeline-timeframe-selector__button material-icons-outlined"
      onClick={this.gotoPreviousWeek}
    >
      keyboard_arrow_left
    </button>
  );

  renderRightBtn = () => (
    <button
      style={{ color: this.props.color }}
      className="timeline-timeframe-selector__button material-icons-outlined"
      onClick={this.gotoNextWeek}
    >
      keyboard_arrow_right
    </button>
  );

  render() {
    const controlClassNames = classNames(
      this.props.className,
      'timeline-timeframe-selector'
    );

    const { dropZones, itemType } = this.props;

    return (
      <div className={controlClassNames}>
        {dropZones ? (
          <GenericDropZone
            dropClassName="timeline-timeframe-selector__drop-zone"
            dropsDisabled
            itemType={itemType}
            onDragEnter={this.handleLeftBtnDragEnter}
            onDragLeave={this.handleBtnDragLeave}
          >
            {this.renderLeftBtn()}
          </GenericDropZone>
        ) : (
          this.renderLeftBtn()
        )}
        <span className="timeline-timeframe-selector__value">
          {this.getDateRangeText()}
        </span>
        {dropZones ? (
          <GenericDropZone
            dropClassName="timeline-timeframe-selector__drop-zone"
            dropsDisabled
            itemType={itemType}
            onDragEnter={this.handleRightBtnDragEnter}
            onDragLeave={this.handleBtnDragLeave}
          >
            {this.renderRightBtn()}
          </GenericDropZone>
        ) : (
          this.renderRightBtn()
        )}
      </div>
    );
  }
}

export default TimeframeSelector;
