import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import { activities } from 'Src/actions/activity';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';

class ActivityLens extends React.Component {
  componentDidMount() {
    const { pageDetails } = this.props;
    this.props.activities(pageDetails);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      const { pageDetails } = this.props;
      this.props.activities(pageDetails);
    }
  }

  handleNotificationClick = notification => {
    const { viewCard, viewTopic } = this.props;
    const notifiable = notification.relationships.reportable.data;

    switch (notification.attributes.action) {
      case 'someone_comments_on_tip':
      case 'someone_mentioned_on_comment':
      case 'someone_commented_on_tip_user_commented':
      case 'someone_likes_tip':
      case 'someone_updats_tip':
      case 'someone_updates_tip':
      case 'someone_adds_tip':
      case 'someone_archives_tip':
      case 'someone_adds_label_to_tip':
      case 'someone_moves_tip':
      case 'someone_assigned_tip':
      case 'someone_shared_tip_with_me':
      case 'someone_followed_you':
        viewCard({
          cardSlug: `${notifiable.id}-${notifiable.title}`.toLowerCase()
        });
        break;
      case 'someone_shared_topic_with_me':
      case 'someone_adds_topic':
      case 'someone_add_tip_to_topic':
        viewTopic({ topicSlug: get(notifiable, 'slug', null) });
        break;
    }
  };

  actionToText = (action, notifiable) => {
    switch (action) {
      case 'someone_comments_on_tip':
      case 'someone_mentioned_on_comment': {
        const tip = notifiable.data.tip;
        const topic_title = tip && tip.data.topic && tip.data.topic.data.title;

        return (
          <span>
            commented on {tip.data.title}{' '}
            {topic_title ? `for ${topic_title}` : ''}
          </span>
        );
      }
      case 'someone_commented_on_tip_user_commented': {
        const tip = notifiable.data.tip;
        const topic_title = tip && tip.data.topic && tip.data.topic.data.title;

        return (
          <span>
            commented on {tip.data.title} that you have commented on
            {topic_title ? ` for ${topic_title}` : ''}
          </span>
        );
      }
      case 'someone_followed_you': {
        const tip = notifiable.data.tip;
        const topic_title = tip && tip.data.topic && tip.data.topic.data.title;
        if (topic_title) {
          return <span>{topic_title}</span>;
        }
        return 'followed you';
      }
      case 'someone_add_tip_to_topic': {
        const tip = notifiable.data.tip;
        const topic_title = tip && tip.data.topic && tip.data.topic.data.title;
        if (topic_title) {
          return <span>{topic_title}</span>;
        }
        return 'added tip to topic';
      }
      case 'someone_mentions_in_chat': {
        const tip = notifiable.data.tip;
        const topic_title = tip && tip.data.topic && tip.data.topic.data.title;
        if (topic_title) {
          return <span>{topic_title}</span>;
        }
        return 'mentioned you';
      }
      case 'someone_likes_tip':
        return 'liked your Card';
      case 'someone_shared_topic_with_me':
        return 'shared a Board';
      case 'someone_adds_topic':
        return 'added a new Board';
      case 'someone_updats_tip':
      case 'someone_updates_tip':
        return 'updated a Card';
      case 'someone_adds_tip':
        return 'added a Card';
      case 'someone_archives_tip':
        return 'archived a Card';
      case 'someone_adds_label_to_tip':
        return 'added label to Card';
      case 'someone_moves_tip':
        return 'moved the Card';
      case 'someone_assigned_tip':
        return 'assigned a Card';
      case 'someone_deletes_tip':
        return 'deleted a Card';
      case 'someone_added_to_domain':
        return 'added user to workspace';
      case 'someone_joins_domain':
        return 'joined the workspace';
      case 'someone_shared_tip_with_me':
        return 'shared Card with you';
      default:
        return 'does something unsupported';
    }
  };

  getNotifierInfo = notifier => {
    if (notifier && notifier.data) {
      return notifier.data.name;
    } else {
      return 'Someone';
    }
  };

  renderDetailInfo = (action, notifiable) => {
    switch (action) {
      case 'someone_comments_on_tip':
      case 'someone_commented_on_tip_user_commented':
      case 'someone_mentioned_on_comment':
      case 'someone_followed_you':
      case 'someone_add_tip_to_topic':
      case 'someone_mentions_in_chat':
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: notifiable.data.body
            }}
          />
        );
      case 'someone_likes_tip':
        return (
          <div>
            {notifiable.data.title} in {notifiable.data.topic.data.title}
          </div>
        );
      case 'someone_shared_topic_with_me':
      case 'someone_adds_tip':
      case 'someone_adds_topic':
      case 'someone_updats_tip':
      case 'someone_updates_tip':
      case 'someone_archives_tip':
      case 'someone_updats_card':
      case 'someone_adds_label_to_tip':
      case 'someone_moves_tip':
      case 'someone_assigned_tip':
      case 'someone_deletes_tip':
      case 'someone_shared_tip_with_me':
        return notifiable.data ? notifiable.data.title : '';
      default:
        return <div>Something happens, we didn&apos;t track what</div>;
    }
  };

  // check /graphiql for docs
  // **note that this won't refetch on update as there are no changed vars
  renderActivitiesQuery = () =>
    queryRenderer({
      query: graphql`
        query ActivityLensActivitiesQuery {
          activities(first: 15) {
            edges {
              node {
                action
                read
                createdAt
                reportableType
                reportable {
                  ... on Tip {
                    id
                    title
                    slug
                  }
                  ... on Topic {
                    id
                    title
                    slug
                  }
                }
                object {
                  ... on Label {
                    name
                    color
                    kind
                  }
                }
                notifier {
                  id
                  name
                }
              }
            }
          }
        }
      `,
      render: ({ props }) => {
        console.log('activitiesQuery', getNodes(props?.activities));
      }
    });

  renderTipsActivitiesQuery = () =>
    queryRenderer({
      query: graphql`
        query ActivityLensTipActivitiesQuery {
          tips(first: 15) {
            edges {
              node {
                id
                title
                activities {
                  action
                  read
                  createdAt
                  reportable {
                    ... on Tip {
                      id
                      title
                    }
                  }
                  object {
                    ... on Label {
                      name
                      color
                      kind
                    }
                  }
                  notifier {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      `,
      render: ({ props }) => {
        console.log('tipsActivitiesQuery', getNodes(props?.tips));
      }
    });

  render() {
    const { activityList, activeDesign } = this.props;
    let style = {};
    if (activeDesign.card_font_color) {
      style['color'] = activeDesign.card_font_color;
    }
    return (
      <div className="activity-view__container">
        {this.renderActivitiesQuery()}
        {this.renderTipsActivitiesQuery()}
        <ActiveFiltersPanel additionalContainerClass={'ml10'} />
        {/* <div className="activity-view__topbar">
          <div className="activity-view__date">Wednesday, January 3rd</div>
        </div> */}
        <div className="activity-view__main">
          {activityList.activities &&
            activityList.activities.map((item, i) => (
              <div key={i} className="activity-view__item">
                <UserAvatar
                  userId={item.relationships.notifier.data.id}
                  readonly
                  size={30}
                  margin={5}
                ></UserAvatar>
                <div>
                  <div className="activity-view__item__header">
                    <span className="activity-view__item__name" style={style}>
                      {this.getNotifierInfo(item.relationships.notifier)}
                    </span>
                    <span className="activity-view__item__title" style={style}>
                      {this.actionToText(
                        item.attributes.action,
                        item.relationships.reportable
                      )}
                    </span>
                    <span className="activity-view__item__date" style={style}>
                      {moment(item.attributes.time).format(
                        'MM-DD-YYYY hh:mm A'
                      )}
                    </span>
                  </div>
                  <div
                    className="activity-view__item__content"
                    onClick={() => this.handleNotificationClick(item)}
                    style={style}
                  >
                    {this.renderDetailInfo(
                      item.attributes.action,
                      item.relationships.reportable
                    )}
                  </div>
                </div>
                {/* {!!item.count && (
                <div className="activity-view__item__count">{item.count}</div>
              )} */}
              </div>
            ))}
          {activityList.activities && activityList.activities.length == 0 && (
            <div>No Activity Here Yet</div>
          )}
        </div>
      </div>
    );
  }
}

ActivityLens.propTypes = {
  cardRequirements: PropTypes.object,
  cards: PropTypes.array.isRequired,
  subtopics: PropTypes.array,
  topic: PropTypes.object,
  cardView: PropTypes.string,
  cardsHidden: PropTypes.bool,
  cardsSplitScreen: PropTypes.bool,
  activityList: PropTypes.any,
  activeDesign: PropTypes.any
};

const hoc = Component => props => {
  useEffect(() => {
    const disposer = subscriptions.activityCreated({
      // optional params:
      // action: check on /graphiql for list of actions
      // notifierId: listen for activities from specific user
      // tipId: listen for activities on specific tip
      // topicId: listen for activities on specific topic
      onNext: data =>
        console.log('activityCreated', data?.activityCreated?.activity)
    });
    return () => disposer.dispose();
  }, []);
  return <Component {...props} />;
};

const mapState = state => {
  return {
    activityList: state.activity,
    activeDesign: state._newReduxTree.utilities.active_design,
    pageDetails: state._newReduxTree.ui.page
  };
};

const mapDispatch = {
  activities,
  viewCard,
  viewTopic
};

export default connect(mapState, mapDispatch)(hoc(ActivityLens));
