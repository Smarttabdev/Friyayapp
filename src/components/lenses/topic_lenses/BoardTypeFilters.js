import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { boardTypes } from 'src/components/shared/CardAndBoardTypes';
import IconButton from 'Components/shared/buttons/IconButton';
import {
  setUserFilterSettings,
  getFilterSettings
} from 'Src/helpers/user_config';

const BoardTypeFilters = ({
  setUserFilterSettings,
  boardTypeFilter,
  defaultColor,
  isBoardsPage
}) => {
  useEffect(() => {
    setUserFilterSettings({ board_type: [] });
  }, []);

  const filterTopics = key => {
    const payload = { board_type: [key] };
    setUserFilterSettings(payload);
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '8px'
      }}
    >
      {boardTypes.map((x, i) => (
        <IconButton
          key={i}
          style={{
            paddingLeft: '4px',
            borderBottom: boardTypeFilter.includes(x.key)
              ? `2px solid ${defaultColor ? defaultColor : '#c48FC8'}`
              : ''
          }}
          additionalClasses="mr8"
          outlined={x.outlined}
          fontAwesome={x.fontAwesome}
          fontSize={x.type === 'notes' ? 20 : ''}
          icon={x.iconType}
          color={defaultColor && !isBoardsPage ? defaultColor : x.color}
          tooltip={x.label}
          tooltipOptions={{ place: 'bottom' }}
          onClick={() => filterTopics(x.key)}
        />
      ))}
    </div>
  );
};

const mapState = state => {
  const filter_setting = getFilterSettings(state);
  return {
    boardTypeFilter: filter_setting.board_type || []
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(BoardTypeFilters);
