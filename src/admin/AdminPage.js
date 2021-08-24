import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader/root';

import Auth from 'Lib/auth';

import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import Content from './layout/Content';
import Footer from './layout/Footer';
import icons from './icons';

import '@coreui/coreui/scss/coreui.scss';
import './styles.module.scss';

React.icons = icons;

const AdminPage = ({ history }) => {
  useEffect(() => {
    (async function() {
      const { pathname, search } = window.location;
      const { isLogin, destination } = await Auth.validateToken(true);
      if (!isLogin && destination !== pathname + search) {
        history.push(destination);
      }
    })();
  }, []);

  return (
    <div className="c-app c-default-layout">
      <Helmet>
        <title>Friyay - Admin</title>
      </Helmet>
      <Sidebar />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <Content />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default hot(AdminPage);
