import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { sheetConfig } from './sheetConfig/index';
import SheetAddRow from './SheetAddRow';
import { getParsedColumn } from 'Lib/utilities';
import Tooltip from 'Components/shared/Tooltip';

class SheetFooter extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    configureColumns: PropTypes.bool.isRequired,
    refreshFooter: PropTypes.bool,
    sheetBorderStyle: PropTypes.object
  };

  render() {
    const {
      parentTopic,
      showOnlyAddCard,
      showOnlyAddTopic,
      customFields,
      tips,
      sheetBorderStyle,
      user,
      linkingBoards
    } = this.props;

    const renderSum = (config, parsedColumn, user) => {
      if (
        config.cssModifier == 'estimated-work' ||
        config.cssModifier == 'actual-work'
      ) {
        //set indicator color
        let indicatorColor;
        if (
          config.renderSummary(this.props.cards, parsedColumn) <
          user?.attributes?.user_profile.resource_capacity
        ) {
          indicatorColor = '#56ccf2';
        } else if (
          config.renderSummary(this.props.cards, parsedColumn) >
          user?.attributes?.user_profile.resource_capacity
        ) {
          indicatorColor = '#9b51e0';
        } else {
          indicatorColor = '#6fcf97';
        }

        return (
          <div className="work-summary">
            <div
              className="value"
              style={{
                color: indicatorColor
              }}
              data-for={`available-hours-${user?.id}`}
              data-tip={`Available hours: ${user?.attributes?.user_profile
                .resource_capacity || 0} hours`}
            >
              {config.renderSummary(this.props.cards, parsedColumn)}
              <Tooltip place="bottom" id={`available-hours-${user?.id}`} />
            </div>
            <div> hours</div>
          </div>
        );
      }
      return config.renderSummary(this.props.cards, parsedColumn);
    };

    //set estimated workload
    if (this.props.setUserWorkload) {
      const getEstimatedColumn = getParsedColumn('estimated_work', {
        customFields,
        tips
      });
      this.props.setUserWorkload(
        getEstimatedColumn.config.renderSummary(
          this.props.cards,
          getEstimatedColumn
        ) || 0
      );
    }

    return (
      <Fragment>
        {!this.props.hideSummary && (
          <div className="sheet-view__footer">
            <div className="sheet-view__card">
              <div
                className="sheet-view__cell sheet-view__cell--title"
                style={sheetBorderStyle}
              >
                <span className="summary">Summary</span>
              </div>
              {this.props.columns.map(column => {
                const parsedColumn = getParsedColumn(column, {
                  customFields,
                  tips
                });
                const config = parsedColumn.config;
                const cssModifier = parsedColumn.getValue('cssModifier');
                const cellClassNames = classNames('sheet-view__cell', {
                  [`sheet-view__cell--${cssModifier}`]: cssModifier
                });

                return (
                  <div
                    key={column}
                    className={cellClassNames}
                    style={sheetBorderStyle}
                  >
                    {renderSum(config, parsedColumn, user)}
                  </div>
                );
              })}
              {this.props.configureColumns && (
                <div
                  className="sheet-view__cell sheet-view__cell--add"
                  style={sheetBorderStyle}
                />
              )}
            </div>
          </div>
        )}
        {(showOnlyAddCard
          ? ['card']
          : showOnlyAddTopic
          ? ['board']
          : ['card', 'board']
        ).map(type => (
          <div className="sheet-view__footer" key={type}>
            <SheetAddRow
              type={type}
              cardTitle={this.props.cardTitle}
              boardTitle={this.props.boardTitle}
              onChangeTitle={(title, titleType) =>
                this.props.changeTitle({
                  [`${type}Title`]: title,
                  [`${type}Type`]: titleType
                })
              }
              onAdd={this.props.handleKeyPress}
              onFooterTopicSelected={this.props.onFooterTopicSelected}
              columns={this.props.columns}
              configureColumns={this.props.configureColumns}
              parentTopic={parentTopic}
              customFields={customFields}
              tips={tips}
              mustSelectTopics={this.props.mustSelectTopics}
              sheetBorderStyle={sheetBorderStyle}
              linkingBoards={linkingBoards}
              {...this.props}
              {...this.props.addRowProps}
            />
          </div>
        ))}
      </Fragment>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId }
  } = sm;
  return {
    parentTopic: sm.topics[topicId]
  };
};

export default connect(mapState)(SheetFooter);
