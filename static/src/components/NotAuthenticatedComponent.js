import React from 'react';
import { connect } from 'react-redux';
import { checkTokenIsValid } from '../comms/backend';
import { parseJSON } from '../utils/misc';
import { loginFailure, loginSuccess } from '../actions/auth';
import { history } from '../routers/AppRouter';
import { ConnectedHeader } from './Header';
import { PublicHeader } from './static/PublicHeader';

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

export function requireNoAuthentication(Component) {

    class NotAuthenticatedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
            };
        }

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps);
        }

        checkAuth(props = this.props) {
            if (props.isAuthenticated) {
                history.push('/dashboard');

            } else {
                const token = localStorage.getItem('token');
                if (token) {
                    checkTokenIsValid(token)
                        .then(parseJSON)
                        .then(res => {
                            if (res.token_is_valid) {
                                this.props.loginSuccess(token);
                                history.push('/dashboard');

                            } else {
                                this.setState({
                                    loaded: true,
                                });
                            }
                        });
                } else {
                    this.setState({
                        loaded: true,
                    });
                }
            }
        }

        render() {
            return (
                <div>
                    {!this.props.isAuthenticated && this.state.loaded
                        ? (
                            <div>
                                <PublicHeader />
                                <Component {...this.props} />
                            </div>
                        )
                        : null
                    }
                </div>
            );

        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(NotAuthenticatedComponent);

}