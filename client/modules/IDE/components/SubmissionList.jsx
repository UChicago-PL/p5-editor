import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../../App/components/loader';
import * as SubmissionActions from '../actions/submissions';

function SubmissionGroup(props) {
  const { submissions } = props;
  const orderedSubs = [...submissions].reverse();
  console.log(submissions);
  const assignment = submissions[0].assign[0];
  console.log(assignment);
  return (
    <div className="flex-down">
      <h3>Assignment: {assignment.humanReadableName}</h3>
      <h5>Due: </h5>
      {/* <div className="flex"> */}
      <div className="flex-down">
        {orderedSubs.map((sub, idx) => {
          return (
            <div key={sub.submissionId} className="flex-down">
              <div>{sub.projectName}</div>
              <div>
                <div>Submitted at: {sub.createdAt}</div>
                <a
                  href={`https://github.com/UChicago-PL/cs-11111-${submissions[0].username}/${sub.prNumber}/pulls`}
                >
                  Link to Pull Request
                </a>
              </div>
            </div>
          );
        })}
      </div>
      {/* <iframe
          id="inlineFrameExample"
          title="Inline Frame Example"
          width="300"
          height="200"
          src={`/preview/${submissions[0].submissionId}`}
        /> */}
      {/* </div> */}
    </div>
  );
}

SubmissionGroup.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object).isRequired
};

function SubmissionList(props) {
  const { getSubmissions, loading, submissions } = props;
  useEffect(() => {
    getSubmissions();
  }, []);
  const groupedSubmissions = submissions.reduce((acc, row) => {
    acc[row.assignment] = (acc[row.assignment] || []).concat(row);
    return acc;
  }, {});
  console.log({ groupedSubmissions });
  return (
    <div>
      <h1>Submission List</h1>
      {loading && <Loader />}
      {!loading &&
        Object.values(groupedSubmissions).map((submissionGroup) => {
          console.log({ submissionGroup });
          return <SubmissionGroup key={submissionGroup[0].assignment} submissions={submissionGroup} />;
        })}
    </div>
  );
}

SubmissionList.propTypes = {
  getSubmissions: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  submissions: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading,
    submissions: state.submissions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, SubmissionActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionList);
