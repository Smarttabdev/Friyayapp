import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { loginUser, resetUser, socialAuth } from 'Actions/appUser';
import { slackCheck } from 'Src/newRedux/integrationFiles/slack/thunks';
import TipHiveLogo from 'Components/shared/tiphive_logo';
import Alert from 'Components/shared/alert';
import analytics, { createUserForMixpanelFromReduxUser } from 'Lib/analytics';
import Auth from 'Lib/auth';
import { setLaunchComplete } from 'Src/newRedux/session/actions';
import { getRedirectUriForSlack } from 'Lib/utilities';
import qs from 'querystringify';

class LoginPage extends Component {
  static propTypes = {
    reset: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    error: PropTypes.shape({
      title: PropTypes.string,
      details: PropTypes.array
    }),
    isLoading: PropTypes.bool,
    history: PropTypes.object.isRequired,
    domain: PropTypes.shape({}),
    googleAuthLogin: PropTypes.func.isRequired
  };

  state = {
    email: '',
    password: '',
    isLoading: false
  };

  async componentDidMount() {
    this.props.reset();
    // this.props.slackCheck();
    this.props.setLaunchComplete(false);
    const { isLogin } = await Auth.validateToken(false);
    const queryUrl = Auth.getSubdomainToQuery(isLogin);
    if (isLogin) this.redirectIfSubdomain();
    else if (queryUrl) window.location.assign(queryUrl);
  }

  onChange = ({ target: { name, value } }) =>
    this.setState(state => ({ ...state, [name]: value }));

  redirectIfSubdomain = () => {
    const { history } = this.props;
    const { protocol, search, host, hostname } = window.location;
    const { tenant } = qs.parse(search);
    if (tenant && hostname.startsWith(window.APP_HOST)) {
      const newUrl = protocol + '//' + tenant + '.' + host + '/';
      window.location.assign(newUrl);
      return;
    } else history.push('/choose_domain');
  };

  googleLogin = async data => {
    analytics.track('Google Login');
    this.setState({ isLoading: true });

    const socialData = {
      provider: 'google',
      auth_uid: data.googleId,
      auth_token: data.accessToken,
      auth_token_id: data.tokenId,
      email: data.profileObj.email,
      name: data.profileObj.name,
      first_name: data.profileObj.givenName,
      last_name: data.profileObj.familyName
    };

    const { error, user, isLogged } = await this.props.googleAuthLogin({
      socialData: socialData,
      invitationToken: '',
      type: 'login'
    });

    if (error) {
      analytics.track('New User Registration Contained Error', {
        errors: error
      });
      this.setState({ errors: error, isLoading: false });
    }
    if (isLogged) {
      analytics.track('user login google: ', { user: user });
      analytics.track('Logged In');
      console.log(this.redirectIfSubdomain());
      this.redirectIfSubdomain();
    }
  };

  handleSubmit = async e => {
    e.preventDefault();

    const {
      props: { reset, login },
      state: { email, password }
    } = this;

    reset();
    this.setState({ isLoading: true });
    const { isLogged, user } = await login({ email, password });

    console.log('login done', isLogged, user);
    if (isLogged) {
      analytics.identify(createUserForMixpanelFromReduxUser(user));
      analytics.track('Logged In');

      this.redirectIfSubdomain();
    }
  };

  render() {
    const {
      props: {
        error: { title, details },
        isLoading
      }
    } = this;

    let loginHeader = <h1 className="text-center form-heading">Login</h1>;
    let signUpAction = null;

    const scope = 'identity.basic,identity.email,identity.team,identity.avatar';
    const { SLACK_APP_AUTHORIZATION_URI, SLACK_APP_KEY } = window;
    const state = btoa(JSON.stringify({ type: 'login' }));

    const slackURL = `${SLACK_APP_AUTHORIZATION_URI}?user_scope=${scope}&client_id=${SLACK_APP_KEY}&state=${state}&redirect_uri=${getRedirectUriForSlack()}`;

    if (window.isSubdomain) {
      loginHeader = (
        <h1 className="text-center form-heading">
          Login to
          <br />
          <small>{window.currentHost}</small>
        </h1>
      );
    } else {
      signUpAction = (
        <p>
          Need an account?{' '}
          <Link to="/join">
            <strong>Sign up</strong>
          </Link>
        </p>
      );
    }

    return (
      <div className="container-fluid page-container-full login-page">
        <div className="row">
          <div className="col-sm-12 text-center pt15">
            <TipHiveLogo />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 login-section">
            {loginHeader}

            <form
              method="post"
              className="concise"
              action="#"
              onSubmit={this.handleSubmit}
            >
              {(title || details.length > 0) && (
                <Alert
                  type="danger"
                  message={
                    title ||
                    'There are errors that prevent this form from being submitted:'
                  }
                  errors={details}
                />
              )}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="Email address"
                  defaultValue={Auth.getCookie('user_email')}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  className="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              <div
                className="form-group mt20"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <input
                  style={{ width: 100 }}
                  disabled={isLoading}
                  type="submit"
                  name="submit"
                  className="btn btn-default btn-block text-center"
                  value={isLoading ? 'Sending...' : 'Login'}
                />
              </div>
            </form>

            <div className="login-page">
              <h4 className="login-page-title">or Login with:</h4>
              <div className="row">
                <div className="col-md-6">
                  <a
                    href={
                      isLoading ? 'void(0)' : slackURL
                    } /* to diasble the a tag*/
                    className="login-page-slack auth_btn"
                  >
                    <img src="/images/slack_rgb_60.png" />
                  </a>
                </div>
                <div className="col-md-6">
                  <GoogleLogin
                    clientId={window.GOOGLE_APP_KEY}
                    render={renderProps => (
                      <button
                        className="login-page-google auth_btn"
                        onClick={renderProps.onClick}
                        disabled={isLoading}
                      >
                        <img src="/images/google.png" />
                      </button>
                    )}
                    onSuccess={this.googleLogin}
                    onFailure={this.signUpFailure}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
              </div>
            </div>

            <div className="form-more-actions text-center">
              {signUpAction}
              <p>
                Forgot password?{' '}
                <Link to="/forgot_password">
                  <strong>Reset</strong>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  error: state.appUser.error,
  isLoading: state.appUser.isLoading,
  slack: state._newReduxTree.integrationFiles.slack
});

const mapDispatch = {
  login: loginUser,
  reset: resetUser,
  googleAuthLogin: socialAuth,
  slackCheck,
  setLaunchComplete
};

export default connect(mapState, mapDispatch)(LoginPage);
