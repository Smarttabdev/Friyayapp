import React, { Fragment } from 'react';

const data = [
  {
    header: 'Tool: Kanban',
    text: 'Use lanes to organize your tasks in a workflow',
    img:
      'https://process.filestackapi.com/resize=width:1077,height:607/vjKKb4HCQ26mzUqiFHYe'
  },
  {
    header: 'Tool: Guide',
    text: 'Create a simple knowledge base in minutes!',
    img:
      'https://process.filestackapi.com/resize=width:875,height:493/fUX2VD8TyCiSCNsNLGQg'
  },
  {
    header: 'Tool: Tasks',
    text: 'Create a list of tasks, set due date, assign and go',
    img:
      'https://process.filestackapi.com/resize=width:300/KsYgGp0TGOmAFegdzj8B'
  },
  {
    header: 'Tool: Project Hub',
    text: 'Quickly share tasks, files, notes and more around your project',
    img:
      'https://process.filestackapi.com/resize=width:300/C8Kq4HotQr6BGsUWGK9P'
  },
  {
    header: 'Tool: Boards',
    text:
      'You can use Boards like folders, categories, sprints, task groups and more. You can add unlimited levels of sub boards.',
    img:
      'https://process.filestackapi.com/resize=width:300/jYN3kU71Ss2jHjVqPcHk'
  },
  {
    header: 'Tool: Live Chat',
    text:
      'Perfect for your second screen to instantly see all the chats in progress!',
    img:
      'https://process.filestackapi.com/resize=width:300/gTY9xvCtT0eihFvTgmYC'
  }
];

const ExampleComponent = () => {
  return (
    <Fragment>
      <ul className="tutorial-body">
        {data.map((item, index) => {
          return (
            <li key={index}>
              <h3 className="tutorial-title">{item.header}</h3>
              <p>{item.text}</p>
              <img className="tutorial-image" src={item.img} />
              {/* {index !== data.length - 1 && <hr />} */}
            </li>
          );
        })}
      </ul>
      <p className="tutorial-footer">
        Friyay has over 70 tools. Explore them with the Tool Explorer in the
        Tool menu on the left.
      </p>
    </Fragment>
  );
};

export default ExampleComponent;
