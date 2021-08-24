import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './App';

const AuthorizedRoutes = () => {
  return (
    <Switch>
      <Redirect
        from="/groups/:groupSlug/topics/:topicSlug"
        to="/groups/:groupSlug/boards/:topicSlug"
      />
      <Redirect
        from="/groups/:groupSlug/topics"
        to="/groups/:groupSlug/boards"
      />

      <Route
        path="/groups/:groupSlug/boards/:topicSlug"
        render={props => <App page="topic" {...props} />}
      />
      <Route
        path="/groups/:groupSlug/boards"
        render={props => <App page="topics" {...props} />}
      />
      <Route
        path="/groups/:groupSlug/users/:personId"
        render={props => <App page="user" {...props} />}
      />
      <Route
        path="/groups/:groupSlug/users"
        render={props => <App page="users" {...props} />}
      />
      <Route
        path="/groups/:groupSlug"
        render={props => <App page="home" {...props} />}
      />

      <Redirect from="/topics/:topicSlug" to="/boards/:topicSlug" />
      <Redirect from="/topics" to="/boards" />

      <Route
        path="/boards/:topicSlug"
        render={props => <App page="topic" {...props} />}
      />
      <Route
        path="/boards"
        render={props => <App page="topics" {...props} />}
      />

      <Route
        path="/users/:personId"
        render={props => <App page="user" {...props} />}
      />

      <Route path="/users" render={props => <App page="users" {...props} />} />
      <Route path="/" render={props => <App page="home" {...props} />} />
    </Switch>
  );
};

export default AuthorizedRoutes;
