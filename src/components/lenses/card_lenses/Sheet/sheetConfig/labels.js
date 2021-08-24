import React from 'react';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import IconButton from 'Components/shared/buttons/IconButton';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getLabelsInAlphaOrder } from 'Src/newRedux/database/labels/selectors';
import { getLabelCategoriesArray } from 'Src/newRedux/database/labelCategories/selectors';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import reactSelectCustomStyles from 'Components/shared/ReactSelectCustom/reactSelectCustomStyles';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import {
  MultiValueLabel,
  MultiValueRemove,
  DropdownIndicator
} from 'Components/shared/ReactSelectCustom/reactSelectCustomComponents';
import { components } from 'react-select';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

const customOption = connect(null, {
  setRightMenuOpenForMenu
})(props => {
  const { innerProps, innerRef, data } = props;
  return data.onClick ? (
    <div
      ref={innerRef}
      {...innerProps}
      onClick={data.onClick}
      className="custom-label-link"
    >
      {props.label}
    </div>
  ) : (
    <div ref={innerRef} {...innerProps} className="custom-label-option">
      <span>{props.label}</span>
      <IconButton
        icon="edit"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          props.setRightMenuOpenForMenu('Filters_Labels');
        }}
      />
    </div>
  );
});

const GroupHeading = connect(null, {
  setRightMenuOpenForMenu
})(props => {
  if (!props.children) return null;
  return (
    <div className="custom-label-group ">
      <span>{props.children}</span>
      <IconButton
        icon="add"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          props.setRightMenuOpenForMenu('Filters_Labels');
        }}
      />
    </div>
  );
});

class SheetCardLabels extends React.PureComponent {
  handleClickAddLabel = () => {
    const { setEditCardModalOpen, card } = this.props;
    setEditCardModalOpen({ cardId: card.id, tab: 'Label' });
  };

  render() {
    let {
      handleValueUpdate,
      card,
      labels,
      setRightMenuOpenForMenu,
      viewKey,
      active_font_color
    } = this.props;

    labels = labels.filter(e => e.attributes.kind != 'system');
    const options = labels.map(label => {
      return {
        value: label.id,
        label: label.attributes.name,
        item: label
      };
    });

    const groupedOptions = Object.entries(
      groupBy(options, 'item.attributes.kind')
    ).map(([label, options]) => ({ label, options }));

    groupedOptions.unshift({
      options: [
        {
          value: 'addLabel',
          label: '+Add Label',
          onClick: this.handleClickAddLabel
        }
      ]
    });

    const value = card.relationships.labels.data.map(id =>
      options.find(option => option.value == id)
    );

    return (
      <ReactSelectCustom
        className="sheet-view__card-label-select"
        value={value}
        activeColor={viewKey == 'SHEET' && active_font_color}
        onChange={labels => {
          handleValueUpdate({
            relationships: {
              labels: { data: labels.map(label => label.value) }
            }
          });
        }}
        styles={{
          ...reactSelectCustomStyles,
          control: provided => ({
            ...reactSelectCustomStyles.control(provided),
            border: 'none',
            ...{ background: viewKey == 'SHEET' && 'transparent' }
          })
        }}
        components={{
          MultiValueLabel,
          MultiValueRemove,
          Option: customOption,
          GroupHeading,
          DropdownIndicator,
          NoOptionsMessage: props => (
            <div className="flex-c-center-spacebetween">
              <div className="text-light-muted">
                <components.NoOptionsMessage {...props} />
              </div>
              <button
                className="btn btn-default btn-sm"
                onClick={() => setRightMenuOpenForMenu('Filters_Labels')}
              >
                Create Label
              </button>
            </div>
          )
        }}
        options={groupedOptions}
        isMulti
        isSearchable
      />
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const viewKey = getRelevantViewForPage(state);
  const {
    utilities: { active_design }
  } = sm;
  return {
    labels: getLabelsInAlphaOrder(state),
    labelsCategory: getLabelCategoriesArray(state),
    active_font_color: active_design.card_font_color,
    viewKey
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  setEditCardModalOpen
};

const SheetCardLabelsConnected = connect(
  mapState,
  mapDispatch
)(SheetCardLabels);

export default {
  cssModifier: 'label',
  display: 'Label',
  resizableProps: {
    minWidth: '200'
  },
  Component: SheetCardLabelsConnected,
  renderSummary: () => null,
  sort(cards, order) {
    return orderBy(
      cards,
      card => card.relationships.labels.data.length || 0,
      order
    );
  }
};
