import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CompletionSlider from 'Components/shared/CompletionSlider';
import CardPriorityControl from 'Components/shared/cards/elements/CardPriorityControl';
import DateInput from 'Components/shared/forms/DateInput';
import SearchInput from 'Components/shared/SearchInput';
import LogTimeField from './plan_tab_content/log_time_field';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import reactSelectCustomStyles from 'Components/shared/ReactSelectCustom/reactSelectCustomStyles';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';

class PlanTabContent extends Component {
  static propTypes = {
    card: PropTypes.object
  };

  constructor(props) {
    super(props);

    if (props.card) {
      const {
        attributes: attrs,
        relationships: { tip_assignments, depends_on }
      } = props.card;

      this.state = {
        assignedToValues: tip_assignments.data.map(id =>
          props.people.find(p => p.id == id)
        ),
        completionValue: attrs.completed_percentage,
        completionDateValue: attrs.completion_date,
        dependencyValues: depends_on.data.map(id => ({ id, type: 'tips' })),
        dueDateValue: attrs.due_date,
        expectedCompletionDateValue: attrs.expected_completion_date,
        priorityValue: attrs.priority_level,
        startDateValue: attrs.start_date,
        workEstimationValue: attrs.resource_required,
        actualWorkValue: attrs.resource_expended,
        pointsValue: attrs.points,
        cactiiValue: attrs.cactii
      };
    } else {
      this.state = {
        assignedToValues: [],
        completionValue: 0,
        completionDateValue: null,
        dependencyValues: [],
        dueDateValue: null,
        expectedCompletionDateValue: null,
        priorityValue: null,
        startDateValue: null,
        workEstimationValue: null,
        actualWorkValue: null,
        pointsValue: null,
        cactiiValue: null
      };
    }
  }

  handleAssignedToChange = value => {
    if (value[0]?.onlyId) {
      value.shift();
      if (value.length > 0) {
        value.forEach((val, i) => {
          value[i] = this.props.people.find(p => p.id == val?.id);
        });
      }
    }
    this.setState({ assignedToValues: value });
  };

  handleCompletionChange = value => {
    const completionDateValue =
      value === 100 ? new Date().valueOf() : this.state.completionDateValue;

    const startDateValue =
      !this.state.startDateValue && !this.state.completionValue && value
        ? new Date().valueOf()
        : this.state.startDateValue;

    this.setState({
      completionDateValue,
      completionValue: value,
      startDateValue
    });
  };

  handleCompletionDateChange = value => {
    const completionValue =
      value && !moment(value).diff(moment(), 'days')
        ? 100
        : this.state.completionValue;

    this.setState({ completionDateValue: value, completionValue });
  };

  handleDependenciesChange = values => {
    this.setState({ dependencyValues: values });
  };

  handleDueDateChange = value => {
    this.setState({ dueDateValue: value });
  };

  handleExpectedCompletionChange = value => {
    this.setState({ expectedCompletionDateValue: value });
  };

  handlePriorityValueChange = value => {
    this.setState({ priorityValue: value });
  };

  handleStartDateChange = value => {
    this.setState({ startDateValue: value });
  };

  handleWorkEstimationChange = ev => {
    this.setState({ workEstimationValue: Number(ev.target.value) || 0 });
  };

  handleActualWorkChange = ev => {
    this.setState({ actualWorkValue: Number(ev.target.value) || 0 });
  };

  handlePointChange = ev => {
    this.setState({ pointsValue: Number(ev.target.value) || 0 });
  };

  handleCactiiChange = ev => {
    this.setState({ cactiiValue: Number(ev.target.value) || 0 });
  };

  camel2title = camelCase => {
    const re = /(\b[a-z](?!\s))/g;
    if (camelCase) {
      return camelCase.replace(re, function(x) {
        return x.toUpperCase();
      });
    } else {
      return ' ';
    }
  };

  returnState = () => this.state;

