import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware } from 'redux'
import {entries} from './reducers'
import PouchDB from 'pouchdb'
import PouchSync from 'pouch-websocket-sync'
import { combineReducers } from 'redux'

// const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
// const clientEvents = ['connect', 'disconnect', 'reconnect'];

// const initialState = {
//     todos: [],
//     syncState: {
//         text: 'unknown'
//     }
// }

export default function configureStore() {

    PouchDB.debug.disable('*');
    const db = new PouchDB('entries');

    const syncClient = PouchSync.createClient()

    const sync = syncClient
        .connect('ws://localhost:3001')
        .on('error', function(err) { console.log(err);})
        .sync(db, {remoteName: 'entries-server'})

    // syncEvents.forEach(function(event) {
    //     sync.on(event, function() {
    //         store.dispatch({type: types.SET_SYNC_STATE, text: event});
    //     })
    // })
    //
    // clientEvents.forEach(function(event) {
    //     syncClient.on(event, function() {
    //         store.dispatch({type: types.SET_SYNC_STATE, text: event});
    //     })
    // })

    let store;
    const pouchMiddleware = PouchMiddleware({
        path: '/entries',
        db,
        actions: {
            remove: doc => store.dispatch({type: 'DELETE_ENTRY', id: doc._id}),
            insert: doc => store.dispatch({type: 'INSERT_ENTRY', entry: doc}),
            update: doc => store.dispatch({type: 'UPDATE_ENTRY', entry: doc}),
        }
    })

    var initialState = {entries:[]};
    var combinedReducers = combineReducers({
        entries
    })

    store = createStore(
        combinedReducers,
        initialState,
        applyMiddleware(pouchMiddleware)
    )

    // if (module.hot) {
    //     // Enable Webpack hot module replacement for reducers
    //     module.hot.accept('../reducers', () => {
    //         const nextReducer = require('../reducers')
    //         store.replaceReducer(nextReducer)
    //     })
    // }

    return store
}
