import { useEffect } from 'react';

export const usePresenceUpdated = ({ channel, deps, onNext }) => {
  deps =
    deps === undefined || deps === null
      ? []
      : Array.isArray(deps)
      ? deps
      : [deps];

  useEffect(() => {
    const disposer = subscriptions.channelFlagUpdated({
      flag: 'presence',
      channel,
      onNext
    });
    return () => disposer.dispose();
  }, deps);
};
