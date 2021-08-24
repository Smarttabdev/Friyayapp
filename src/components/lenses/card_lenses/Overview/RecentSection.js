import React, { Component } from 'react';
import Icon from 'Components/shared/Icon';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import TopicTitleLink from 'Src/components/shared/topics/elements/TopicTitleLink';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

class RecentSection extends Component {
  state = {};

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  getClickHandler = topic => {
    const { timeoutID } = this.state;
    const { viewTopic } = this.props;
    const delay = 250;
    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          viewTopic({ topicSlug: topic.attributes.slug });
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
    }
  };

  render() {
    const { recentCards, recentBoards, card_font_color } = this.props;
    return (
      <div className="recent_section">
        <div className="header">Recent Cards</div>
        {recentCards.map((card, i) => (
          <div key={i} className="list_item">
            <Icon
              icon="featured_play_list"
              color={card_font_color || '#56CCF2'}
              outlined
              fontSize="20px"
            />
            <CardTitleLink card={card} color={card_font_color || null} />
          </div>
        ))}
        <div className="header" style={{ marginTop: '30px' }}>
          Recent Boards
        </div>
        {recentBoards.map((board, i) => (
          <div key={i} className="list_item">
            <Icon icon="hashtag" color={card_font_color || '#9B51E0'} />
            <TopicTitleLink
              topic={board}
              onClick={() => this.getClickHandler(board)}
              color={card_font_color || null}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    page: { topicId },
    utilities: {
      active_design: { card_font_color }
    }
  } = stateMappings(state);
  const { cards } = props;

  const boards =
    getSortedFilteredTopicsByParentTopic(state)[topicId || '0'] || [];
  boards.sort(
    (a, b) =>
      new Date(b.attributes.created_at) - new Date(a.attributes.created_at)
  );

  const recentCards = cards.slice(0, 8);
  const recentBoards = boards.slice(0, 8);

  return {
    recentCards,
    recentBoards,
    card_font_color
  };
};

const mapDispatch = {
  viewTopic
};

export default connect(mapState, mapDispatch)(RecentSection);
