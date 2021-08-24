export const createTipsPaginationContainer = (
  Component,
  tipsQuery,
  tipsPaginationQuery
) =>
  createPaginationContainer(
    Component,
    {
      tipsQuery
    },
    {
      getConnectionFromProps: props => props?.tipsQuery?.tips,
      getFragmentVariables: (vars, count) => ({ ...vars, count }),
      getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
      query: tipsPaginationQuery
    }
  );
