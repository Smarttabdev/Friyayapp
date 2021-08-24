import React from 'react';

const Dashboard = React.lazy(() => import('./content/Dashboard'));

const routes = [{ path: '/', name: 'Dashboard', component: Dashboard }];

export default routes;
