import React, { PureComponent } from 'react';
import IconButton from 'Components/shared/buttons/IconButton';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import RightFiltersMenu from './right_submenus/RightFiltersMenu';
import Tooltip from 'Components/shared/Tooltip';
import {
  setRightFiltersMenuOpen,
  setRightFiltersMenuOpenExpanded
} from 'Src/newRedux/filters/actions';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

const localStorageTagForExpand = 'expandRightFilterMenu';
const localStorageTagForShow = 'showRightFilterMenu';

class RightFilterMenu extends PureComponent {
  toggleExpand = () => {
    const { setRightFiltersMenuOpenExpanded, isExpanded } = this.props;
    setRightFiltersMenuOpenExpanded(!isExpanded);
    window.localStorage.setItem(localStorageTagForExpand, !isExpanded);
  };

  toggleShow = () => {
    this.props.setRightFiltersMenuOpen(false);
    window.localStorage.setItem(localStorageTagForShow, false);
  };

  render() {
    const { isExpanded } = this.props;
    const id_for_minimize_tooltip = Math.ceil(Math.random() * 100000, 6);
    const id_for_close_tooltip = Math.ceil(Math.random() * 100000, 6);
    const id_for_expand_tooltip = Math.ceil(Math.random() * 100000, 6);

    return (
      <div className="right-filter-menu">
        {isExpanded && (
          <div className="buttons_header">
            <span data-tip="Minimize" data-for={id_for_minimize_tooltip}>
              <IconButton
                icon="angle-right"
                fontAwesome
                onClick={this.toggleExpand}
              />
              <Tooltip {...{ place: 'bottom' }} id={id_for_minimize_tooltip} />
            </span>
            <span data-tip="Close" data-for={id_for_close_tooltip}>
              <ToggleSwitch onClick={this.toggleShow} on />
              <Tooltip {...{ place: 'bottom' }} id={id_for_close_tooltip} />
            </span>
          </div>
        )}
        {isExpanded ? (
          <RightFiltersMenu isDocked />
        ) : (
          <div style={{ margin: '30px 10px' }}>
            <span data-tip="Expand filters" data-for={id_for_expand_tooltip}>
              <IconButton icon="filter_list" onClick={this.toggleExpand} />
              <Tooltip {...{ place: 'bottom' }} id={id_for_expand_tooltip} />
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const {
    filters: { keepOpenExpanded }
  } = stateMappings(state);
  return { isExpanded: keepOpenExpanded };
};

const mapDispatch = {
  setRightFiltersMenuOpen,
  setRightFiltersMenuOpenExpanded
};

export default connect(mapState, mapDispatch)(RightFilterMenu);
