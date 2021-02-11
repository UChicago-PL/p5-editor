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
      errors.repo = 'please select a repo';
    }
    if (formProps.toSubFolder.includes('yes')) {
      if (!formProps.name) {
        errors.name = 'NewFolderModal.EnterName';
      } else if (formProps.name.trim().length === 0) {
        errors.name = 'NewFolderModal.EmptyName';
      } else if (formProps.name.match(/\.+/i)) {
        errors.name = 'NewFolderModal.InvalidExtension';
      }
    }
    return errors;
  }

  function onSubmit(formProps) {
    return dispatch(
      submitToGH({
        ...formProps,
        repo: repos.find(({ fullName }) => fullName === formProps.repo),
        project
      })
    ).then((result) => {
      setSubmitState(result.data);
    });
  }

  return (
    <Form
      fields={['name', 'repo', 'toSubFolder']}
      validate={validate}
      onSubmit={onSubmit}
      initialValues={{ toSubFolder: 'no' }}
    >
      {(formProps) => {
        const { handleSubmit, invalid, submitting, touched, errors, values } = formProps;
        const currRepo = repos.find(({ fullName }) => fullName === values.repo);
        const showNameInput = values.toSubFolder.includes('yes');
        return (
          <form className="submit-repo-form" onSubmit={handleSubmit}>
            <div className="submit-repo-form__input-wrapper flex-down">
              <div className="flex-down">
                <label htmlFor="repo">Target Repo</label>
                <Field name="repo" component="select">
                  <option key="empty" />
                  {repos.map((repo, idx) => (
                    <option value={repo.fullName} key={repo.fullName}>
                      {repo.fullName}
                    </option>
                  ))}
                </Field>
                {currRepo && (
                  <div>
                    <a href={currRepo.link} target="_blank" rel="noreferrer">
                      {currRepo.repoName}
                    </a>{' '}
                    <span>{' by '}</span>{' '}
                    <a href={`https://github.com/${currRepo.ownerName}`} target="_blank" rel="noreferrer">
                      {currRepo.ownerName}
                    </a>
                  </div>
                )}
              </div>
              {touched.repo && errors.repo && <span className="form-error">{errors.repo}</span>}
              <div>
                <label htmlFor="toSubFolder">Send Pr to Subfolder</label>
                <div className="flex">
                  <label>
                    <Field name="toSubFolder" component="input" type="radio" value="yes" /> Yes
                  </label>
                  <label>
                    <Field name="toSubFolder" component="input" type="radio" value="no" /> No
                  </label>
                </div>
              </div>
              {showNameInput && (
                <div>
                  <Field name="name">
                    {(field) => (
                      <React.Fragment>
                        <label className="new-folder-form__name-label" htmlFor="name">
                          Name:
                        </label>
                        <input
                          className="new-folder-form__name-input"
                          id="name"
                          type="text"
                          maxLength="128"
                          placeholder="SPECIFY NAME OF WHATEVER"
                          {...field.input}
                        />
                      </React.Fragment>
                    )}
                  </Field>
                  {touched.name && errors.name && <span className="form-error">{errors.name}</span>}
                </div>
              )}
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
                <div>Failure! {JSON.stringify(submitState)}</div>
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
