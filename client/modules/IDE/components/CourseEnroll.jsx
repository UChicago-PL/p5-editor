import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Field } from 'react-final-form';
import { SignUpForEdition, getEditions } from '../../User/actions';
import Button from '../../../common/Button';

function errorDisplay(submitState) {
  const content = JSON.stringify(submitState);

  return (
    <div className="flex-down">
      <b>Failure!</b> <div>{typeof submitState === 'object' ? submitState.message || content : content}</div>
    </div>
  );
}

export default function CourseEnroll() {
  const [submitState, setSubmitState] = useState(false);
  const [editions, setEditions] = useState([]);
  const dispatch = useDispatch();

  function onSubmit(formProps) {
    return dispatch(SignUpForEdition(formProps))
      .then((x) => {
        console.log('success', x);
      })
      .catch((e) => {
        setSubmitState(e.response.data);
      });
  }

  useEffect(() => {
    fetch('/editor/get-editions')
      .then((x) => x.json())
      .then((x) => {
        if (x.success && x.content && Array.isArray(x.content)) {
          setEditions(x.content);
        }
      });
  }, []);

  return (
    <div id="course-enroll">
      <h1>The editor is for students enrolled in CS111</h1>
      <h3>Please select your course edition and provide the course password (see Ed for instructions)</h3>
      <Form fields={['edition-selection', 'edition-password']} onSubmit={onSubmit}>
        {(formProps) => {
          const { handleSubmit, invalid, submitting } = formProps;
          return (
            <form className="editions-signup-form" onSubmit={handleSubmit}>
              <div className="flex-down">
                <label htmlFor="edition-selection">Course Edition</label>
                <Field component="select" name="edition-selection">
                  {['', ...editions].map((edition) => {
                    return (
                      <option value={edition} key={edition}>
                        {edition}
                      </option>
                    );
                  })}
                </Field>
              </div>
              <div className="flex-down">
                <label htmlFor="edition-password">Edition Password</label>
                <Field name="edition-password" component="input" placeholder="Fill in here" />
              </div>
              <Button type="submit" disabled={invalid || submitting}>
                Submit
              </Button>
              {!submitting && submitState && !submitState.success && errorDisplay(submitState)}
            </form>
          );
        }}
      </Form>
    </div>
  );
}
