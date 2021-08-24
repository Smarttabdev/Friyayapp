import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  registerUser,
  resetUser,
  socialAuth,
  existingEmail
} from 'Actions/appUser';
import { GoogleLogin } from 'react-google-login';
import Alert from 'Components/shared/alert';
import analytics from 'Lib/analytics';
import Auth from './../../lib/auth';
import qs from 'querystringify';
import { getRedirectUriForSlack } from 'Lib/utilities';
import DomainFormPageActions from './../../actions/domain_form_page_actions';
import DomainFormPageStore from './../../stores/domain_form_page_store';
import { cleanTenantName } from 'Lib/utilities';

class JoinPage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    googleAuthSignUp: PropTypes.func.isRequired
  };

  state = {
    existingUser: false,
    errors: null,
    isLoading: false,
    fullName: '',
    email: '',
    password: '',
    workspaceName: '',
    confirmPassword: '',
    currentFieldIndex: 0
  };

  fieldsData = [
    {
      index: 0,
      type: 'text',
      state: 'fullName',
      placeholder: 'your first name and last name'
    },
    {
      index: 1,
      type: 'email',
      state: 'email',
      placeholder: 'your email address'
    },
    {
      index: 2,
      type: 'password',
      state: 'password',
      placeholder: 'your password'
    },
    {
      index: 3,
      type: 'text',
      state: 'workspaceName',
      placeholder: 'your workspace name',
      info: '(i.e. your company, team, project, etc)'
    }
  ];

  onChange = ({ target: { value, name } }) =>
    this.setState(state => ({ ...state, [name]: value }));

  UNSAFE_componentWillMount() {
    this.props.reset();
  }

  async componentDidMount() {
    const socialData = Auth.getSocialAuthData();
    if (socialData) {
      socialData.provider == 'google'
        ? this.handleGoogleSignup(socialData)
        : this.handleEmailSignup(socialData);
      return;
    }
    const queryUrl = Auth.getSubdomainToQuery(false);
    if (queryUrl) {
      window.location.assign(queryUrl);
      return;
    }

    analytics.track('Join Page Visited');
    $('#app-container').css('height', '100%');

    const { email, slack_register } = qs.parse(window.location.search);
    email && this.validateUser(email.toLowerCase());

    slack_register &&
      this.setState({
        currentFieldIndex: this.fieldsData.findIndex(
          x => x.state === 'workspaceName'
        )
      });

    DomainFormPageStore.addEventListener(
      window.DOMAIN_CREATE_EVENT,
      (res, err) => this.onDomainCreate(res, err)
    );
  }

  componentWillUnmount() {
    DomainFormPageStore.removeEventListener(
      window.DOMAIN_CREATE_EVENT,
      (res, err) => this.onDomainCreate(res, err)
    );
  }

  getInvitationToken = () => qs.parse(location.search).invitation_token;

  validateUser = async email => {
    this.setState({ email, isLoading: true });
    const existingUser = await this.props.existingEmail(email);
    this.setState({ existingUser, isLoading: false });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const {
      state: {
        fullName,
        email,
        password,
        workspaceName,
        currentFieldIndex,
        isLoading
      },
      fieldsData
    } = this;

    if (isLoading) return;

    const name = fullName.trim().split(' ');
    const firstName = name[0];
    name.shift();
    const lastName = name.join(' ');

    if (fieldsData[currentFieldIndex].state === 'email') {
      this.setState({ isLoading: true, errors: null });
      const emailTaken =
        email && (await this.props.existingEmail(email.toLowerCase()));
      this.setState({ isLoading: false });
      if (emailTaken) {
        const errors = {
          title: 'Error',
          detail: ['Email has already been taken']
        };
        this.setState({ errors });
        return;
      }
    } else if (fieldsData[currentFieldIndex].state === 'password') {
      analytics.track('New User Submitted Registration');
      this.setState({ isLoading: true, errors: null });
      const socialData = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword: password,
        invitationToken: this.getInvitationToken()
      };

      const { protocol, hostname, host, search, pathname } = window.location;
      const params = qs.parse(search);
      const { tenant } = params;

      if (hostname.startsWith(window.APP_HOST) && tenant) {
        Auth.setSocialAuthData(socialData);
        const newUrl =
          protocol + '//' + tenant + '.' + host + pathname + search;
        window.location.assign(newUrl);
      } else this.handleEmailSignup(socialData);

      return;
    } else if (fieldsData[currentFieldIndex].state === 'workspaceName') {
      this.setState({ isLoading: true, errors: null });
      const domainSSOSettings = {
        domainSSOEnabled: false,
        domainIDPEntityID: null,
        domainIDPSSOTargetURL: null,
        domainIDPSLOTargetURL: null,
        domainIssuer: null
      };

      DomainFormPageActions.createDomain(
        workspaceName.trim().replace(/\s/g, '-'),
        workspaceName,
        domainSSOSettings,
        null,
        null
      );
      return;
    }

    this.setState({ currentFieldIndex: currentFieldIndex + 1, errors: null });
  };

  googleSignUp = async data => {
    analytics.track('New User Submitted Registration From Social Auth: Google');
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
    const { protocol, hostname, host, search, pathname } = window.location;
    const params = qs.parse(search);
    const { tenant } = params;

    if (hostname.startsWith(window.APP_HOST) && tenant) {
      Auth.setSocialAuthData(socialData);
      const newUrl = protocol + '//' + tenant + '.' + host + pathname + search;
      window.location.assign(newUrl);
    } else this.handleGoogleSignup(socialData);
  };

  handleGoogleSignup = async socialData => {
    const { error, user, isLogged } = await this.props.googleAuthSignUp({
      socialData: socialData,
      invitationToken: this.getInvitationToken()
    });
    this.registerHandlerFunction(error, user, isLogged);
  };

  handleEmailSignup = async socialData => {
    const { error, user, isLogged } = await this.props.register(socialData);
    this.registerHandlerFunction(error, user, isLogged);
  };

  getSlackRedirectionUrl = () => {
    const scope = 'identity.basic,identity.email,identity.team,identity.avatar';
    const stateData = {
      type: 'register',
      invitation_token: this.getInvitationToken() || ''
    };
    const state = btoa(JSON.stringify(stateData));
    const { SLACK_APP_AUTHORIZATION_URI, SLACK_APP_KEY } = window;

    return `${SLACK_APP_AUTHORIZATION_URI}?user_scope=${scope}&client_id=${SLACK_APP_KEY}&state=${state}&redirect_uri=${getRedirectUriForSlack()}`;
  };

  registerHandlerFunction = (error, user, isLogged) => {
    const { fieldsData } = this;
    this.setState({ isLoading: false });

    if (error) {
      analytics.track('New User Registration Contained Error', {
        errors: error
      });
      this.setState({ errors: error });
    }

    if (isLogged) {
      analytics.track('New User Successfully Registered', { user: user });
      analytics.alias(user);

      const hasToken = !!this.getInvitationToken();
      if (hasToken) {
        analytics.track('New User Joined From Invitation');
        this.props.history.push('/introduction/gidbf_guide_1');
      } else {
        analytics.track('New User Joined From Homepage');
        this.setState({
          currentFieldIndex: fieldsData.findIndex(
            x => x.state === 'workspaceName'
          )
        });
      }
    }
  };

  onDomainCreate(response) {
    this.setState({ isLoading: false });
    if (!response || !response.data) return false;
    const { name: domain, tenant_name } = response.data.attributes;
    Auth.setCookie('domainName', domain);
    analytics.track('Workspace(Domain) Created');
    const { APP_ENV, APP_PORT, APP_DOMAIN } = window;
    const port = APP_ENV === 'development' && APP_PORT ? ':' + APP_PORT : '';
    const newUrl = `//${tenant_name}.${APP_DOMAIN}${port}/introduction/initial_setup`;
    window.location.assign(newUrl);
  }

  getField = ({ index, type, state, placeholder, info }) => {
    const { email } = qs.parse(this.props.location.search);
    return (
      <div className="signup-page-input form-group">
        <input
          key={index}
          type={type}
          disabled={email && type === 'email'}
          name={state}
          className="form-control"
          placeholder={placeholder}
          required
          value={this.state[state]}
          onChange={this.onChange}
          autoFocus
        />
        <span className="separator" />
        {info && <span className="signup-page-info">{info}</span>}
      </div>
    );
  };

  renderForm = () => {
    const {
      state: { isLoading, currentFieldIndex, errors },
      fieldsData
    } = this;
    return (
      <Fragment>
        {currentFieldIndex === 0 && (
          <div className="text">{'Your name (to signup with your email)'}</div>
        )}
        <form
          className="signup-page-form"
          method="post"
          onSubmit={this.handleSubmit}
        >
          {errors && (
            <Alert
              type="danger"
              message={
                errors.title ||
                'There are errors that prevent this form from being submitted:'
              }
              errors={errors.detail}
            />
          )}
          {this.getField(fieldsData[currentFieldIndex])}
          <button
            type="submit"
            disabled={isLoading}
            className="signup-page-submit-btn"
          >
            <i
              className={
                isLoading
                  ? 'fa fa-spinner fa-pulse'
                  : 'fa fa-arrow-circle-right'
              }
            />
          </button>
        </form>
        {!currentFieldIndex && (
          <Fragment>
            <div className="text">Or signup with Slack or Google</div>
            <div className="signup-page-social row">
              <div className="col-md-6">
                <a
                  href={isLoading ? 'void(0)' : this.getSlackRedirectionUrl()}
                  className="signup-page-slack auth_btn"
                >
                  <img src="/images/slack_rgb_60.png" />
                </a>
              </div>
              <div className="col-md-6">
                <GoogleLogin
                  clientId={window.GOOGLE_APP_KEY}
                  render={renderProps => (
                    <button
                      className="signup-page-google auth_btn"
                      onClick={renderProps.onClick}
                      disabled={isLoading}
                    >
                      <img src="/images/google.png" />
                    </button>
                  )}
                  onSuccess={this.googleSignUp}
                  onFailure={this.signUpFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  };

  render() {
    const { isLoading, email, password, existingUser } = this.state;
    const { search } = window.location;

    return (
      <div className="signup-page">
        <img
          className={'signup-page-logo'}
          src="/images/friyay-logo-black.png"
        />
        <div className="signup-page-container">
          {!email || (!password && !existingUser) ? (
            this.renderForm()
          ) : isLoading ? (
            <i className={'fa fa-spinner fa-pulse big-loader'} />
          ) : existingUser ? (
            <div className="existing-user">
              <h2>Welcome Back: {email}</h2>
              <Link to={'/login' + search}>
                <strong>Log in</strong>
              </Link>
              <div>to Access The Workspace</div>
            </div>
          ) : (
            this.renderForm()
          )}

          <div className="signup-page-policy">
            <p>
              By creating an account, you accept our
              <a
                href="http://about.friyay.io/terms-of-service.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                &nbsp;Terms of Service
              </a>
              .
              <br />
              Already have an account?
              <Link to="/login">
                <strong>Log in</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  register: registerUser,
  googleAuthSignUp: socialAuth,
  reset: resetUser,
  existingEmail
};

export default withRouter(connect(null, mapDispatch)(JoinPage));
