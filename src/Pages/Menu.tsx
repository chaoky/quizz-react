import React, { useContext } from "react";
import Axios from "axios";
import { Formik, Form } from "formik";
import {
  Typography,
  Button,
  Grid,
  InputLabel,
  Select,
  FormControl,
} from "@material-ui/core";
import He from "he";

import { QuestionResp } from "../types";
import { AppCtx, useStyles } from "../Components";

export default function Menu() {
  const { setCurrView, setCurrTest } = useContext(AppCtx);
  const sheet = useStyles();

  const handleSubmit = (values: { ammount: number }) => {
    Axios.get(`https://opentdb.com/api.php?amount=${values.ammount}`)
      .then((e) => {
        const body: QuestionResp = e.data;
        if (body.results.length == 0) {
          throw new Error("no questions?");
        }

        //remove html scaping
        setCurrTest({
          questions: body.results.map((e) => {
            const t = e.incorrect_answers;
            t.splice(Math.floor(Math.random() * t.length), 0, e.correct_answer);

            return {
              ...e,
              all_answers: t.map((e) => He.decode(e)),
              correct_answer: He.decode(e.correct_answer),
              question: He.decode(e.question),
              answer: "",
            };
          }),
          startDate: new Date(),
        });
        setCurrView("test");
      })
      .catch(() => alert("failed to fetch questions"));
  };

  return (
    <Grid container spacing={3}>
      <Grid item container direction="column" alignItems="center" spacing={2}>
        <Typography variant="h2">New Test</Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          lacinia, ante sed mattis blandit, eros lorem pulvinar ante, in
          sagittis leo mi quis urna. Sed nec tristique dui. Aliquam pharetra
          lacinia odio in malesuada. Mauris eget risus finibus tortor efficitur
          pharetra. In risus lacus, tempus quis ullamcorper sit amet, commodo eu
          enim. Vivamus dapibus volutpat vehicula. Phasellus facilisis dignissim
          lectus, sit amet lacinia nibh fermentum eu. Nulla non scelerisque
          augue. Proin gravida nec arcu a elementum.
        </Typography>
      </Grid>

      <Grid item container justify="center">
        <Formik initialValues={{ ammount: 0 }} onSubmit={handleSubmit}>
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <FormControl className={sheet.form}>
                <InputLabel>Question Ammount</InputLabel>
                <Select
                  native
                  required
                  value={values.ammount}
                  onChange={(e) => setFieldValue("ammount", e.target.value)}
                >
                  <option value="" />
                  {[5, 10, 15, 30, 60].map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </Select>
                <Grid item>
                  <Button type="submit" disabled={isSubmitting} color="primary">
                    Start
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrView("overView");
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </FormControl>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}
