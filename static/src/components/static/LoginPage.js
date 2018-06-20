import React, { Component } from 'react'
import { startLogin } from '../../actions/auth';
import { connect } from 'react-redux';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onUsernameChange = (e) => {
        const username = e.target.value;
        this.setState(() => ({
            username
        }));
    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({
            password
        }));
    };

    onLoginSubmit = (e) => {
        e.preventDefault();
        this.props.startLogin(this.state.username, this.state.password);
    };

    render() {
        return (
            <div className="container">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Boilerplate</h1>
                    <p>Log in!</p>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={this.state.username}
                            onChange={this.onUsernameChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.onLoginSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    startLogin: (username, password) => dispatch(startLogin(username, password))
});

const ConnectedLoginPage = connect(undefined, mapDispatchToProps)(LoginPage);

export { LoginPage, ConnectedLoginPage }