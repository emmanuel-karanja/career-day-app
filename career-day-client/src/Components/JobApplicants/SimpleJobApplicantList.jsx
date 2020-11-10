import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchApplicants } from '../../modules/jobApplicants'

class SimpleJobApplicantList extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchApplicants());
    }

    render() {
        const { currentApplicant,applicants } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {currentApplicant.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {applicants.loading && <em>Loading applicants...</em>}
                {applicants.error && <span className="text-danger">ERROR: {applicants.error}</span>}
                {applicants.items &&
                    <ul>
                        {applicants.items.map((applicant, index) =>
                            <li key={applicant.applicantId}>
                                {applicant.firstName + ' ' + applicant.lastName}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { applicants, authentication } = state;
    const { currentApplicant } = authentication;
    return {
        currentApplicant,
        applicants
    };
}

const connectedJobApplicantList = connect(mapStateToProps)(SimpleJobApplicantList);
export { connectedJobApplicantList as SimpleJobApplicantList };