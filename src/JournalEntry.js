import React from 'react'

class JournalEntry extends React.Component {
    render() {
        return(
            <p>{this.props.entry.text}</p>
        )
    }
}

export default JournalEntry