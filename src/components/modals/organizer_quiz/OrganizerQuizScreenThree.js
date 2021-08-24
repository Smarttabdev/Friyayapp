import React, { useEffect, useState } from 'react';
import Switch from 'src/components/shared/ToggleSwitch';
import OrganizerQuizFooter from './OrganizerQuizFooter';
import { toggleLeftMenu } from 'Src/newRedux/interface/menus/thunks';
import { connect } from 'react-redux';

const list = [
  {
    label: 'Search',
    image: '/images/organizerQuizImages/frame1.png',
    imageSelected: '/images/organizerQuizImages/frame1a.png',
    type: 'SEARCH'
  },
  {
    label: 'Side Menu',
    image: '/images/organizerQuizImages/frame2.png',
    imageSelected: '/images/organizerQuizImages/frame2a.png',
    type: 'SIDE_MENU'
  },
  {
    label: 'Bread crumbs',
    image: '/images/organizerQuizImages/frame3.png',
    imageSelected: '/images/organizerQuizImages/frame3a.png',
    type: 'BREAD_CRUMBS'
  }
];
const OrganizerQuizScreenThree = ({ user, query, toggleLeftMenu }) => {
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
      config: 'ORGANIZER_QUIZ.favorite_tools_screen3',
      value: currentTools
    });
  };

  const handleToggleLeftMenu = type => {
    if (type !== 'SIDE_MENU') return;
    if (type === 'SIDE_MENU' && selectedTools.includes('SIDE_MENU')) {
      toggleLeftMenu(false);
    }
    if (type === 'SIDE_MENU' && !selectedTools.includes('SIDE_MENU')) {
      toggleLeftMenu(true);
    }
  };

  return (
    <div className="organizer-quiz__screen">
      <h4>How do you like to navigate around?</h4>
      <div className=" organizer-quiz__screen-large">
        {list.map((x, i) => (
          <div className="organizer-quiz__screen-large__box" key={i}>
            <p>{x.label}</p>
            <div
              onClick={() => {
                updateSelectedTools(x.type);
                handleToggleLeftMenu(x.type);
              }}
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
  OrganizerQuizScreenThree,
  {
    query: graphql`
      fragment OrganizerQuizScreenThree_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen3") {
          id
          value
        }
      }
    `
  },
  graphql`
    query OrganizerQuizScreenThreeRefetchQuery($owner: ID!) {
      ...OrganizerQuizScreenThree_query @arguments(owner: $owner)
    }
  `
);

const mapDispatch = {
  toggleLeftMenu
};

export default connect(
  null,
  mapDispatch
)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query OrganizerQuizScreenThreeQuery($owner: ID!) {
        ...OrganizerQuizScreenThree_query @arguments(owner: $owner)
      }
    `,
    vars: ({ user }) => ({
      owner: toGid('User', user?.id || null)
    })
  })
);
