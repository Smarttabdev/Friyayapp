import React from 'react';
import MyNotesLens from 'Components/lenses/card_lenses/MyNotes/MyNotesLens';

export default function NotebookLens(props) {
  return <MyNotesLens isNotebook {...props} />;
}
