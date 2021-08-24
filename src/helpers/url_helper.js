export const VIEWS_REGEX = new RegExp('(boards/)\\d+(-[a-z0-9-]+)', 'g');
export const NO_GROUP_REGEX = new RegExp('(/groups/)\\d+(-[a-z0-9-]+)', 'g');

export default (pathname, slug, type, rootUrl = '') => {
  const urlMap = {
    team: pathname.includes('groups')
      ? pathname
      : pathname.replace('/', '/groups/'),
    board: pathname.includes('/boards')
      ? pathname
      : rootUrl.endsWith('/')
      ? rootUrl + 'boards/'
      : rootUrl + '/boards/'
  };
  let baseUrl = urlMap[type];

  const pathMap = {
    team: {
      base: 'groups',
      match: new RegExp('(groups/)\\d+(-[a-z0-9-]+)', 'g')
    },
    board: {
      base: 'boards',
      match: VIEWS_REGEX
    }
  };
  const { match, base } = pathMap[type];

  if (match.test(baseUrl)) {
    baseUrl = baseUrl.replace(match, `${base}/${slug}`);
  } else {
    baseUrl = baseUrl.replace(base, `${base}/${slug}`);
  }

  return baseUrl;
};
