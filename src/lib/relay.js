import React from 'react';
import Cookies from 'js-cookie';
import {
  Environment,
  RecordSource,
  Store,
  Observable,
  fetchQuery as relayFetchQuery
} from 'relay-runtime';
import {
  QueryRenderer as RelayQueryRenderer,
  requestSubscription as relayRequestSubscription,
  commitMutation as relayCommitMutation,
  commitLocalUpdate
} from 'react-relay';
import {
  RelayNetworkLayer,
  urlMiddleware,
  batchMiddleware
} from 'react-relay-network-modern';
import { createRelaySubscriptionHandler } from 'graphql-ruby-client';
import { consumer } from 'Lib/action_cable/cable';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { getToken } from 'Lib/ApiRequest';

const subscriptionHandler = createRelaySubscriptionHandler({ cable: consumer });

const subscribeFn = (request, variables, cacheConfig) => {
  let sink;
  const observer = {
    onNext: data => {
      sink && sink.next(data);
    },
    onError: error => {
      sink && sink.error(error);
    },
    onCompleted: () => {
      sink && sink.complete();
    }
  };
  const subscriptionDisposable = subscriptionHandler(
    request,
    variables,
    cacheConfig,
    observer
  );
  const source = _sink => {
    sink = _sink;
    return subscriptionDisposable.dispose;
  };
  return new Observable(source);
};

const getHeaders = () => {
  const authToken = getToken();
  const authHeaders = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  return authHeaders;
};

const network = new RelayNetworkLayer(
  [
    urlMiddleware({
      url: window.GRAPHQL_URL,
      headers: getHeaders
    }),
    batchMiddleware({
      batchUrl: `${window.GRAPHQL_URL}/batch`,
      headers: getHeaders
    })
  ],
  {
    subscribeFn
  }
);

const store = new Store(new RecordSource(), {
  gcReleaseBufferSize: 10000,
  queryCacheExpirationTime: 1000 * 60 * 60 * 24
});

const env = new Environment({
  network,
  store,
  missingFieldHandlers: [
    {
      kind: 'scalar',
      handle: (field, record, args, proxy) => {
        // console.log('missing scalar handler', field, record, args, proxy)
        return null;
      }
    },
    {
      kind: 'linked',
      handle: (field, record, args, proxy) => {
        // console.log('missing linked handler', field, record, args, proxy)
        if (['teamDefaultPinnedLensesOrder', 'sharing'].includes(field.name)) {
          return undefined;
        }
        return null;
      }
    },
    {
      kind: 'pluralLinked',
      handle: (field, record, args, proxy) => {
        // console.log('missing pluralLinked handler', field, record, args, proxy)
        if (['blocks'].includes(field.name)) {
          return undefined;
        }
        return [];
      }
    }
  ]
});

export const fetchQuery = (query, vars) => relayFetchQuery(env, query, vars);

export const updateStore = cb => commitLocalUpdate(env, cb);

export const commitMutation = ({
  mutation,
  vars,
  onCompleted,
  onError,
  ...rest
}) => {
  return new Promise((resolve, reject) => {
    relayCommitMutation(env, {
      mutation,
      variables: vars,
      onCompleted: (response, errors) => {
        onCompleted && onCompleted(response, errors);
        resolve(response);
      },
      onError: err => {
        console.error(err);
        onError && onError(err);
        reject(err);
      },
      ...rest
    });
  });
};

export const requestSubscription = ({ vars, ...rest }) => {
  return relayRequestSubscription(env, {
    variables: vars,
    ...rest
  });
};

const queryRenderer = ({ query, vars, render, showLoader }) => (
  <RelayQueryRenderer
    environment={env}
    fetchPolicy="store-and-network"
    query={query}
    variables={vars}
    render={({ error, props }) => {
      if (error) {
        console.error(error, query.params.text);
        return (
          <span
            style={{
              backgroundColor: 'white',
              color: 'red',
              border: '1px solid red',
              padding: '0 4px',
              margin: 2,
              display: 'inline-block'
            }}
          >
            Error executing query. Check console for details.
          </span>
        );
      }
      if (!props && showLoader) {
        console.log('show loader', query.fragment.name, query, vars);
        return <LoadingIndicator />;
      }
      return render({ error, props });
    }}
  />
);

export const QueryRenderer = (Component, options) => {
  if (!options) {
    options = Component;
    Component = options.component;
  }
  const { query, vars, showLoader } = options;
  const hoc = componentProps => {
    return queryRenderer({
      query,
      vars: typeof vars === 'function' ? vars(componentProps) : vars,
      showLoader,
      render: ({ error, props }) => (
        <Component
          {...componentProps}
          {...props}
          queryError={error}
          queryLoaded={!!props}
        />
      )
    });
  };
  hoc.displayName = 'QueryRenderer';
  return hoc;
};

export default queryRenderer;
