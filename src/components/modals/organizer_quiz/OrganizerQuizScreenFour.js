import React, { useState, useEffect } from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'Kanban',
    image: '/images/organizerQuizImages/frame4.png',
    imageSelected: '/images/organizerQuizImages/frame4a.png',
    type: 'KANBAN'
  },
  {
    label: 'Timeline',
    image: '/images/organizerQuizImages/frame5.png',
    imageSelected: '/images/organizerQuizImages/frame5a.png',
    type: 'TIMELINE'
  },
  {
    label: 'Table',
    image: '/images/organizerQuizImages/frame6.png',
    imageSelected: '/images/organizerQuizImages/frame6a.png',
    type: 'PLANNING'
  }
];

const OrganizerQuizScreenFour = ({ query, user }) => {
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
      config: 'ORGANIZER_QUIZ.favorite_tools_screen4',
      value: currentTools
    });
  };

  return (
    <div className="organizer-quiz__screen">
      <h4>How do you like to plan things?</h4>
      <div className=" organizer-quiz__screen-large">
        {list.map((x, i) => (
          <div className="organizer-quiz__screen-large__box" key={i}>
            <p>{x.label}</p>
            <div
              onClick={() => updateSelectedTools(x.type)}
              className="organizer-quiz__screen-large__box-img"
            >
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
  OrganizerQuizScreenFour,
  {
    query: graphql`
      fragment OrganizerQuizScreenFour_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen4") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenFourRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenFour_query @arguments(owner: $owner)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} query={props} />,
  {
    query: graphql`
      query OrganizerQuizScreenFourQuery($owner: ID!) {
        ...OrganizerQuizScreenFour_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  }
);
