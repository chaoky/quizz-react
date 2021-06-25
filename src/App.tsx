import { Container, CssBaseline } from '@material-ui/core';
import React from 'react';

import { AppCtx, useLocalStorage, useStyles } from './Components';
import Menu from './Pages/Menu';
import OverView from './Pages/OverView';
import TestPage from './Pages/Test';
import { Test } from './types';

export default function App() {
  const css = useStyles();
  const [currView, setCurrView] = useLocalStorage('currView', 'overView');
  const [allTests, setAllTests] = useLocalStorage('allTests', [] as Test[]);
  const [currTest, setCurrTest] = useLocalStorage('currTest', null);

  const defaultAppCtx = {
    allTests,
    setAllTests,
    currView,
    setCurrView,
    setCurrTest,
    currTest,
  } as AppCtx;

  //TODO use a proper router
  return (
    <AppCtx.Provider value={defaultAppCtx}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={css.paper}>
          {currView == 'overView' && <OverView />}
          {currView == 'menu' && <Menu />}
          {currView == 'test' && <TestPage />}
        </div>
      </Container>
    </AppCtx.Provider>
  );
}
