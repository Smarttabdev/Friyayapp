import classNames from 'classnames';
import PropTypes from 'prop-types';
import { difference, sortBy } from 'lodash';
import React, { Component } from 'react';
import Resizable from 're-resizable';
import cx from 'classnames';

import { packColumn, getParsedColumn } from 'Lib/utilities';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { columns, sheetConfig } from './sheetConfig/index';
import Icon from 'Src/components/shared/Icon';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import GenericDragContainer from 'Components/shared/drag_and_drop/GenericDragContainer';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import Popup from 'Src/components/shared/Popup';
import FieldsDropdown from 'Components/pages/main_form_page/tip_tab_content/fields_tab_content/fields_dropdown';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';

const Handle = () => (
  <Icon icon="arrows-h" fontAwesome containerClasses="resizable-arrows" />
);

const ResizableCustom = ({
  className,
  children,
  handleResize,
  sheetBorderStyle,
  ...props
}) => (
  <Resizable
    className={cx('resize-wrapper', className)}
    style={sheetBorderStyle}
    handleComponent={{ left: Handle, right: Handle }}
    handleWrapperClass="resize-wrapper__handle-wrapper"
    enable={{
      top: false,
      right: true,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    }}
    defaultSize=""
    onResize={handleResize}
    {...props}
  >
    {children}
  </Resizable>
);

class SheetHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      showFieldsDropdown: false,
      columnsSearchKeywords: '',
      columnWidth: props.columnWidth
    };

    this.columnsSearchKeywordsInputRef = React.createRef();
  }

  static propTypes = {
    columns: PropTypes.array.isRequired,
    configureColumns: PropTypes.bool.isRequired,
    scrollContainerRef: PropTypes.func.isRequired,
    sortColumn: PropTypes.string,
    sortOrder: PropTypes.string,
    onColumnToggle: PropTypes.func.isRequired,
    onSortToggle: PropTypes.func.isRequired,
    onColumnsReorder: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    if (this.props.columnWidth !== prevProps.columnWidth) {
      this.setState({ columnWidth: this.props.columnWidth });
    }
  }

  updateInputValue = evt => {
    this.setState({
      columnsSearchKeywords: evt.target.value
    });
  };

  handleNewColumn = () => {
    vex.dialog.open({
      message: 'Select column name and type',
      input: `
        <input
          class="sheet-board-dialog-input"
          name="name"
          placeholder="Column name"
          required
        />
        <select class="sheet-board-dialog-input" name="type" required>
          <option disabled selected>
            Value type
          </option>
          <option value="text">Text</option>
          <option value="bool">Checkbox</option>
          <option value="num">Number</option>
        </select>
      `,
      callback: ({ name, type }) => {
        if (!name || !type) return;

        const columnId = `custom_${new Date().valueOf()}`;

        columns[columnId] = columnId;
        sheetConfig[columnId] = {
          cssModifier: 'custom',
          display: name,
          render(card, stateValue = null, onChange) {
            switch (type) {
              case 'bool': {
                return (
                  <span
                    className="material-icons sheet-view__check"
                    onClick={() => onChange(!stateValue)}
                  >
                    {stateValue ? 'check_box' : 'crop_din'}
                  </span>
                );
              }
              case 'num': {
                return (
                  <input
                    className="sheet-view__input"
                    min="0"
                    placeholder="0"
                    type="number"
                    value={stateValue}
                    onChange={ev => onChange(ev.target.value)}
                  />
                );
              }
              default: {
                return (
                  <input
                    className="sheet-view__input"
                    placeholder="No value"
                    value={stateValue}
                    onChange={ev => onChange(ev.target.value)}
                  />
                );
              }
            }
          },
          renderSummary: () => null
        };

        this.handleOptionSelect(columnId, false);
      }
    });

    this.toggleDropdown(false);
  };

  handleOptionSelect(column, showDropdown) {
    if (column === columns.custom_field) {
      this.toggleDropdown(false);
      this.setState({ showFieldsDropdown: true });
    } else {
      this.props.onColumnToggle(column);
      this.toggleDropdown(showDropdown);
    }
  }

  handleInactiveFieldClick = async item => {
    const { currentDomain, topicQuery } = this.props;
    const activeFields = (topicQuery || currentDomain).activeFields;
    const isActive =
      activeFields &&
      activeFields.find(af => af.customField.id == item.field.id);
    !isActive &&
      (await mutations.createActiveField({
        ownerId: (topicQuery || currentDomain).id,
        customFieldId: item.field.id
      }));
    const fieldColumn = packColumn(columns.custom_field, { id: item.field.id });
    this.props.onColumnToggle(fieldColumn);
    this.setState({ showFieldsDropdown: false });
  };

  handleCreateField = async () => {
    const { currentDomain, topicQuery } = this.props;
    const data = await mutations.createCustomField({
      name: 'New field',
      fieldType: 'text'
    });
    const customFieldId = data.createCustomField.customField.id;
    await mutations.createActiveField({
      ownerId: (topicQuery || currentDomain).id,
      customFieldId
    });
    const fieldColumn = packColumn(columns.custom_field, { id: customFieldId });
    this.props.onColumnToggle(fieldColumn);
    this.toggleDropdown(false);
  };

  handleOutsideClick = ev => {
    if (!this.dropdownRef.contains(ev.target)) {
      this.toggleDropdown();
    }
  };

  saveDropdownRef = ref => {
    this.dropdownRef = ref;
  };

  toggleDropdown = (showDropdown = !this.state.showDropdown) => {
    this.setState({ showDropdown, columnsSearchKeywords: '' }, () => {
      if (this.state.showDropdown) {
        document.addEventListener('click', this.handleOutsideClick, false);
        this.columnsSearchKeywordsInputRef.current.focus();
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    });
  };

  resize = column => (e, pos, el) => {
    const { customFields, tips } = this.props;

    const newSize = el.style.width;
    let cssModifier;

    if (['title', 'add'].includes(column)) {
      cssModifier = column;
    } else {
      const parsedColumn = getParsedColumn(column, { customFields, tips });
      cssModifier = parsedColumn.getValue('cssModifier');
    }

    const header = document.getElementsByClassName('rw--' + cssModifier);
    for (let element of header) {
      element.style.width = newSize;
    }

    const col = document.getElementsByClassName(
      'sheet-view__cell--' + cssModifier
    );
    for (let element of col) {
      element.style.flexBasis = newSize;
      element.style.minWidth = newSize;
      element.style.maxWidth = newSize;
    }

    if (column) {
      this.setState(state => ({
        columnWidth: {
          ...state.columnWidth,
          [column]: newSize
        }
      }));
      this.props.onColumnResize(column, newSize);
    }
  };

  getColumnSize = column => {
    const { columnWidth } = this.state;

    let width = columnWidth[column] || '';

    if (column === 'title') {
      width = width || '580px';
    } else if (column == 'add') {
      width = width || '50px';
    }

    return { width };
  };

  handleColumnDragEnter = column => ({ draggedItemProps: { item } }) => {
    if (item !== column) {
      const columns = this.props.columns.slice();
      const srcIndex = columns.findIndex(x => x === item);
      const dstIndex = columns.findIndex(x => x === column);
      columns.splice(srcIndex, 1);
      columns.splice(dstIndex, 0, item);
      this.props.onColumnsReorder(columns);
    }
  };

  handleOpenFieldsTab = () => {
    const { topicId, setUpdateTopicModalOpen } = this.props;
    setUpdateTopicModalOpen(topicId, true, 5);
  };

  getInactiveFields = () => {
    const { customFields = [], columns, tips } = this.props;
    return customFields.filter(customField => {
      return !columns.find(column => {
        const parsed = getParsedColumn(column, { customFields, tips });
        return (
          parsed.column == 'custom_field' && parsed.data.id == customField.id
        );
      });
    });
  };

  render() {
    const {
      currentDomain,
      topicQuery,
      customFields,
      sheetBorderStyle,
      tips
    } = this.props;
    let options = difference(Object.keys(columns), this.props.columns);
    options = sortBy(options, key => {
      const parsedColumn = getParsedColumn(key, { customFields, tips });
      return parsedColumn.getValue('display');
    });
    const { columnsSearchKeywords } = this.state;
    if (columnsSearchKeywords) {
      options = options.filter(option => {
        const parsedColumn = getParsedColumn(option, { customFields, tips });
        return parsedColumn
          .getValue('display')
          .toLowerCase()
          .includes(columnsSearchKeywords.toLowerCase());
      });
    }

    return (
      <div ref={this.props.scrollContainerRef} className="sheet-view__header">
        <div className="sheet-view__grid">
          <ResizableCustom
            className="rw--title"
            handleResize={this.resize('title')}
            size={this.getColumnSize('title')}
            sheetBorderStyle={sheetBorderStyle}
          >
            <div
              className="sheet-view__cell pointer"
              onClick={() => this.props.onSortToggle(null)}
            >
              {this.props.label || 'Cards'}
            </div>
          </ResizableCustom>
          {this.props.columns.map((column, i) => {
            const parsedColumn = getParsedColumn(column, {
              customFields,
              tips
            });
            const config = parsedColumn.config;
            const cssModifier = parsedColumn.getValue('cssModifier');
            const cellClassNames = classNames('sheet-view__cell', {
              [`sheet-view__cell--${cssModifier}`]: cssModifier
            });

            const resizableProps =
              parsedColumn.getValue('resizableProps') || {};
            const columnSize = this.getColumnSize(column);
            return (
              <ResizableCustom
                className={`rw--${cssModifier}`}
                sheetBorderStyle={sheetBorderStyle}
                handleResize={this.resize(column)}
                key={column}
                size={columnSize}
                {...resizableProps}
              >
                <GenericDropZone
                  itemType={dragItemTypes.COLUMN}
                  onDragEnter={this.handleColumnDragEnter(column)}
                  onDragLeave={() => {}}
                  onDrop={() => {}}
                  style={{ height: '100%' }}
                >
                  <GenericDragContainer
                    itemType={dragItemTypes.COLUMN}
                    item={column}
                    dragPreview={
                      <div
                        key={i}
                        style={{
                          height: 42,
                          width: 200,
                          maxWidth: parseInt(columnSize) || 200
                        }}
                      >
                        {parsedColumn.getValue('display')}
                      </div>
                    }
                    onDropElsewhere={() => {}}
                    style={{ height: '100%' }}
                  >
                    <div className="col_header">
                      <span
                        className="sheet-view__cell-title"
                        onClick={
                          config.sort && (() => this.props.onSortToggle(column))
                        }
                      >
                        {parsedColumn.getValue('display')}
                      </span>
                      {this.props.sortColumn === column && (
                        <span className="material-icons sheet-view__sort-btn">
                          {this.props.sortOrder === 'asc'
                            ? 'arrow_downward'
                            : 'arrow_upward'}
                        </span>
                      )}
                      {this.props.configureColumns && (
                        <span
                          className="material-icons sheet-view__cell-remove-btn"
                          onClick={() => this.handleOptionSelect(column, false)}
                        >
                          clear
                        </span>
                      )}
                    </div>
                  </GenericDragContainer>
                </GenericDropZone>
              </ResizableCustom>
            );
          })}
          {this.props.configureColumns && (
            <ResizableCustom
              className="rw--add"
              sheetBorderStyle={sheetBorderStyle}
              size={this.getColumnSize('add')}
              handleResize={this.resize('add')}
            >
              <div
                className="sheet-view__cell sheet-view__cell--add"
                style={sheetBorderStyle}
              >
                <span
                  className="material-icons sheet-view__add-column-btn"
                  onClick={() => this.toggleDropdown(!!options.length)}
                >
                  add_box
                </span>
                {this.state.showDropdown && (
                  <ul
                    ref={this.saveDropdownRef}
                    className="sheet-view__dropdown"
                  >
                    {/* <li
                    className="sheet-view__dropdown-item"
                    onClick={this.handleNewColumn}
                  >
                    + New column
                  </li> */}
                    <li className="sheet-view__dropdown-item sheet-view__dropdown-header">
                      Add Columns
                    </li>
                    <li className="sheet-view__dropdown-item sheet-view__dropdown-item--search-input">
                      <input
                        className="w100"
                        ref={this.columnsSearchKeywordsInputRef}
                        value={this.state.columnsSearchKeywords}
                        onChange={evt => this.updateInputValue(evt)}
                      />
                    </li>
                    <li
                      className="sheet-view__dropdown-item"
                      onClick={this.handleCreateField}
                    >
                      +Add new field
                    </li>
                    {options.map(option => {
                      const parsedColumn = getParsedColumn(option, {
                        customFields,
                        tips
                      });
                      return (
                        <li
                          key={option}
                          className="sheet-view__dropdown-item"
                          onClick={() => this.handleOptionSelect(option, true)}
                        >
                          {parsedColumn.getValue('display')}
                        </li>
                      );
                    })}
                    {topicQuery && (
                      <li
                        className="sheet-view__dropdown-item"
                        onClick={this.handleOpenFieldsTab}
                      >
                        Inactive Fields
                      </li>
                    )}
                  </ul>
                )}
              </div>
              <Popup
                open={this.state.showFieldsDropdown}
                onOpen={() => this.setState({ showFieldsDropdown: true })}
                onClose={() => this.setState({ showFieldsDropdown: false })}
                on="click"
                position="bottom right"
                arrow={false}
                trigger={<div />}
                contentStyle={{ borderRadius: 0 }}
              >
                <FieldsDropdown
                  inactiveFields={this.getInactiveFields()}
                  onClick={this.handleInactiveFieldClick}
                />
              </Popup>
            </ResizableCustom>
          )}
        </div>
      </div>
    );
  }
}

const dataRequirements = () => ({});

const mapState = state => {
  return {};
};

const mapDispatch = {
  setUpdateTopicModalOpen
};

export default withDataManager(
  dataRequirements,
  mapState,
  mapDispatch
)(SheetHeader);
