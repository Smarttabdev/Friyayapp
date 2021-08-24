import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import LeftMenuPanel from '../elements/LeftMenuPanel';
import { Boards } from 'Src/components/pages/quick_setup/tabs/purpose/card_idea';
import QSModal from 'Components/pages/quick_setup/qs_modal';
import LeftMenuTopicSection from '../elements/LeftMenuTopicSection';
import { setCopyTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { setDefaultTemplates } from 'Src/newRedux/templates/thunks.js';
import { addFriyayTemplates } from 'Src/newRedux/templates/actions.js';
import Icon from 'Components/shared/Icon';
import { Fragment } from 'react';

const TemplateSection = props => {
  return (
    <div className="left-menu_content-list subtopics-list">
      {props.templates.length > 0 ? (
        props.templates.map((template, i) => (
          <div className="left-menu_topic-element" key={i}>
            <div className="left-menu_topic-element_details">
              <Icon
                additionalClasses={'white-opac-icon-button'}
                color={props.workspace_font_color || 'rgba(255, 255, 255, 0.7)'}
                fontAwesome={true}
                icon="hashtag"
                //fontSize={fontSize}
              />
              <Link
                className="left-menu_topic-element_topic-name templates"
                to={`${props.baseUrl}/boards/${template.attributes.slug}`}
              >
                <span className="line-clamp">{template.attributes.title}</span>
              </Link>

              {/* <div
                  className="left-menu_topic-element_topic-name templates"
                  onClick={() => props.handleUseTemplate(template)}
                  key={i}
                >
                  {template.attributes.title}
                </div> */}
            </div>
          </div>
        ))
      ) : (
        <div className="left-menu_topic-element">
          <div className="left-menu_topic-element_details">
            <div className="left-menu_topic-element_topic-name templates noHover">
              No Template
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

class LeftMenuTemplateSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseTemplate: false,
      collapsePersonal: true,
      collapseWorkspace: true,
      collapseBase: true
    };
  }

  toggleCollapse = type => {
    this.setState({ [type]: !this.state[type] });
  };

  static propTypes = {
    setCopyTopicModalOpen: PropTypes.func,
    personalTemplates: PropTypes.array,
    workspaceTemplates: PropTypes.array,
    currentTopic: PropTypes.object,
    createHandleCreateView: PropTypes.func
  };

  handleUseTemplate = async topic => {
    const { setCopyTopicModalOpen } = this.props;
    setCopyTopicModalOpen(true, topic);
  };

  handleUseBaseTemplate = () => {
    this.setState(prev => {
      return {
        quickSetup: !prev.quickSetup
      };
    });
  };

  componentDidMount() {
    this.props.setDefaultTemplates();
  }

  render() {
    const {
      collapseTemplate,
      collapsePersonal,
      collapseWorkspace,
      collapseBase,
      quickSetup
    } = this.state;

    const {
      createHandleCreateView,
      personalTemplates,
      workspaceTemplates,
      currentTopic,
      friyayTemplates,
      handleToggleNewTopicInput,
      baseUrl,
      active_design: { workspace_font_color }
    } = this.props;

    if (
      !personalTemplates.length &&
      !workspaceTemplates.length &&
      !friyayTemplates.length
    ) {
      return <Fragment />;
    }

    return (
      <div className="left-menu-templates">
        <LeftMenuPanel
          title="Templates"
          createTitle="Create Template"
          expand={!collapseTemplate}
          onClick={() => this.toggleCollapse('collapseTemplate')}
          onCreate={createHandleCreateView()}
        >
          {currentTopic != undefined && currentTopic != null && (
            <div
              className="useButton"
              onClick={() => this.handleUseTemplate(currentTopic)}
              style={{ borderColor: workspace_font_color, border: '1px solid' }}
            >
              Use this template
            </div>
          )}
          {personalTemplates.length > 0 && (
            <Fragment>
              <div
                onClick={() => this.toggleCollapse('collapsePersonal')}
                className="left-menu-templates__options"
              >
                <i
                  className={
                    'fa m-r-1 ' +
                    (collapsePersonal ? 'fa-caret-down' : 'fa-caret-right')
                  }
                ></i>
                My Templates
              </div>
              {collapsePersonal && (
                <LeftMenuTopicSection
                  baseUrl={baseUrl}
                  level={0}
                  groupTopics={personalTemplates}
                  topicId="0"
                  onDismiss={handleToggleNewTopicInput}
                />
              )}
            </Fragment>
          )}
          {workspaceTemplates.length > 0 && (
            <Fragment>
              <div
                onClick={() => this.toggleCollapse('collapseWorkspace')}
                className="left-menu-templates__options"
              >
                <i
                  className={
                    'fa m-r-1 ' +
                    (collapseWorkspace ? 'fa-caret-down' : 'fa-caret-right')
                  }
                ></i>
                All Templates
              </div>
              {collapseWorkspace && (
                <LeftMenuTopicSection
                  baseUrl={baseUrl}
                  level={0}
                  groupTopics={workspaceTemplates}
                  topicId="0"
                  onDismiss={handleToggleNewTopicInput}
                />
              )}
            </Fragment>
          )}
          {/* {friyayTemplates.length > 0 && (
            <Fragment>
              <div
                onClick={() => this.toggleCollapse('collapseBase')}
                className="left-menu-templates__options"
              >
                <i
                  className={
                    'fa m-r-1 ' +
                    (collapseBase ? 'fa-caret-down' : 'fa-caret-right')
                  }
                ></i>
                Friyay Templates
              </div>
              {collapseBase && (
                <TemplateSection
                  baseUrl={baseUrl}
                  templates={friyayTemplates || []}
                  workspace_font_color={workspace_font_color}
                  // handleUseBaseTemplate={this.handleUseBaseTemplate}
                  // baseTemplate
                />
              )}
            </Fragment>
          )} */}
        </LeftMenuPanel>
        {quickSetup && <QSModal toggleModal={this.handleUseBaseTemplate} />}
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    templates: { friyayTemplates },
    utilities: { active_design }
    // topics
  } = sm;
  // const topicsToAdd = Object.keys(topics).map(topic => topics[topic]);
  return {
    active_design,
    currentTopic: sm.topics[topicId],
    friyayTemplates
  };
};

const mapDispatch = {
  setCopyTopicModalOpen,
  setDefaultTemplates
};

export default connect(mapState, mapDispatch)(LeftMenuTemplateSegment);
