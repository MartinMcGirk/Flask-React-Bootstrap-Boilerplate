import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import { getAllSkills } from '../comms/backend';
import { parseJSON } from '../utils/misc';
import { connect } from 'react-redux';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class SkillsEditorComponent extends Component {
    state = {
        suggestions: [
            {
                id: 'java',
                text: 'java'
            }, {
                id: 'javascript',
                text: 'javascript',
            }, {
                id: 'healthcare',
                text: 'healthcare'
            }
        ],
        skills: this.props.skills.map(s => ({ id: s.name, text: s.name })) || []
    }

    componentDidMount() {
        getAllSkills(this.props.token)
            .then(parseJSON)
            .then((resp) => {
                this.setState(() => ({
                    suggestions: resp.skills.map(s => ({
                            id: s.name,
                            text: s.name
                        })
                    )
                }));
            })
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({
            skills: nextProps.skills.map(s => ({ id: s.name, text: s.name })) || []
        }))
    }

    handleDelete = (i) => {
        const { skills } = this.state;
        const newState = skills.filter((skill, index) => index !== i)
        this.setState(() => ({
            skills: newState,
        }));
        this.props.onSkillsChanged(newState);
    }

    handleAddition = (skill) => {
        const newState = { skills: [...this.state.skills, skill] };
        this.setState(() => newState);
        this.props.onSkillsChanged(newState.skills);
    }

    handleDrag = (skill, currPos, newPos) => {
        const skills = [...this.state.skills];
        const newSkills = skills.slice();

        newSkills.splice(currPos, 1);
        newSkills.splice(newPos, 0, skill);

        // re-render
        this.setState(() => ({ skills: newSkills }));
        this.props.onSkillsChanged(newSkills);
    }

    handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    }

    render() {
        return (
            <div>
                {this.props.label || "Skills"}
                <ReactTags
                    tags={this.state.skills}
                    suggestions={this.state.suggestions}
                    placeholder="Add a new skill"
                    delimiters={delimiters}
                    autofocus={false}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    handleTagClick={this.handleTagClick}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) =>  ({
    token: state.auth.token
});

const SkillsEditor = connect(mapStateToProps)(SkillsEditorComponent);

export { SkillsEditor }