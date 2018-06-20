import React, { Component } from 'react'
import { connect } from 'react-redux';
import { startLoadMyRecruiterDetails } from '../../actions/my-details';
import { Sidebar } from '../Sidebar';
import { LayoutWithSidebar } from '../LayoutWithSidebar';

class RecruiterDashboardComponent extends Component {
    state = {};
    componentDidMount() {
        this.props.startLoadMyRecruiterDetails(this.props.token);
    }
    render() {
        return (
            <div>
                <LayoutWithSidebar Sidebar={Sidebar}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                RecruiterDashboardComponent
                                <div>
                                    Your profile is 0% complete
                                </div>
                            </div>
                            <div className="col-sm">
                                <div>
                                    <h3>Your info</h3>
                                    <p>This is how your card will appear to other people</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutWithSidebar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    me: state.myDetails.me
});

const mapDispatchToProps = (dispatch) => ({
    startLoadMyRecruiterDetails: (token) => dispatch(startLoadMyRecruiterDetails(token))
});

const RecruiterDashboard = connect(mapStateToProps, mapDispatchToProps)(RecruiterDashboardComponent);

export { RecruiterDashboardComponent, RecruiterDashboard }