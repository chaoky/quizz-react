import React from "react";
import { Container, Typography, CssBaseline } from "@material-ui/core";

import OverView from "./Overview";
import Questions from "./Questions";
import Menu from "./Menu";
import { AppCtx, useLocalStorage, useStyles } from "./Components";
import { Test } from "./types";

export default function App() {
  const css = useStyles();
  const [currView, setCurrView] = useLocalStorage("currView", "overView");
  const [allTests, setAllTests] = useLocalStorage("allTests", [] as Test[]);
  const [currTest, setCurrTest] = useLocalStorage("currTest", null);

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
          {currView == "overView" && <OverView />}
          {currView == "menu" && <Menu />}
          {currView == "test" && <Questions />}
        </div>
      </Container>
    </AppCtx.Provider>
  );
}
