import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createFirstTopic } from 'Src/newRedux/database/topics/thunks';
import { updateUiSettings } from 'Src/newRedux/database/topics/apiCalls';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { withRouter } from 'react-router';
import { getUser } from 'Src/newRedux/database/user/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import get from 'lodash/get';

const onboardingTopics = [
  {
    name: 'Action Plan',
    img: '/images/onboarding/action_plan.png',
    yays: [
      {
        id: 1,
        title: 'Action Plan',
        defaultViewId: 'ACTION_PLAN',
        children: []
      }
    ]
  },
  {
    name: 'Multiple Action Plans',
    img: '/images/onboarding/action_plans.png',
    yays: [
      {
        id: 1,
        title: 'Action Plans',
        defaultViewId: 'TOPIC_TILES',
        children: [
          {
            id: 1,
            title: 'Action Plan',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 2,
            title: 'Action Plan 2',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 3,
            title: 'Action Plan 3',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 4,
            title: 'Action Plan 4',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 5,
            title: 'Action Plan 5',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 6,
            title: 'Action Plan 6',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 7,
            title: 'Action Plan 7',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 8,
            title: 'Action Plan 8',
            defaultViewId: 'ACTION_PLAN',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: 'Project',
    img: '/images/onboarding/project__1_.png',
    yays: [
      {
        id: 1,
        title: 'Project',
        defaultViewId: 'TOPIC_TILES',
        children: [
          {
            id: 1,
            title: 'Project Plan',
            defaultViewId: 'BASIC',
            children: []
          },
          { id: 2, title: 'Tasks', defaultViewId: 'ACTION_PLAN', children: [] },
          { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
          { id: 4, title: 'Files', defaultViewId: 'DOCUMENT', children: [] },
          {
            id: 5,
            title: 'Messages',
            defaultViewId: 'MESSAGE_BOARD',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: 'Multiple Projects',
    img: '/images/onboarding/projects.png',
    yays: [
      {
        id: 1,
        title: 'Projects',
        defaultViewId: 'TOPIC_TILES',
        children: [
          {
            id: 1,
            title: 'Project',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          },
          {
            id: 2,
            title: 'Project 2',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          },
          {
            id: 3,
            title: 'Project 3',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          },
          {
            id: 4,
            title: 'Project 4',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Page',
    img: '/images/onboarding/page.png',
    yays: [{ id: 1, title: 'Page', defaultViewId: 'BASIC', children: [] }]
  },
  {
    name: 'Notes',
    img: '/images/onboarding/notes__1_.png',
    yays: [{ id: 1, title: 'Notes', defaultViewId: 'GRID', children: [] }]
  },
  {
    name: 'Knowledge Base',
    img: '/images/onboarding/knowledge_bas__1_.png',
    yays: [
      {
        id: 1,
        title: 'Knowledge',
        defaultViewId: 'WIKI',
        children: []
      }
    ]
  },
  {
    name: 'Files',
    img: '/images/onboarding/files__1_.png',
    yays: [{ id: 1, title: 'File', defaultViewId: 'DOCUMENT', children: [] }]
  },
  {
    name: 'Team Workspace',
    img: '/images/onboarding/workspace__1_.png',
    yays: [
      {
        id: 1,
        title: 'Action Plans',
        defaultViewId: 'TOPIC_TILES',
        children: [
          {
            id: 1,
            title: 'Action Plan',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 2,
            title: 'Action Plan 2',
            defaultViewId: 'ACTION_PLAN',
            children: []
          },
          {
            id: 3,
            title: 'Action Plan 3',
            defaultViewId: 'ACTION_PLAN',
            children: []
          }
        ]
      },
      {
        id: 2,
        title: 'Projects',
        defaultViewId: 'TOPIC_TILES',
        children: [
          {
            id: 1,
            title: 'Project',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          },
          {
            id: 2,
            title: 'Project 2',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          },
          {
            id: 3,
            title: 'Project 3',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          },
          {
            id: 4,
            title: 'Project 4',
            defaultViewId: 'TOPIC_TILES',
            children: [
              {
                id: 1,
                title: 'Project Plan',
                defaultViewId: 'BASIC',
                children: []
              },
              {
                id: 2,
                title: 'Tasks',
                defaultViewId: 'ACTION_PLAN',
                children: []
              },
              { id: 3, title: 'Notes', defaultViewId: 'GRID', children: [] },
              {
                id: 4,
                title: 'Files',
                defaultViewId: 'DOCUMENT',
                children: []
              },
              {
                id: 5,
                title: 'Messages',
                defaultViewId: 'MESSAGE_BOARD',
                children: []
              }
            ]
          }
        ]
      },
      { id: 3, title: 'New Employees', defaultViewId: 'GRID', children: [] },
      {
        id: 4,
        title: 'Important Dates',
        defaultViewId: 'CALENDAR',
        children: []
      },
      {
        id: 5,
        title: 'Message Board',
        defaultViewId: 'MESSAGE_BOARD',
        children: []
      },
      { id: 6, title: 'Team Goals', defaultViewId: 'BASIC', children: [] },
      { id: 7, title: 'Files', defaultViewId: 'DOCUMENT', children: [] },
      { id: 8, title: 'Meeting Notes', defaultViewId: 'GRID', children: [] }
    ]
  },
  {
    name: 'Team wiki',
    yays: [
      {
        id: 1,
        title: 'Team wiki',
        defaultViewId: 'WIKI',
        children: []
      }
    ]
  }
];

class IntroCreateHiveContent extends Component {
  static propTypes = {
    isSavingFirstTopic: PropTypes.bool,
    create: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    isSavingFirstTopic: false
  };

  state = {
    title: '',
    selectedView: onboardingTopics[0],
    isCreatingViews: false
  };

  async componentDidMount() {
    const { getUser } = this.props;
    await getUser();
  }

  onViewChange = selectedView => () => {
    this.setState({
      selectedView
    });
  };

  createNewCard = async topicId => {
    const { createCard } = this.props;
    const attributes = { title: 'Title' };
    const relationships = {
      topics: { data: [topicId] }
    };
    return await createCard({ attributes, relationships });
  };

  createNewTopic = async (parentId, yay) => {
    const { create, user } = this.props;

    const createdTopic = await create({
      attributes: {
        title: yay.title,
        parent_id: parentId,
        default_view_id: yay.defaultViewId
      }
    });

    // const { my_topics_view } = user.attributes.ui_settings;
    // const currentSettings = { id: createdTopic.id };

    const ui_settings = {
      current_active_template: yay.defaultViewId,
      card_hidden: yay.defaultViewId === 'TOPIC_TILES',
      subtopic_view: 'TILE',
      subtopic_panel_visible: yay.defaultViewId === 'TOPIC_TILES'
    };

    // const myTopicsViewNew = [
    //   ...user.attributes.ui_settings.my_topics_view.filter(
    //     view => view.id !== createdTopic.id
    //   ),
    //   updatedSettings
    // ];

    await updateUiSettings(
      get(createdTopic, 'attributes.user_configuration.data.id'),
      ui_settings,
      null
    );

    return [createdTopic];
  };

  createChildrenTopic = async (parentId, children) => {
    for (let yay of children) {
      const [createdTopic] = await this.createNewTopic(parentId, yay);
      await this.createNewCard(createdTopic.id);
      await this.createChildrenTopic(createdTopic.id, yay.children);
    }
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    this.setState({ isCreatingViews: true });
    const {
      state: { selectedView },
      props: { history }
    } = this;

    await this.createChildrenTopic(null, selectedView.yays);
    window.location.href = '/';
  };

  handleContinueClick = () => this.props.history.push('/');

  handleOptionClick = async (onboardingTopicsIndex, i, e) => {
    e.preventDefault();
    const options = [0, 8, 2];
    onboardingTopicsIndex === options[i]
      ? this.setState({ optionsCreate: i })
      : this.setState({ moreOptionsCreate: i });
    await this.createChildrenTopic(
      null,
      onboardingTopics[onboardingTopicsIndex].yays
    );
    this.props.history.push('/');
  };

  render() {
    const { moreOptionsCreate, optionsCreate } = this.state;

    const options = [
      {
        name: 'Action plan',
        onClick: (i, e) => this.handleOptionClick(0, i, e)
      },
      {
        name: 'Multiple actions plans',
        onClick: (i, e) => this.handleOptionClick(1, i, e)
      },
      { name: 'Project', onClick: (i, e) => this.handleOptionClick(2, i, e) }
    ];

    const moreOptions = [
      { name: 'Notes', onClick: (i, e) => this.handleOptionClick(5, i, e) },
      { name: 'Files', onClick: (i, e) => this.handleOptionClick(7, i, e) },
      { name: 'Page', onClick: (i, e) => this.handleOptionClick(4, i, e) },
      {
        name: 'Typical team\nsetup',
        onClick: (i, e) => this.handleOptionClick(8, i, e)
      },
      { name: 'Team wiki', onClick: (i, e) => this.handleOptionClick(9, i, e) },
      {
        name: 'Multiple projects',
        onClick: (i, e) => this.handleOptionClick(3, i, e)
      }
    ];

    return (
      <div className="create-boards">
        <img
          className={'create-boards-logo'}
          src="/images/friyay-logo-black.png"
        />
        <div className="create-boards-panel">
          <div className="create-boards-panel-left row">
            <h3 className="create-boards-heading">
              What do you want to create?
            </h3>
            {options.map((option, i) => (
              <div
                key={option.name}
                className={`col-md-3 cvp_options cvp_options-${i + 1}`}
                onClick={e => option.onClick(i, e)}
              >
                <span>{option.name}</span>
                <span>{optionsCreate === i ? 'Creating...' : 'Create'}</span>
              </div>
            ))}
          </div>

          <div className="create-boards-panel-right row">
            <div className="header_moreOptions">More options:</div>
            {moreOptions.map((option, i) => (
              <div
                key={i}
                className="col-md-3 cvp_moreOptions"
                onClick={e => option.onClick(i, e)}
              >
                <span>{option.name}</span>
                <span>
                  {moreOptionsCreate === i ? 'Creating...' : 'Create'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    topic: { isSavingFirstTopic }
  } = state;
  return { isSavingFirstTopic, user: sm.user };
};

const mapDispatch = {
  create: createFirstTopic,
  createCard,
  getUser
};

export default connect(
  mapState,
  mapDispatch
)(withRouter(IntroCreateHiveContent));
