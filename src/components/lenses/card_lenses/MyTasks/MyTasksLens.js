import React from 'react';
import SheetLens from '../Sheet/SheetLens';
import { columns } from '../Sheet/sheetConfig/index';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

const sheetColumns = [columns.labels, columns.due_date];

const MyTasks = props => {
  return (
    <div className="h100 ActionPlan">
      <SheetLens
        forceColor={false}
        columns={sheetColumns}
        // showFooter={false}
        {...props}
        additionalClasses="ActionPlan-board"
      />
    </div>
  );
};

const mapState = state => {
  const { user, page } = stateMappings(state);
  const uiSettings = user.attributes.ui_settings;

  const myTopicsView = uiSettings.my_topics_view.find(
    board => board.id === page.topicId
  );
  const sprintBarVisible = myTopicsView && myTopicsView.sprintbar_panel_visible;
  return { sprintBarVisible };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(MyTasks);
