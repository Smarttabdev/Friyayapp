import React, { PureComponent } from 'react';
import { UserAvatar } from 'Src/components/shared/users/elements/UserAvatar';
import ActivityIndicator from 'Components/shared/cards/elements/assemblies/ActivityIndicator';
import { get } from 'lodash';
import Icon from 'Components/shared/Icon';
import { getCardTypeIconAttribute } from 'Src/utils/icons';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import CardLabels from 'Src/components/shared/cards/elements/assemblies/CardLabels';
import translateActivity from './translateActivity';

class InboxLensActivity extends PureComponent {
  render() {
    const { card } = this.props;
    const activity = card.activities[0];
    return (
      <div className="inbox_lens_update_item">
        <div className="first_half">
          <ActivityIndicator updatedAt={activity?.createdAt} renderSpace />
          <div className="card_type_container">
            <Icon
              fontSize={19}
              icon={getCardTypeIconAttribute(card.cardType).icon}
              outlined
              color={getCardTypeIconAttribute(card.cardType).defaultColor}
            />
          </div>
          <div className="user_name">
            <UserAvatar
              user={activity?.notifier || card?.user}
              readonly
              size={30}
              margin={5}
              showName
              noTooltip
              firstName
            />
          </div>

          <div className="card_title_name">
            <CardTitleLink card={card} maxLines={1} showIndicator={false} />
          </div>

          {card.labels.length > 0 && (
            <div className="card_labels_section">
              <CardLabels card={card} expandDirection="right" disableRemove />
            </div>
          )}

          {activity && translateActivity(activity.action) && (
            <div className="card_activity_info">
              {translateActivity(activity.action)}{' '}
              {activity.action == 'someone_assigned_tip' &&
                // activity.user.firstName}
                activity.user.firstName}
              {activity.action == 'someone_comments_on_tip' && (
                <div>
                  <Icon icon="chat_bubble" outlined />
                </div>
              )}
            </div>
          )}
        </div>
        <div className="second_half">
          <div className="activity_time">
            {card?.updatedAt && new Date(card.updatedAt).toDateString()}
          </div>
        </div>
      </div>
    );
  }
}

export default InboxLensActivity;
