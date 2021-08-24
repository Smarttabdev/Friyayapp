import React, { useMemo, useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { getResults } from 'Src/newRedux/results/thunks';
import { difference } from 'lodash';
import Dropdown from 'Components/shared/Dropdown';
import PersonMenuRow from 'Components/menus/right/right_submenus/elements/PersonMenuRow';
import ContributorsUserBox from './ContributorsUserBox';
import { defaultScore } from 'src/components/pages/score_card/ScorecardWrapper';
import APIRequest from 'Lib/ApiRequest';
import { updateTimeframe } from 'Src/newRedux/interface/lenses/actions';

const ContributorsLens = props => {
  const {
    getResults,
    data,
    people,
    activePeopleOrderQuery,
    topicId,
    lenseId,
    lenseKey,
    startDate,
    endDate,
    columnMode,
    updateTimeframe,
    cardFontColor
  } = props;
  const currentRef = useRef();
  const [usersScore, setUsersScore] = useState({});
  const formattedStartDate = moment(startDate).format('YYYY-WW');
  const formattedEndDate = moment(endDate).format('YYYY-WW');
  const peopleOrderPeopleIds = useMemo(() => {
    const order = activePeopleOrderQuery?.activePeopleOrder?.order || [];
    return order.filter(userId => !!people[userId]);
  }, [activePeopleOrderQuery, people]);

  useEffect(() => {
    updateTimeframe({ columnMode: 'allCards', tool: lenseKey });
  }, []);

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

  useEffect(() => {
    if (data?.length > 0) {
      Promise.all(data.map(userData => getSelectedUserScore(userData.user.id)))
        .then(res => {
          const result = sortScore(res);
          setUsersScore(result);
        })
        .catch(err => {
          console.log(err);
          APIRequest.showErrorMessage('Unable to load score');
        });
    }
  }, [data, formattedStartDate, formattedEndDate]);

  const sortScore = result => {
    const res = result.sort((a, b) => b.completedCards - a.completedCards);
    return res;
  };

  const getSelectedUserScore = async userId => {
    let result = {};
    const resource = `score_card/${userId}?include_archived=true`;

    const response = await APIRequest.get({ resource });
    let filteredResponse = handleDateFilters(response);
    filteredResponse =
      Object.entries(filteredResponse).length > 0 ? filteredResponse : response;
    const total = handleTotal(filteredResponse);
    result = {
      userId,
      score: filteredResponse,
      completedCards: total.completed || 0,
      bonusPoints: total.cactii || 0
    };

    return result;
  };

  const handleTotal = response => {
    if (response && Object.values(response).length) {
      const total = Object.values(response).reduce((acc, score) => {
        return {
          completed: acc.completed + (Number(score.completed) || 0),
          cactii: acc.cactii + (Number(score.cactii) || 0)
        };
      }, defaultScore);
      return total;
    }
    return {};
  };

  const handleDateFilters = data => {
    const customData = Object.keys(data);
    const startIndex =
      columnMode !== 'allCards'
        ? customData.indexOf(formattedStartDate) || 0
        : 0;
    const endIndex =
      columnMode !== 'allCards'
        ? customData.indexOf(formattedEndDate) || customData.length - 1
        : customData.length - 1;

    const sliced = customData
      .slice(startIndex, endIndex)
      .reduce((result, key) => {
        result[key] = data[key];
        return result;
      }, {});
    return sliced;
  };

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
    <div className="contributors-lens">
      <div className="contributors-lens__grid">
        {usersScore?.length && peopleOrderPeopleIds?.length
          ? usersScore.map((x, i) => (
              <ContributorsUserBox
                key={i}
                position={i + 1}
                removeUser={handleRemoveUser}
                user={people[x.userId]}
                data={x}
                fontColor={cardFontColor}
              />
            ))
          : null}
      </div>
      <Dropdown
        trigger={<a style={{ color }}>+Add people</a>}
        MenuComponent="div"
        className="team-results-view__add-user-dropdown mt30"
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
    results: { teamResults },
    tools: { timeframe },
    utilities: { active_design }
  } = sm;
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  const { startDate, endDate, columnMode } = timeframe[lenseKey] || timeframe;

  return {
    startDate,
    endDate,
    columnMode,
    topicId,
    lenseId,
    lenseKey,
    data: teamResults,
    people,
    cardFontColor: active_design?.card_font_color
  };
};

const mapDispatch = {
  getResults,
  updateTimeframe
};

const FragmentContainer = createFragmentContainer(ContributorsLens, {
  activePeopleOrderQuery: graphql`
    fragment ContributorsLens_activePeopleOrderQuery on Query
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

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(
    props => <FragmentContainer {...props} activePeopleOrderQuery={props} />,
    {
      query: graphql`
        query ContributorsLensQuery(
          $topicId: ID!
          $lenseId: ID
          $lenseKey: String
        ) {
          ...ContributorsLens_activePeopleOrderQuery
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
