import React, { useState, useEffect } from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'Desktop',
    image: '/images/organizerQuizImages/frame10.png',
    imageSelected: '/images/organizerQuizImages/frame10a.png',
    type: 'FINDER'
  },
  {
    label: 'Folder like structure',
    image: '/images/organizerQuizImages/frame11.png',
    imageSelected: '/images/organizerQuizImages/frame11a.png',
    type: 'LIST'
  },
  {
    label: 'Piles',
    image: '/images/organizerQuizImages/frame12.png',
    imageSelected: '/images/organizerQuizImages/frame12a.png',
    type: 'WIP'
  }
];

const OrganizerQuizScreenSix = ({ query, user }) => {
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
      config: 'ORGANIZER_QUIZ.favorite_tools_screen6',
      value: currentTools
    });
  };
  return (
    <div className="organizer-quiz__screen">
      <h4>How do you like to organize things?</h4>
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
  OrganizerQuizScreenSix,
  {
    query: graphql`
      fragment OrganizerQuizScreenSix_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen6") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenSixRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenSix_query @arguments(owner: $owner)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} query={props} />,
  {
    query: graphql`
      query OrganizerQuizScreenSixQuery($owner: ID!) {
        ...OrganizerQuizScreenSix_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  }
);
