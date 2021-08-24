import React, { useState, useEffect } from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'Trello',
    image: '/images/organizerQuizImages/trello.png',
    type: 'KANBAN'
  },
  {
    label: 'Assana',
    image: '/images/organizerQuizImages/asana.png',
    type: 'ACTION_PLAN'
  },
  {
    label: 'Monday',
    image: '/images/organizerQuizImages/monday.png',
    type: 'PROJECT_PLAN'
  },
  {
    label: 'Basecamp',
    image: '/images/organizerQuizImages/basecamp.png',
    type: 'PROJECT_HUB'
  },
  {
    label: 'ClickUp',
    image: '/images/organizerQuizImages/clickup.png',
    type: 'TODO'
  },
  {
    label: 'Confluence',
    image: '/images/organizerQuizImages/confluence.png',
    type: 'KNOWLEDGE_BASE'
  },
  {
    label: 'Google Drive',
    image: '/images/organizerQuizImages/drive.png',
    type: 'GOOGLE_DRIVE'
  },
  {
    label: 'Zoom',
    image: '/images/organizerQuizImages/zoom.png',
    type: 'VIDEO_CHAT'
  },
  {
    label: 'Airtable',
    image: '/images/organizerQuizImages/airtable.png',
    type: 'SHEET'
  },
  {
    label: 'Slack',
    image: '/images/organizerQuizImages/slack.png',
    type: 'CHAT'
  }
];

const OrganizerQuizScreenTwo = ({ user, query }) => {
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
      config: 'ORGANIZER_QUIZ.favorite_tools_screen2',
      value: currentTools
    });
  };

  return (
    <div className="organizer-quiz__screen">
      <h4>What tools are you familiar with?</h4>
      <div className=" organizer-quiz__screen-small">
        {list.map((x, i) => (
          <div className="organizer-quiz__screen-small__block" key={i}>
            <div
              onClick={() => updateSelectedTools(x.type)}
              className={`organizer-quiz__screen-small__block-card ${
                selectedTools.includes(x.type) ? 'selected' : ''
              }`}
            >
              <div className="organizer-quiz__screen-small__block-card__img">
                <img src={x.image} alt={x.label} />
              </div>
            </div>
            <span onClick={() => updateSelectedTools(x.type)} className="mt5">
              <Switch on={selectedTools.includes(x.type) ? true : false} />
            </span>
          </div>
        ))}
      </div>
      <OrganizerQuizFooter content="Based on your selections, Friyay will add similar tools to your Favorite Tools" />
    </div>
  );
};

const RefetchContainer = createRefetchContainer(
  OrganizerQuizScreenTwo,
  {
    query: graphql`
      fragment OrganizerQuizScreenTwo_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen2") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenTwoRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenTwo_query @arguments(owner: $owner)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} query={props} />,
  {
    query: graphql`
      query OrganizerQuizScreenTwoQuery($owner: ID!) {
        ...OrganizerQuizScreenTwo_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  }
);
