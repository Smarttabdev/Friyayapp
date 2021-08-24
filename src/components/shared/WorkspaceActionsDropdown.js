import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Ability from 'Src/lib/ability';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getThisDomain } from 'Src/lib/utilities';
import {
  setEditDomainModalOpen,
  setUserInvitationModalOpen
} from 'Src/newRedux/interface/modals/actions';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getRootTopic } from 'Src/newRedux/database/topics/selectors';
import {
  archiveDomain,
  deleteDomain
} from 'Src/newRedux/database/domains/thunks';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import ToggleSwitch from 'Components/shared/ToggleSwitch';

class WorkspaceActionsDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickArchive = e => {
    e.preventDefault();
    const { currentDomain } = this.props;
    (async () => {
      try {
        await this.props.archiveDomain(currentDomain);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  handleClickDelete = e => {
    e.preventDefault();
    vex.dialog.confirm({
      message: 'Are you sure you want to delete this workspace?',
      callback: async value => {
        if (value) {
          try {
            await this.props.deleteDomain(this.props.currentDomain);
          } catch (err) {
            console.error(err);
          }
        }
      }
    });
  };

  toggleBoardTabs = () => {
    mutations.setConfig({
      owner: toGid('Topic', this.props.topicId),
      config: `${this.props.cardView}.boardTabsClosed`,
      value: !this.props.boardTabsClosed?.value
    });
  };

  render() {
    const {
      domains,
      setEditDomainModalOpen,
      setUserInvitationModalOpen,
      handleRenameWorkspace,
      user
    } = this.props; //eslint-disable-line
    const thisDomain = getThisDomain(domains);
    window.currentDomain = thisDomain;
    const options = {
      settings: {
        text: 'Settings',
        onClick: () => setEditDomainModalOpen(true)
      },
      share: {
        text: 'Share',
        onClick: () => setUserInvitationModalOpen(user.id)
      },
      rename: {
        text: 'Rename',
        onClick: handleRenameWorkspace
      },
      // move: {
      //   text: 'Move',
      //   onClick: () => console.log('Move button clicked')
      // },
      delete: {
        text: 'Delete',
        onClick: e => this.handleClickDelete(e)
      },
      archive: {
        text: 'Archive',
        onClick: e => this.handleClickArchive(e)
      }
      // star: {
      //   text: 'Star',
      //   onClick: () => console.log('Star button clicked')
      // },
      // unfollow: {
      //   text: 'Unfollow',
      //   onClick: () => console.log('Unfollow button clicked')
      // }
    };
    const dropdownOptions = Object.keys(options);

    return (
      <Fragment>
        {Ability.can('update', 'self', window.currentDomain) &&
        window.currentDomain.id !== '0' ? (
          <span>
            <div className="topicOptionsTitle">Workspace options</div>
            <div className="topicOptionsList">
              {dropdownOptions
                .filter(option =>
                  !handleRenameWorkspace
                    ? options[option].text !== 'Rename'
                    : options[option].text
                )
                .map(option => (
                  <span
                    className="topicOptionsItem"
                    key={option}
                    onClick={options[option].onClick}
                  >
                    {options[option].text}
                  </span>
                ))}
              <span className="topicOptionsItem flex-r-center">
                Show Boards in Tabs
                <ToggleSwitch
                  on={!this.props.boardTabsClosed?.value}
                  onClick={this.toggleBoardTabs}
                  className="ml-auto"
                />
              </span>
            </div>
          </span>
        ) : null}
      </Fragment>
    );
  }
}

const mapState = state => {
  console.log(state);
  const sm = stateMappings(state);
  const topicId = getRootTopic(state)?.id;
  const cardView = getRelevantViewForPage(state);
  return {
    topicId,
    cardView,
    domains: getDomains(state),
    currentDomain: getThisDomain(getDomains(state)),
    user: sm.user
  };
};

const mapDispatch = {
  setEditDomainModalOpen,
  archiveDomain,
  deleteDomain,
  setUserInvitationModalOpen
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(WorkspaceActionsDropdown, {
    query: graphql`
      query WorkspaceActionsDropdownQuery(
        $topicId: ID!
        $config: String!
        $hasTopic: Boolean!
      ) {
        boardTabsClosed: config(owner: $topicId, config: $config)
          @include(if: $hasTopic) {
          value
        }
      }
    `,
    vars: ({ topicId, cardView }) => ({
      hasTopic: !!topicId,
      topicId: toGid('Topic', topicId),
      config: `${cardView}.boardTabsClosed`
    })
  })
);
