import React, { useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Dropdown from 'Components/shared/Dropdown';
import PersonMenuRow from 'Components/menus/right/right_submenus/elements/PersonMenuRow';
import { difference } from 'lodash';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { getCustomLensId } from 'Src/helpers/user_config';
import TeamMemberBox from './TeamMemberProjectBox';

const TeamProjectsLens = props => {
  const {
    people,
    topicId,
    lenseId,
    lenseKey,
    cardFontColor,
    subtopics,
    query
  } = props;
  const { activePeopleOrder, collapsedIdsConfig } = query || {};
  const currentRef = useRef();

  const peopleOrderPeopleIds = useMemo(() => {
    const order = activePeopleOrder?.order || [];
    return order.filter(userId => !!people[userId]);
  }, [query?.activePeopleOrder, people]);

  currentRef.current = {
    peopleOrderPeopleIds
  };

  const updatePeopleOrder = order => {
    mutations.createOrUpdateCustomOrder({
      customOrder: activePeopleOrder,
      orderTitle: 'People',
      orderType: 'people',
      topicId,
      lenseId,
      lenseKey,
      order
    });
  };

  const updateExpanded = (id, isExpanded) => {
    let collapsedIds = collapsedIdsConfig?.value || [];
    collapsedIds = collapsedIds.filter(x => x != id);

    !isExpanded && collapsedIds.push(id);

    mutations.setConfig({
      owner: toGid('Topic', topicId || 0),
      config: 'TEAM_PROJECTS.collapsed_ids',
      value: collapsedIds
    });
  };

  const handlePersonClick = personId => () => {
    if (!peopleOrderPeopleIds.includes(personId)) {
      const peopleIds = peopleOrderPeopleIds.concat(personId);
      updatePeopleOrder(peopleIds);
    }
  };

  const handleRemoveUser = userId => {
    const peopleIds = difference(currentRef.current.peopleOrderPeopleIds, [
      userId
    ]);
    updatePeopleOrder(peopleIds);
  };

  const peopleChoices = useMemo(
    () =>
      Object.values(people).filter(
        person => !peopleOrderPeopleIds.includes(person.id)
      ),
    [people, peopleOrderPeopleIds]
  );

  const color = '#808080';

  return (
    <div className="team-projects-lens">
      {peopleOrderPeopleIds?.length
        ? peopleOrderPeopleIds.map(x => (
            <TeamMemberBox
              key={x}
              removeUser={handleRemoveUser}
              user={people[x]}
              fontColor={cardFontColor}
              people={people}
              boards={subtopics}
              isExpanded={!collapsedIdsConfig?.value?.includes(people[x].id)}
              updateExpanded={isExpanded =>
                updateExpanded(people[x].id, isExpanded)
              }
            />
          ))
        : null}
      <Dropdown
        trigger={<a style={{ color }}>Select a team member</a>}
        MenuComponent="div"
      >
        {peopleChoices.length > 0 ? (
          peopleChoices.map(person => (
            <PersonMenuRow
              key={person.id}
              onClick={handlePersonClick(person.id)}
              person={person}
            />
          ))
        ) : (
          <span style={{ color }}>All added</span>
        )}
      </Dropdown>
    </div>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    people,
    page: { topicId },
    utilities: { active_design }
  } = sm;
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);

  return {
    topicId,
    lenseId,
    lenseKey,
    people,
    cardFontColor: active_design?.card_font_color
  };
};

const FragmentContainer = createFragmentContainer(TeamProjectsLens, {
  query: graphql`
    fragment TeamProjectsLens_query on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
        ownerId: { type: "ID!" }
      ) {
      activePeopleOrder: activeCustomOrder(
        orderType: people
        topicId: $topicId
        lenseId: $lenseId
        lenseKey: $lenseKey
      ) {
        id
        name
        order
      }
      collapsedIdsConfig: config(
        owner: $ownerId
        config: "TEAM_PROJECTS.collapsed_ids"
      ) {
        value
      }
    }
  `
});

export default connect(mapState)(
  QueryRenderer(props => <FragmentContainer {...props} query={props} />, {
    query: graphql`
      query TeamProjectsLensQuery(
        $topicId: ID!
        $lenseId: ID
        $lenseKey: String
        $ownerId: ID!
      ) {
        ...TeamProjectsLens_query
          @arguments(
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
            ownerId: $ownerId
          )
      }
    `,
    vars: ({ topicId, lenseId, lenseKey }) => ({
      topicId: toGid('Topic', topicId || 0),
      lenseId: toGid('Lens', lenseId),
      lenseKey,
      ownerId: toGid('Topic', topicId || 0)
    })
  })
);
