import React, { Component } from 'react';
import IconDropdownMenu from 'Components/shared/IconDropdownMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';

class FileDropdownMenu extends Component {
  static propTypes = {
    cardFontColor: PropTypes.string
  };

  toggleFirst = () => {};

  render() {
    const { cardFontColor, topicHeader } = this.props;
    const itemList = [];
    const toggleList = [
      {
        title: 'Keep open on Board',
        toggleState: false,
        toggleHandler: this.toggleFirst
      }
    ];
    return (
      <IconDropdownMenu
        title="Files"
        icon="description"
        color="#F2994A"
        outlined
        cardFontColor={cardFontColor}
        itemList={itemList}
        toggleList={toggleList}
        additionalClasses={'medium-icon'}
        topicHeader={topicHeader}
      />
    );
  }
}
const mapState = state => {
  const {
    utilities: { active_design }
  } = stateMappings(state);

  return {
    cardFontColor: active_design.card_font_color
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(FileDropdownMenu);
