import React, { useMemo, useRef, useEffect } from 'react';
import { get, difference } from 'lodash';

import { stateMappings } from 'Src/newRedux/stateMappings';
import withDataManager from 'Src/dataManager/components/withDataManager';
import Dropdown from 'Components/shared/Dropdown';
import Avatar from 'Components/shared/Avatar';
import Tooltip from 'Components/shared/Tooltip';
import PersonMenuRow from 'Components/menus/right/right_submenus/elements/PersonMenuRow';
import { getWeekHeaders } from '../MyResults/utils';
import ResultsTable from '../MyResults/ResultsTable';
import { makeColor, getAvatarUrl } from 'Lib/utilities';
import { getResults } from 'Src/newRedux/results/thunks';
import Scorecard from 'Components/pages/score_card';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

const TeamResultsLens = ({
  data,
  people,
  getResults,
  activePeopleOrderQuery,
  topicId,
  lenseId,
  lenseKey
}) => {
  const currentRef = useRef();

  const peopleOrderPeopleIds = useMemo(() => {
    const order = activePeopleOrderQuery?.activePeopleOrder?.order || [];
    return order.filter(userId => !!people[userId]);
  }, [activePeopleOrderQuery, people]);

  // use ref for old handlers
  currentRef.current = {
    peopleOrderPeopleIds
  };

  useEffect(() => {
    getResults({
      key: 'teamResults',
      stats: ['completion'],
      assignedIds: peopleOrderPeopleIds,
      periodUnit: 'week'
    });
  }, [peopleOrderPeopleIds]);

  const updatePeopleOrder = order => {
    mutations.createOrUpdateCustomOrder({
      customOrder: activePeopleOrderQuery?.activePeopleOrder,
      orderTitle: 'People',
      orderType: 'people',
      topicId,
      lenseId,
      lenseKey,
      order
    });
  };

  const handlePersonClick = personId => () => {
    if (!peopleOrderPeopleIds.includes(personId)) {
      const peopleIds = peopleOrderPeopleIds.concat(personId);
      updatePeopleOrder(peopleIds);
    }
  };

  const handleRemoveUser = userId => () => {
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

  const weekHeaders = useMemo(() => {
    return getWeekHeaders(moment().startOf('year'), moment().endOf('year'));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Weeks',
        columns: [
          {
            Header: '',
            accessor: 'user',
            width: 62,
            Cell: ({ value: user }) => {
              const name = `${get(user, 'attributes.first_name')} ${get(
                user,
                'attributes.last_name'
              )}`;
              const ttId = `${user.id}-name-tooltip`;
              return (
                <div
                  className="team-results-view__user"
                  data-tip={name}
                  data-for={ttId}
                >
                  <span
                    className="team-results-view__remove-user"
                    onClick={handleRemoveUser(user.id)}
                  >
                    &times;
                  </span>
                  <Avatar
                    url={getAvatarUrl(user)}
                    initial={(name[0] || '').toUpperCase()}
                    borderColor={makeColor(user.id)}
                  />
                  <Tooltip id={ttId} />
                </div>
              );
            }
          }
        ]
      },
      ...weekHeaders
    ],
    [weekHeaders]
  );

  return (
    <div className="my-results-board team-results-board">
      <ResultsTable columns={columns} data={data} />
      <div className="team-results-view__footer">
        <Dropdown
          trigger={<a>+Add team member</a>}
          MenuComponent="div"
          className="team-results-view__add-user-dropdown"
        >
          {peopleChoices.map(person => (
            <PersonMenuRow
              key={person.id}
              onClick={handlePersonClick(person.id)}
              person={person}
            />
          ))}
        </Dropdown>
        <a style={{ marginLeft: '20px' }}>
          <Scorecard enableCustomComponent />
        </a>
      </div>
    </div>
  );
};

const dataRequirements = () => {
  return {
    people: {}
  };
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    people,
    page: { topicId },
    results: { teamResults }
  } = sm;
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  return {
    topicId,
    lenseId,
    lenseKey,
    data: teamResults,
    people
  };
};

const mapDispatch = {
  getResults
};

const FragmentContainer = createFragmentContainer(TeamResultsLens, {
  activePeopleOrderQuery: graphql`
    fragment TeamResultsLens_activePeopleOrderQuery on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
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
    }
  `
});

export default withDataManager(
  dataRequirements,
  mapState,
  mapDispatch
)(
  QueryRenderer(
    props => <FragmentContainer {...props} activePeopleOrderQuery={props} />,
    {
      query: graphql`
        query TeamResultsLensQuery(
          $topicId: ID!
          $lenseId: ID
          $lenseKey: String
        ) {
          ...TeamResultsLens_activePeopleOrderQuery
            @arguments(
              topicId: $topicId
              lenseId: $lenseId
              lenseKey: $lenseKey
            )
        }
      `,
      vars: ({ topicId, lenseId, lenseKey }) => ({
        topicId: toGid('Topic', topicId || 0),
        lenseId: toGid('Lens', lenseId),
        lenseKey
      })
    }
  )
);
