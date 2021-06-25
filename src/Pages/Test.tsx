import React, { useState, useContext, useEffect } from "react";
import { Formik, Form, useField } from "formik";
import { Pagination } from "@material-ui/lab";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";

import * as Types from "../types";
import { AppCtx } from "../Components";

export default function Test() {
  const { currTest, setCurrTest, allTests, setAllTests, setCurrView } =
    useContext(AppCtx);
  const [curr, setCurr] = useState(1);
  if (!currTest) {
    setCurrView("menu");
    return <p>Bye</p>;
  }

  const handleSubmit = (value: Types.Test) => {
    allTests.push(value);
    setAllTests(allTests);
    setCurrView("overView");
    setCurrTest(null);
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container direction="column" alignItems="center" spacing={2}>
        <Timer start={currTest.startDate} />
        <Grid item>
          <Pagination
            count={currTest.questions.length}
            onChange={(_, i) => setCurr(i)}
            page={curr}
          />
        </Grid>
      </Grid>

      <Grid item>
        <Formik
          initialValues={currTest}
          onSubmit={handleSubmit}
          validate={(e) => {
            //TODO profile this
            //simple way to save form on change
            setCurrTest(e);
            return {};
          }}
          enableReinitialize
        >
          <Form>
            <Awnser
              name={`questions[${curr - 1}].answer`}
              curr={currTest.questions[curr - 1]}
            />
            <Button color="primary" type="submit">
              Send
            </Button>
            <Button color="secondary" onClick={() => setCurrView("menu")}>
              Abort
            </Button>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}

function Awnser({ curr, ...props }: { curr: Types.Question; name: string }) {
  const [field, {}, {}] = useField(props);
  return (
    <FormControl>
      <Typography variant="h6">{curr.question}</Typography>
      <RadioGroup {...field}>
        {curr.all_answers.map((e) => (
          <FormControlLabel label={e} value={e} key={e} control={<Radio />} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

function Timer({ start }: { start: Date }) {
  const [timer, setTimer] = useState(
    () => Date.now() - new Date(start).getTime()
  );
  const seconds = Math.floor((timer / 1000) % 60);
  const minutes = Math.floor((timer / 1000 / 60) % 60);

  useEffect(() => {
    const timer = setTimeout(
      () => setTimer(Date.now() - new Date(start).getTime()),
      1000
    );

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Typography variant="h2">
      {minutes}:{seconds}
    </Typography>
  );
}
