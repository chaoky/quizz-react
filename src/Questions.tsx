import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
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

import { Question } from "./types";
import { AppCtx } from "./Components";

export default function () {
  const { currTest, setCurrTest, allTests, setAllTests, setCurrView } =
    useContext(AppCtx);
  if (!currTest) {
    return setCurrView("menu");
  }

  const [timer, setTimer] = useState(
    () => Date.now() - new Date(currTest.startDate).getTime()
  );
  useEffect(() => {
    const timer = setTimeout(
      () => setTimer(Date.now() - new Date(currTest.startDate).getTime()),
      1000
    );

    return () => {
      clearTimeout(timer);
    };
  });
  const minutes = Math.floor((timer / 1000 / 60) % 60);
  const seconds = Math.floor((timer / 1000) % 60);

  const [curr, setCurr] = useState(1);
  const currQuestion = currTest.questions[curr - 1];
  const isLast = !currTest.questions[curr];

  const handleSubmit = (value: { answer: string }) => {
    currQuestion.answer = value.answer;
    setCurrTest(currTest);
    if (!isLast) {
      setCurr(curr + 1);
      return;
    }
    allTests.push({ ...currTest, endDate: new Date() });
    setAllTests(allTests);
    setCurrView("overView");
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container direction="column" alignItems="center" spacing={2}>
        <Typography variant="h2">
          {minutes}:{seconds}
        </Typography>
        <Grid item>
          <Pagination
            count={currTest.questions.length}
            onChange={(_, i) => setCurr(i)}
            page={curr}
          />
        </Grid>
      </Grid>

      <Grid item>
        <AQuestion curr={currQuestion} last={isLast} onSubmit={handleSubmit} />
        <Button color="secondary" onClick={() => setCurrView("menu")}>
          Abort
        </Button>
      </Grid>
    </Grid>
  );
}

function AQuestion(props: {
  curr: Question;
  onSubmit: (value: { answer: string }) => void;
  last: boolean;
}) {
  const [answerList, setAnswerList] = useState([""]);

  useEffect(() => {
    let t = props.curr.incorrect_answers;
    t.splice(
      Math.floor(Math.random() * t.length),
      0,
      props.curr.correct_answer
    );
    setAnswerList(t);
  }, [props.curr.question]);

  return (
    <div>
      <Typography variant="h6">{props.curr.question}</Typography>
      <Formik
        initialValues={{ answer: props.curr.answer || "" }}
        onSubmit={props.onSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <FormControl component="fieldset">
              <RadioGroup
                name="answer"
                value={values.answer}
                onChange={(e) => setFieldValue("answer", e.target.value)}
              >
                {answerList.map((e, i) => (
                  <FormControlLabel
                    label={e}
                    value={e}
                    key={i}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
              <Button type="submit" color="primary">
                {props.last ? "Finish" : "Confirm"}
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  );
}
