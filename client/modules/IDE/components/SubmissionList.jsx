import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../../App/components/loader';
import * as SubmissionActions from '../actions/submissions';

function SubmissionGroup(props) {
  const { submissions } = props;
  const orderedSubs = [...submissions].sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
  console.log(submissions);
  const assignment = submissions[0].assign[0];
  console.log(assignment);
  const submittedAssignment = orderedSubs[0];
  return (
    <div className="flex-down dashboard-submission">
      <h3>{assignment.urlName}</h3>
      <h4>
        Assignment:
        {assignment.humanReadableName}
      </h4>
      <h5>
        Due:
        {`${new Date(assignment.dueDate)}`}
      </h5>
      <h5>
        Submitted:
        {`${new Date(submittedAssignment.createdAt)}`}
      </h5>
      <div className="submission-details">
        <a
          target="_blank"
          rel="noreferrer"
          // eslint-disable-next-line max-len
          href={`https://github.com/UChicago-PL/cs-11111-${submissions[0].username}/${submittedAssignment.prNumber}/pulls`}
        >
          Link to Pull Request
        </a>
        <span>{', '}</span>
        <a
          target="_blank"
          rel="noreferrer"
          href={`http://editor.cs111.org/preview/${submittedAssignment.submissionId}`}
        >
          Link to Preview
        </a>
      </div>
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
    <div className="dashboard-submission-list">
      <Helmet>
        <title>Submitted Assignments</title>
      </Helmet>
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
