import React, { useState } from "react";
import { Test } from "./types";
import { makeStyles } from "@material-ui/core";

type View = "menu" | "test" | "overView";
export interface AppCtx {
  allTests: Test[];
  setAllTests: (payload: Test[]) => void;
  currView: View;
  setCurrView: (payload: View) => void;
  currTest: Test | null;
  setCurrTest: (payload: Test | null) => void;
}
//TODO extract impl to HOC
export const AppCtx = React.createContext({} as AppCtx);

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (payload: T) => void] {
  const [state, setState] = useState(
    (): T => JSON.parse(localStorage.getItem(key)!) || initialValue
  );

  const setter = (payload: T) => {
    localStorage.setItem(key, JSON.stringify(payload));
    setState(payload);
  };

  return [state, setter];
}

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
  },
  form: {
    minWidth: "20vw",
    margin: theme.spacing(1),
  },
  fixed: {
    position: "fixed",
    bottom: "5vh",
    right: "10vw",
  },
  divider: {
    margin: theme.spacing(0, 1),
  },
  card: {
    maxWidth: "30em",
  },
  fixedColumns: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 3fr) minmax(0, 1fr)  minmax(0, 3fr)",
    wordBreak: "break-all",
  },
}));
