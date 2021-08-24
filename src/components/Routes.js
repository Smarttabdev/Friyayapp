import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
// import JoinPage from './pages/JoinPage';
// import LoginPage from './pages/LoginPage';
// import IntroductionPage from './pages/introduction_page';
// import ForgotPasswordPage from './pages/forgot_password_page';
// import EditPasswordPage from './pages/edit_password_page';
// import DomainChoosePage from './pages/domain_choose_page';
const SharedPage = React.lazy(() =>
  import(/* webpackChunkName: "SharedPage" */ './pages/SharedPage')
);
const JoinPage = React.lazy(() =>
  import(/* webpackChunkName: "JoinPage" */ './pages/JoinPage')
);
const LoginPage = React.lazy(() =>
  import(/* webpackChunkName: "LoginPage" */ './pages/LoginPage')
);
const IntroductionPage = React.lazy(() =>
  import(/* webpackChunkName: "IntroductionPage" */ './pages/introduction_page')
);
const ForgotPasswordPage = React.lazy(() =>
  import(
    /* webpackChunkName: "ForgotPasswordPage" */ './pages/forgot_password_page'
  )
);
const EditPasswordPage = React.lazy(() =>
  import(
    /* webpackChunkName: "EditPasswordPage" */ './pages/edit_password_page'
  )
);
const DomainChoosePage = React.lazy(() =>
  import(
    /* webpackChunkName: "DomainChoosePage" */ './pages/domain_choose_page'
  )
);
const AuthorizedRoutes = React.lazy(() =>
  import(/* webpackChunkName: "AuthorizedRoutes" */ './AuthorizedRoutes')
);
import AuthCallbackPage from './pages/auth_callback_page';
import SlackAuthPage from './pages/slack_auth_page';
import analytics from 'Lib/analytics';
import { WaitingComponent } from './lazy';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    analytics.init();
  }

  render() {
    return (
      <BrowserRouter>
        <LastLocationProvider>
          <Switch>
            <Route
              path="/sharing/:token"
              component={WaitingComponent(SharedPage)}
            />
            <Route
              path="/choose_domain"
              component={WaitingComponent(DomainChoosePage)}
            />
            <Route path="/join" component={WaitingComponent(JoinPage)} />
            <Route path="/login" component={WaitingComponent(LoginPage)} />
            <Route
              path="/introduction/:step"
              component={WaitingComponent(IntroductionPage)}
            />
            <Route
              path="/introduction"
              component={WaitingComponent(IntroductionPage)}
            />
            <Route
              path="/forgot_password"
              component={WaitingComponent(ForgotPasswordPage)}
            />
            <Route
              path="/edit_password"
              component={WaitingComponent(EditPasswordPage)}
            />
            <Route
              path="/auth/callback/:provider"
              render={props => <AuthCallbackPage {...props} />}
            />
            <Route path="/slack/auth" component={SlackAuthPage} />
            <Route path="/" component={WaitingComponent(AuthorizedRoutes)} />
          </Switch>
        </LastLocationProvider>
      </BrowserRouter>
    );
  }
}

export default hot(AppRouter);
