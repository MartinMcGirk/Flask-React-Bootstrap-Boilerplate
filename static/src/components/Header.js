import React from 'react'
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';
import { getRoleFromToken } from '../utils/misc';

const Header = ({ startLogout, role }) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <NavLink className="navbar-brand mb-0 h1" to="/dashboard">
            Boilerplate
        </NavLink>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard" exact={true}>
                        Dashboard
                    </NavLink>
                </li>
                {
                    role === 'recruiter' ? (
                        <li className="nav-item d-md-none">
                            <NavLink className="nav-link" to="/profile">
                                Profile
                            </NavLink>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                Profile
                            </NavLink>
                        </li>
                    )
                }
                {
                    role === 'recruiter' && (
                        <li className="nav-item d-md-none">
                            <NavLink className="nav-link" to="/company">
                                Company
                            </NavLink>
                        </li>
                    )
                }
                {
                    role === 'recruiter' && (
                        <li className="nav-item d-md-none">
                            <NavLink className="nav-link" to="/vacancies">
                                Vacancies
                            </NavLink>
                        </li>
                    )
                }
                {
                    role === 'recruiter' && (
                        <li className="nav-item d-md-none">
                            <NavLink className="nav-link" to="/candidates">
                                Candidates
                            </NavLink>
                        </li>
                    )
                }
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <button className="btn btn-outline-light" onClick={startLogout}>Logout</button>
                </li>
            </ul>
        </div>
    </nav>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => ({
    role: getRoleFromToken(state.auth.token)
});

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export { Header, ConnectedHeader }