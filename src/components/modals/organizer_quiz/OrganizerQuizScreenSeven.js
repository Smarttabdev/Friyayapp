import React, { useState, useEffect } from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'My Weekly Tasks',
    background: '#F2C94C',
    type: 'MY_PLAN'
  },
  {
    label: 'Weekly plan for my team',
    background: '#6FCF97',
    type: 'TEAM_PLAN'
  },
  {
    label: 'Track progress of my team',
    background: '#F2994A',
    type: 'TEAM_RESULTS'
  },
  {
    label: 'Track progress across projects',
    background: '#F2994A',
    type: 'PROJECT_RESULTS'
  },
  {
    label: 'Manage many projects',
    background: '#56CCF2',
    type: 'PROJECT'
  },
  {
    label: 'A lot of notes',
    background: '#9B51E0',
    type: 'GRID'
  },
  {
    label: 'Several Knowledge bases',
    background: '#9B51E0',
    type: 'KNOWLEDGE_BASE'
  },
  {
    label: 'Connect goals to projects and tasks',
    background: '#DB95E7',
    type: 'TASK'
  },
  {
    label: 'Set goals and breakdown projects and tasks',
    background: '#EB5757',
    type: 'GOAL_CANVAS'
  }
];

const OrganizerQuizScreenSeven = ({ query, user }) => {
  const [selectedTools, setSelectedTools] = useState([]);

  useEffect(() => {
    setSelectedTools(query?.config?.value || []);
  }, [query?.config?.value]);

  const updateSelectedTools = type => {
    let currentTools = [];
    selectedTools.find(t => t === type)
      ? (currentTools = selectedTools.filter(t => t !== type))
      : (currentTools = selectedTools.concat(type));

    setSelectedTools(currentTools);

    mutations.setConfig({
      owner: toGid('User', user?.id),
      config: 'ORGANIZER_QUIZ.favorite_tools_screen7',
      value: currentTools
    });
  };

  return (
    <div className="organizer-quiz__screen">
      <h4>What are your organization needs?</h4>
      <div className=" organizer-quiz__screen-small">
        {list.map((x, i) => (
          <div className="organizer-quiz__screen-small__block" key={i}>
            <div
              onClick={() => updateSelectedTools(x.type)}
              style={{ background: x.background }}
              className={`organizer-quiz__screen-small__block-card ${
                selectedTools.includes(x.type) ? 'selected' : ''
              }`}
            >
              <p
                style={{
                  color: '#fff',
                  padding: '5px 10px',
                  textAlign: 'center'
                }}
              >
                {x.label}
              </p>
            </div>
            <span onClick={() => updateSelectedTools(x.type)} className="mt5">
              <Switch on={selectedTools.includes(x.type) ? true : false} />
            </span>
          </div>
        ))}
      </div>
      <OrganizerQuizFooter />
    </div>
  );
};

const RefetchContainer = createRefetchContainer(
  OrganizerQuizScreenSeven,
  {
    query: graphql`
      fragment OrganizerQuizScreenSeven_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen7") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenSevenRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenSeven_query @arguments(owner: $owner)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} query={props} />,
  {
    query: graphql`
      query OrganizerQuizScreenSevenQuery($owner: ID!) {
        ...OrganizerQuizScreenSeven_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  }
);
