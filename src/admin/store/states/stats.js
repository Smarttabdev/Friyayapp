import * as statsApi from '../../api/stats';

export default {
  state: {
    totalUsers: 0,
    totalDomains: 0,
    newSignups: 0,
    numActiveUsers: 0,
    newUsers: {
      data: []
    },
    newUserWeeks: {
      week1Count: 0,
      week2Count: 0,
      week3Count: 0,
      week4Count: 0
    },
    diskUsages: {
      prod: 0,
      stage: 0,
      cable: 0
    },
    statsLoading: false,
    diskUsageLoading: false,
    newUsersLoading: false,
    activeUsersLoading: false
  },
  actions: {
    getStats: async (store, { periodStart, periodEnd }) => {
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          statsLoading: true
        }
      });
      const res = await statsApi.getStats({ periodStart, periodEnd });
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          statsLoading: false
        }
      });
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          totalUsers: res.data.total_users,
          totalDomains: res.data.total_domains,
          newSignups: res.data.new_signups,
          numActiveUsers: res.data.num_active_users
        }
      });
    },
    getDiskUsage: async store => {
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          diskUsageLoading: true
        }
      });
      const res = await statsApi.getDiskUsage();
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          diskUsageLoading: false
        }
      });
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          diskUsages: {
            prod: res.data.disk_usage_prod,
            stage: res.data.disk_usage_stage,
            cable: res.data.disk_usage_cable
          }
        }
      });
    },
    getNewUsers: async (
      store,
      { periodStart, periodEnd, pageSize, pageNumber }
    ) => {
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          newUsersLoading: true
        }
      });
      const res = await statsApi.getNewUsers({
        periodStart,
        periodEnd,
        pageSize,
        pageNumber
      });
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          newUsersLoading: false
        }
      });
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          newUsers: res.data
        }
      });
    },
    getNewUserWeeks: async store => {
      const periodStart = moment().startOf('week');
      const periodEnd = moment().endOf('week');
      let res;

      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          newUserWeeks: {
            ...store.state.stats.newUserWeeks,
            loading: true
          }
        }
      });

      for (var i = 1; i <= 4; i++) {
        res = await statsApi.getNewUsers({ periodStart, periodEnd });
        store.setState({
          ...store.state,
          stats: {
            ...store.state.stats,
            newUserWeeks: {
              ...store.state.stats.newUserWeeks,
              [`week${i}Count`]: res.data.meta.total_count
            }
          }
        });
        periodStart.subtract(1, 'week');
      }

      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          newUserWeeks: {
            ...store.state.stats.newUserWeeks,
            loading: false
          }
        }
      });
    },
    getActiveUsers: async (
      store,
      {
        key,
        periodStart,
        periodEnd,
        signupDateFrom,
        signupDateTo,
        pageSize,
        pageNumber
      }
    ) => {
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          [key]: {
            ...store.state.stats[key],
            loading: true
          }
        }
      });
      const res = await statsApi.getActiveUsers({
        periodStart,
        periodEnd,
        signupDateFrom,
        signupDateTo,
        pageSize,
        pageNumber
      });
      store.setState({
        ...store.state,
        stats: {
          ...store.state.stats,
          [key]: {
            ...store.state.stats[key],
            ...res.data,
            loading: false
          }
        }
      });
    }
  }
};
