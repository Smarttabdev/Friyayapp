import React, { Fragment, useState, Component } from 'react';
import PropTypes from 'prop-types';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { connect } from 'react-redux';
import { setCopyTopicModalOpen } from 'Src/newRedux/interface/modals/actions';

import PurposeDetail from './purpose/purpose_detail';
import { Boards, cardSample } from './purpose/card_idea';
import './purpose/purpose.scss';

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: Boards.GeneralPurpose,
      sampleCard: cardSample[Boards.GeneralPurpose],
      templateTypeClicked: null,
      baseTemplateClick: Boards.GeneralPurpose
    };
  }

  static propTypes = {
    parentTopic: PropTypes.object,
    personalTemplates: PropTypes.array,
    workspaceTemplates: PropTypes.array
  };

  handleTemplateTypeExpand = index => {
    this.setState({
      templateTypeClicked: index
    });
  };

  handleBaseTemplatesViewClick = board => {
    this.setState({
      sampleCard: cardSample[Boards[board]],
      currentView: Boards[board],
      baseTemplateClick: board
    });
  };

  handleUseTemplate = async topic => {
    const { setCopyTopicModalOpen } = this.props;
    setCopyTopicModalOpen(true, topic);
  };

  render() {
    const {
      props: { personalTemplates, workspaceTemplates, parentTopic },
      state: { templateTypeClicked, currentView, sampleCard, baseTemplateClick }
    } = this;
    const templateTypes = [
      { title: 'Personal templates', templates: personalTemplates },
      { title: 'Workspace templates', templates: workspaceTemplates },
      { title: 'Base templates' }
    ];

    return (
      <Fragment>
        <div className="purpose-body">
          <div className="boards-list">
            <div
              className="board-item selected"
              onClick={() => this.handleUseTemplate(parentTopic)}
              style={{ backgroundColor: '#6FCF97' }}
            >
              Use this template
            </div>
            {templateTypes.map((template, i) => (
              <div key={i} className="template_type">
                <div onClick={() => this.handleTemplateTypeExpand(i)}>
                  <span
                    className={`fa fa-caret-${
                      templateTypeClicked == i ? 'down' : 'right'
                    } mr10`}
                  />
                  {template.title}
                </div>
                {templateTypeClicked == i ? (
                  i != 2 ? (
                    template.templates.length > 0 ? (
                      template.templates.map((temp, index) => (
                        <div
                          key={index}
                          className="template_type_child"
                          onClick={() => this.handleUseTemplate(temp)}
                        >
                          {temp.attributes.title}
                        </div>
                      ))
                    ) : (
                      <div className="template_type_child noHover">
                        No templates
                      </div>
                    )
                  ) : (
                    Object.keys(Boards).map(board => (
                      <div
                        key={board}
                        className={`template_type_child ${baseTemplateClick ==
                          board && 'selected'}`}
                        onClick={() => this.handleBaseTemplatesViewClick(board)}
                      >
                        {Boards[board]}
                      </div>
                    ))
                  )
                ) : null}
              </div>
            ))}
          </div>
          <PurposeDetail
            cardSample={sampleCard}
            selectedView={currentView}
            parentTopic={parentTopic}
          />
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  let allWorkspaceViews = getSortedFilteredTopicsByParentTopic(state)[0] || [];
  const personalTemplates = allWorkspaceViews.filter(
    topic =>
      topic.attributes.is_template == true &&
      topic.relationships.share_settings.data[0].sharing_object_id == 'private'
  );
  const workspaceTemplates = allWorkspaceViews.filter(
    topic =>
      topic.attributes.is_template == true &&
      topic.relationships.share_settings.data[0].sharing_object_id == 'everyone'
  );

  return {
    personalTemplates,
    workspaceTemplates
  };
};

const mapDispatch = {
  setCopyTopicModalOpen
};

export default connect(mapState, mapDispatch)(Templates);
