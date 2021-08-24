import React, { Fragment, useReducer } from 'react';
import Waypoint from 'react-waypoint';

import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { useForceUpdate } from 'Lib/hooks';

const LoadMore = ({
  relay,
  count = 15,
  auto,
  Component = 'div',
  className,
  style,
  hasMore,
  onLoadMore,
  scrollParent
}) => {
  const forceUpdate = useForceUpdate();

  // FIXME: workaround for stuck isLoading
  relay?.isLoading() && setTimeout(forceUpdate, 100);

  const handleLoaded = error => {
    error && console.error(error);
    forceUpdate();
  };

  const handleLoadMore = () => {
    if ((!hasMore && !relay?.hasMore()) || relay?.isLoading()) {
      return;
    }
    onLoadMore ? onLoadMore() : relay.loadMore(count, handleLoaded);
    forceUpdate();
  };

  return (hasMore !== undefined ? (
    hasMore
  ) : (
    relay.hasMore()
  )) ? (
    <Component>
      {relay && relay.isLoading() ? (
        <LoadingIndicator />
      ) : auto ? (
        <Fragment>
          <Waypoint onEnter={handleLoadMore} scrollableAncestor={scrollParent}>
            <div>
              <LoadingIndicator />
            </div>
          </Waypoint>
        </Fragment>
      ) : (
        <a
          className={className}
          style={{ display: 'block', textAlign: 'center', ...style }}
          onClick={handleLoadMore}
        >
          Load more
        </a>
      )}
    </Component>
  ) : null;
};

export default LoadMore;
