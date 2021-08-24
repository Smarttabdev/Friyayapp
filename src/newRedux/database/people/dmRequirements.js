import { getPeople, getPerson } from 'Src/newRedux/database/people/thunks';
import { CACHE_AGE_MS } from 'AppConstants';

const dmRequirements = {
  people: {
    action: () => [getPeople, {}],
    key: () => `people`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  },
  person: {
    action: ({ personId }) => [getPerson, { personId: personId }],
    key: ({ personId }) => `person-${personId}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  }
};

export default dmRequirements;
