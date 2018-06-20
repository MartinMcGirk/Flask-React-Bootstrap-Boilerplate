import React, { Component } from 'react'
import { connect } from 'react-redux';
import { startLoadMyCandidateDetails } from '../../actions/my-details';
import { CandidateCard } from './CandidateCard';

class CandidateDashboardComponent extends Component {
    state = {};
    componentDidMount() {
        this.props.startLoadMyCandidateDetails(this.props.token);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        CandidateDashboardComponent
                        <div>
                            Your profile is 0% complete
                        </div>
                    </div>
                    <div className="col-sm">
                        <div>
                            <h3>Your info</h3>
                            <p>This is how your card will appear to other people</p>
                            <CandidateCard
                                candidate={this.props.me}
                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    me: state.myDetails.me
});

const mapDispatchToProps = (dispatch) => ({
    startLoadMyCandidateDetails: (token) => dispatch(startLoadMyCandidateDetails(token))
});

const CandidateDashboard = connect(mapStateToProps, mapDispatchToProps)(CandidateDashboardComponent);

export { CandidateDashboardComponent, CandidateDashboard }