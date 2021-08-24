import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import { stateMappings } from 'Src/newRedux/stateMappings';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import ItemPage from 'Components/pages/ItemPage';
import { loginUser } from 'Src/actions/appUser';
import { fetchQuery } from 'Lib/relay';

const SharedPage = ({ match, loginUser, user, ...restProps }) => {
  const [tip, setTip] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loginUser({ sharing_token: match.params.token }).then(
      ({ isLogged }) => !isLogged && setError('Invalid URL')
    );
  }, []);

  useEffect(() => {
    if (!user?.attributes) return;
    fetchQuery(
      graphql`
        query SharedPageQuery($token: String!) {
          sharing(token: $token) {
            tip {
              id
              slug
            }
          }
        }
      `,
      {
        token: match.params.token
      }
    ).then(results => {
      if (!results.sharing) return '404 - Not Found';
      setTip(results.sharing.tip);
    });
  }, [user]);

  if (error) {
    return (
      <div className="p-a-5px">
        <span style={{ color: 'red' }}>Invalid sharing URL -- </span>
        <a href="/">Back to front</a>
      </div>
    );
  }

  return tip ? (
    <ItemPage
      cardSlug={tip.slug}
      match={match}
      {...restProps}
      hideBack
      hideMinimize
    />
  ) : (
    <LoadingIndicator />
  );
};

const mapDispatch = state => {
  const { user } = stateMappings(state);
  return {
    user
  };
};

export default withRouter(
  withLastLocation(connect(mapDispatch, { loginUser })(SharedPage))
);
