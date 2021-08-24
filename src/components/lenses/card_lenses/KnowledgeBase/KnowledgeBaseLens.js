import React from 'react';
import MyNotesLens from 'Components/lenses/card_lenses/MyNotes/MyNotesLens';

export default function KnowledgeBaseLens(props) {
  return (
    <MyNotesLens
      isKnowledgeBase
      {...props}
      containerClasses="knowledge-base-container"
    />
  );
}
