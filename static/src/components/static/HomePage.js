import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearchPlus, faUserTag, faClock } from '@fortawesome/fontawesome-free-solid'
import { history } from '../../routers/AppRouter';

class HomePage extends Component {
    state = {
        email: ''
    };

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({
            email
        }));
    };

    onRegisterClick = (e) => {
        e.preventDefault();
        history.push({
            pathname: '/register',
            state: { email: this.state.email }
        });
    };

    render() {
        return (
            <div>
                <header className="masthead text-white text-center">
                    <div className="overlay">

                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 mx-auto">
                                <h1 className="">This is a boilerplate app</h1>
                                <p>It uses Flask, React, Redux, and Bootstrap</p>
                            </div>
                            <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                                <form onSubmit={this.onRegisterClick}>
                                    <div className="form-row">
                                        <div className="col-12 col-md-9 mb-2 mb-md-0">
                                            <input
                                                type="email"
                                                className="form-control form-control-lg"
                                                placeholder="Enter your email..."
                                                value={this.state.email}
                                                onChange={this.onEmailChange}
                                            />
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <button
                                                type="submit"
                                                className="btn btn-block btn-lg btn-primary"
                                            >Sign up!</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="features-icons bg-light text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex">
                                        <FontAwesomeIcon className="m-auto text-primary" icon={faClock}/>
                                    </div>
                                    <h3>Uses postgres</h3>
                                    <p className="lead mb-0">You need to bring your own postgres database.</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex">
                                        <FontAwesomeIcon className="m-auto text-primary" icon={faSearchPlus}/>
                                    </div>
                                    <h3>Develop quickly</h3>
                                    <p className="lead mb-0">You can run the flask and frontend parts simultaneously, with hot reloading when you change things.</p>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                    <div className="features-icons-icon d-flex">
                                        <FontAwesomeIcon className="m-auto text-primary" icon={faUserTag}/>
                                    </div>
                                    <h3>Deploys nicely to heroku</h3>
                                    <p className="lead mb-0">Theoretically this should be easy peasy to deploy to heroku</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export { HomePage }