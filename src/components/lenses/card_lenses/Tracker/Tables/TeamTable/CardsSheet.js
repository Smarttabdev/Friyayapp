import React from 'react';
import { connect } from 'react-redux';
import { intersection } from 'lodash';

import { stateMappings } from 'Src/newRedux/stateMappings';
import SheetLens from 'Src/components/lenses/card_lenses/Sheet/SheetLens';

const CardsSheet = ({
  topicId,
  userId,
  groupId,
  cards,
  label,
  topicTags,
  topic
}) => {
  return (
    <SheetLens
      className="mt30"
      forceColor={false}
      additionalClasses="ActionPlan-board"
      cards={cards}
      newCardRelationships={{
        tip_assignments: {
          data: [
            {
              assignment_type: userId ? 'User' : 'Group',
              assignment_id: toId(userId || groupId)
            }
          ]
        }
      }}
      headerProps={{
        label
      }}
      topicSectionProps={{
        hideTopicSection: true,
        useSelectedTopics: true,
        mustSelectTopics: true,
        footerProps: {
          showOnlyAddCard: true,
          addRowProps: {
            showTopicsSelector: true,
            topicsListDropdownProps: {
              topicsSelectMenuProps: {
                showAddBoard: false,
                hasInput: true,
                path: [
                  { id: topicId, title: get(topic, 'attributes.title') },
                  { id: 0 }
                ],
                startAt: 0,
                topicsParams: {
                  tagged: topicTags,
                  filter: {
                    assigned_to: toId(userId || groupId),
                    assigned_to_type: userId ? 'User' : 'Group'
                  }
                },
                topicsFilter: topic => {
                  const hasTags =
                    !topicTags ||
                    intersection(
                      get(topic, 'attributes.tag_list', []),
                      topicTags
                    ).length == topicTags.length;

                  const isAssigned = get(
                    topic,
                    'relationships.assignments.data',
                    []
                  ).find(a => {
                    return (
                      a.assigned_type == (userId ? 'User' : 'Group') &&
                      a.assigned_id == toId(userId || groupId)
                    );
                  });

                  return hasTags && isAssigned;
                },
                topicsSelectorProps: {
                  headerProps: {
                    rootId: topicId
                  }
                }
              }
            }
          }
        }
      }}
    />
  );
};

const mapState = (state, props) => {
  const { topics } = stateMappings(state);

  const topic = topics[props.topicId];

  return {
    topic
  };
};

export default connect(mapState)(CardsSheet);
