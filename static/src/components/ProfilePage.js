import React, { Component } from 'react'
import { connect } from 'react-redux';
import { CandidateProfile } from './candidate/CandidateProfile';

class ProfilePageComponent extends Component {
    getRoleSpecificDashboard = (role) => {
        if (role === 'candidate') {
            return <CandidateProfile></CandidateProfile>
        } else if (role === 'recruiter') {
            return <div></div>
        }
        return <div>Other Profile</div>
    };

    render() {
        return (
            <div>
                { this.getRoleSpecificDashboard(this.props.user.role) }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const ProfilePage = connect(mapStateToProps)(ProfilePageComponent);

export { ProfilePage }