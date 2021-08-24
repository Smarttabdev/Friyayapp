import { useEffect, useRef, useReducer } from 'react';

export const useForceUpdate = () => {
  const [_, forceUpdate] = useReducer(a => a + 1, 0);
  return forceUpdate;
};

export const useOutsideAlerter = (ref, action) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export const useClickOutside = (ref, handler) => {
  const handlerRef = useRef();

  handlerRef.current = handler;

  const handleClickOutside = e => {
    if (!ref.current.contains(e.target)) {
      handlerRef.current(e);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, []);
};

export const useTopicCreatedUpdatedSubscription = (topicId, onNext) => {
  useEffect(() => {
    const disposers = [
      requestSubscription({
        subscription: graphql`
          subscription hooksTopicCreatedSubscription($topicId: ID!) {
            topicCreated(topicId: $topicId) {
              topic {
                id
              }
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        onNext
      }),
      requestSubscription({
        subscription: graphql`
          subscription hooksTopicUpdatedSubscription($topicId: ID!) {
            topicUpdated(topicId: $topicId) {
              topic {
                id
              }
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        onNext
      }),
      requestSubscription({
        subscription: graphql`
          subscription hooksTopicDeletedSubscription($topicId: ID!) {
            topicDeleted(topicId: $topicId) {
              topicId
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        onNext
      })
    ];
    return () => disposers.forEach(d => d.dispose());
  }, [topicId]);
};

export const useTipCreatedUpdatedSubscription = (topicId, onNext) => {
  useEffect(() => {
    const disposers = [
      requestSubscription({
        subscription: graphql`
          subscription hooksTipCreatedSubscription($topicId: ID!) {
            tipCreated(topicId: $topicId) {
              tip {
                id
              }
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        onNext
      }),
      requestSubscription({
        subscription: graphql`
          subscription hooksTipUpdatedSubscription($topicId: ID!) {
            tipUpdated(topicId: $topicId) {
              tip {
                id
              }
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        onNext
      }),
      requestSubscription({
        subscription: graphql`
          subscription hooksTipDeletedSubscription($topicId: ID!) {
            tipDeleted(topicId: $topicId) {
              tipId
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        onNext
      })
    ];
    return () => disposers.forEach(d => d.dispose());
  }, [topicId]);
};
