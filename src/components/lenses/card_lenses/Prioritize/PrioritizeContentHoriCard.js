import React from 'react';

import PrioritizeLane from './PrioritizeLane';
import IconButton from 'Components/shared/buttons/IconButton';
import CardDetails from 'Src/components/lenses/card_lenses/Card/CardDetails';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';

const tooltipOptions = { place: 'bottom' };

const PrioritizeContentHoriCard = ({
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
  selectedCardId,
  selectCard,
  color,
  background,
  isHome
}) => (
  <div className="kanban-view_main-section pl10">
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
    <ActiveFiltersPanel additionalContainerClass={'mb10'} />
    <div className="prioritize-view_card-container">
      <CardDetails cardId={selectedCardId} />
      <div className="prioritize-view_lanes-container horizontal card-details">
        {priorityLevels.map(priority => (
          <PrioritizeLane
            cardRequirements={cardRequirements}
            key={priority.id}
            priority={priority}
            topicId={topicId}
            horizontalView
            cardView
            selectedCardId={selectedCardId}
            onSelectCard={selectCard}
            onDropCard={onDropCard}
            cards={laneMap[priority.level] || []}
          />
        ))}
      </div>
    </div>
  </div>
);

export default PrioritizeContentHoriCard;
