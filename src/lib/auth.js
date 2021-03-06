import Cookies from 'js-cookie';
import tiphive from './tiphive';
import qs from 'querystringify';
import APIRequest, { ApiRequest, getToken } from './ApiRequest';

const Auth = {
  //TODO: MH: Modify the change password page to use validateToken(), and remove funciton below:
  processAuthToken: function(callback) {
    var authToken = APIRequest.authToken();

    if (!authToken) {
      window.location.href = '/login';
    }

    // Check authToken expiration
    var tokenXHR = APIRequest.post({
      resource: 'decode_token',
      data: {
        token: authToken
      }
    });

    tokenXHR
      .done(function(response, status, xhr) {
        if (response && response.user_id && response.user_email) {
          // Do not remove userID & userEmail cookies
          Auth.setCookie('userId', response.user_id);
          Auth.setCookie('userEmail', response.user_email);
          callback({ isLogged: true });
        } else if (response) {
          if (
            response.guest_auth_token &&
            window.currentDomainName === 'support'
          ) {
            if (!localStorage.guestAuthToken) {
              callback({ isLogged: false });
              localStorage.guestAuthToken = response.guest_auth_token;

              setTimeout(function() {
                if (localStorage.redirectTo) {
                  window.location.href = localStorage.redirectTo;
                  delete localStorage.redirectTo;
                } else {
                  window.location.href = '/';
                }
              }, 500);

              return;
            }

            localStorage.guestAuthToken = response.guest_auth_token;
          }
        } else {
          callback({ isLogged: false });
        }
      })
      .fail(function(xhr, status, error) {
        // sweep user data if login failed
        Auth.sweepUserData();
        callback({ isLogged: false });
      });
  },

  checkDomainAccess: function(callback) {
    if (window.isSubdomain === false) {
      // Means we're on public
      return;
    }

    var hasDomainAccess = false;
    if (Auth.isLogged()) {
      var $loadDomainsXHR = APIRequest.get({
        resource: 'domains'
      });

      $loadDomainsXHR.done(function(response, status, xhr) {
        var domains = response['data'];

        if (domains.length === 0) {
          return callback(false);
        }

        $(domains).each(function(index, domain) {
          var attributes = domain.attributes;
          if (attributes.tenant_name === window.currentDomainName) {
            hasDomainAccess = true;
            return callback(true);
          }
        });
      });
    }
  },

  getDomainInfo: function(callback) {
    if (window.isSubdomain === false) {
      return;
    }

    var $loadDomainXHR = APIRequest.get({
      resource: 'domains/' + window.currentDomainName + '/show'
    });

    $loadDomainXHR.done(function(response, status, xhr) {
      window.currentDomain = response['data'];
      return callback(window.currentDomain);
    });
  },

  sweepUserData: function() {
    if (document.cookie) {
      let cookies = document.cookie.split(';');
      cookies.forEach(value => {
        Auth.deleteCookie(value.split('=')[0].trim(''));
      });

      window.currentUser = null;
    }
  },

  isLogged: () => {
    return (
      tiphive.isPublicDomain() ||
      tiphive.isSupportDomain() ||
      getToken() !== null
    );
  },

  logout: function(history) {
    var $logoutXHR = APIRequest.delete({ resource: 'sessions' });

    $logoutXHR.always(function() {
      Auth.sweepUserData();
      history.push('/login');
    });
  },

  domainNameWithoutPort: () => '.' + window.APP_DOMAIN.split(':')[0],

  getCookie: key => Cookies.get(key),

  setCookie: function(key, value) {
    const domain = this.domainNameWithoutPort();
    Cookies.set(key, value, { domain });

    if (key === 'authToken') {
      const event = new CustomEvent('TipHiveJS:authToken', {
        detail: { authToken: value }
      });
      window.dispatchEvent(event);
    }
  },

  deleteCookie: function(key) {
    Cookies.remove(key, { domain: this.domainNameWithoutPort() });
    Cookies.remove(key);
  },

  setToken(provider, authorizedData) {
    Cookies.set(`${provider}RefreshToken`, authorizedData.refreshToken, {
      domain: `.${window.APP_DOMAIN}`,
      expires: 365
    });

    Cookies.set(`${provider}AccessToken`, authorizedData.accessToken, {
      domain: `.${window.APP_DOMAIN}`,
      expires: authorizedData.expires
    });
  },

  setUser: function(user) {
    let avatarURL = window.DEFAULT_AVATAR_URL;

    let userProfile = user.relationships.user_profile;
    if (userProfile) avatarURL = userProfile.data.avatar_url;

    window.currentUser = {
      id: user.id,
      email: user.attributes.email,
      username: user.attributes.username,
      firstName: user.attributes.first_name,
      lastName: user.attributes.last_name,
      name: user.attributes.first_name + ' ' + user.attributes.last_name,
      avatarURL: avatarURL
    };

    localStorage.userID = window.currentUser.id;
    localStorage.userEmail = window.currentUser.email;
    localStorage.userUsername = window.currentUser.username;
    localStorage.userFirstName = window.currentUser.firstName;
    localStorage.userLastName = window.currentUser.lastName;
    localStorage.userName = window.currentUser.name;
    localStorage.userAvatarURL = window.currentUser.avatarURL;
  },

  getStoredUser: function() {
    return {
      id: localStorage.userID,
      email: localStorage.userEmail,
      username: localStorage.userUsername,
      firstName: localStorage.userFirstName,
      lastName: localStorage.userLastName,
      name: localStorage.userName,
      avatarURL: localStorage.userAvatarURL
    };
  },

  setNotificationSettings: ({ attributes: { notification_settings } }) => {
    for (let { key, value } of notification_settings) {
      localStorage.setItem(key, value);
    }
  },

  setIntegrationTokens: ({
    relationships: {
      user_profile: {
        data: { integration_tokens = [] }
      }
    }
  }) => {
    for (let { key, value } of integration_tokens) {
      if (value) {
        localStorage.setItem(key, value);
      }
    }
  },

  getUser: function() {
    return window.currentUser || this.getStoredUser();
  },

  validateToken: async saveRedirect => {
    const { pathname, search } = window.location;
    const failValidation = () => {
      if (saveRedirect) localStorage.setItem('redirectTo', pathname + search);
      return { isLogin: false, destination: '/login' + search };
    };

    const passValidation = () => {
      const lastRedirect = localStorage.getItem('redirectTo');
      localStorage.removeItem('redirectTo');
      return {
        isLogin: true,
        destination: lastRedirect || pathname + search
      };
    };

    try {
      const token = getToken();
      if (!token) {
        return failValidation();
      }
      const {
        data: { user_id = null, user_email = null, guest_auth_token = null }
      } = await ApiRequest.request({
        method: 'POST',
        url: 'decode_token',
        data: { token }
      });

      const { currentDomainName } = window;

      if (user_id !== null && user_email !== null) {
        Auth.setCookie('userId', user_id);
        Auth.setCookie('userEmail', user_email);
        return passValidation();
      } else if (guest_auth_token !== null && currentDomainName === 'support')
        return passValidation();
    } catch (err) {
      console.error(err);
      if (err.response.status == 500) Auth.deleteCookie('authToken');
      return failValidation();
    }
  },

  getSubdomainToQuery: isLogin => {
    const { hostname, search, origin, pathname } = window.location;
    const oldParams = qs.parse(search);
    if (
      !isLogin &&
      !hostname.startsWith(window.APP_HOST) &&
      !oldParams.tenant
    ) {
      const tenant = hostname.split('.')[0];
      if (tenant === 'www')
        return origin.replace(tenant + '.', '') + pathname + search;
      const params = qs.stringify({ tenant, ...oldParams }, true);
      return origin.replace(tenant + '.', '') + pathname + params;
    }
    return null;
  },

  setSocialAuthData: socialData => {
    Auth.setCookie('socialAuthData', btoa(JSON.stringify(socialData)));
  },

  getSocialAuthData: () => {
    const socialAuthData = Auth.getCookie('socialAuthData');
    Auth.deleteCookie('socialAuthData');
    if (!socialAuthData) return null;
    return JSON.parse(atob(socialAuthData));
  }
};

export default Auth;
