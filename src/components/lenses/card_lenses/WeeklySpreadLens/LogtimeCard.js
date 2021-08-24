import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { MINUTES_IN_A_DAY } from './constants';
import { updateLogTime } from 'Src/newRedux/database/cards/thunks';
import moment from 'moment';
import GenericDragContainer from 'Components/shared/drag_and_drop/GenericDragContainer';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import Icon from 'Components/shared/Icon';
import { getCardTypeIconAttribute } from 'Src/utils/icons';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: props.startTime.hour() * 60 + props.startTime.minutes(),
      bottom:
        MINUTES_IN_A_DAY - (props.endTime.hour() * 60 + props.endTime.minutes())
    };
  }
  componentDidUpdate(prvProps) {
    if (
      !prvProps.startTime.isSame(this.props.startTime) ||
      !prvProps.endTime.isSame(this.props.endTime)
    ) {
      this.setState({
        top: this.props.startTime.hour() * 60 + this.props.startTime.minutes(),
        bottom:
          MINUTES_IN_A_DAY -
          (this.props.endTime.hour() * 60 + this.props.endTime.minutes())
      });
    }
  }
  onMouseMove = {
    dragTop: event => {
      event.preventDefault();
      const mousePosInContainer = this.containerOffset + event.pageY;
      if (mousePosInContainer <= 0) {
        this.setState({ top: 0 });
      } else if (
        mousePosInContainer >= 0 &&
        MINUTES_IN_A_DAY - mousePosInContainer - this.state.bottom >= 15
      ) {
        this.setState({ top: mousePosInContainer });
      }
    },
    dragBottom: event => {
      event.preventDefault();
      const mousePosInContainer = this.containerOffset + event.pageY;
      const bottom = MINUTES_IN_A_DAY - mousePosInContainer;
      if (bottom <= 0) {
        this.setState({ bottom: 0 });
      } else if (mousePosInContainer - this.state.top >= 15) {
        this.setState({ bottom });
      }
    }
  };

  stopResize = event => {
    event.preventDefault();
    const { top, bottom } = this.state;
    const { startTime, endTime, updateLogTime, card } = this.props;

    document.removeEventListener(
      'mousemove',
      this.onMouseMove[this.curResizer],
      false
    );
    document.body.style.cursor = this.cursorBefore;
    this.containerOffset = undefined;
    this.conatinerBoundingRect = undefined;
    updateLogTime(
      card.cardId,
      card.logtimeId,
      moment(startTime)
        .startOf('day')
        .add(top, 'minutes'),
      moment(endTime)
        .startOf('day')
        .add(MINUTES_IN_A_DAY - bottom, 'minutes')
    );
    document.removeEventListener('mouseup', this.stopResize, false);
  };

  onDragStart = (dsEvent, resizer) => {
    dsEvent.preventDefault();
    this.curResizer = resizer;
    this.conatinerBoundingRect = this.props.containerRef.current.getBoundingClientRect();
    this.cursorBefore = document.body.style.cursor;
    document.body.style.cursor = 'row-resize';
    this.containerOffset =
      this.props.containerRef.current.scrollTop -
      this.conatinerBoundingRect.top;
    document.addEventListener('mousemove', this.onMouseMove[resizer], false);
    document.addEventListener('mouseup', this.stopResize, false);
  };

  dragTop = event => this.onDragStart(event, 'dragTop');
  dragBottom = event => this.onDragStart(event, 'dragBottom');

  handleViewCard = () => {
    const {
      card: { cardId },
      viewCard
    } = this.props;
    viewCard({ cardId });
  };

  renderCardPreview = () => {
    const { cardEl } = this.state;
    const sourceStyle = cardEl && getComputedStyle(cardEl);
    return (
      <div
        className="logtime-card"
        style={pick(sourceStyle, ['width', 'height'])}
      >
        <div className="content">
          <div className="card-body">{this.props.children}</div>
        </div>
      </div>
    );
  };

  render() {
    const { card } = this.props;
    const { top, bottom, cardEl } = this.state;
    const { layer, right, maxLayer } = card;
    const left = `${(layer * 100) / maxLayer}%`;
    const width = right
      ? `${((right - layer) * 100) / maxLayer}%`
      : `${((maxLayer - layer) * 100) / maxLayer}%`;
    const className = !right
      ? `logtime-card ${this.props.cardClassName} rightmost`
      : `logtime-card ${this.props.cardClassName}`;
    return (
      <div
        className={className}
        ref={ref => ref !== cardEl && this.setState({ cardEl: ref })}
        style={{ position: 'absolute', top, bottom, left, width }}
      >
        <div className="content">
          <div className="resizer" onMouseDown={this.dragTop} />
          <GenericDragContainer
            item={{ id: card.cardId, logtimeId: card.logtimeId }}
            itemType={dragItemTypes.CARD}
            onDropElsewhere={() => {}}
            dragPreview={this.renderCardPreview}
            dragClassName="card-body"
          >
            <a
              onClick={this.handleViewCard}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Icon
                icon={
                  getCardTypeIconAttribute(card?.attributes?.card_type).icon ||
                  'featured_play_list'
                }
                style={{ fontSize: '20px', paddingRight: 5 }}
                outlined
                color={
                  getCardTypeIconAttribute(card?.attributes?.card_type)
                    .defaultColor || '#56CCF2'
                }
              />
              {this.props.children}
            </a>
          </GenericDragContainer>
          <div className="resizer" onMouseDown={this.dragBottom} />
        </div>
      </div>
    );
  }
}
Card.propTypes = {};
export default connect(null, {
  viewCard,
  updateLogTime
})(Card);