  render() {
    const { people } = this.props;
    return (
      <div className="plan-tab-content">
        <div className="plan-tab-content__field">
          <span className="plan-tab-content__label">Assign to</span>
          <ReactSelectCustom
            className="sheet-view__card-label-select"
            value={this.state.assignedToValues}
            onChange={this.handleAssignedToChange}
            styles={{
              ...reactSelectCustomStyles,
              control: provided => ({
                ...reactSelectCustomStyles.control(provided)
              })
            }}
            options={people}
            getOptionLabel={option =>
              this.camel2title(
                `${option.attributes.first_name} ${option.attributes.last_name}`
              )
            }
            getOptionValue={option => option.id}
            isMulti
            isSearchable
          />
        </div>
        <div className="plan-tab-content__field plan-tab-content__field--half">
          <span className="plan-tab-content__label">Start date</span>
          <DateInput
            className="plan-tab-content__date"
            date={this.state.startDateValue}
            isOutsideRange={date =>
              this.state.dueDateValue && +date > this.state.dueDateValue
            }
            placeholder="Enter date"
            onChange={this.handleStartDateChange}
          />
        </div>
        <div className="plan-tab-content__field plan-tab-content__field--half">
          <span className="plan-tab-content__label">Due date</span>
          <DateInput
            className="plan-tab-content__date"
            date={this.state.dueDateValue}
            isOutsideRange={date =>
              this.state.startDateValue && +date < this.state.startDateValue
            }
            placeholder="Enter date"
            onChange={this.handleDueDateChange}
          />
        </div>
        <div className="plan-tab-content__field plan-tab-content__field--half">
          <span className="plan-tab-content__label">
            Expected completion date
          </span>
          <DateInput
            className="plan-tab-content__date"
            date={this.state.expectedCompletionDateValue}
            placeholder="Enter date"
            onChange={this.handleExpectedCompletionChange}
          />
        </div>
        <div className="plan-tab-content__field plan-tab-content__field--half">
          <span className="plan-tab-content__label">Completion date</span>
          <DateInput
            className="plan-tab-content__date"
            date={this.state.completionDateValue}
            placeholder="Enter date"
            onChange={this.handleCompletionDateChange}
          />
        </div>
        <div className="plan-tab-content__field">
          <span className="plan-tab-content__label">Work estimation</span>
          <input
            className="plan-tab-content__input"
            min="0"
            placeholder="0"
            step="0.5"
            type="number"
            value={this.state.workEstimationValue || ''}
            onChange={this.handleWorkEstimationChange}
          />
          <span className="plan-tab-content__input-label">hours</span>
          <input
            className="plan-tab-content__input plan-tab-content__input-margin-left"
            min="0"
            placeholder="0"
            step="0.5"
            type="number"
            value={this.state.actualWorkValue || ''}
            onChange={this.handleActualWorkChange}
          />
          <span className="plan-tab-content__input-label">actual hours</span>
          <input
            className="plan-tab-content__input plan-tab-content__input-margin-left"
            min="0"
            placeholder="0"
            step="1"
            type="number"
            value={this.state.pointsValue || ''}
            onChange={this.handlePointChange}
          />
          <span className="plan-tab-content__input-label">points</span>
          <input
            className="plan-tab-content__input plan-tab-content__input-margin-left"
            min="0"
            placeholder="0"
            step="1"
            type="number"
            value={this.state.cactiiValue || ''}
            onChange={this.handleCactiiChange}
          />
          <span className="plan-tab-content__input-label">Bonus Points</span>
        </div>
        <div className="plan-tab-content__field">
          <span className="plan-tab-content__label">Priority</span>
          <CardPriorityControl
            className="plan-tab-content__priority"
            value={this.state.priorityValue}
            onChange={this.handlePriorityValueChange}
          />
        </div>
        <div className="plan-tab-content__field">
          <span className="plan-tab-content__label">Completion</span>
          <CompletionSlider
            card={this.props.card}
            className="plan-tab-content__completion"
            showEmoji
            showPercentage
            value={this.state.completionValue}
            onChange={this.handleCompletionChange}
          />
        </div>
        <div className="plan-tab-content__field">
          <span className="plan-tab-content__label">Dependencies</span>
          <SearchInput
            id="plan-dependencies-search"
            multipleValues
            placeholder="Search Cards"
            type="tips"
            value={this.state.dependencyValues}
            onChange={this.handleDependenciesChange}
          />
        </div>
        <div className="plan-tab-content__field">
          <span className="plan-tab-content__label">Log time</span>
          <LogTimeField card={this.props.card} />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    people: getPeopleArray(state)
  };
};

const mapDispatch = {
  updateCard
};

export default connect(mapState, mapDispatch, null, { withRef: true })(
  PlanTabContent
);
