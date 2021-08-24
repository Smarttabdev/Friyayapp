import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

import SheetLens from '../Sheet/SheetLens';
import { columns } from '../Sheet/sheetConfig/index';

const sheetColumns = [
  columns.estimated_work,
  columns.confidence_range,
  columns.actual_work,
  columns.variance
];

class EstimationLens extends Component {
  static propTypes = {
    cardRequirements: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired,
    subtopics: PropTypes.array.isRequired,
    topic: PropTypes.object
  };

  render() {
    return (
      <Fragment>
        <SheetLens
          columns={sheetColumns}
          configureColumns={false}
          {...this.props}
          additionalClasses="estimation-board"
        />
      </Fragment>
    );
  }
}

export default EstimationLens;
