import React, { Suspense } from 'react';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
const TextEditor_ = React.lazy(() =>
  import(/* webpackChunkName: "TextEditor" */ './TextEditor')
);

const TextEditor = props => (
  <Suspense fallback={<LoadingIndicator />}>
    <TextEditor_ {...props} />
  </Suspense>
);

export default TextEditor;
