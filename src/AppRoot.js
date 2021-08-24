import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd';
import MouseBackend from 'Lib/react-dnd/MouseBackend';
import { setupDataManager } from 'Src/dataManager/DataManager';
import { setRouterHistory } from 'Src/newRedux/routing/actions';
import { setLaunchComplete } from 'Src/newRedux/session/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Auth from 'Lib/auth';
import { getUser } from 'Src/newRedux/database/user/thunks';
import AppRouter from './components/Routes';
import './styles/main.scss';

const AppRoot = props => {
  const {
    history,
    setupDataManager,
    setRouterHistory,
    setLaunchComplete,
    isLoggedIn,
    getUser
  } = props;
  const refs = useRef({});

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname.startsWith('/introduction/')) {
      Auth.validateToken(false).then(({ isLogin }) => {
        isLogin && getUser();
      });
    }
  }, []);

  useEffect(() => {
    // fix unauthorized error on initial load by fetching only when logged in
    if (isLoggedIn) {
      setRouterHistory(history);
      refs.current.dataManager = setupDataManager();
      refs.current.dataManager.getLaunchData().then(() => {
        setLaunchComplete(true);
        refs.current.dataManager.updateReduxOnPageChange(props);
      });
    }
  }, [isLoggedIn]);

  return (
    <DndProvider backend={MouseBackend}>
      <AppRouter />
    </DndProvider>
  );
};

const mapState = state => {
  const { user } = stateMappings(state);
  const { pathname } = window.location;
  if (pathname === '/join') {
    // fix login flow bug - props change causes the JoinPage to be remounted and lose its internal states
    return {};
  }
  return {
    isLoggedIn: !!(user && user.id)
  };
};

const mapDispatch = {
  setupDataManager,
  setRouterHistory,
  setLaunchComplete,
  getUser
};

export default connect(mapState, mapDispatch)(AppRoot);
