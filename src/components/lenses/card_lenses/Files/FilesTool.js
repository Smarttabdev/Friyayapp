import React from 'react';
import TaskLens from 'Components/lenses/card_lenses/Task/TaskLens';

export default function FilesTool(props) {
  return (
    <>
      <TaskLens
        {...props}
        isFilesTool
        containerClasses="files-tool-container"
        designType="minimalist"
      />
    </>
  );
}
