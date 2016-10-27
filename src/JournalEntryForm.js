import React from 'react';

class JournalEntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.props.addJournalEntry(this.state.value);
    }

    render() {
        return (
            <div className="journalEntryForm">
                <div>
                    <textarea
                        className="journalEntry"
                        rows="10"
                        cols="100"
                        placeholder="Type your journal entry here"
                        value={this.state.value}
                        onChange={this.handleChange} />
                </div>
                <div>
                    <button className="submitButton" onClick={this.handleSubmit}>Submit</button>
                </div>

            </div>
        );
    }
}

export default JournalEntryForm;