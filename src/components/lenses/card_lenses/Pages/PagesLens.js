import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardDetails from 'Components/lenses/card_lenses/Card/CardDetails';
import DMLoader from 'Src/dataManager/components/DMLoader';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import AddCardCard from 'Components/shared/cards/AddCardCard';

class PagesLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTree: true
    };
  }

  /**
   * On editor scrolling event handler.
   *
   * @param {Event} e
   * @param {Node}  toolbarEl
   * @return  {Void}
   */
  handleEditorScroll = (e, toolbarEl) => {
    if (!toolbarEl || !toolbarEl.classList) {
      return;
    }
    const isToolBarHaveFixedClass = toolbarEl.classList.contains('fixed');
    // 191px is when the first line of text gone from viewport while scrolling
    if (
      e.currentTarget.scrollTop >= 191 &&
      toolbarEl &&
      !isToolBarHaveFixedClass
    ) {
      toolbarEl.classList.add('fixed');
    } else if (toolbarEl && isToolBarHaveFixedClass) {
      toolbarEl.classList.remove('fixed');
    }
  };

  render() {
    const { topic, cards, cardRequirements } = this.props;
    const { displayTree } = this.state;

    return (
      <div className="pages-board relative">
        <ActiveFiltersPanel />
        <div className="pages-board-container">
          {cards.map(card => (
            <div
              key={card.id}
              className={`pages-view_content-container c${card.id} ${
                displayTree ? 'tree-shown' : 'tree-hidden'
              }`}
            >
              <CardDetails
                cardId={card.id}
                onEditorScroll={this.handleEditorScroll}
                rootContainerClass="wiki-board"
                editorConfig={{
                  toolbarInline: true
                }}
                showMinMax
                hideUploader
              />
            </div>
          ))}
          <div className="card-details placeholder">
            <AddCardCard containerClassName="add-card" topic={topic} />
          </div>
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: { attributes: cardRequirements }
            }}
            loaderKey="cardsWithAttributes"
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const topicId = sm.page.topicId;

  return {
    topicId,
    topic: sm.topics[topicId],
    group: Object.values(sm.groups)[0]
  };
};

export default connect(mapState)(PagesLens);
