import React, { useState, useEffect } from 'react';
import Icon from 'src/components/shared/Icon';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';

const list = [
  {
    label: 'Tasks',
    iconType: 'assignment',
    outlined: true,
    color: '#6FCF97',
    type: 'TODO'
  },
  {
    label: 'Notes',
    type: 'MY_NOTES',
    iconType: 'list_alt',
    outlined: true,
    color: '#9B51E0'
  },
  {
    label: 'Files',
    type: 'FILES',
    iconType: 'insert_drive_file',
    outlined: true,
    color: '#F2C94C'
  },
  {
    label: 'Chats',
    type: 'CHAT',
    outlined: true,
    color: '#F2C94C',
    iconType: 'question_answer'
  },
  {
    label: 'Video Chats',
    type: 'VIDEO_CHAT',
    outlined: true,
    color: '#EB5757',
    iconType: 'videocam'
  },
  {
    label: 'Knowledge',
    type: 'KNOWLEDGE_BASE',
    iconType: 'chrome_reader_mode',
    outlined: true,
    color: '#EEDB88'
  },
  {
    label: 'Project Board',
    type: 'PROJECT',
    iconType: 'category',
    outlined: true,
    color: '#EB5757'
  },
  {
    label: 'Goals',
    type: 'GOAL_BOARDS',
    iconType: 'flag',
    outlined: true,
    color: '#56CCF2'
  },
  {
    label: 'Notebooks',
    type: 'NOTEBOOK',
    iconType: 'vertical_split',
    outlined: true,
    fontSize: 32,
    color: '#6FCF97'
  },
  {
    label: 'Databases',
    type: 'TOPIC_TILES',
    iconType: 'bubble_chart',
    outlined: true,
    color: '#eb98cf'
  }
];

const OrganizerQuizScreenOne = ({ user, query }) => {
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
      config: 'ORGANIZER_QUIZ.favorite_tools_screen1',
      value: currentTools
    });
  };

  return (
    <div className="organizer-quiz__screen">
      <h4>What to organize?</h4>
      <div className=" organizer-quiz__screen-small">
        {list.map((x, i) => (
          <div className="organizer-quiz__screen-small__block" key={i}>
            <div
              onClick={() => updateSelectedTools(x.type)}
              className={`organizer-quiz__screen-small__block-card ${
                selectedTools.includes(x.type) ? 'selected' : ''
              }`}
            >
              <Icon
                icon={x.iconType}
                color={x.color}
                outlined={x.outlined}
                fontSize={x.fontSize || 30}
              />
              <p>{x.label}</p>
            </div>
            <span onClick={() => updateSelectedTools(x.type)} className="mt5">
              <Switch on={selectedTools.includes(x.type) ? true : false} />
            </span>
          </div>
        ))}
      </div>
      <OrganizerQuizFooter content="Based on your selections, Friyay will add some of your default configurations. You can change these at any time" />
    </div>
  );
};

const RefetchContainer = createRefetchContainer(
  OrganizerQuizScreenOne,
  {
    query: graphql`
      fragment OrganizerQuizScreenOne_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen1") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenOneRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenOne_query @arguments(owner: $owner)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} query={props} />,
  {
    query: graphql`
      query OrganizerQuizScreenOneQuery($owner: ID!) {
        ...OrganizerQuizScreenOne_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  }
);
