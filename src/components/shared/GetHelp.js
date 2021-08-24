import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Dropdown from 'Components/shared/Dropdown';
import FormInput from 'Components/shared/forms/FormInput';
import Tooltip from 'Components/shared/Tooltip';
import customStyles from 'src/components/shared/cards/AddAssigneeStyle';
import { camel2title, toId } from 'src/lib/utilities';
import { success, failure } from 'Utils/toast';
import { createCard } from 'Src/newRedux/database/cards/thunks';

const forId = Math.ceil(Math.random() * 100000, 6);

const GetHelp = ({
  people,
  card = null,
  style = {},
  transparent,
  card_font_color,
  menuStyle = {},
  createCard,
  endDate
}) => {
  const [title, setTitle] = useState(`Help with: ${card.attributes.title}`);
  const [description, setDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [additionalStyles, setAdditionalStyles] = useState(customStyles);
  const [triggerClose, setTriggerClose] = useState(false);

  useEffect(() => {
    setAdditionalStyles({
      ...customStyles,
      control: (provided, state) => ({
        ...customStyles.control(provided, state),
        borderBottom: `1px solid ${(transparent && card_font_color) || '#eee'}`
      }),
      placeholder: provided => ({
        ...provided,
        marginLeft: '-6px',
        color: `${(transparent && card_font_color) || '#bbb'}`
      }),
      dropdownIndicator: provided => ({
        ...provided,
        color: `${(transparent && card_font_color) || '#bbb'}`
      }),
      clearIndicator: provided => ({
        ...provided,
        color: `${(transparent && card_font_color) || '#bbb'}`
      })
    });
  }, [card_font_color]);

  const handleSubmit = async () => {
    if (!title || !selectedUsers?.length) {
      return failure('Fill in all required fields');
    }
    await handleCreateCard();

    setSelectedUsers(null);
    setTitle('');
    setTriggerClose(!triggerClose);
    success('Help requested');
  };

  const handleCreateCard = async () => {
    const parentCardUrl = `${window.location.origin}/cards/${card.attributes.slug}`;
    const attributes = {
      title,
      card_type: 'TASK',
      body: `<a href=${parentCardUrl}>${parentCardUrl}</a><br/><p>${description}</p>`,
      tag_list: [`tip_${toId(card.id)}_task`],
      helper_for: toId(card.id),
      due_date: moment(endDate).toISOString()
    };
    const relationships = {
      tip_assignments: {
        data:
          selectedUsers?.length > 0
            ? selectedUsers.map(a => ({
                assignment_type: 'User',
                assignment_id: toId(a.id)
              }))
            : []
      }
    };
    const result = await createCard({ attributes, relationships });
    return result;
  };

  return (
    <div style={style}>
      <Dropdown
        menuStyle={menuStyle}
        menuClassName={`get-help__dropdown`}
        closeOnClick={false}
        triggerClose={triggerClose}
        trigger={
          <span
            style={{ fontSize: '18px' }}
            data-tip="Get help"
            data-for={forId}
          >
            ✋
            <Tooltip {...{ place: 'bottom' }} id={forId} />
          </span>
        }
      >
        <FormInput
          autoFocus
          additionalClasses="get-help__dropdown-form"
          defaultValue={title}
          onChange={val => setTitle(val)}
          placeholder="Title (Required)"
        />
        <textarea
          className="get-help__dropdown-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Brief Description"
        ></textarea>
        <Select
          transparent={transparent}
          classNamePrefix="react-select-dropdown"
          styles={additionalStyles}
          value={selectedUsers}
          onChange={selected => setSelectedUsers(selected)}
          options={people}
          isMulti
          getOptionLabel={option =>
            camel2title(
              `${option.attributes.first_name} ${option.attributes.last_name}`
            )
          }
          getOptionValue={option => option.id}
          isSearchable
          placeholder="Select Helpers (Required)"
        />
        <div className="get-help__dropdown-footer">
          <button onClick={handleSubmit}>Get help</button>
        </div>
      </Dropdown>
    </div>
  );
};

const mapState = state => {
  const {
    utilities,
    tools: { timeframe }
  } = stateMappings(state);
  const people = getPeopleArray(state);

  const { endDate } = timeframe['MY_PLAN'] || timeframe;

  return {
    people,
    card_font_color: utilities.active_design.card_font_color,
    endDate
  };
};

const mapDispatch = {
  createCard
};

export default connect(mapState, mapDispatch)(GetHelp);
