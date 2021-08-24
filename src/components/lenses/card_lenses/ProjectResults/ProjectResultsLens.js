import React, { Fragment, useState, useMemo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import cn from 'classnames';

import { stateMappings } from 'Src/newRedux/stateMappings';
import Tooltip from 'Components/shared/Tooltip';
import Dropdown from 'Components/shared/Dropdown';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { getProjectResults } from 'Src/newRedux/results/thunks';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';

import { getWeekHeaders } from '../MyResults/utils';
import ResultsTable from '../MyResults/ResultsTable';
import { valueColor } from '../MyResults/CellRenderer';

const ProjectResultsLens = ({
  data,
  topicId,
  topic,
  selectedTopicIds,
  projectPlanTopicIds,
  getProjectResults,
  setUserUiSettings,
  viewTopic
}) => {
  const [useProjectPlanBoards, setUseProjectPlanBoards] = useState(false);
  const currentRef = useRef({});

  selectedTopicIds = useProjectPlanBoards
    ? projectPlanTopicIds
    : selectedTopicIds;

  currentRef.current.selectedTopicIds = selectedTopicIds;

  const selectedTopics = data.map(({ topic }) => ({
    id: String(topic.id),
    title: topic.title
  }));

  useEffect(() => {
    getProjectResults({
      key: 'projectResults',
      stats: ['completion'],
      topicIds: selectedTopicIds,
      periodUnit: 'week'
    });
  }, [selectedTopicIds]);

  const saveSettings = ids => {
    setUserUiSettings({ project_results_topic_ids: ids }, topicId);
  };

  const handleSelectTopics = list => {
    saveSettings(list.map(opt => opt.id || opt.value));
  };

  const handleRemoveTopic = topicId => () => {
    saveSettings(
      currentRef.current.selectedTopicIds.filter(id => id != topicId)
    );
  };

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
            accessor: 'topic',
            width: 200,
            Cell: ({ value: topic, row }) => {
              const title = get(topic, 'title');
              const weekValues = Object.values(row.original.data);
              const totalPercent = weekValues.reduce(
                (total, percent) => total + percent,
                0
              );
              const overallCompletion = Math.round(
                (totalPercent / (weekValues.length * 100 || 1)) * 100
              );
              return (
                <Fragment>
                  {!useProjectPlanBoards && (
                    <span
                      className="project-results-board__remove-user"
                      onClick={handleRemoveTopic(topic.id)}
                    >
                      &times;
                    </span>
                  )}
                  <div
                    className="team-results-view__user project-results__board-name"
                    onClick={() => viewTopic({ topicId: topic.id })}
                    data-tip={title}
                    data-for={`board-name-tt-${topic.id}`}
                  >
                    {title}
                    <Tooltip id={`board-name-tt-${topic.id}`} />
                  </div>
                  <div
                    className={cn(
                      'project-results__overall-completion',
                      valueColor(overallCompletion, 100)
                    )}
                  >
                    {overallCompletion}%
                  </div>
                </Fragment>
              );
            }
          }
        ]
      },
      ...weekHeaders
    ],
    [weekHeaders, useProjectPlanBoards]
  );

  return (
    <div className="my-results-board project-results-board">
      <ResultsTable columns={columns} data={data} />
      <div className="team-results-view__footer">
        <Dropdown
          onClose={useProjectPlanBoards ? () => {} : undefined}
          trigger={
            <a className={cn(useProjectPlanBoards && 'disabled-link')}>
              +Add Board
            </a>
          }
          closeOnClick={false}
          MenuComponent="div"
          className="project-results-view__add-topic-dropdown"
        >
          <TopicsListDropdown
            actionButtonLabel="Share selected Boards"
            actionButtonHandler={handleSelectTopics}
            actionButtonClass="btn-primary"
            path={topic ? topic.attributes.path.concat({ id: 0 }) : null}
            startAt={topic ? 0 : null}
            hideHeader
            inputMode="list"
            disallowCreate
            multiple
            hideAddTopicLink
            hideTopicSelector={false}
            skipConfirmation
            onInputBlur={() => {}}
            onInputFocus={() => {}}
            domain={window.currentDomain}
            onSelectTopic={() => {}}
            selectedTopics={selectedTopics}
          />
        </Dropdown>
        <label className="project-plan-boards-btn">
          <input
            type="checkbox"
            className="pointer"
            checked={useProjectPlanBoards}
            onChange={e => setUseProjectPlanBoards(e.target.checked)}
          />
          Project Plan Boards
        </label>
      </div>
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page,
    topics,
    results: { projectResults }
  } = sm;
  const topicId = get(props, 'topic.id', page.topicId);
  const topic = get(props, 'topic', topics[topicId]);
  const uiSettings = getUiSettings(state);
  return {
    topicId,
    topic,
    data: projectResults,
    selectedTopicIds: uiSettings.project_results_topic_ids,
    projectPlanTopicIds: uiSettings.project_plan_topic_ids
  };
};

const mapDispatch = {
  getProjectResults,
  setUserUiSettings,
  viewTopic
};

export default connect(mapState, mapDispatch)(ProjectResultsLens);
