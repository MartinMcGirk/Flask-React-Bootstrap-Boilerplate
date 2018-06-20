import React, { Component } from 'react'
import { FormInput } from '../FormInput';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faCheckCircle as fasCircle } from '@fortawesome/fontawesome-free-solid'
import { faCircle as farCircle } from '@fortawesome/fontawesome-free-regular'
import { connect } from 'react-redux';
import { startRegisterUser } from '../../actions/auth';

class RegisterPageComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        let email = '';
        if (props.location.state) {
            email = props.location.state.email || '';
        }
        this.state = {
            email,
            password: '',
            firstName: '',
            lastName: '',
            role: 'candidate'
        }
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    };

    onFirstNameChange = (e) => {
        const firstName = e.target.value;
        this.setState(() => ({ firstName }));
    };

    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({ lastName }));
    };

    // onRoleChange = (e) => {
    //     e.preventDefault();
    //     const role = e.target.value;
    //     this.setState(() => ({ role }));
    // };

    onRegisterFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.email && this.state.password
        && this.state.firstName && this.state.lastName
        && this.state.role) {
            this.props.startRegisterUser({ ...this.state });
        } else {
            alert('You need to fill in all the fields');
        }

    };

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-lg-6 col-md-8 col-sm-12 align-self-center">
                        <h2 className="page-header">Join Boilerplate today</h2>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col col-lg-6 col-md-8 col-sm-12 align-self-center">
                        <form onSubmit={this.onRegisterFormSubmit}>
                            <FormInput
                                fieldId="email"
                                inputType="email"
                                label="Email"
                                placeholder="Your email"
                                smallText="We'll never share your email with anyone else."
                                value={this.state.email}
                                onFieldChange={this.onEmailChange}
                            />
                            <FormInput
                                fieldId="password"
                                inputType="password"
                                label="Password"
                                placeholder="Password"
                                value={this.state.password}
                                onFieldChange={this.onPasswordChange}
                            />
                            <FormInput
                                fieldId="firstName"
                                label="First Name"
                                placeholder="Your first name"
                                value={this.state.firstName}
                                onFieldChange={this.onFirstNameChange}
                            />
                            <FormInput
                                fieldId="lastName"
                                label="Last Name"
                                placeholder="Your last name"
                                value={this.state.lastName}
                                onFieldChange={this.onLastNameChange}
                            />
                            {/*<div className="form-row">*/}
                                {/*<div className="col-md-5 col-sm-12">*/}
                                    {/*<button*/}
                                        {/*className="btn btn-outline-primary btn-block"*/}
                                        {/*value="candidate"*/}
                                        {/*onClick={this.onRoleChange}*/}
                                    {/*>*/}
                                        {/*<FontAwesomeIcon className="pr-1" icon={this.state.role === 'candidate' ? fasCircle : farCircle} />*/}
                                        {/*I want to work*/}
                                    {/*</button>*/}
                                {/*</div>*/}
                                {/*<div className="col text-center">*/}
                                    {/*OR*/}
                                {/*</div>*/}
                                {/*<div className="col-md-5 col-sm-12">*/}
                                    {/*<button*/}
                                        {/*className="btn btn-outline-primary btn-block"*/}
                                        {/*value="recruiter"*/}
                                        {/*onClick={this.onRoleChange}*/}
                                    {/*>*/}
                                        {/*<FontAwesomeIcon className="pr-1" icon={this.state.role === 'recruiter' ? fasCircle : farCircle} />*/}
                                        {/*I want to hire*/}

                                    {/*</button>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            <div className="form-row">
                                <div className="col mt-3">
                                    <button className="btn btn-primary btn-lg btn-block">
                                        Get started
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startRegisterUser: (userDetails) => dispatch(startRegisterUser(userDetails))
});

const RegisterPage = connect(null, mapDispatchToProps)(RegisterPageComponent);

export { RegisterPage }