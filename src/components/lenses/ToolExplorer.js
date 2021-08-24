import React, { useState } from 'react';
import Switch from '../shared/ToggleSwitch';
import Icon from 'Components/shared/Icon';
import Tooltip from 'Components/shared/Tooltip';

const ToolExplorer = ({
  handleToggleToolExplorer,
  viewSegments,
  handleSelectView,
  pinedLenses,
  handlePinLensClick,
  getDriveIcon,
  setOrganizerQuizModal
}) => {
  const [active, setActive] = useState();
  const forId = Math.ceil(Math.random() * 100000, 6);

  return (
    <div style={{ color: '#000' }} className="tool-explorer">
      <div className="tool-explorer_header">
        <h5>Tool Explorer</h5>
        <span onClick={handleToggleToolExplorer} role="button">
          x
        </span>
      </div>
      <div
        className="tool-explorer__organizer-quiz-button"
        onClick={() => setOrganizerQuizModal({ isOpen: true })}
      >
        <span>Organizer Quiz</span>
        <span
          style={{ marginBottom: '-3px', fontSize: '14px' }}
          className="material-icons ml10"
        >
          arrow_forward
        </span>
      </div>
      {Object.keys(viewSegments)
        .filter(cat => cat !== 'board_views')
        .map(category => (
          <div className="tool-explorer_content" key={category}>
            <h5
              className={`tool-explorer_category tool-explorer_category--${category}`}
            >
              {category.replace(/_/g, ' ').toUpperCase()}
              {category !== 'board_views' && ' TOOLS'}
            </h5>
            {viewSegments[category]
              .filter(
                board =>
                  board.key !== 'MEDIUM_PROJECT' &&
                  board.key !== 'LARGE_PROJECT' &&
                  board.key !== 'SMALL_PROJECT' &&
                  board.key !== 'MULTIPLE_GOALS_CANVAS'
              )
              .map(board => (
                <div
                  key={board.key}
                  style={
                    active === board.key
                      ? {
                          background: '#c6f1ff'
                        }
                      : {}
                  }
                  className="tool-explorer_list"
                >
                  <div className="tool-explorer_list-header">
                    <div className="flex-r-center">
                      {board.icon === 'drive' ? (
                        getDriveIcon({
                          width: 20,
                          height: 20,
                          Imageclass: 'icon'
                        })
                      ) : (
                        <Icon
                          fontAwesome={board.fontAwesomeIcon}
                          icon={board.icon}
                          color={active === board.key ? '#000' : '#808080'}
                          outlined={
                            board.outlineIcon || board.Iconicon == 'category'
                              ? true
                              : false
                          }
                          teamIcon={board.teamIcon}
                          projectIcon={board.projectIcon}
                          subIcon={board.subIcon}
                        />
                      )}
                      <span
                        className="ml10"
                        style={
                          active === board.key
                            ? {
                                color: '#000',
                                fontWeight: 'bold'
                              }
                            : {}
                        }
                      >
                        {board.name}
                      </span>
                    </div>
                    <span
                      data-tip={
                        pinedLenses.includes(board.key)
                          ? 'Unpin Tool'
                          : 'Pin Tool'
                      }
                      data-for={forId}
                      onClick={e => handlePinLensClick(e, board.key)}
                    >
                      <Switch
                        on={pinedLenses.includes(board.key) ? true : false}
                        className="flex-r-center"
                      />
                      <Tooltip {...{ place: 'bottom' }} id={forId} />
                    </span>
                  </div>
                  <p className="tool-explorer_list-desc ml35">
                    {board.description}
                  </p>
                  <div
                    onClick={() => {
                      setActive(board.key);
                      handleSelectView(board.key);
                    }}
                    role="button"
                    className="tool-explorer_list-preview"
                  >
                    <span className="ml40">Preview</span>{' '}
                    <Icon fontSize={14} icon="arrow_forward" color="#fff" />
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default ToolExplorer;
