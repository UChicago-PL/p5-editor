/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch } from 'react-redux';
import Button from '../../../common/Button';
import { submitToGH } from '../../User/actions';
import { trackEvent } from '../../../utils/analytics';

function errorDisplay(submitState, classroomInvite) {
  const content = JSON.stringify(submitState);
  if (submitState.err === 'Not Found') {
    return (
      <div className="flex-down">
        <div>Unable to submit because you have not accepted the assignment!</div>
        <div>
          {'Please '}
          <a href={classroomInvite} target="_blank" rel="noreferrer">
            Click here
          </a>
          {' to accept'}
        </div>
      </div>
    );
  }
  if (content.toLowerCase().includes('bad credentials')) {
    return (
      <div className="flex-down">
        <div>{"There's been a credential error! To fix"}</div>
        <ol>
          <li>
            go to this link <a href="https://editor.cs111.org/account">https://editor.cs111.org/account</a>
          </li>
          <li>
            {'Click "Unlink Github Account", and then wait a few seconds for it to finish processing. '}
          </li>
          <li>{'Click "Connect Github Account", and that will redirect you to the editor'}</li>
        </ol>
      </div>
    );
  }
  return (
    <div className="flex-down">
      <b>Failure!</b> <div>{content}</div>
    </div>
  );
}

function SubmitForm(props) {
  const { repos, project } = props;
  const [submitState, setSubmitState] = useState(false);
  const [classroomInvite, setClassroomInvite] = useState(false);

  useEffect(() => {
    fetch('/editor/edition-classroom-invite')
      .then((x) => x.json())
      .then((x) => {
        if (x.success && x.content) {
          setClassroomInvite(x.content);
        }
      });
  }, []);

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
    // here
    trackEvent({ eventName: 'create-submission' });
    return dispatch(submitToGH({ repo, project }))
      .then((result) => {
        trackEvent({ eventName: 'create-submission-success' });
        setSubmitState(result.data);
      })
      .catch((e) => {
        trackEvent({ eventName: 'create-submission-error' });
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
                for course by clicking{' '}
                <a href={classroomInvite} target="_blank" rel="noreferrer">
                  here
                </a>
                .
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
              {!submitting &&
                submitState &&
                !submitState.success &&
                errorDisplay(submitState, classroomInvite)}
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
