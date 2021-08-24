import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'Components/shared/Dropdown';
// import FormInput from 'Components/shared/forms/FormInput';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { connect } from 'react-redux';
import { templateViewsSelector } from 'Src/newRedux/database/topics/selectors';
import { setCopyTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { getRootTopic } from 'Src/newRedux/database/topics/selectors';

const LeftMenuPanel = ({
  title,
  createTitle,
  expand,
  children,
  onClick,
  onCreate,
  templates,
  topicId,
  setCopyTopicModalOpen,
  active_design,
  mainBoardId
}) => {
  const [viewTitle, setViewTitle] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const { workspace_font_color } = active_design;

  const handleOncreate = e => {
    e && e.preventDefault();
    viewTitle.trim() &&
      onCreate({
        title: viewTitle,
        setLoading,
        closeDropdown: () => setDropdownOpen(false)
      });
    setViewTitle('');
  };

  const handleUseTemplate = async topic => {
    setCopyTopicModalOpen(true, topic);
  };

  return (
    <Fragment>
      <div
        className="left-menu_content-heading"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <div className="left-menu_dropdown-title" onClick={onClick}>
          <span style={{ color: workspace_font_color }}> {title}</span>
          <i
            className={
              'fa m-r-1 ' + (expand ? 'fa-caret-down' : 'fa-caret-right')
            }
            style={{ color: workspace_font_color }}
            aria-hidden="true"
          ></i>
        </div>
        <Dropdown
          open={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          trigger={
            <i
              className="fa fa-plus"
              style={{ opacity: isVisible ? 1 : 0 }}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          }
          className="left-menu_create-dropdown"
          menuClassName="left-menu_create-dropdown-menu"
        >
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <AddSubtopicCard
              parentTopicId={mainBoardId}
              inInputMode={true}
              onDismiss={() => setDropdownOpen(false)}
              leftMenu
              boardIndex={0}
            />
          )}
        </Dropdown>
      </div>
      {expand && children}
    </Fragment>
  );
};

LeftMenuPanel.propTypes = {
  title: PropTypes.node,
  expand: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onCreate: PropTypes.func
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities,
    page: { topicId }
  } = sm;
  const templates = templateViewsSelector(state);
  const mainBoard = getRootTopic(state);
  return {
    active_design: utilities.active_design,
    templates,
    topicId,
    mainBoardId: mainBoard?.id
  };
};

const mapDispatch = {
  setCopyTopicModalOpen
};

export default connect(mapState, mapDispatch)(LeftMenuPanel);

{
  /*<Fragment>
              <FormInput
                autoFocus
                defaultValue={viewTitle}
                onChange={setViewTitle}
                onSubmit={handleOncreate}
                placeholder="Board title"
              />
              <div className="left-menu_create-form-footer">
                <p>hit enter to create</p>
                <p onClick={handleOncreate}>Create</p>
              </div>
              <p
                onClick={() => setShowTemplates(!showTemplates)}
                className="templateButton"
              >
                Use a template
              </p>
              {showTemplates && (
                <div className="templates_con">
                  {templates.map((template, i) => (
                    <div key={i}>
                      <div onClick={() => handleUseTemplate(template)}>
                        {template.attributes.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}
                  </Fragment>*/
}
