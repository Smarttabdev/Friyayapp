import React, { Fragment, Component } from 'react';
import groupBy from 'lodash/groupBy';
import { pageViewMappings } from 'Lib/config/lenses/lenses';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import { createTopic, viewTopic } from 'Src/newRedux/database/topics/thunks';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { success } from 'Utils/toast';
import { updateUiSettings } from 'Src/newRedux/database/topics/apiCalls';
import get from 'lodash/get';
import MaterialIcon from 'material-icons-react';
import DriveIcon from 'Src/components/svg_icons/driveIcon';

class ViewsDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createNewTopic = async (parentId, yay) => {
    const { createTopic, viewTopic } = this.props;

    const createdTopic = await createTopic({
      attributes: {
        title: yay.title,
        parent_id: parentId,
        default_view_id: yay.defaultViewId
      }
    });

    const ui_settings = {
      current_active_template: yay.defaultViewId,
      card_hidden: yay.defaultViewId === 'TOPIC_TILES',
      subtopic_view: 'TILE',
      subtopic_panel_visible: yay.defaultViewId === 'TOPIC_TILES'
    };

    await updateUiSettings(
      get(createdTopic.data.data, 'attributes.user_configuration.data.id'),
      ui_settings,
      null
    );

    await viewTopic({ topicId: createdTopic.data.data.id });
    return createdTopic.data.data;
  };

  createNewCard = async topicId => {
    const { createCard } = this.props;
    const attributes = { title: 'Title' };
    const relationships = {
      topics: { data: [topicId] }
    };
    return await createCard({ attributes, relationships });
  };

  createChildrenTopic = async (parentId, children) => {
    for (let yay of children) {
      const createdTopic = await this.createNewTopic(parentId, yay);
      await this.createNewCard(createdTopic.id);
      await this.createChildrenTopic(createdTopic.id, yay.children);
    }
  };

  handleCreateView = (title, viewId) => {
    success('Creating board...');
    this.createChildrenTopic(null, [
      {
        id: 1,
        title: title,
        defaultViewId: viewId,
        children: []
      }
    ]);
  };

  renderLensDropdownItem = ({
    key,
    fontAwesomeIcon,
    icon,
    label,
    outlineIcon,
    teamIcon,
    projectIcon,
    subIcon
  }) => (
    <li key={key} onClick={() => this.handleCreateView(label, key)}>
      <a className="pin-tools-bar__lens-item">
        {icon == 'drive' ? (
          <DriveIcon className="ml4 mr4 icon" fill="#515050" />
        ) : (
          <Icon
            fontAwesome={fontAwesomeIcon}
            icon={icon}
            outlined={outlineIcon}
            teamIcon={teamIcon}
            projectIcon={projectIcon}
            subIcon={subIcon}
          />
        )}
        {label}
      </a>
    </li>
  );

  render() {
    const { boards } = this.props;
    const viewSegments = groupBy(Object.values(boards || {}), 'category');
    return (
      <div className="dropdown-menu">
        {Object.keys(viewSegments)
          .filter(category => category !== 'board_views')
          .map(category => (
            <Fragment key={category}>
              <li className="dropdown-header">
                {category.replace(/_/g, ' ').toUpperCase()} TOOLS
              </li>
              {viewSegments[category].map(board =>
                this.renderLensDropdownItem({
                  key: board.key,
                  fontAwesomeIcon: board.fontAwesomeIcon,
                  icon: board.icon,
                  label: board.name,
                  outlineIcon: board.outlineIcon,
                  teamIcon: board.teamIcon,
                  projectIcon: board.projectIcon,
                  subIcon: board.subIcon
                })
              )}
            </Fragment>
          ))}
      </div>
    );
  }
}

const mapState = state => {
  const {
    page: { page }
  } = stateMappings(state);
  return {
    boards: pageViewMappings[page]
  };
};

const mapDispatch = {
  createTopic,
  createCard,
  viewTopic
};

export default connect(mapState, mapDispatch)(ViewsDropdown);
