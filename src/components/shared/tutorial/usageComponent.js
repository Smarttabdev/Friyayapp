import React, { Fragment } from 'react';
import { capitalize } from 'lodash';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setOrganizerQuizModal } from 'Src/newRedux/interface/modals/actions';

const UsageComponent = ({ user, setOrganizerQuizModal, hideTutorial }) => {
  const data = [
    {
      header: `Hello ${capitalize(user.attributes.first_name) ||
        'User'}, Welcome to your workspace!`,
      body: [
        'This is the homepage of your workspace with a list of all your workspace Boards.'
      ],
      text: {
        a: 'Take the',
        b: 'Organizer Quiz',
        c: 'to select your favorite tools'
      }
    },
    {
      header: 'Create a Board',
      body: [
        'Use a Board to organize projects, notes,  tasks, files and more. <br /><br />Examples:  Product Roadmap, Employee onboarding, Sales best practices, Quarterly goals, Promotion Calendar<br /><br />You can add Sub Boards to your Board to create levels of organization, just like you would with file folders<br/><br/>'
      ]
    },
    {
      header: 'Select a Board Tool',
      body: [
        'Each Tool is how you want your Board to be organized.<br /><br />Examples: Notes, Wiki, Page, File List, ToDo, Sheet, Calendar, Kanban board, Message board<br/><br/>'
      ]
    },
    {
      header: 'Add Cards',
      body: [
        'Cards is where you write text, upload files, add images, set due dates, assign and so forth<br/><br/>'
      ]
    }
  ];

  return (
    <Fragment>
      <ul className="tutorial-body">
        {data.map((item, i) => {
          return (
            <li key={item.header}>
              <h3 className="tutorial-title">{item.header}</h3>
              <div
                style={{ fontSize: i == 0 ? '18px' : '16px' }}
                dangerouslySetInnerHTML={{ __html: item.body }}
              />
              <p
                onClick={() => {
                  setOrganizerQuizModal({ isOpen: true });
                  hideTutorial();
                }}
                className="tutorial__organizer-quiz"
                role="button"
              >
                {item.text && (
                  <Fragment>
                    <span>{item.text.a}</span>{' '}
                    <span className="tutorial__organizer-quiz__bold">
                      {item.text.b}
                    </span>{' '}
                    <span>{item.text.c}</span>
                  </Fragment>
                )}
              </p>
              {i !== data.length - 1 && <hr />}
            </li>
          );
        })}
      </ul>
      <p className="tutorial-footer">
        You can open this tutorial in the dropdown menu by clicking your avatar
        in the top right.
      </p>
    </Fragment>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const user = sm.user;
  return {
    user
  };
};

export default connect(mapState, { setOrganizerQuizModal })(UsageComponent);
