import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import get from 'lodash/get';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import uniq from 'lodash/uniq';
import { createSelector } from 'reselect';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { cardFilters } from 'Lib/config/filters/cards';
import { itemFilters } from 'Lib/config/filters/items';
import { actionDispatcher } from 'Src/newRedux/utils';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import FilterDateElement from 'Components/menus/right/right_submenus/elements/FilterDateElement';
import PersonMenuRow from 'Components/menus/right/right_submenus/elements/PersonMenuRow';
import Dropdown from 'Components/shared/Dropdown';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import Icon from 'Components/shared/Icon';
import SelectableLabelList from 'Components/shared/labels/elements/SelectableLabelList';
import ActiveFilterChip from './ActiveFilterChip';
import { getFilterStateKey } from 'Lib/utilities';
import {
  setUserFilterSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import store from 'Src/store/store';
import { getTopic } from 'Src/newRedux/database/topics/thunks';

const convertFilterToBetweenDateString = filter =>
  ` ${moment(filter.startDate).format('DD MMM')} - ${moment(
    filter.endDate
  ).format('DD MMM')}`;

const ActiveFilterDropdownItem = ({
  label,
  icon,
  iconType,
  iconProps,
  active,
  onClick
}) => (
  <li>
    <a
      className={cn(
        'active-filter__dropdown-item',
        active && 'active-filter__dropdown-item--active'
      )}
      onClick={onClick}
    >
      {iconProps ? (
        <Icon {...iconProps} />
      ) : (
        (iconType || icon) && (
          <Icon fontAwesome={iconType == 'fontAwesome'} icon={icon} />
        )
      )}
      <span className="ml5">{label}</span>
    </a>
  </li>
);

const ActiveFiltersPanel = ({
  actionDispatcher,
  activeFilters = [],
  allFilterStates,
  people,
  topics,
  additionalContainerClass,
  currentTopic,
  showFilterPanel,
  getTopic
}) => {
  if (!showFilterPanel) return null;

  useEffect(() => {
    activeFilters
      .filter(f => f.name == 'board_ids')
      ?.forEach(f => {
        if (!topics[f.filter]) getTopic({ topicId: f.filter });
      });
  }, [activeFilters]);

  const newFilterStates = (stateKey, newStates) => ({
    ...allFilterStates,
    [stateKey]: {
      ...(allFilterStates[stateKey] || {}),
      ...newStates
    }
  });

  const setFilterStates = (filter, filterStates) => {
    filter.update({ filter_states: filterStates });
  };

  const createHandleIncludesChange = filter => includes => {
    setFilterStates(
      filter,
      newFilterStates(filter.stateKey, { excludes: !includes })
    );
  };

  const createHandleEnabledChange = filter => enabled => {
    setFilterStates(
      filter,
      newFilterStates(filter.stateKey, { disabled: !enabled })
    );
  };

  const createHandleRemoveFilter = filter => () => {
    filter.remove();
  };

  const createHandleUpdateFilter = (filter, newFilter) => () => {
    filter.update(newFilter);
  };

  const newFilterArrayFrom = (oldValue, newValue, oldArray) => {
    const array = oldArray.slice();
    const oldIndex = array.findIndex(x => x === oldValue);
    if (newValue !== oldValue) {
      if (array.includes(newValue)) {
        array.splice(oldIndex, 1);
      } else {
        array.splice(oldIndex, 1, newValue);
      }
    }
    return array;
  };

  const renderPeopleFilterDropdown = (filter, getNewFilter) => (
    <Dropdown
      trigger={filter.label}
      MenuComponent="div"
      menuClassName="active-filter__dropdown-item-single"
    >
      {people.map(person => (
        <PersonMenuRow
          key={person.id}
          isSelected={filter.filter == person.id}
          onClick={createHandleUpdateFilter(
            filter,
            getNewFilter(filter, person.id)
          )}
          person={person}
        />
      ))}
    </Dropdown>
  );

  const renderDateRangeFilterDropdown = (filter, getNewFilter) => (
    <Dropdown
      trigger={filter?.label}
      closeOnClick={false}
      MenuComponent="div"
      menuStyle={{ width: 280 }}
    >
      <FilterDateElement
        filter={filter.filter}
        onSetFilter={date => {
          createHandleUpdateFilter(filter, getNewFilter(date))();
        }}
      />
    </Dropdown>
  );

  const filterDropdownItemsRenderers = {
    card_type: filter => (
      <Dropdown trigger={filter.label}>
        {Object.values(itemFilters)
          .filter(item => item.type == 'card_type')
          .map(item => (
            <ActiveFilterDropdownItem
              key={item.key}
              label={item.name}
              iconProps={item.iconProps}
              active={item.key === filter.filter}
              onClick={createHandleUpdateFilter(filter, {
                card_type: uniq(
                  filter.filters.card_type.map(cardType => {
                    if (cardType == filter.filter) {
                      return item.key;
                    }
                    return cardType;
                  })
                )
              })}
            />
          ))}
      </Dropdown>
    ),
    board_type: filter => (
      <Dropdown trigger={filter.label}>
        {Object.values(itemFilters)
          .filter(item => item.type == 'board_type')
          .map(item => (
            <ActiveFilterDropdownItem
              key={item.key}
              label={item.name}
              iconProps={item.iconProps}
              active={item.key === filter.filter}
              onClick={createHandleUpdateFilter(filter, {
                board_type: uniq(
                  filter.filters.board_type.map(boardType => {
                    if (boardType == filter.filter) {
                      return item.key;
                    }
                    return boardType;
                  })
                )
              })}
            />
          ))}
      </Dropdown>
    ),
    board_ids: filter => (
      <Dropdown
        trigger={filter.label}
        MenuComponent="div"
        menuClassName="p-a-0 max-h-unset"
        closeOnClick={false}
      >
        <TopicsListDropdown
          additionalClasses="d-block static max-h-unset p-a-0"
          actionButtonLabel="Select Board"
          actionButtonHandler={selectedTopics => {
            const topicId = selectedTopics[selectedTopics.length - 1].id;
            if (!topics[topicId]) getTopic({ topicId });
            createHandleUpdateFilter(filter, {
              board_ids: filter.filters.board_ids
                .filter(x => x != filter.filter)
                .concat(topicId)
            })();
          }}
          actionButtonClass="btn-primary"
          path={currentTopic.attributes.path.concat({ id: 0 })}
          startAt={0}
          hideHeader
          inputMode="list"
          hideAddTopicLink
          skipConfirmation
          onInputBlur={() => {}}
          onInputFocus={() => {}}
          onSelectTopic={() => {}}
          selectedTopics={[
            {
              value: filter.filter,
              label: topics[filter.filter]?.attributes?.title
            }
          ]}
          showAddBoard
        />
      </Dropdown>
    ),
    card: filter => (
      <Dropdown trigger={filter.label}>
        {Object.values(cardFilters).map(cardFilter => (
          <ActiveFilterDropdownItem
            key={cardFilter.key}
            label={cardFilter.name}
            icon={cardFilter.icon}
            iconType={cardFilter.iconType}
            active={cardFilter.key === filter.filter}
            onClick={createHandleUpdateFilter(filter, { card: cardFilter.key })}
          />
        ))}
      </Dropdown>
    ),
    label: filter => {
      const handleChange = labelIds => {
        const newLabel = labelIds[0];
        createHandleUpdateFilter(filter, {
          label: newFilterArrayFrom(
            filter.filter,
            newLabel,
            filter.filters.label
          )
        })();
      };
      return (
        <Dropdown
          trigger={filter.label}
          MenuComponent="div"
          menuClassName="active-filter__dropdown-item-single"
        >
          <SelectableLabelList
            onChangeSelection={handleChange}
            selectedLabelIds={[filter.filter]}
          />
        </Dropdown>
      );
    },
    creator: filter =>
      renderPeopleFilterDropdown(filter, (filter, personId) => ({
        creator: newFilterArrayFrom(
          filter.filter,
          personId,
          filter.filters.creator
        )
      })),
    assigned: filter =>
      renderPeopleFilterDropdown(filter, (filter, personId) => ({
        assigned: newFilterArrayFrom(
          filter.filter,
          personId,
          filter.filters.assigned
        )
      })),
    created: filter =>
      renderDateRangeFilterDropdown(filter, date => ({
        created_start_date: date.startDate,
        created_end_date: date.endDate
      })),
    started: filter =>
      renderDateRangeFilterDropdown(filter, date => ({
        start_start_date: date.startDate,
        start_end_date: date.endDate
      })),
    due: filter =>
      renderDateRangeFilterDropdown(filter, date => ({
        due_start_date: date.startDate,
        due_end_date: date.endDate
      })),
    completed: filter =>
      renderDateRangeFilterDropdown(filter, date => ({
        completed_start_date: date.startDate,
        completed_end_date: date.endDate
      })),
    priority: filter => (
      <Dropdown
        trigger={filter.label}
        menuStyle={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {['Highest', 'High', 'Medium', 'Low', 'Lowest'].map(level => {
          const active = level === filter.filter;
          const priority = newFilterArrayFrom(
            filter.filter,
            level,
            filter.filters.priority
          );
          return (
            <ActiveFilterDropdownItem
              key={level}
              label={level}
              icon={active ? 'check-square' : 'square'}
              iconType="fontAwesome"
              active={active}
              onClick={createHandleUpdateFilter(filter, { priority })}
            />
          );
        })}
      </Dropdown>
    )
  };

  const renderFilterDropdown = filter =>
    (filterDropdownItemsRenderers[filter.name] || (() => null))(filter);

  return (
    <div className={`active-filters-panel ${additionalContainerClass}`}>
      {activeFilters.map((filter, i) => (
        <ActiveFilterChip
          key={i}
          label={renderFilterDropdown(filter)}
          includes={!filter.excludes}
          enabled={!filter.disabled}
          onIncludesChange={createHandleIncludesChange(filter)}
          onEnabledChange={createHandleEnabledChange(filter)}
          onRemove={createHandleRemoveFilter(filter)}
        />
      ))}
    </div>
  );
};

export const filterMap = createSelector(
  state => getFilterSettings(state),
  state => stateMappings(state).labels,
  state => stateMappings(state).people,
  state => stateMappings(state).topics,
  (filters, labels, people, topics) => {
    const filterStates = get(filters, 'filter_states', {});
    const filterMap = [];
    const setTopicOrAllFilterSettings = filterSettings => {
      store.dispatch(setUserFilterSettings(filterSettings));
    };
    const addFilter = ({ name, label, filter, resetFilter, ...rest }) => {
      const stateKey = getFilterStateKey(name, filter);
      filterMap.push({
        name,
        label,
        filter,
        filters,
        stateKey,
        ...get(filterStates, stateKey, {}),
        update: newFilter => setTopicOrAllFilterSettings(newFilter),
        remove: () =>
          setTopicOrAllFilterSettings({
            ...(typeof resetFilter == 'function' ? resetFilter() : resetFilter),
            filter_states: omit(filterStates, stateKey)
          })
      });
    };
    filters?.assigned?.forEach(personId => {
      addFilter({
        name: 'assigned',
        label:
          'Assigned to ' +
          get(people, `${personId}.attributes.name`, 'Unknown'),
        filter: personId,
        resetFilter: {
          assigned: filters.assigned.filter(a => a !== personId)
        }
      });
    });
    filters?.card_type &&
      filters.card_type.forEach(cardTypeFilter => {
        itemFilters[cardTypeFilter] &&
          addFilter({
            name: 'card_type',
            label: itemFilters[cardTypeFilter].name,
            filter: cardTypeFilter,
            resetFilter: () => ({
              card_type: filters.card_type.filter(t => t != cardTypeFilter)
            })
          });
      });
    filters?.board_type &&
      filters.board_type.forEach(boardTypeFilter => {
        itemFilters[boardTypeFilter] &&
          addFilter({
            name: 'board_type',
            label: itemFilters[boardTypeFilter].name,
            filter: boardTypeFilter,
            resetFilter: () => ({
              board_type: filters.board_type.filter(t => t != boardTypeFilter)
            })
          });
      });
    filters?.board_ids?.forEach(id => {
      addFilter({
        name: 'board_ids',
        label: (
          <span>
            Board:{' '}
            {topics[id]?.attributes?.title || (
              <i className="fa fa-spinner fa-pulse" />
            )}
          </span>
        ),
        filter: id,
        resetFilter: () => ({
          board_ids: filters.board_ids.filter(x => x != id)
        })
      });
    });
    if (filters && filters.card && filters.card != cardFilters.ALL.key) {
      addFilter({
        name: 'card',
        label: cardFilters[filters?.card].name,
        filter: filters?.card,
        resetFilter: { card: 'ALL' }
      });
    }
    if (filters?.completed_start_date && filters.completed_end_date) {
      const filter = {
        startDate: filters.completed_start_date,
        endDate: filters.completed_end_date
      };
      addFilter({
        name: 'completed',
        label: 'Completed' + convertFilterToBetweenDateString(filter),
        filter,
        resetFilter: {
          completed_start_date: null,
          completed_end_date: null
        }
      });
    }
    if (filters?.created_start_date && filters.created_end_date) {
      const filter = {
        startDate: filters.created_start_date,
        endDate: filters.created_end_date
      };
      addFilter({
        name: 'created',
        label: 'Created' + convertFilterToBetweenDateString(filter),
        filter,
        resetFilter: {
          created_start_date: null,
          created_end_date: null
        }
      });
    }
    filters?.creator?.forEach(personId => {
      addFilter({
        name: 'creator',
        label:
          'Created by ' + get(people, `${personId}.attributes.name`, 'Unknown'),
        filter: personId,
        resetFilter: {
          creator: filters.creator.filter(c => c !== personId)
        }
      });
    });
    if (filters?.due_start_date && filters.due_end_date) {
      const filter = {
        startDate: filters.due_start_date,
        endDate: filters.due_end_date
      };
      addFilter({
        name: 'due',
        label: 'Due' + convertFilterToBetweenDateString(filter),
        filter,
        resetFilter: {
          due_start_date: null,
          due_end_date: null
        }
      });
    }
    filters?.label?.forEach(labelId => {
      addFilter({
        name: 'label',
        label: labels[labelId]?.attributes?.name,
        filter: labelId,
        resetFilter: {
          label: filters.label.filter(l => l !== labelId)
        }
      });
    });
    filters?.priority?.forEach(level => {
      addFilter({
        name: 'priority',
        label: 'Priority level ' + level,
        filter: level,
        resetFilter: {
          priority: filters.priority.filter(p => p !== level)
        }
      });
    });
    if (filters?.start_start_date && filters.start_end_date) {
      const filter = {
        startDate: filters.start_start_date,
        endDate: filters.start_end_date
      };
      addFilter({
        name: 'started',
        label: 'Started' + convertFilterToBetweenDateString(filter),
        filter,
        resetFilter: {
          start_start_date: null,
          start_end_date: null
        }
      });
    }
    return filterMap;
  }
);

const mapState = state => {
  const {
    topics,
    page: { topicId, isHome },
    filters: { showFilterPanel }
  } = stateMappings(state);
  const filterSetting = getFilterSettings(state);
  const activeFilters = filterMap(state);
  const allFilterStates = pick(
    filterSetting?.filter_states,
    activeFilters.map(f => f.stateKey)
  );
  return {
    showFilterPanel,
    activeFilters,
    allFilterStates,
    people: getPeopleArray(state),
    topics,
    currentTopic: topics[topicId]
  };
};

const mapDispatch = {
  setUserFilterSettings,
  actionDispatcher,
  getTopic
};

export default connect(mapState, mapDispatch)(ActiveFiltersPanel);
