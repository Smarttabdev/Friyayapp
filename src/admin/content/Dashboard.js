import React, { Fragment, useState, useEffect } from 'react';
import { get } from 'lodash';
import { getToken } from 'Lib/ApiRequest';

import useGlobal from '../store';

import LoadingIndicator from 'Components/shared/LoadingIndicator';
import {
  CRow,
  CCol,
  CWidgetDropdown,
  CCallout,
  CInput,
  CLabel,
  CFormGroup,
  CSelect,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
  CPagination
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import './Dashboard.module.scss';

const usageColor = usage =>
  usage < 60 ? 'success' : usage < 90 ? 'warning' : 'danger';

const DiskSpace = ({ label, usage }) => (
  <CCallout color={usageColor(usage)}>
    <small className="text-muted">{label}</small>
    <br />
    <strong className="h4">{usage}%</strong>
  </CCallout>
);

const periodOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'thisWeek', label: 'This Week' },
  { value: 'lastWeek', label: 'Last Week' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'customRange', label: 'Custom Range' }
];

const getPeriodRange = period => {
  switch (period) {
    case 'today':
      return {
        start: moment().startOf('day'),
        end: moment().endOf('day')
      };
    case 'yesterday':
      return {
        start: moment()
          .subtract(1, 'day')
          .startOf('day'),
        end: moment()
          .subtract(1, 'day')
          .endOf('day')
      };
    case 'thisWeek':
      return {
        start: moment().startOf('week'),
        end: moment().endOf('week')
      };
    case 'lastWeek':
      return {
        start: moment()
          .subtract(1, 'week')
          .startOf('week'),
        end: moment()
          .subtract(1, 'week')
          .endOf('week')
      };
    case 'thisMonth':
      return {
        start: moment().startOf('month'),
        end: moment().endOf('month')
      };
    case 'lastMonth':
      return {
        start: moment()
          .subtract(1, 'month')
          .startOf('month'),
        end: moment()
          .subtract(1, 'month')
          .endOf('month')
      };
  }
};

