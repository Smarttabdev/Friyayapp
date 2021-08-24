import React from 'react';

import PrioritizeLane from './PrioritizeLane';
import IconButton from 'Components/shared/buttons/IconButton';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';

const tooltipOptions = { place: 'bottom' };

const PrioritizeContentVert = ({
  top,
  left,
  priorityLevels,
  cardRequirements,
  topicId,
  onDropCard,
  laneMap,
  toggleLens,
  displayLeftCardPanel,
  toggleLeftCardPanel,
  color,
  background,
  isHome
}) => (
  <div className={'kanban-view_main-section pl5'}>
    <IconButton
      containerClasses="left-section-icon-container"
      wrapperClasses="left-section-icon"
      style={{
        top,
        left,
        backgroundColor: '#fafafa'
      }}
      color={color}
      fontAwesome
      icon={displayLeftCardPanel ? 'chevron-left' : 'chevron-right'}
      onClick={toggleLeftCardPanel}
      tooltip="Hidden Cards"
      tooltipOptions={{ place: 'right' }}
    />
    <ActiveFiltersPanel additionalContainerClass={'mb10 pl5'} />
    <div className="kanban-view_lanes-container">
      {priorityLevels.map(priority => (
        <PrioritizeLane
          cardRequirements={cardRequirements}
          key={priority.id}
          priority={priority}
          topicId={topicId}
          onDropCard={onDropCard}
          cards={laneMap[priority.level] || []}
        />
      ))}
    </div>
  </div>
);

export default PrioritizeContentVert;
