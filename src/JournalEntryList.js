import React from 'react';
import JournalEntry from './JournalEntry'

class JournalEntryList extends React.Component {
    render () {
        const { entries } = this.props
        return(

            <ul className="entry-list">
                {entries.map(entry =>
                    <JournalEntry key={entry._id} entry={entry} />
                )}
            </ul>
        );
    }
}

export default JournalEntryList;