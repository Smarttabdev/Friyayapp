import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchBoards,
  fetchLists,
  fetchCards,
  homeClick,
  collapseTrelloRightPanel,
  updateFilterTerm
} from 'actions/right_bar_actions/trello_right_panel_actions';
import TrelloSyncPanel from './RightTrelloSyncIntegrationsMenu';
import {
  connectTrello,
  disconnect
} from 'Src/actions/right_bar_actions/connect_trello';
import Tooltip from 'Components/shared/Tooltip';

export const BOARD_VIEW = 'BOARDS';
export const LIST_VIEW = 'LISTS';
export const CARD_VIEW = 'CARDS';

class RightTrelloIntegrationMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { displaySyncPanel: false };
    if (!this.props.trello.connected) connectTrello();
  }

  UNSAFE_componentWillMount() {
    if (this.props.trello.connected) {
      const api = this.props.trello.api;
      this.props.fetchBoards(api);
    }
  }

  handleCloseClick(e) {
    e.preventDefault();

    this.props.collapseTrelloRightPanel();
  }

  toggleDisplaySync() {
    this.setState({
      displaySyncPanel: !this.state.displaySyncPanel
    });
  }

  filterItems(items) {
    return items.filter(item => {
      return item.name.match(new RegExp(this.props.trello.filterTerm, 'i'));
    });
  }

  clearFilterTerm() {
    this.setState({ filterTerm: '' });
  }

  renderBoards() {
    const api = this.props.trello.api;
    return (
      <ul className="list-group">
        {this.filterItems(this.props.trello.boards).map(board => {
          return (
            <a
              className="list-group-item list-group-item-action trello-item-border"
              key={board.id}
              onClick={() => {
                this.clearFilterTerm();
                this.props.fetchLists(api, board.id);
              }}
            >
              {board.name}
              <i className="fa icon fa-angle-double-right pull-right" />
            </a>
          );
        })}
      </ul>
    );
  }

  renderLists() {
    const api = this.props.trello.api;
    return (
      <ul className="list-group">
        {this.filterItems(this.props.trello.lists).map(list => {
          return (
            <a
              className="list-group-item list-group-item-action trello-item-border"
              key={list.id}
              onClick={() => {
                this.clearFilterTerm();
                this.props.fetchCards(api, list.id);
              }}
            >
              {list.name}
              <i className="fa icon fa-angle-right pull-right" />
            </a>
          );
        })}
      </ul>
    );
  }

  renderCards() {
    return (
      <ul className="list-group">
        {this.filterItems(this.props.trello.cards).map(card => {
          return (
            <a
              className="list-group-item list-group-item-action trello-item-border"
              key={card.id}
            >
              {card.name}
            </a>
          );
        })}
      </ul>
    );
  }

  renderItems() {
    switch (this.props.trello.view) {
      case BOARD_VIEW:
        return this.renderBoards();
      case LIST_VIEW:
        return this.renderLists();
      case CARD_VIEW:
        return this.renderCards();
    }
  }

  render() {
    const headerClass = classNames('right-submenu_header', 'space-between');
    const syncToggleClass = classNames('fa fa-exchange icon trello-options', {
      active: this.state.displaySyncPanel
    });
    const tooltipOptions = { place: 'bottom' };
    const connectIcon = classNames('fa', 'icon', 'trello-options', {
      'fa-toggle-on': this.props.trello.connected,
      'fa-toggle-off': !this.props.trello.connected,
      green: this.props.trello.connected
    });
    const syncId = Math.ceil(Math.random() * 100000, 6);
    const connectId = Math.ceil(Math.random() * 100000, 6);

    return (
      <div className="right-submenu">
        <div className={headerClass}>
          <div>
            <i className="fa fa-trello icon connected" />
            <span className="trello-label">Trello</span>
          </div>
          <div>
            <span>
              <a
                onClick={this.toggleDisplaySync.bind(this)}
                data-for={syncId}
                data-tip="Sync with Trello"
              >
                <i className={syncToggleClass} />
                <Tooltip {...tooltipOptions} id={syncId} />
              </a>
            </span>
            <span>
              <a
                onClick={this.props.disconnect}
                data-for={connectId}
                data-tip="Disconnect"
              >
                <i className={connectIcon} />
                <Tooltip {...tooltipOptions} id={connectId} />
              </a>
            </span>
          </div>
        </div>

        <div className="trello-sync-container">
          {this.state.displaySyncPanel && <TrelloSyncPanel />}
          <input
            type="text"
            className="form-control trello-input"
            placeholder="Search"
            value={this.props.trello.filterTerm}
            onChange={e => this.props.updateFilterTerm(e.target.value)}
          />
        </div>

        <div className="file-list-breadcrumb text-muted trello-header">
          <a
            onClick={() => {
              this.clearFilterTerm();
              this.props.homeClick();
            }}
          >
            <i className="glyphicon glyphicon-home" />
          </a>
          <span className="trello-breadcrumb">{this.props.trello.view}</span>
          {this.props.trello.loadingView && (
            <i className="fa fa-circle-o-notch fa-spin"></i>
          )}
        </div>
        <div className="rab-content-body trello-items-listing">
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ trello }) {
  return { trello };
}

export default connect(mapStateToProps, {
  collapseTrelloRightPanel,
  fetchLists,
  fetchCards,
  fetchBoards,
  homeClick,
  updateFilterTerm,
  disconnect
})(RightTrelloIntegrationMenu);
