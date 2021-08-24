import React from 'react';

export default {
  cssModifier: 'work-left',
  display: 'Hrs Left',
  resizableProps: {
    minWidth: '150'
  },
  render(card, resource_required = Number(card.attributes.resource_required)) {
    if (card.attributes.completed_percentage === 100) {
      return <span>0 Hrs</span>;
    } else if (resource_required) {
      const singlePercent = resource_required / 100;
      const completed = singlePercent * card.attributes.completed_percentage;
      const estimated_remaining = resource_required - completed;
      return <span>{estimated_remaining} Hrs</span>;
    }
    return '-';
  },
  renderSummary: () => null
};
