import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faUserCircle, faBuilding, faTable, faUsers } from '@fortawesome/fontawesome-free-solid/index';


class Sidebar extends Component {
    state = {}

    render() {
        return (
            <div className="sidebar">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink className="nav-link text-nowrap text-truncate" to="/dashboard" exact={true}>
                            <FontAwesomeIcon className="d-none d-lg-inline" icon={faTachometerAlt} fixedWidth /> Dashboard
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}

export { Sidebar }