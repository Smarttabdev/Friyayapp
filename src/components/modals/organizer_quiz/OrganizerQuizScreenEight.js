import React, { useState, useEffect } from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'A mix of things',
    image: '/images/organizerQuizImages/frame13.png',
    imageSelected: '/images/organizerQuizImages/frame13a.png',
    type: 'PROJECT_HUB'
  },
  {
    label: 'Timeline',
    image: '/images/organizerQuizImages/frame14.png',
    imageSelected: '/images/organizerQuizImages/frame14a.png',
    type: 'TIMELINE'
  },
  {
    label: 'A list of tasks',
    image: '/images/organizerQuizImages/frame15.png',
    imageSelected: '/images/organizerQuizImages/frame15a.png',
    type: 'ACTION_PLAN'
  },
  {
    label: 'Sprints',
    image: '/images/organizerQuizImages/frame16.png',
    imageSelected: '/images/organizerQuizImages/frame16a.png',
    type: 'GOAL'
  }
];

const OrganizerQuizScreenEight = ({ query, user }) => {
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
      config: 'ORGANIZER_QUIZ.favorite_tools_screen8',
      value: currentTools
    });
  };
  return (
    <div className="organizer-quiz__screen">
      <h4>What does your typical project look like?</h4>
      <div className=" organizer-quiz__screen-large">
        {list.map((x, i) => (
          <div
            onClick={() => updateSelectedTools(x.type)}
            className="organizer-quiz__screen-large__box"
            key={i}
          >
            <p>{x.label}</p>
            <div className="organizer-quiz__screen-large__box-img">
              <img
                src={selectedTools.includes(x.type) ? x.imageSelected : x.image}
                alt={x.label}
              />
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
  OrganizerQuizScreenEight,
  {
    query: graphql`
      fragment OrganizerQuizScreenEight_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen8") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenEightRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenEight_query @arguments(owner: $owner)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} query={props} />,
  {
    query: graphql`
      query OrganizerQuizScreenEightQuery($owner: ID!) {
        ...OrganizerQuizScreenEight_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  }
);
