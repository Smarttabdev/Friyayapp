import { CACHE_AGE_MS } from 'AppConstants';
import { getPendingEmails } from './thunks';

const dmRequirements = {
  pendingInvitationEmails: {
    action: () => [getPendingEmails, {}],
    key: () => 'pendingEmails',
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  }
};

export default dmRequirements;
