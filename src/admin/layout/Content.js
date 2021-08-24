import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { CContainer, CFade } from '@coreui/react';

import routes from '../routes';

const Content = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={<LoadingIndicator />}>
          <Switch>
            {routes.map(
              (route, idx) =>
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
            )}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default Content;
