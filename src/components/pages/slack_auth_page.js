import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TipHiveLogo from '../shared/tiphive_logo';
import qs from 'querystringify';
import { getRedirectUriForSlack } from 'Lib/utilities';
import { socialAuth } from 'Actions/appUser';
import analytics from 'Lib/analytics';
import Auth from 'Lib/auth';
import {
  slackAdd,
  slackLogin
} from 'Src/newRedux/integrationFiles/slack/thunks';

class SlackAuthPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func
    }),
    location: PropTypes.shape({
      search: PropTypes.string
    }),
    slackAuth: PropTypes.func,
    slackAdd: PropTypes.func,
    slackLogin: PropTypes.func
  };

  async componentDidMount() {
    const { protocol, hostname, host, search, pathname } = window.location;
    const params = qs.parse(search);
    const { tenant, code = '' } = params;
    const { type } = JSON.parse(atob(params.state));

    if (type === 'integration') {
      this.slackAdd();
      return;
    }
    const socialData = Auth.getSocialAuthData();
    if (socialData) {
      await this.callSocialAuth(socialData);
      return;
    }

    const redirectUri = getRedirectUriForSlack();
    console.log(redirectUri);
    const socialAuthData = { provider: 'slack', code, redirectUri };
    if (hostname.startsWith(window.APP_HOST) && tenant) {
      Auth.setSocialAuthData(socialAuthData);
      const newUrl = protocol + '//' + tenant + '.' + host + pathname + search;
      window.location.assign(newUrl);
      console.log(newUrl);
    } else await this.callSocialAuth(socialAuthData);
  }

  slackAdd = async () => {
    const { history } = this.props;
    const { protocol, host, search, hostname, pathname } = window.location;
    const { state, code = '' } = qs.parse(search);
    const { tenant, inviteAllUsers } = JSON.parse(atob(state));
    const redirectUri = getRedirectUriForSlack();
    if (hostname.startsWith(window.APP_HOST) && tenant) {
      const newUrl = protocol + '//' + tenant + '.' + host + pathname + search;
      window.location.assign(newUrl);
      return;
    }
    try {
      const data = await this.props.slackAdd(code, redirectUri, inviteAllUsers);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    history.push('/');
  };

  callSocialAuth = async data => {
    const { history } = this.props;
    const { state, tenant } = qs.parse(window.location.search);
    const { type, invitation_token = '' } = JSON.parse(atob(state));
    const { error, user, isLogged } = await this.props.slackAuth({
      socialData: data,
      invitationToken: invitation_token
    });

    if (error) {
      analytics.track('New User Registration Contained Error', {
        errors: error
      });
      history.push({
        pathname: type === 'register' ? '/join' : '/login',
        search: tenant ? qs.stringify({ tenant }, true) : ''
      });
    }
    if (isLogged) {
      analytics.track(
        `Slack User Successfully ${
          type === 'login' ? 'loggedin' : 'registered'
        }`,
        { user: user }
      );

      const hasToken = !!invitation_token;
      if (type === 'register') {
        analytics.alias(user);
        if (hasToken) {
          analytics.track('New User Joined From Invitation');
          history.push('/introduction/gidbf_guide_1');
        } else {
          analytics.track('New User Joined From Homepage');
          history.push({
            pathname: '/join',
            search: qs.stringify({ slack_register: true }, true)
          });
        }
      } else if (type === 'login')
        history.push(window.isSubdomain ? '/' : '/choose_domain');
    }
  };

  render() {
    const { state } = qs.parse(this.props.location.search);
    const { type } = JSON.parse(atob(state));
    const displayText = ['login', 'register'].includes(type)
      ? 'Please Wait while we authorizing Slack Login...'
      : 'Please wait while we authorizing Slack integration...';
    return (
      <div className="container-fluid page-container-full">
        <div className="row">
          <div className="col-sm-12">
            <TipHiveLogo className="navbar-brand" />
          </div>
        </div>

        <div className="row">
          <div className="container">
            <p className="text-center">{displayText}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = { slackAuth: socialAuth, slackAdd, slackLogin };

export default connect(null, mapDispatch)(SlackAuthPage);
