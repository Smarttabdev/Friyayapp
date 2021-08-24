import React, { Suspense } from 'react';

import LoadingIndicator from 'Components/shared/LoadingIndicator';

export function WaitingComponent(Component) {
  return props => (
    <Suspense fallback={<LoadingIndicator />}>
      <Component {...props} />
    </Suspense>
  );
}

const lazyComponent = importer => WaitingComponent(React.lazy(importer));

export default lazyComponent;
