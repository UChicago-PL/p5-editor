/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import Button from '../../../common/Button';
import { submitToGH } from '../../User/actions';

function SubmitForm(props) {
  const { repos, project } = props;
  const [submitState, setSubmitState] = useState(false);

  const dispatch = useDispatch();

  function getCurrentDueDate(repo) {
    const currRepo = repos.find(({ urlName }) => urlName === repo);
    const currAssignmentDueDate = currRepo && currRepo.dueDate && new Date(currRepo.dueDate);
    return currAssignmentDueDate && currAssignmentDueDate.getTime();
  }

  function validate(formProps) {
    const errors = {};
    if (!formProps.repo || formProps.repo.trim().length === 0) {
      errors.repo = 'please select an assignment';
    }
    const dueDate = getCurrentDueDate(formProps.repo);
    const passedDue = dueDate && dueDate < new Date().getTime();
    if (passedDue && !formProps.sure) {
      errors.sure = 'please indicate that you are sure this is the assignment you mean to submit to.';
    }
    return errors;
  }

  function onSubmit(formProps) {
    const repo = repos.find(({ urlName }) => urlName === formProps.repo);
    return dispatch(submitToGH({ repo, project }))
      .then((result) => {
        setSubmitState(result.data);
      })
      .catch((e) => {
        console.log('submit error', e);
      });
  }

  const repoGroups = repos.reduce((acc, row) => {
    acc[row.assignmentType || 'other'] = (acc[row.assignmentType || 'other'] || []).concat(row);
    return acc;
  }, {});
  return (
    <Form fields={['repo', 'sure']} validate={validate} onSubmit={onSubmit}>
      {(formProps) => {
        const { handleSubmit, invalid, submitting, touched, errors, values } = formProps;
        const dueDate = getCurrentDueDate(values.repo);
        const passedDue = dueDate && dueDate < new Date().getTime();
        const notPassedDue = dueDate && dueDate > new Date().getTime();
        return (
          <form className="submit-repo-form" onSubmit={handleSubmit}>
            <div className="submit-repo-form__input-wrapper flex-down">
              <div className="flex-down">
                <Field name="repo" component="select">
                  <option key="empty" />
                  {Object.entries(repoGroups).map(([groupName, groupOptions]) => (
                    <optgroup label={groupName} key={groupName}>
                      {groupOptions.map((repo) => (
                        <option value={repo.urlName} key={repo.urlName}>
                          {repo.humanReadableName}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </Field>
              </div>
              {touched.repo && errors.repo && <span className="form-error">{errors.repo}</span>}

              <div className="flex-down">
                {passedDue && (
                  <div style={{ color: 'red' }}>
                    {`The due date (${new Date(dueDate).toString()}) for this assignment is passed.`}
                  </div>
                )}
                {passedDue && (
                  <div className="flex-down">
                    <div>Are you sure this is the assignment you meant to submit this for?</div>
                    <div className="flex">
                      <div>Yes, I am sure!</div>
                      <Field name="sure" component="input" type="checkbox" />
                    </div>
                  </div>
                )}
                {notPassedDue && <div>{`This assignment is due at (${new Date(dueDate).toString()}).`}</div>}
              </div>
              <br />
              <div>
                If you are having difficulty submitting please ensure that you have accepted the assignment
                for course <a href="https://classroom.github.com/a/C0DfSFZG">found here</a>
              </div>
              <br />
              <Button type="submit" disabled={invalid || submitting}>
                Submit
              </Button>
              {submitting && <div>Submitting...</div>}
              {!submitting && submitState && submitState.success && (
                <div>
                  Success!{' '}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={submitState.prURL
                      .replace('https://api.github.com/repos/', 'https://github.com/')
                      .replace('/pulls/', '/pull/')}
                  >
                    click here to view pull request
                  </a>
                </div>
              )}
              {!submitting && submitState && !submitState.success && (
                <div className="flex-down">
                  <b>Failure!</b> <div>{JSON.stringify(submitState)}</div>
                </div>
              )}
            </div>
          </form>
        );
      }}
    </Form>
  );
}
SubmitForm.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired,
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};
export default SubmitForm;
