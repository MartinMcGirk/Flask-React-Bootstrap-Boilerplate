import React, { Component } from 'react'
import { connect } from 'react-redux';
import { startLoadUsers } from '../actions/users';
import { CandidateDashboard } from './candidate/CandidateDashboard';
import { RecruiterDashboard } from './recruiter/RecruiterDashboard';

class DashboardPageComponent extends Component {
    componentDidMount() {
        this.props.startLoadUsers(this.props.token)
    }

    getRoleSpecificDashboard = (role) => {
        if (role === 'candidate') {
            return <CandidateDashboard></CandidateDashboard>
        } else if (role === 'recruiter') {
            return <RecruiterDashboard></RecruiterDashboard>
        }
        return <div>Other dashboard</div>
    }

    render() {
        return (
            <div>
                { this.getRoleSpecificDashboard(this.props.user.role) }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    startLoadUsers: (token) => dispatch(startLoadUsers(token))
});

const DashboardPage = connect(mapStateToProps, mapDispatchToProps)(DashboardPageComponent);

export { DashboardPage }