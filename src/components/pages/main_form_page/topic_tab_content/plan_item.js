import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardPriorityControl from 'Components/shared/cards/elements/CardPriorityControl';
import DateInput from 'Components/shared/forms/DateInput';
import { connect } from 'react-redux';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import reactSelectCustomStyles from 'Components/shared/ReactSelectCustom/reactSelectCustomStyles';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';

class PlanItemContent extends Component {
  static propTypes = {
    topic: PropTypes.object
  };

  constructor(props) {
    super(props);

    if (props.topic) {
      const { attributes: attrs, relationships } = props.topic;
      const { people } = props;

      this.state = {
        completionDateValue: attrs.completion_date,
        dueDateValue: attrs.due_date,
        expectedCompletionDateValue: attrs.expected_completion_date,
        priorityValue: attrs.priority_level,
        startDateValue: attrs.start_date,
        workEstimationValue: attrs.resource_required,
        pointsValue: attrs.points,
        assignedToValues: relationships.assignments.data.map(obj =>
          people.find(user => user.id == obj.assigned_id)
        ),
        assignments: undefined
      };
    } else {
      this.state = {
        completionDateValue: null,
        dueDateValue: null,
        expectedCompletionDateValue: null,
        priorityValue: null,
        startDateValue: null,
        workEstimationValue: null,
        pointsValue: null,
        assignedToValues: null,
        assignments: null
      };
    }
  }

  handleCompletionDateChange = value => {
    const completionValue =
      value && !moment(value).diff(moment(), 'days')
        ? 100
        : this.state.completionValue;

    this.setState({ completionDateValue: value, completionValue });
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

  handlePointChange = ev => {
    this.setState({ pointsValue: Number(ev.target.value) || 0 });
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

  handleAssignedToChange = value => {
    this.setState({
      assignedToValues: value,
      assignments: {
        data: value.map(user => ({
          assigned_type: 'User',
          assigned_id: user.id
        }))
      }
    });
  };

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
        <div className="plan-tab-content__field plan-tab-content__field--half">
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
            step="1"
            type="number"
            value={this.state.pointsValue || ''}
            onChange={this.handlePointChange}
          />
          <span className="plan-tab-content__input-label">points</span>
        </div>
        <div className="plan-tab-content__field plan-tab-content__field--half">
          <span className="plan-tab-content__label">Priority</span>
          <CardPriorityControl
            className="plan-tab-content__priority"
            value={this.state.priorityValue}
            onChange={this.handlePriorityValueChange}
          />
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

export default connect(mapState, null, null, { withRef: true })(
  PlanItemContent
);
