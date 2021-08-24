import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import CardDetails from 'Components/lenses/card_lenses/Card/CardDetails';
import IconButton from 'Components/shared/buttons/IconButton';
import RevolvingToggleButton from 'Components/shared/buttons/RevolvingToggleButton';
import WikiList from './WikiList';
import WikiTopicListContent from './WikiTopicListContent';
import { scrollToShow } from 'Src/lib/utilities';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import { getSidePaneArrowTop, getSidePaneArrowLeft } from 'Src/lib/utilities';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
import { PickBoardDropdown } from 'Components/shared/PickBoardButton';

class WikiLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardId: null,
      leftCardListVisible: this.props.leftCardListVisible
    };
    this.viewRef = React.createRef();
  }

  componentDidMount() {
    const { leftCardListVisible } = this.props;
    if (!leftCardListVisible) {
      this.toggleleftCardListVisible();
    }
  }

  componentDidUpdate = prevProps => {
    const {
      props: { cards, topic },
      state: { selectedCardId }
    } = this;
    if (
      cards &&
      cards.length > 0 &&
      (!selectedCardId ||
        (topic ? topic.id : 0) !== (prevProps.topic ? prevProps.topic.id : 0))
    ) {
      let selectedCard = cards.find(card =>
        topic ? card.relationships.topics.data.includes(topic.id) : true
      );
      if (!selectedCard && !this.state.selectedCardId) {
        return;
      }

      this.setState({ selectedCardId: selectedCard ? selectedCard.id : null });
    }
  };

  toggleleftCardListVisible = () => {
    const { setUserUiSettings, topicId } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  handleSelectCard = cardId => {
    this.setState({ selectedCardId: cardId });
  };

  /**
   * On editor scrolling event handler.
   *
   * @param {Event} e
   * @param {Node}  toolbarEl
   * @return  {Void}
   */
  handleEditorScroll = (e, toolbarEl) => {
    if (e.currentTarget.scrollTop >= 191) {
      // 191px is when the first line of text gone from viewport while scrolling
      if (toolbarEl && !toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.add('fixed');
      }
    } else {
      if (toolbarEl && toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.remove('fixed');
      }
    }
  };

  afterCardCreated = cardId => {
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
  };

  togglePickBoard = e => {
    this.setState({
      pickBoardX: e.pageX - 60,
      pickBoardY: e.pageY + 10,
      pickBoardOpen: !this.state.pickBoardOpen
    });
  };

  render() {
    const {
      topic,
      displayLeftMenu,
      displayLeftSubtopicMenuForTopic,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth
    } = this.props;
    const { selectedCardId, leftCardListVisible } = this.state;

    const {
      card_font_color,
      card_background_color,
      card_background_color_display
    } = active_design || {};

    return (
      <div ref={this.viewRef} className="wiki-board relative">
        <div
          className={`wiki-view_tree left-list ${leftCardListVisible &&
            'presented'}`}
        >
          <WikiList
            color={card_font_color}
            onSelectCard={this.handleSelectCard}
            selectedCardId={selectedCardId}
            topic={topic}
            togglePickBoard={this.togglePickBoard}
          />
        </div>
        <div className="wiki-view_small-screen">
          <RevolvingToggleButton
            onClick={this.toggleleftCardListVisible}
            toggleValue={leftCardListVisible}
          />
        </div>
        <IconButton
          containerClasses="left-section-icon-container"
          wrapperClasses="left-section-icon"
          style={{
            top: `${getSidePaneArrowTop(this.viewRef).slice(0, -2) - 21}px`,
            backgroundColor: '#fafafa',
            left: `${getSidePaneArrowLeft(false) +
              (displayLeftSubtopicMenuForTopic.topicId ? 285 : 0) +
              (displayLeftMenu ? 270 : 0) +
              (pinnedLensesBarVisible ? pinnedToolsBarWidth : 5) +
              8.7}px`
          }}
          fontAwesome
          color={card_font_color}
          icon={leftCardListVisible ? 'chevron-left' : 'chevron-right'}
          onClick={this.toggleleftCardListVisible}
          tooltip="Hidden Cards"
          tooltipOptions={{ place: 'right' }}
        />

        {Boolean(selectedCardId) && (
          <div
            className={`wiki-view_content-container ${
              leftCardListVisible ? 'tree-shown' : 'tree-hidden'
            }`}
          >
            <ActiveFiltersPanel additionalContainerClass={'p10 pl30'} />
            <CardDetails
              cardId={selectedCardId}
              onEditorScroll={this.handleEditorScroll}
              rootContainerClass="wiki-board"
              showMinMax
            />
          </div>
        )}
        {!selectedCardId && (
          <div className="wiki-view_content-container">
            <ActiveFiltersPanel />
            <WikiTopicListContent topic={topic} />
          </div>
        )}
        <PickBoardDropdown
          parentTopic={topic}
          open={this.state.pickBoardOpen}
          onClose={() => this.setState({ pickBoardOpen: false })}
          style={{
            position: 'fixed',
            left: this.state.pickBoardX,
            top: this.state.pickBoardY,
            zIndex: 2
          }}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    topics,
    utilities: { active_design },
    menus: { displayLeftMenu, displayLeftSubtopicMenuForTopic },
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;
  const topic = topicId && topics[topicId];

  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    active_design,
    topic,
    topicId,
    currentUser: sm.user,
    isEditing: sm.modals.displayEditCardModal,
    group: Object.values(sm.groups)[0],
    displayLeftMenu,
    displayLeftSubtopicMenuForTopic: displayLeftSubtopicMenuForTopic,
    leftCardListVisible,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(WikiLens);
