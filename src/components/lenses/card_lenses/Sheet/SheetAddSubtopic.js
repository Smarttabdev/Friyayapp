import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { getParsedColumn } from 'Lib/utilities';

class SheetAddSubtopic extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    configureColumns: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    onAddSubtopic: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    sheetBorderStyle: PropTypes.string
  };

  state = { newSubtopicTitle: '' };

  handleNewSubtopicChange = ev => {
    this.setState({ newSubtopicTitle: ev.target.value });
  };

  handleNewSubtopicKeyDown = ev => {
    if (ev.keyCode === 13 && ev.target.value) {
      this.props.onAddSubtopic(ev.target.value);
      this.setState({ newSubtopicTitle: '' });
    }
  };

  render() {
    const { customFields, tips, sheetBorderStyle } = this.props;
    const nestingLevelPadding = this.props.level * 20;

    const titleHeader = document.getElementsByClassName('rw--title');
    return (
      <div className="sheet-view__topic-header">
        <div
          className="sheet-view__cell"
          style={{
            paddingLeft: `${nestingLevelPadding}px`,
            ...(titleHeader[0] && { flexBasis: titleHeader[0].style.width })
          }}
        >
          <input
            className="sheet-view__input"
            autoFocus
            placeholder="board title"
            style={{ width: '100%' }}
            value={this.state.newSubtopicTitle}
            onBlur={this.props.onCancel}
            onChange={this.handleNewSubtopicChange}
            onKeyDown={this.handleNewSubtopicKeyDown}
          />
        </div>
        {this.props.columns.map(column => {
          const parsedColumn = getParsedColumn(column, { customFields, tips });
          const cssModifier = parsedColumn.getValue('cssModifier');
          const cellClassNames = classNames('sheet-view__cell', {
            [`sheet-view__cell--${cssModifier}`]: cssModifier
          });

          const header = document.getElementsByClassName(`rw--${cssModifier}`);

          return (
            <div
              key={column}
              className={cellClassNames}
              style={{
                ...(header[0] && { flexBasis: header[0].style.width })
              }}
            />
          );
        })}
        {this.props.configureColumns && (
          <div
            className="sheet-view__cell sheet-view__cell--add"
            style={sheetBorderStyle}
          />
        )}
      </div>
    );
  }
}

export default SheetAddSubtopic;
