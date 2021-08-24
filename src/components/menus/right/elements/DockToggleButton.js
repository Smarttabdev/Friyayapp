import React, { PureComponent } from 'react';
import { array, bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setDockOpen } from 'Src/newRedux/interface/dock/actions';
import Tooltip from 'Components/shared/Tooltip';

class DockToggleButton extends PureComponent {
  static propTypes = {
    cardsInDock: array,
    displayDock: bool,
    setDockOpen: func.isRequired
  };
  //
  // static contextTypes = {
  //   addTourSteps: PropTypes.func.isRequired
  // };

  tourPoint = null;

  // componentDidMount() {
  //   /*
  //    * Add tour steps
  //    * Check if target is not null !important
  //    */
  //   if (this.tourPoint !== null) {
  //     this.context.addTourSteps({
  //       title: 'Dock station (minimize bar)',
  //       text: 'You can minimize your Cards and quickly access them from the Dock Station',
  //       selector: '#tour-step-12',
  //       position: 'top'
  //     });
  //   }
  // }

  render() {
    const { cardsInDock, displayDock, setDockOpen } = this.props;
    const forId = Math.ceil(Math.random() * 100000, 6);

    return (
      <div
        className="rab-group"
        id="tour-step-12"
        ref={div => (this.tourPoint = div)}
      >
        <a
          className="rab-item pb10 link-tooltip-container dock-station-icon"
          onClick={() => setDockOpen(!displayDock)}
          data-tip={'Minimized Cards'}
          data-for={forId}
        >
          <i className="glyphicon glyphicon-minus icon" />
          {cardsInDock.length > 0 && !displayDock && (
            <i className="badge">&nbsp;</i>
          )}
          <Tooltip {...{ place: 'left' }} id={forId} />
        </a>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  return {
    cardsInDock: sm.dock.cardsInDock.filter(cardId => !!sm.cards[cardId]),
    displayDock: sm.dock.displayDock
  };
};

const mapDispatch = {
  setDockOpen
};

export default connect(mapState, mapDispatch)(DockToggleButton);
