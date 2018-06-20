import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPhoneSquare, faCalendarAlt } from '@fortawesome/fontawesome-free-solid/index';
import { Link } from 'react-router-dom';

class CandidateCard extends Component {
    constructor(props) {
        super(props);
        const profileImages = [
            "https://pbs.twimg.com/profile_images/940708708027457536/gCtQagL7_400x400.jpg",
        ]
        this.state = {
            randomProfileImage: profileImages[Math.floor(Math.random() * profileImages.length)]
        }
    }
    render() {
        const available = '14th Aug';



        return (
            <div className="card">
                <div>
                    <img
                        className="card-img-top rounded-top"
                        src={this.state.randomProfileImage}
                        alt="Candidate photo"
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.candidate.full_name} - {this.props.candidate.location}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        <FontAwesomeIcon icon={faCalendarAlt} /> Available: {available}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        <FontAwesomeIcon icon={faPhoneSquare} /> <a href="tel:{candidate.phone_number}">{this.props.candidate.phone_number}</a>
                    </h6>
                    <p className="card-text">
                        {this.props.candidate.pitch}
                    </p>
                    <Link className="btn btn-primary" to="/profile">View Profile</Link>
                </div>
            </div>
        )
    }
}

export { CandidateCard }