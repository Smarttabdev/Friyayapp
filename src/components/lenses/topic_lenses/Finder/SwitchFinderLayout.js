import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layoutTypes } from './utils';
import IconButton from 'Src/components/shared/buttons/IconButton';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateFinderLens } from 'Src/newRedux/interface/lenses/actions';

class SwitchFinderLayout extends Component {
  handleSwitchLayout = name => {
    this.props.updateFinderLens({ activeLayout: name });
  };

  render() {
    const { activeLayout, card_font_color } = this.props;
    return (
      <div
        className="switch_layout"
        // style={{ color: card_font_color }}
      >
        {layoutTypes.map((layout, i) => (
          <div
            key={i}
            className={`layout_type ${activeLayout == layout.name &&
              'isActive'}`}
          >
            <IconButton
              icon={layout.icon}
              fontSize={19}
              outlined
              onClick={() => this.handleSwitchLayout(layout.name)}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => {
  const {
    tools: {
      finderLens: { activeLayout }
    },
    utilities: {
      active_design: { card_font_color }
    }
  } = stateMappings(state);

  return {
    activeLayout,
    card_font_color
  };
};

const mapDispatch = {
  updateFinderLens
};

export default connect(mapState, mapDispatch)(SwitchFinderLayout);
