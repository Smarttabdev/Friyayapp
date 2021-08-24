import React, { useState, useEffect } from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'Column',
    image: '/images/organizerQuizImages/frame7.png',
    imageSelected: '/images/organizerQuizImages/frame7a.png',
    type: 'COLUMN'
  },
  {
    label: 'Search',
    image: '/images/organizerQuizImages/frame8.png',
    imageSelected: '/images/organizerQuizImages/frame8a.png',
    type: 'SEARCH'
  },
  {
    label: 'Tree List',
    image: '/images/organizerQuizImages/frame9.png',
    imageSelected: '/images/organizerQuizImages/frame9a.png',
    type: 'TREE_LIST'
  }
];

const OrganizerQuizScreenFive = ({ query, user }) => {
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
      config: 'ORGANIZER_QUIZ.favorite_tools_screen5',
      value: currentTools
    });
  };

  return (
    <div className="organizer-quiz__screen">
      <h4>How do you like to find things?</h4>
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
  OrganizerQuizScreenFive,
  {
    query: graphql`
      fragment OrganizerQuizScreenFive_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen5") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenFiveRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenFive_query @arguments(owner: $owner)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} query={props} />,
  {
    query: graphql`
      query OrganizerQuizScreenFiveQuery($owner: ID!) {
        ...OrganizerQuizScreenFive_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  }
);
