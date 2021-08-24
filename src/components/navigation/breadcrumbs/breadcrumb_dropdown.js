import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  instanceOfGetSortedTopicsForTopic,
  getRootTopic
} from 'Src/newRedux/database/topics/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import DMLoader from 'Src/dataManager/components/DMLoader';
import urlHelper, { NO_GROUP_REGEX } from 'Src/helpers/url_helper';
import LeftMenuNewTopicInput from 'Src/components/menus/left/elements/LeftMenuNewTopicInput';
import { getGroups } from 'Src/newRedux/database/groups/selectors';
import { isSharedWithTeam } from 'Lib/utilities';
import Icon from 'Src/components/shared/Icon';
import { toggleLeftMenu } from 'Src/newRedux/interface/menus/thunks';

class BreadcrumbDropdown extends Component {
  state = {
    topics: [],
    isLoadingTopics: true,
    isSubtopicFormOpen: false,
    topicTitle: '',
    isDropdownOpen: false,
    isSaving: false
  };

  handleDocClick = ev => {
    if (this.dropdownRef && !this.dropdownRef.contains(ev.target)) {
      this.hideDropdown();
    }
  };

  handleToggleNewTopicInput = e => {
    this.setState(state => ({ displayAddTopic: !state.displayAddTopic }));
    !!e && e.stopPropagation();
    !!e && e.nativeEvent.stopImmediatePropagation();
  };

  handleNewTopicCreated = () => {
    this.setState(state => ({
      displayAddTopic: !state.displayAddTopic
    }));
    this.hideDropdown();
  };

  showDropdown = () => {
    this.setState(
      {
        isDropdownOpen: !this.state.isDropdownOpen
      },
      () => {
        document.addEventListener('click', this.handleDocClick, false);
      }
    );
  };

  hideDropdown = () => {
    this.setState(
      {
        isDropdownOpen: false
      },
      () => {
        document.removeEventListener('click', this.handleDocClick, false);
      }
    );
  };

  saveDropdownRef = ref => {
    this.dropdownRef = ref;
  };

  render() {
    const {
      pageTopicId,
      parentTopicId,
      pathname,
      topics,
      teams,
      topicId,
      type,
      action,
      rootUrl,
      selectView,
      isRoot,
      displayLeftMenu
    } = this.props;

    const { displayAddTopic, isDropdownOpen } = this.state;
    let dropdownAction, items;
    if (type === 'board') {
      dropdownAction = this.handleToggleNewTopicInput;
      items = topics;
    } else if (type === 'team') {
      dropdownAction = action;
      items = teams;
    }

    //show caret if dropdown open
    let opacity = isDropdownOpen && (opacity = 100);

    return (
      <span
        className={classNames(isDropdownOpen && 'open')}
        ref={this.saveDropdownRef}
        style={{ marginRight: '4px' }}
      >
        <a id={'dd-topic-' + parentTopicId} onClick={this.showDropdown}>
          {selectView && <a className="mr5">Select Boards</a>}
          <span className="caret" style={{ opacity }} />
        </a>

        {isDropdownOpen && (
          <ul
            className="dropdown-menu assigned-user-list"
            aria-labelledby={'dd-topic-' + parentTopicId}
            style={type == 'team' ? { left: '-100%' } : {}}
          >
            {type === 'team' ? (
              <React.Fragment>
                <li className="top-header">
                  <Link
                    className="dropdown-label"
                    onClick={() => this.setState({ isDropdownOpen: false })}
                    to={pathname.replace(NO_GROUP_REGEX, '')}
                  >
                    <strong>Everyone</strong>
                    <span>Show everything</span>
                  </Link>
                </li>
                <li className="active dropdown-label">
                  <strong>Teams</strong>
                  <span>Select team to filter</span>
                </li>
              </React.Fragment>
            ) : null}

            {items.map((item, index) => (
              <li key={index}>
                <Link
                  onClick={() => this.setState({ isDropdownOpen: false })}
                  to={urlHelper(pathname, item.attributes.slug, type, rootUrl)}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      icon={type == 'team' ? 'person' : 'hashtag'}
                      color="#9B51E0"
                      size={type === 'team' ? 'small' : null}
                      outlined
                      containerStyle={
                        type == 'team' ? { marginRight: '3px' } : {}
                      }
                    />
                    {item.attributes.title}
                  </div>
                </Link>
              </li>
            ))}
            {isDropdownOpen && !parentTopicId && (
              <DMLoader
                dataRequirements={{
                  topics: {}
                }}
                loaderKey="topics"
              />
            )}
            {isDropdownOpen && parentTopicId && (
              <DMLoader
                dataRequirements={{
                  subtopicsForTopic: { topicId: parentTopicId },
                  topic: { topicId: topicId }
                }}
                loaderKey="subtopicsForTopic"
              />
            )}

            {displayAddTopic ? (
              <li>
                <LeftMenuNewTopicInput
                  parentTopicId={parentTopicId}
                  onDismiss={this.handleNewTopicCreated}
                  boardType={parentTopicId == pageTopicId ? undefined : null}
                />
              </li>
            ) : (
              <li>
                <a
                  className="dropdown-action"
                  id={'dd-topic-' + parentTopicId}
                  onClick={dropdownAction}
                >
                  + Add {type}
                </a>
              </li>
            )}
            {isRoot && (
              <li>
                <a
                  onClick={() => this.props.toggleLeftMenu(!displayLeftMenu)}
                  className="dropdown-action"
                  style={{ fontWeight: 'bold' }}
                >
                  {!displayLeftMenu ? 'Keep Menu Open' : 'Close Menu'}
                </a>
              </li>
            )}
          </ul>
        )}
        {/* {isSubtopicFormOpen && <SubtopicFormPage parentTopic={topic} />} */}
      </span>
    );
  }
}
//
// BreadcrumbDropdown.propTypes = {
//   path: PropTypes.object,
//   topic: PropTypes.object,
//   index: PropTypes.number,
//   save: PropTypes.func.isRequired,
//   groupId: PropTypes.string,
//   saveSub: PropTypes.func.isRequired,
//   router: PropTypes.object.isRequired,
//   parentId: PropTypes.number,
//   userId: PropTypes.string.isRequired
// };
//
// BreadcrumbDropdown.defaultProps = {
//   groupId: null,
//   parentId: null,
//   topic: null,
//   index: 0
// };

// const mapState = ({ appUser: { id } }) => ({ userId: id });

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const { groupId } = sm.page;

  const rootTopic = getRootTopic(state);

  const topicSelector = instanceOfGetSortedTopicsForTopic();
  let topics = topicSelector(state, props.parentTopicId || rootTopic.id);

  topics = groupId
    ? topics.filter(topic => isSharedWithTeam(topic, groupId))
    : topics;
  const {
    location: { pathname }
  } = sm.routing.routerHistory;
  return {
    pageTopicId: sm.page.topicId,
    page: sm.page.page,
    rootUrl: sm.page.rootUrl,
    topics,
    teams: getGroups(state),
    pathname,
    displayLeftMenu: sm.menus.displayLeftMenu
  };
};

const mapDispatch = {
  toggleLeftMenu
};

export default connect(mapState, mapDispatch)(BreadcrumbDropdown);
