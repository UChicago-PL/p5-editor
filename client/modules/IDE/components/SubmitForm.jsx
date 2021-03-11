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

  function validate(formProps) {
    const errors = {};
    if (!formProps.repo || formProps.repo.trim().length === 0) {
      errors.repo = 'please select an assignment';
    }
    return errors;
  }

  function onSubmit(formProps) {
    const repo = repos.find(({ urlName }) => urlName === formProps.repo);
    console.log({ repo });
    return dispatch(submitToGH({ repo, project }))
      .then((result) => {
        setSubmitState(result.data);
      })
      .catch((e) => {
        console.log('submit error', e);
      });
  }

  return (
    <Form fields={['repo']} validate={validate} onSubmit={onSubmit}>
      {(formProps) => {
        const { handleSubmit, invalid, submitting, touched, errors } = formProps;
        return (
          <form className="submit-repo-form" onSubmit={handleSubmit}>
            <div className="submit-repo-form__input-wrapper flex-down">
              <div className="flex-down">
                <Field name="repo" component="select">
                  <option key="empty" />
                  {repos
                    .filter((repo) => repo.released)
                    .map((repo, idx) => {
                      return (
                        <option value={repo.urlName} key={repo.urlName}>
                          {repo.humanReadableName}
                        </option>
                      );
                    })}
                </Field>
              </div>
              {touched.repo && errors.repo && <span className="form-error">{errors.repo}</span>}
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
