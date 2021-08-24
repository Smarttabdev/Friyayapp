import React from 'react';

import { stateMappings } from 'Src/newRedux/stateMappings';
import withDataManager from 'Src/dataManager/components/withDataManager';
import SheetLens from 'Src/components/lenses/card_lenses/Sheet/SheetLens';

const TopicsSheet = ({
  userId,
  groupId,
  label,
  tags,
  className,
  onViewTopic
}) => {
  return (
    <SheetLens
      className={className || 'mt30'}
      forceColor={false}
      additionalClasses="ActionPlan-board"
      cards={[]}
      topicsFilter={{
        tags,
        assignedTo: {
          type: userId ? 'User' : 'Group',
          id: toId(userId || groupId)
        }
      }}
      headerProps={{
        label
      }}
      topicSectionProps={{
        hideRootCards: true,
        newTopicAttributes: {
          tag_list: tags,
          start_date: moment().startOf('day'),
          due_date: moment().endOf('week')
        },
        newTopicRelationships: {
          assignments: {
            data: [
              {
                assigned_type: userId ? 'User' : 'Group',
                assigned_id: toId(userId || groupId)
              }
            ]
          }
        },
        sheetTopicHeaderProps: {
          onViewTopic
        },
        footerProps: {
          showOnlyAddTopic: true,
          hideSummary: true
        }
      }}
    />
  );
};

const dataRequirements = ({ topicId, userId, groupId, tags }) => {
  return {
    topicsWithAttributes: {
      attributes: {
        parentTopicId: topicId,
        tagged: tags,
        assignedId: toId(userId || groupId),
        assignedType: userId ? 'User' : 'Group'
      }
    }
  };
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);

  return {
    topicId
  };
};

export default withDataManager(dataRequirements, mapState)(TopicsSheet);
