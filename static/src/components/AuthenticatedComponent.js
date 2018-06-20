import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import { checkTokenIsValid } from '../comms/backend';
import { loginFailure, loginSuccess } from '../actions/auth';
import { parseJSON } from '../utils/misc';
import { ConnectedHeader } from './Header';

function mapStateToProps(state) {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
    };
}

const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (token) => dispatch(loginSuccess(token)),
    loginFailure: () => dispatch(loginFailure())
});

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {
        componentWillMount() {
            this.setState(() => ({
                loaded_if_needed: false,
            }));
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (!props.isAuthenticated) {
                const token = localStorage.getItem('token');
                if (!token) {
                    history.push('/login');
                } else {
                    checkTokenIsValid(token)
                        .then(parseJSON)
                        .then(res => {
                            if (res.token_is_valid) {
                                this.props.loginSuccess(token);
                                this.setState(() => ({
                                    loaded_if_needed: true,
                                }));

                            } else {
                                history.push('/login');
                            }
                        });

                }
            } else {
                this.setState(() => ({
                    loaded_if_needed: true
                }));
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated && this.state.loaded_if_needed
                        ? (
                            <div>
                                <ConnectedHeader />
                                <Component {...this.props} />
                            </div>
                        )
                        : null
                    }
                </div>
            );

        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}