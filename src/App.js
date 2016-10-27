import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as EntryActions from './actions'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import JournalEntryForm from './JournalEntryForm';
import JournalEntryList from './JournalEntryList';

class App extends Component {
  render() {
      const { entries, actions, syncState } = this.props

      return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Better Journaling</h2>
        </div>
        <JournalEntryForm addJournalEntry={actions.addJournalEntry}/>
        <JournalEntryList entries={entries} />
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        entries: state,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(EntryActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

