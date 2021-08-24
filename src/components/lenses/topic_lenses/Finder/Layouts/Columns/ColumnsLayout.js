import React, { Component } from 'react';
import NestedLevel from './NestedLevel';

class ColumnsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { nestedLevels: [{ type: 'Topic', id: props.topicId }] };
  }

  addNestedLevel = ({ type, id, level, parentTopicId }) => {
    // if level is less than last level, Get all levels upto level, then add another level beside the level
    // Else Add another level beside

    const newLevel = { type, id, level, parentTopicId };

    let nestedLevels = [];

    if (level < this.state.nestedLevels.length - 1) {
      nestedLevels = [
        ...this.state.nestedLevels.filter((obj, i) => i <= level)
      ];

      nestedLevels.push(newLevel);
      this.setState({ nestedLevels });
    } else {
      nestedLevels = [...this.state.nestedLevels, newLevel];
    }

    this.setState({ nestedLevels: [...nestedLevels] });
  };

  render() {
    const { items, handleClickTitle, card_font_color } = this.props;
    const { nestedLevels } = this.state;

    return (
      <div className="columns_layout" style={{ borderColor: card_font_color }}>
        {nestedLevels.map((level, i) => (
          <NestedLevel
            key={i}
            level={i}
            type={level.type}
            id={level.id}
            parentTopicId={level.parentTopicId}
            topicId={level.type == 'Topic' ? this.props.topicId : null}
            addNestedLevel={this.addNestedLevel}
            handleClickTitle={handleClickTitle}
            nestedLevels={nestedLevels}
            card_font_color={card_font_color}
          />
        ))}
      </div>
    );
  }
}

export default ColumnsLayout;
