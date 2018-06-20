import React from 'react'
import { Link } from 'react-router-dom';

const PublicHeader = (props) => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand mb-0 h1" to="/">
            Boilerplate
        </Link>
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
                    <Link className="nav-link" to="/about">
                        How it works
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/pricing">
                        Pricing
                    </Link>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="btn btn-outline-light" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="btn btn-outline-light" to="/register">Register</Link>
                </li>
            </ul>
        </div>
    </nav>
);

export { PublicHeader }