import React from 'react'

class JournalEntry extends React.Component {
    render() {
        return(
            <div>{this.props.entry.text}</div>
        )
    }
}

export default JournalEntry