const Dashboard = () => {
  const [stats, statsActions] = useGlobal(
    state => state.stats,
    actions => actions.stats
  );
  const [period, setPeriod] = useState('Today');
  const [periodStart, setPeriodStart] = useState(moment().startOf('day'));
  const [periodEnd, setPeriodEnd] = useState(moment().endOf('day'));
  const [newUserWeeks, setNewUserWeeks] = useState();
  const [activeUserKey, setActiveUserKey] = useState('allActiveUsers');

  const activeUserConfigs = {
    allActiveUsers: {},
    activeSignupsThisWeek: {
      signupDateFrom: moment()
        .startOf('week')
        .format(),
      signupDateTo: moment()
        .endOf('week')
        .format()
    },
    activeSignupsLastWeek: {
      signupDateFrom: moment()
        .startOf('week')
        .subtract(1, 'weeks')
        .format(),
      signupDateTo: moment()
        .endOf('week')
        .subtract(1, 'weeks')
        .format()
    },
    activeSignups2WeeksAgo: {
      signupDateFrom: moment()
        .startOf('week')
        .subtract(2, 'weeks')
        .format(),
      signupDateTo: moment()
        .endOf('week')
        .subtract(2, 'weeks')
        .format()
    },
    activeSignups3WeeksAgo: {
      signupDateFrom: moment()
        .startOf('week')
        .subtract(3, 'weeks')
        .format(),
      signupDateTo: moment()
        .endOf('week')
        .subtract(3, 'weeks')
        .format()
    },
    activeSignups4WeeksAndOlder: {
      signupDateFrom: moment()
        .year(1970)
        .format(),
      signupDateTo: moment()
        .startOf('week')
        .subtract(3, 'weeks')
        .format()
    }
  };

  const activeUsers = get(stats, activeUserKey, {});

  const getNewUsers = () => {
    const start = periodStart.clone();
    const end = periodEnd.clone();
    if (newUserWeeks) {
      start.subtract(newUserWeeks - 1, 'weeks');
    }
    statsActions.getNewUsers({
      periodStart: start.format(),
      periodEnd: end.format(),
      pageNumber: 1
    });
  };

  const getActiveUsers = key => {
    if (key) {
      statsActions.getActiveUsers({
        key,
        periodStart: periodStart.format(),
        periodEnd: periodEnd.format(),
        pageNumber: 1,
        ...activeUserConfigs[key]
      });
    } else {
      Object.keys(activeUserConfigs).forEach(key => {
        statsActions.getActiveUsers({
          key,
          periodStart: periodStart.format(),
          periodEnd: periodEnd.format(),
          pageNumber: 1,
          ...activeUserConfigs[key]
        });
      });
    }
  };

  useEffect(() => {
    statsActions.getDiskUsage();
    statsActions.getNewUserWeeks();
    getActiveUsers();
  }, []);

  useEffect(() => {
    getNewUsers();
  }, [newUserWeeks]);

  useEffect(() => {
    statsActions.getStats({
      periodStart: periodStart.format(),
      periodEnd: periodEnd.format()
    });
    getNewUsers();
    getActiveUsers();
  }, [periodStart, periodEnd]);

  const handleRefresh = () => {
    statsActions.getDiskUsage();
    statsActions.getStats({
      periodStart: periodStart.format(),
      periodEnd: periodEnd.format()
    });
    getNewUsers();
    getActiveUsers();
    statsActions.getNewUserWeeks();
  };

  const handleChangePeriod = e => {
    setNewUserWeeks();
    setPeriod(e.target.value);
    if (e.target.value !== 'customRange') {
      const { start, end } = getPeriodRange(e.target.value);
      setPeriodStart(start);
      setPeriodEnd(end);
    }
  };

  const handleNewUsersPageChange = pageNumber => {
    const start = periodStart.clone();
    if (newUserWeeks) {
      start.subtract(newUserWeeks - 1, 'weeks');
    }
    pageNumber >= 1 &&
      statsActions.getNewUsers({
        periodStart: start.format(),
        periodEnd: periodEnd.format(),
        pageNumber
      });
  };

  const handleActiveUsersPageChange = pageNumber => {
    pageNumber >= 1 &&
      statsActions.getActiveUsers({
        key: activeUserKey,
        periodStart: periodStart.format(),
        periodEnd: periodEnd.format(),
        pageNumber,
        ...activeUserConfigs[activeUserKey]
      });
  };

  const ActiveUserWeek = ({ label, count, active, onClick }) => (
    <div
      className="col-xs-12 col-md text-center"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div
        className="text-muted"
        style={{ borderBottom: active ? '1px solid red' : undefined }}
      >
        {label}
      </div>
      <strong>{count}</strong>
    </div>
  );

  return (
    <Fragment>
      <CRow>
        <CCol className="d-flex flex-row justify-content-end">
          <CButton color="primary" onClick={handleRefresh}>
            <CIcon name="cilReload" />
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CFormGroup row>
            <CCol md="2">
              <CLabel htmlFor="period">Period</CLabel>
            </CCol>
            <CCol md="4">
              <CSelect
                custom
                id="period"
                value={period}
                onChange={handleChangePeriod}
              >
                {periodOptions.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </CSelect>
            </CCol>
          </CFormGroup>
          {period === 'customRange' && (
            <Fragment>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="period-start">Period Start</CLabel>
                </CCol>
                <CCol md="4">
                  <CInput
                    id="period-start"
                    type="date"
                    value={moment(periodStart).format('YYYY-MM-DD')}
                    onChange={e =>
                      setPeriodStart(moment(e.target.value).startOf('day'))
                    }
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="2">
                  <CLabel htmlFor="period-end">Period End</CLabel>
                </CCol>
                <CCol md="4">
                  <CInput
                    id="period-end"
                    type="date"
                    value={periodEnd.format('YYYY-MM-DD')}
                    onChange={e =>
                      setPeriodEnd(moment(e.target.value).endOf('day'))
                    }
                  />
                </CCol>
              </CFormGroup>
            </Fragment>
          )}
        </CCol>
      </CRow>
      <CRow className="position-relative">
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-danger"
            header={String(stats.numActiveUsers)}
            text="Active Users"
            className="mb-0 pb-5"
          />
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-warning"
            header={String(stats.newSignups)}
            text="New Signups"
            className="mb-0 pb-5"
          />
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-info"
            header={String(stats.totalUsers)}
            text="Total Users"
            className="mb-0 pb-5"
          />
        </CCol>
        <CCol sm="6" lg="3">
          <CWidgetDropdown
            color="gradient-primary"
            header={String(stats.totalDomains)}
            text="Domains"
            className="mb-0 pb-5"
          />
        </CCol>
        {stats.statsLoading && (
          <LoadingIndicator styleName="loading-indicator" />
        )}
      </CRow>
      <CRow className="position-relative">
        <CCol>
          <CCard className="active-users mt-4">
            <CCardHeader>
              <div className="row position-relative">
                <div
                  className="col-xs-12 col-md"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setNewUserWeeks()}
                >
                  New Signups
                </div>
                <ActiveUserWeek
                  label="1 Week"
                  count={stats.newUserWeeks.week1Count}
                  active={newUserWeeks == 1}
                  onClick={() => setNewUserWeeks(1)}
                />
                <ActiveUserWeek
                  label="2 Weeks"
                  count={stats.newUserWeeks.week2Count}
                  active={newUserWeeks == 2}
                  onClick={() => setNewUserWeeks(2)}
                />
                <ActiveUserWeek
                  label="3 Weeks"
                  count={stats.newUserWeeks.week3Count}
                  active={newUserWeeks == 3}
                  onClick={() => setNewUserWeeks(3)}
                />
                <ActiveUserWeek
                  label="4 Weeks"
                  count={stats.newUserWeeks.week4Count}
                  active={newUserWeeks == 4}
                  onClick={() => setNewUserWeeks(4)}
                />
                {activeUsers.loading && (
                  <LoadingIndicator styleName="loading-indicator" />
                )}
              </div>
            </CCardHeader>
            <CCardBody style={{ overflow: 'auto' }}>
              <CDataTable
                items={stats.newUsers.data}
                fields={[
                  '#',
                  'id',
                  'name',
                  'email',
                  'created_at',
                  'last_activity_at'
                ]}
                hover
                striped
                bordered
                size="sm"
                scopedSlots={{
                  '#': item => <td>{item.row_num}</td>,
                  name: item => (
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                  ),
                  created_at: item => (
                    <td>{moment(item.created_at).format()}</td>
                  ),
                  last_activity_at: item => (
                    <td>{moment(item.last_activity_at).format()}</td>
                  )
                }}
                pagination={false}
              />
            </CCardBody>
            <CRow className="justify-content-space-between align-items-center">
              <CCol sm="12" lg="8">
                <CPagination
                  className="ml-3 mb-0"
                  pages={get(stats.newUsers, 'meta.total_pages', 1)}
                  limit={5}
                  activePage={get(stats.newUsers, 'meta.current_page', 1)}
                  onActivePageChange={handleNewUsersPageChange}
                />
              </CCol>
              <CCol sm="12" lg="4" className="text-right pr-5">
                <form
                  method="post"
                  action={`${window.API_URL}/stats/new_users`}
                >
                  <input
                    type="hidden"
                    name="period_start"
                    value={String(periodStart)}
                  />
                  <input
                    type="hidden"
                    name="period_end"
                    value={String(periodEnd)}
                  />
                  <input type="hidden" name="auth_token" value={getToken()} />
                  <input type="hidden" name="export" value="csv" />
                  <a
                    href={`${window.API_URL}/stats/new_users?period_start=${periodStart}&period_end=${periodEnd}&export=csv`}
                    onClick={e => {
                      e.preventDefault();
                      e.target.parentElement.submit();
                    }}
                    role="button"
                  >
                    Download CSV
                  </a>
                </form>
              </CCol>
            </CRow>
          </CCard>
        </CCol>
        {activeUsers.Loading && (
          <LoadingIndicator styleName="loading-indicator" />
        )}
      </CRow>
      <CRow className="position-relative">
        <CCol>
          <CCard className="active-users mt-4">
            <CCardHeader>
              <div className="row position-relative">
                <div className="col-xs-12 col-md">Active Users</div>
                <ActiveUserWeek
                  label="All active users"
                  count={get(stats, 'allActiveUsers.meta.total_count')}
                  active={activeUserKey == 'allActiveUsers'}
                  onClick={() => setActiveUserKey('allActiveUsers')}
                />
                <ActiveUserWeek
                  label="This week"
                  count={get(stats, 'activeSignupsThisWeek.meta.total_count')}
                  active={activeUserKey == 'activeSignupsThisWeek'}
                  onClick={() => setActiveUserKey('activeSignupsThisWeek')}
                />
                <ActiveUserWeek
                  label="1 week"
                  count={get(stats, 'activeSignupsLastWeek.meta.total_count')}
                  active={activeUserKey == 'activeSignupsLastWeek'}
                  onClick={() => setActiveUserKey('activeSignupsLastWeek')}
                />
                <ActiveUserWeek
                  label="2 weeks"
                  count={get(stats, 'activeSignups2WeeksAgo.meta.total_count')}
                  active={activeUserKey == 'activeSignups2WeeksAgo'}
                  onClick={() => setActiveUserKey('activeSignups2WeeksAgo')}
                />
                <ActiveUserWeek
                  label="3 weeks"
                  count={get(stats, 'activeSignups3WeeksAgo.meta.total_count')}
                  active={activeUserKey == 'activeSignups3WeeksAgo'}
                  onClick={() => setActiveUserKey('activeSignups3WeeksAgo')}
                />
                <ActiveUserWeek
                  label="+4 weeks"
                  count={get(
                    stats,
                    'activeSignups4WeeksAndOlder.meta.total_count'
                  )}
                  active={activeUserKey == 'activeSignups4WeeksAndOlder'}
                  onClick={() =>
                    setActiveUserKey('activeSignups4WeeksAndOlder')
                  }
                />
                {activeUsers.loading && (
                  <LoadingIndicator styleName="loading-indicator" />
                )}
              </div>
            </CCardHeader>
            <CCardBody style={{ overflow: 'auto' }}>
              <CDataTable
                items={activeUsers.data}
                fields={[
                  '#',
                  'user_id',
                  'name',
                  'email',
                  'domain',
                  'last_activity_at',
                  'last_activity',
                  'created_at'
                ]}
                hover
                striped
                bordered
                size="sm"
                scopedSlots={{
                  '#': (item, i) => <td>{i + 1}</td>,
                  name: item => (
                    <td>
                      {item.first_name} {item.last_name}
                    </td>
                  ),
                  last_activity_at: item => (
                    <td>{moment(item.last_activity_at).format()}</td>
                  ),
                  created_at: item => (
                    <td>{moment(item.created_at).format()}</td>
                  )
                }}
                pagination={false}
              />
            </CCardBody>
            <CPagination
              className="ml-3"
              pages={get(activeUsers, 'meta.total_pages', 1)}
              limit={5}
              activePage={get(activeUsers, 'meta.current_page', 1)}
              onActivePageChange={handleActiveUsersPageChange}
            />
          </CCard>
        </CCol>
        {activeUsers.Loading && (
          <LoadingIndicator styleName="loading-indicator" />
        )}
      </CRow>
      <CRow className="position-relative">
        <CCol sm="6" lg="3">
          <DiskSpace
            usage={stats.diskUsages.prod}
            label="Production Machine Disk"
          />
        </CCol>
        <CCol sm="6" lg="3">
          <DiskSpace
            usage={stats.diskUsages.stage}
            label="Stage Machine Disk"
          />
        </CCol>
        <CCol sm="6" lg="3">
          <DiskSpace
            usage={stats.diskUsages.cable}
            label="Cable Machine Disk"
          />
        </CCol>
        {stats.diskUsageLoading && (
          <LoadingIndicator styleName="loading-indicator" />
        )}
      </CRow>
    </Fragment>
  );
};

export default Dashboard;
