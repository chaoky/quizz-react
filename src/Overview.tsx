import React, { useState, useContext } from "react";
import { Pagination } from "@material-ui/lab";

import {
  Typography,
  Tooltip,
  Fab,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { AppCtx, useStyles } from "./Components";
import { Question } from "./types";

export default function () {
  const sheet = useStyles();
  const { allTests } = useContext(AppCtx);
  if (allTests.length == 0) {
    return (
      <Grid container spacing={3}>
        <Grid item container direction="column" alignItems="center" spacing={2}>
          <Typography variant="h2">Testing!</Typography>
          <Typography>Start your first test</Typography>
          <Typography>TODO arrow pointing down</Typography>
        </Grid>
        <Action />
      </Grid>
    );
  }

  const [curr, setCurr] = useState(() => allTests.length);
  const currTest = allTests[curr - 1];
  const correctLen = currTest.questions.filter(
    (e) => e.answer == e.correct_answer
  ).length;

  return (
    <Grid container spacing={3}>
      <Grid item container direction="column" alignItems="center" spacing={2}>
        <Typography variant="h2">Testing!</Typography>
        <Grid item>
          <Pagination
            count={allTests.length}
            page={curr}
            onChange={(_, i) => setCurr(i)}
          />
        </Grid>

        <Typography>{new Date(currTest.startDate).toDateString()}</Typography>

        <Grid item container justify="center">
          <div>
            <Typography>Correct</Typography>
            <Typography>{correctLen}</Typography>
          </div>
          <Divider orientation="vertical" flexItem className={sheet.divider} />
          <div>
            <Typography>Incorrect</Typography>
            <Typography>{currTest.questions.length - correctLen}</Typography>
          </div>
        </Grid>
      </Grid>

      <Grid item container spacing={2} justify="center">
        {currTest.questions.map((e, i) => (
          <Grid item key={i}>
            <AnswerCard question={e} />
          </Grid>
        ))}
      </Grid>

      <Action />
    </Grid>
  );
}

function AnswerCard({ question }: { question: Question }) {
  const sheet = useStyles();
  return (
    <Card className={sheet.card}>
      <CardHeader title={question.question} />
      <CardContent>
        <div className={sheet.fixedColumns}>
          <div>
            <Typography>Answer</Typography>
            <Typography> {question.correct_answer}</Typography>
          </div>
          <Divider orientation="vertical" flexItem />

          <div>
            <Typography>Your Answer</Typography>
            <Typography>{question.answer || "Nehuma"}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Action() {
  const sheet = useStyles();
  const { setCurrView } = useContext(AppCtx);

  return (
    <Tooltip
      title="New Test"
      onClick={() => setCurrView("menu")}
      className={sheet.fixed}
    >
      <Fab color="primary">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}
